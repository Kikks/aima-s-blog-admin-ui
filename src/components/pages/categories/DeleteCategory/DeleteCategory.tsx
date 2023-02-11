import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Card from '@/components/lib/Card';
import Heading from '@/components/lib/Heading';
import Text from '@/components/lib/Text';
import { DELETE_CATEGORY } from '@/graphql/mutations/categories.mutations';
import {
  COUNT_CATEGORIES,
  GET_CATEGORIES_STATS,
  GET_CATEGORY,
} from '@/graphql/queries/category.queries';
import { COUNT_POSTS, GET_POSTS } from '@/graphql/queries/post.queries';
import { useToggle } from '@/hooks';

import type DeleteCategoryProps from './DeleteCategory.props';

const DeleteCategory: FC<DeleteCategoryProps> = ({ categoryId }) => {
  const [open, toggleOpen] = useToggle(false);
  const router = useRouter();

  const [mutate, { loading }] = useMutation(DELETE_CATEGORY, {
    variables: { id: categoryId },
    refetchQueries: [
      {
        query: GET_CATEGORIES_STATS,
      },
      {
        query: GET_CATEGORY,
      },
      {
        query: GET_POSTS,
      },
      {
        query: COUNT_POSTS,
      },
      {
        query: COUNT_CATEGORIES,
      },
      'getAllPosts',
      'countPosts',
      'getCategoryStats',
      'getCategory',
      'countCategories',
    ],
    onCompleted() {
      toggleOpen();
      toast.success('Category deleted successfully');
      router.push('/categories');
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      <Card className="mt-10">
        <div>
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-200"
            onClick={toggleOpen}
          >
            Delete Category
          </Button>
        </div>
      </Card>

      {open && (
        <div
          className={`fixed left-0 top-0 z-[1000] grid h-full w-full place-items-center shadow-md`}
        >
          <div
            className="absolute top-0 left-0 z-0 h-full w-full bg-black/40"
            onClick={toggleOpen}
          />

          <motion.div
            className="z-10 flex h-[45vh] max-h-[500px] w-[90%] max-w-[600px] flex-col items-center gap-5 overflow-hidden overflow-y-auto rounded-xl bg-white p-5 md:p-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.25 } }}
          >
            <div className="flex w-full items-center justify-between">
              <Heading variant="h3" className="font-bold">
                Delete Category
              </Heading>
              <button onClick={toggleOpen}>
                <Icon className="text-2xl" icon="carbon:close" />
              </button>
            </div>

            <div className="flex w-full flex-1 flex-col">
              <Text>
                Are you sure you want to delete this category?{' '}
                <span className="font-bold">
                  Please note that all posts under this category will also be
                  deleted.
                </span>
                <br />
                <br />
                This action cannot be reversed.
              </Text>
            </div>

            <div className="flex w-full items-center gap-5">
              <Button
                disabled={loading}
                variant="outline"
                className="w-1/2"
                onClick={toggleOpen}
              >
                Cancel
              </Button>
              <Button
                loading={loading}
                className="w-1/2 bg-red-500"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DeleteCategory;
