import { useLazyQuery, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import FullPageLoader from '@/components/lib/FullPageLoader';
import Heading from '@/components/lib/Heading';
import Select from '@/components/lib/Select';
import Text from '@/components/lib/Text';
import Toggle from '@/components/lib/Toggle';
import {
  FEATURE_POST,
  UNFEATURE_POST,
} from '@/graphql/mutations/post.mutations';
import { GET_LATEST_THEME } from '@/graphql/mutations/theme.queries';
import { GET_CATEGORIES } from '@/graphql/queries/category.queries';
import {
  GET_FEATURED_POSTS,
  GET_IS_POST_FEATURED,
} from '@/graphql/queries/post.queries';
import { useToggle } from '@/hooks';
import type ICategory from '@/types/Category.type';
import type ITheme from '@/types/Theme.type';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { isEmpty } from '@/utils/validators/helpers';

import DeletePostModal from '../DeletePostModal';
import type EditPostSettingsProps from './EditPostSettings.props';

const EditPostSettings: FC<EditPostSettingsProps> = ({
  postId,
  category,
  onClose,
  open,
  setCategory,
  isPublished,
  onSave,
}) => {
  const [categories, setCategories] = useState<(ICategory | null)[]>([]);
  const [latestTheme, setLatestTheme] = useState<ITheme | null>(null);
  const [deleteModalOpen, toggleDeleteModalOpen] = useToggle(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    variables: { limit: 50, page: 1 },
    onCompleted(response) {
      setCategories(response?.getCategories?.data || []);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const [getLatestTheme] = useLazyQuery(GET_LATEST_THEME, {
    onCompleted(response) {
      setLatestTheme(response?.getLatestTheme || null);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const [getIsPostFeatured, { refetch }] = useLazyQuery(GET_IS_POST_FEATURED, {
    variables: { postId },
    onCompleted(response) {
      setIsFeatured(response?.getIsPostFeatured || false);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!isEmpty(postId)) {
      getCategories();
      getLatestTheme();
      getIsPostFeatured();
    }
  }, [postId]);

  const [mutate, { loading }] = useMutation(
    isFeatured ? UNFEATURE_POST : FEATURE_POST,
    {
      onCompleted() {
        refetch();
      },
      onError(error) {
        toast.error(error.message);
      },
      refetchQueries: [{ query: GET_FEATURED_POSTS }, 'getFeaturedPosts'],
    }
  );

  const handleFeaturePost = () => {
    mutate({
      variables: { postId, themeId: latestTheme?.id || '' },
    });
  };

  return (
    <>
      {open ? (
        <div
          className={`fixed left-0 top-0 z-[1000] grid h-full w-full place-items-end shadow-md`}
        >
          <div
            className="absolute top-0 left-0 z-0 h-full w-full bg-black/40"
            onClick={onClose}
          />

          <motion.div
            className="z-10 flex h-full w-[300px] flex-col items-start gap-10 overflow-hidden overflow-y-auto bg-white p-5 md:w-[400px]"
            initial={{ opacity: 0, translateX: 300 }}
            animate={{ opacity: 1, translateX: 0, transition: { delay: 0.1 } }}
          >
            <div className="flex w-full items-center justify-between">
              <Heading variant="h3" className="font-bold">
                Post settings
              </Heading>
              <button
                onClick={onClose}
                className="ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-black/10"
              >
                <Icon className="text-2xl" icon="carbon:close" />
              </button>
            </div>

            <Select
              label="Post Category"
              value={category}
              onChange={(event) => setCategory(event.currentTarget.value)}
              options={[
                { label: 'Select Category', value: '' },
                ...categories.map((item) => ({
                  label: capitalizeFirstLetter(item?.name || ''),
                  value: item?.id || '',
                })),
              ]}
            />

            {isPublished && (
              <div className="flex w-full flex-col gap-2">
                <Text>Would you like to feature this post?</Text>

                <div className="flex items-center gap-3">
                  <Text>No</Text>
                  <Toggle checked={isFeatured} onChange={handleFeaturePost} />
                  <Text>Yes</Text>
                </div>
              </div>
            )}

            <div className="mt-auto flex w-full justify-between">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-200"
                onClick={toggleDeleteModalOpen}
              >
                Delete Post
              </Button>

              <Button onClick={onSave}>Update</Button>
            </div>
          </motion.div>
        </div>
      ) : (
        <></>
      )}

      <DeletePostModal
        open={deleteModalOpen}
        onClose={toggleDeleteModalOpen}
        postId={postId}
      />

      {loading && <FullPageLoader />}
    </>
  );
};

export default EditPostSettings;
