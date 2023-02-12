import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@/components/lib/Button';
import Card from '@/components/lib/Card';
import FullPageLoader from '@/components/lib/FullPageLoader';
import Input from '@/components/lib/Input';
import Pagination from '@/components/lib/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/lib/Table';
import Text from '@/components/lib/Text';
import type { Meta as RequestMeta } from '@/graphql/__generated__/graphql';
import { GET_CATEGORIES_STATS } from '@/graphql/queries/category.queries';
import { useDebounce } from '@/hooks';
import PageLayout from '@/layouts/PageLayout';
import Meta from '@/templates/Meta';
import type ICategory from '@/types/Category.type';
import { defaultMeta } from '@/utils/constants';

const Categories = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<
    ({
      category: ICategory;
      posts: number;
    } | null)[]
  >([]);
  const [meta, setMeta] = useState<RequestMeta>(defaultMeta);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500) as string;

  const { loading } = useQuery(GET_CATEGORIES_STATS, {
    variables: { limit: 20, page, search: debouncedSearch },
    onCompleted(response) {
      setCategories(response?.getCategoriesStats?.data || []);
      setMeta(response?.getCategoriesStats?.meta || defaultMeta);
    },
  });

  return (
    <PageLayout
      title="Categories"
      meta={
        <Meta
          title="Categories | Aima's Corner Admin Panel"
          description="The list of categories of posts in Aima's corner"
        />
      }
      actionButton={
        <Button onClick={() => router.push('/categories/new')}>
          New Category
        </Button>
      }
    >
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <Input
            type="search"
            placeholder="Search categories..."
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
        {categories.length === 0 ? (
          <div className="my-20 grid place-items-center text-center">
            <Text>There are no categories to display.</Text>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader
                items={[
                  `${meta.total} categor${(meta.total || 0) > 1 ? 'ies' : 'y'}`,
                  'No. of Posts',
                  'Is Featured',
                ]}
              />
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell url={`/categories/${category?.category?.id}`}>
                      <Text className="capitalize">
                        {category?.category?.name}
                      </Text>
                    </TableCell>
                    <TableCell url={`/categories/${category?.category?.id}`}>
                      <Text>{category?.posts}</Text>
                    </TableCell>
                    <TableCell url={`/categories/${category?.category?.id}`}>
                      <Text>
                        {category?.category?.isFeatured ? 'Yes' : 'No'}
                      </Text>
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

export default Categories;
