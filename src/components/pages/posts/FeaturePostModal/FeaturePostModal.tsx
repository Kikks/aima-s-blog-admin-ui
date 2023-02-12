import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Heading from '@/components/lib/Heading';
import Loader from '@/components/lib/Loader';
import Text from '@/components/lib/Text';
import { FEATURE_POST } from '@/graphql/mutations/post.mutations';
import { GET_THEMES } from '@/graphql/mutations/theme.queries';
import { GET_FEATURED_POSTS, GET_POSTS } from '@/graphql/queries/post.queries';
import type IPost from '@/types/Post.type';
import type ITheme from '@/types/Theme.type';
import { isEmpty } from '@/utils/validators/helpers';

import styles from './FeaturePostModal.module.scss';
import type FeaturePostModalProps from './FeaturePostModal.props';

const FeaturePostModal: FC<FeaturePostModalProps> = ({
  open,
  onClose,
  activeIndex,
}) => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [themes, setThemes] = useState<(ITheme | null)[]>([]);
  const [posts, setPosts] = useState<(IPost | null)[]>([]);

  const { loading: themesLoading } = useQuery(GET_THEMES, {
    onCompleted(response) {
      setThemes(response?.getThemes || []);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useQuery(GET_POSTS, {
    variables: {
      page: 1,
      limit: 100,
      isPublished: true,
    },
    onCompleted(response) {
      setPosts(response?.getAllPosts?.data || []);
    },
    onError() {
      // toast.error(error.message);
    },
  });

  const [mutate, { loading }] = useMutation(FEATURE_POST, {
    onCompleted() {
      setSelectedPost('');
      setSelectedTheme('');
      toast.success('Post featured successfully');
      onClose();
    },
    onError(error) {
      toast.error(error.message);
    },
    refetchQueries: [{ query: GET_FEATURED_POSTS }, 'getFeaturedPosts'],
  });

  const handleThemeClicked = (id: string) => {
    if (loading) return;

    setSelectedTheme(id);
  };

  const handleFeaturePost = () => {
    if (isEmpty(selectedPost)) {
      toast.error('Please select a post');
      return;
    }

    if (isEmpty(selectedTheme)) {
      toast.error('Please select a theme');
      return;
    }

    const postId = posts.find((item) => item?.title === selectedPost)?.id || '';

    if (isEmpty(postId)) {
      toast.error('No post with the entered title exists');
      return;
    }

    mutate({
      variables: {
        postId,
        themeId: selectedTheme,
        index: activeIndex,
      },
    });
  };

  return (
    <>
      {open && (
        <div
          className={`fixed left-0 top-0 z-[1000] grid h-full w-full place-items-center shadow-md`}
        >
          <div
            className="absolute top-0 left-0 z-0 h-full w-full bg-black/40"
            onClick={onClose}
          />

          <motion.div
            className="z-10 flex h-[85vh] max-h-[800px] w-[90%] max-w-[600px] flex-col items-center gap-5 overflow-hidden rounded-xl bg-white py-5 md:py-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.25 } }}
          >
            <div className="flex w-full items-center justify-between px-5 md:px-10">
              <Heading variant="h3" className="font-bold">
                Feature Post
              </Heading>
              <button onClick={onClose}>
                <Icon className="text-2xl" icon="carbon:close" />
              </button>
            </div>

            <div className="flex w-full flex-1 flex-col gap-10 overflow-y-auto px-5 md:px-10">
              <div className="relative z-10 w-full">
                <Autocomplete
                  getItemValue={(item) => item.title}
                  items={posts}
                  autoHighlight
                  value={selectedPost}
                  onChange={(e) => setSelectedPost(e.currentTarget.value)}
                  onSelect={(val) => setSelectedPost(val)}
                  inputProps={{
                    className:
                      'mx-auto flex w-full items-center overflow-hidden rounded-md border bg-[#fefefe] focus-within:border-primary-main flex-1 bg-transparent py-3 px-5 font-medium outline-none',
                  }}
                  wrapperStyle={{
                    width: '100%',
                  }}
                  renderItem={(item, isHighlighted) => (
                    <div
                      className={`cursor-pointer p-3 hover:bg-gray-50 ${
                        isHighlighted ? 'bg-gray-200' : 'bg-white'
                      }`}
                    >
                      {item.title}
                    </div>
                  )}
                />
              </div>

              <div className="z-0 grid flex-1 grid-cols-2 content-start gap-5 pb-3">
                <Text className="col-span-2 text-sm font-bold">
                  Select a theme for the featured post
                </Text>
                {themesLoading ? (
                  <div className="col-span-2 my-10 grid h-full">
                    <Loader color="#003049" />
                  </div>
                ) : (
                  (themes || []).map((item, index) => (
                    <div
                      key={index}
                      role="buton"
                      onClick={() => handleThemeClicked(item?.id || '')}
                      className={`${styles.theme} ${
                        styles[`theme__${item?.name}`] ||
                        styles['theme__cool-love']
                      } ${
                        selectedTheme === item?.id
                          ? styles['theme--selected']
                          : ''
                      }`}
                    >
                      <Heading
                        variant="h3"
                        className="font-ephesis font-semibold capitalize"
                      >
                        {item?.name}
                      </Heading>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex w-full items-center gap-5 px-5 md:px-10">
              <Button
                disabled={loading}
                variant="outline"
                className="w-1/2"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                loading={loading}
                className="w-1/2 bg-red-500"
                onClick={handleFeaturePost}
              >
                Feature
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default FeaturePostModal;
