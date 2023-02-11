import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Card from '@/components/lib/Card';
import FullPageLoader from '@/components/lib/FullPageLoader';
import Input from '@/components/lib/Input';
import Pagination from '@/components/lib/Pagination';
import Select from '@/components/lib/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/lib/Table';
import Text from '@/components/lib/Text';
import type { Meta as RequestMeta } from '@/graphql/__generated__/graphql';
import { GET_CATEGORIES } from '@/graphql/queries/category.queries';
import { GET_POSTS } from '@/graphql/queries/post.queries';
import { useDebounce } from '@/hooks';
import PageLayout from '@/layouts/PageLayout';
import Meta from '@/templates/Meta';
import type ICategory from '@/types/Category.type';
import type IPost from '@/types/Post.type';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import {
  defaultMeta,
  orderOptions,
  postsSortByOptions,
} from '@/utils/constants';
import trimString from '@/utils/trimString';

const Posts = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<(IPost | null)[]>([]);
  const [categories, setCategories] = useState<(ICategory | null)[]>([]);
  const [meta, setMeta] = useState<RequestMeta>(defaultMeta);
  const [page, setPage] = useState(1);
  const [filter, setFiler] = useState({
    category: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  const debouncedSearch = useDebounce(search, 500) as string;

  const { loading } = useQuery(GET_POSTS, {
    variables: {
      limit: 20,
      page,
      ...filter,
      search: debouncedSearch,
      // eslint-disable-next-line no-nested-ternary
      ...((router?.query?.type as string) === 'drafts'
        ? { isPublished: false }
        : (router?.query?.type as string) === 'published'
        ? { isPublished: true }
        : {}),
    },
    onCompleted(response) {
      setPosts(response?.getAllPosts?.data || []);
      setMeta(response?.getAllPosts?.meta || defaultMeta);
    },
    onError(response) {
      toast.error(response?.message);
    },
  });

  useQuery(GET_CATEGORIES, {
    variables: {
      limit: 50,
      page,
    },
    onCompleted(response) {
      setCategories(response?.getCategories?.data || []);
    },
    onError(response) {
      toast.error(response?.message);
    },
  });

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    setFiler({
      ...filter,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <PageLayout
      title="Posts"
      meta={
        <Meta
          title="Posts | Aima's Corner Admin Panel"
          description="The list of posts in Aima's corner"
        />
      }
      actionButton={
        <Button onClick={() => router.push('/posts/new')}>New Post</Button>
      }
    >
      <div className="mb-10 flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Select
            label="Category"
            name="category"
            className="w-[150px]"
            value={filter.category}
            onChange={handleChange}
            options={[
              { label: 'All', value: '' },
              ...categories.map((category) => ({
                label: capitalizeFirstLetter(category?.name || ''),
                value: category?.id || '',
              })),
            ]}
          />
          <Select
            label="Sort By"
            name="sortBy"
            className="w-[150px]"
            value={filter.sortBy}
            onChange={handleChange}
            options={postsSortByOptions}
          />
          <Select
            label="Order"
            name="order"
            className="w-[150px]"
            value={filter.order}
            onChange={handleChange}
            options={orderOptions}
          />
        </div>
        <div className="max-w-[300px] flex-1">
          <Input
            label="&nbsp;"
            type="search"
            placeholder="Search posts..."
            startIcon={
              <Icon
                icon="ion:search"
                className="cursor-pointer text-xl text-black/20"
              />
            }
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </div>
      </div>

      <Card className="grid w-full gap-10">
        {posts.length === 0 ? (
          <div className="my-20 grid place-items-center text-center">
            <Text>There are no posts to display.</Text>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader
                items={[
                  `${meta?.total || 0} post${
                    (meta?.total || 0) > 1 ? 's' : ''
                  }`,
                  'Category',
                  'Created On',
                  '',
                ]}
              />
              <TableBody>
                {posts.map((post, index) => (
                  <TableRow key={index}>
                    <TableCell url={`/posts/${post?.id}`}>
                      <div>
                        <Text className="font-semibold capitalize">
                          {trimString(post?.title || '', 100)}
                        </Text>

                        <div className="flex items-center gap-2">
                          {post?.isPublished ? (
                            <Text variant="caption">Published</Text>
                          ) : (
                            <>
                              <div className="h-1.5 w-1.5 rounded-full bg-primary-main" />
                              <Text
                                variant="caption"
                                className="text-primary-main"
                              >
                                Draft
                              </Text>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell url={`/posts/${post?.id}`}>
                      <Text className="capitalize">{post?.category?.name}</Text>
                    </TableCell>
                    <TableCell url={`/posts/${post?.id}`}>
                      <Text>
                        {moment(Number(post?.createdAt || '')).format(
                          'MMMM DD, YYYY'
                        )}
                      </Text>
                    </TableCell>
                    <TableCell url={`/posts/${post?.id}`}>
                      {!post?.isPublished && (
                        <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/10">
                          <Icon
                            icon="material-symbols:edit-outline-rounded"
                            className="text-2xl text-primary-main"
                          />
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination count={meta.pages || 0} page={page} setPage={setPage} />
          </>
        )}
      </Card>

      {loading && <FullPageLoader />}
    </PageLayout>
  );
};

export default Posts;
