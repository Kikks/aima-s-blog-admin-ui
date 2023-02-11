import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Heading from '@/components/lib/Heading';
import Input from '@/components/lib/Input';
import Loader from '@/components/lib/Loader';
import Text from '@/components/lib/Text';
import { FEATURE_POST } from '@/graphql/mutations/post.mutations';
import { GET_THEMES } from '@/graphql/mutations/theme.queries';
import { GET_FEATURED_POSTS, GET_POSTS } from '@/graphql/queries/post.queries';
import { useDebounce } from '@/hooks';
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
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [themes, setThemes] = useState<(ITheme | null)[]>([]);
  const [posts, setPosts] = useState<(IPost | null)[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  const { loading: themesLoading } = useQuery(GET_THEMES, {
    onCompleted(response) {
      setThemes(response?.getThemes || []);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { loading: postsLoading } = useQuery(GET_POSTS, {
    variables: {
      search: debouncedSearch as string,
      page: 1,
      limit: 5,
      isPublished: true,
    },
    onCompleted(response) {
      setPosts(response?.getAllPosts?.data || []);
      setShowMenu(true);
    },
    onError() {
      // toast.error(error.message);
    },
  });

  const [mutate, { loading }] = useMutation(FEATURE_POST, {
    onCompleted() {
      setSearch('');
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

  const handlePostClicked = (id: string, title: string) => {
    setSelectedPost(id);
    setSearch(title);
    setShowMenu(false);
  };

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

    const postTitle =
      posts.find((item) => item?.id === selectedPost)?.title || '';

    if (search !== postTitle) {
      toast.error('No post with the entered title exists');
      return;
    }

    mutate({
      variables: {
        postId: selectedPost,
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
                <Input
                  value={search}
                  disabled={loading}
                  placeholder="Search post"
                  label="What post will you like to feature?"
                  onChange={(event) => setSearch(event.currentTarget.value)}
                />

                {!isEmpty(debouncedSearch) && showMenu && (
                  <div className="absolute top-[110%] left-0 max-h-[200px] w-full overflow-y-auto bg-white shadow-md">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {postsLoading ? (
                      <div className="my-10 grid h-full place-items-center">
                        <Loader color="#003049" />
                      </div>
                    ) : (posts || []).length === 0 ? (
                      <div className="my-10 grid place-items-center text-center">
                        <Text>No post with that title exists</Text>
                      </div>
                    ) : (
                      (posts || []).map((item, index) => (
                        <div
                          key={index}
                          role="button"
                          className="w-full cursor-pointer p-3 hover:bg-gray-100"
                          onClick={() =>
                            handlePostClicked(item?.id || '', item?.title || '')
                          }
                        >
                          <Text>{item?.title}</Text>
                        </div>
                      ))
                    )}
                  </div>
                )}
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
