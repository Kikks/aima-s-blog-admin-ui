/* eslint-disable no-nested-ternary */
import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Card from '@/components/lib/Card';
import Category from '@/components/lib/Category';
import FeaturedPost from '@/components/lib/FeaturedPost';
import Loader from '@/components/lib/Loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/lib/Table';
import Text from '@/components/lib/Text';
import PostsStats from '@/components/pages/dashboard/PostsStats';
import Stats from '@/components/pages/dashboard/Stats';
import {
  COUNT_CATEGORIES,
  GET_FEATURED_CATEGORIES,
} from '@/graphql/queries/category.queries';
import {
  COUNT_POSTS,
  GET_FEATURED_POSTS,
  GET_POSTS,
} from '@/graphql/queries/post.queries';
import { COUNT_USERS } from '@/graphql/queries/user.queries';
import PageLayout from '@/layouts/PageLayout';
import Meta from '@/templates/Meta';
import type ICategory from '@/types/Category.type';
import type IPost from '@/types/Post.type';
import type ITheme from '@/types/Theme.type';

const Dashboard = () => {
  const [posts, setPosts] = useState<(IPost | null)[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<
    (ICategory | null)[]
  >([]);
  const [featuredPosts, setFeauredPosts] = useState<
    | ({
        post?: IPost | null;
        theme?: ITheme | null;
        index?: number | null;
      } | null)[]
    | null
  >([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [postCount, setPostCount] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const { loading: postCountLoading } = useQuery(COUNT_POSTS, {
    onCompleted(response) {
      setPostCount(response?.countPosts);
    },
    onError(error) {
      toast.error(error?.message);
    },
  });
  const { loading: categoriesCountLoading } = useQuery(COUNT_CATEGORIES, {
    onCompleted(response) {
      setCategoriesCount(response?.countCategories);
    },
    onError(error) {
      toast.error(error?.message);
    },
  });
  const { loading: usersCountLoading } = useQuery(COUNT_USERS, {
    onCompleted(response) {
      setUsersCount(response?.countUsers);
    },
    onError(error) {
      toast.error(error?.message);
    },
  });
  const { loading: postsLoading } = useQuery(GET_POSTS, {
    variables: { page: 1, limit: 5 },
    onCompleted(response) {
      setPosts(response?.getAllPosts?.data);
    },
    onError(error) {
      toast.error(error?.message);
    },
  });
  const { loading: featuredPostsLoading } = useQuery(GET_FEATURED_POSTS, {
    onCompleted(response) {
      const array = [...(response?.getFeaturedPosts || [])];

      setFeauredPosts(
        array.sort((a, b) => (a?.index || 0) - (b?.index || 0)) || []
      );
    },
    onError(error) {
      toast.error(error?.message);
    },
  });
  const { loading: featuredCategoriesLoading } = useQuery(
    GET_FEATURED_CATEGORIES,
    {
      onCompleted(response) {
        setFeaturedCategories(response?.getFeaturedCategories || []);
      },
      onError(error) {
        toast.error(error?.message);
      },
    }
  );

  return (
    <PageLayout
      title="Dashboard"
      meta={
        <Meta
          title="Dashboard | Aima's Corner Admin Panel"
          description="The dashboard for Aima's corner"
        />
      }
    >
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <PostsStats
          drafts={postCount.drafts}
          published={postCount.published}
          total={postCount.total}
          loading={postCountLoading}
        />

        <Stats
          title="Total Categories"
          value={categoriesCount}
          loading={categoriesCountLoading}
        />
        <Stats
          title="Total Members"
          value={usersCount}
          loading={usersCountLoading}
        />

        <Card
          title="Recent Posts"
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <div className="grid w-full gap-5">
            {postsLoading ? (
              <div className="my-20 grid w-full place-items-center">
                <Loader color="#003049" />
              </div>
            ) : (posts || []).length === 0 ? (
              <div className="col-span-1 my-20 grid place-items-center text-center lg:col-span-2">
                <Text>There are no posts to display.</Text>
              </div>
            ) : (
              <Table>
                <TableHeader items={['Title', 'Is Published', 'Created At']} />
                <TableBody>
                  {posts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell url={`/posts/${post?.id}`}>
                        <Text>{post?.title}</Text>
                      </TableCell>
                      <TableCell url={`/posts/${post?.id}`}>
                        <Text>{post?.isPublished ? 'Yes' : 'No'}</Text>
                      </TableCell>
                      <TableCell url={`/posts/${post?.id}`}>
                        <Text>
                          {moment(Number(post?.createdAt || '')).format(
                            'MMMM DD, YYYY'
                          )}
                        </Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Link href="/posts" passHref>
              <a>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  View all posts{' '}
                  <Icon
                    icon="material-symbols:arrow-right-alt-rounded"
                    className="text-2xl"
                  />
                </Button>
              </a>
            </Link>
          </div>
        </Card>

        <Card
          title="Featured Posts"
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <div className="grid w-full gap-5">
            <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
              {featuredPostsLoading ? (
                <div className="col-span-1 my-20 grid w-full place-items-center lg:col-span-2">
                  <Loader color="#003049" />
                </div>
              ) : (featuredPosts || []).length === 0 ? (
                <div className="col-span-1 my-20 grid place-items-center text-center lg:col-span-2">
                  <Text>There are no featured posts to display.</Text>
                </div>
              ) : (
                (featuredPosts || []).map((featuredPost, index) => (
                  <FeaturedPost
                    key={index}
                    {...featuredPost}
                    variant={featuredPost?.index === 0 ? 'long' : 'short'}
                  />
                ))
              )}
            </div>

            <Link href="/posts/featured" passHref>
              <a>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  Edit featured posts{' '}
                  <Icon
                    icon="material-symbols:arrow-right-alt-rounded"
                    className="text-2xl"
                  />
                </Button>
              </a>
            </Link>
          </div>
        </Card>

        <Card
          title="Featured Categories"
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <div className="grid w-full grid-cols-1 gap-5 md:gap-10 lg:grid-cols-2">
            {featuredCategoriesLoading ? (
              <div className="col-span-1 my-20 grid w-full place-items-center lg:col-span-2">
                <Loader color="#003049" />
              </div>
            ) : (featuredCategories || []).length === 0 ? (
              <div className="col-span-1 my-20 grid place-items-center text-center lg:col-span-2">
                <Text>There are no featured categories to display.</Text>
              </div>
            ) : (
              (featuredCategories || []).map((featuredCategory, index) => (
                <Category key={index} {...featuredCategory} />
              ))
            )}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
