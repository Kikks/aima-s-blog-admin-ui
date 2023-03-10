import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Heading from '@/components/lib/Heading';
import Text from '@/components/lib/Text';
import { UNFEATURE_POST } from '@/graphql/mutations/post.mutations';
import { GET_FEATURED_POSTS } from '@/graphql/queries/post.queries';

import type DeleteFeaturedPostModalProps from './DeleteFeaturedPostModal.props';

const DeleteFeaturedPostModal: FC<DeleteFeaturedPostModalProps> = ({
  activeIndex,
  open,
  onClose,
  featuredPosts,
}) => {
  const postData = useMemo(() => {
    return featuredPosts?.find((item) => item?.index === activeIndex)?.post;
  }, [featuredPosts, activeIndex]);

  const [mutate, { loading }] = useMutation(UNFEATURE_POST, {
    onCompleted() {
      toast.success('Post unfeatured successfully');
      onClose();
    },
    onError(error) {
      toast.error(error?.message);
    },
    refetchQueries: [{ query: GET_FEATURED_POSTS }, 'getFeaturedPosts'],
  });

  const handeUnfeaturePost = () => {
    if (!postData?.id) {
      onClose();
      return;
    }

    mutate({
      variables: { postId: postData?.id as string },
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
            className="z-10 flex h-[45vh] max-h-[500px] w-[90%] max-w-[600px] flex-col items-center gap-5 overflow-hidden overflow-y-auto rounded-xl bg-white p-5 md:p-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.25 } }}
          >
            <div className="flex w-full items-center justify-between">
              <Heading variant="h3" className="font-bold">
                Unfeature Post
              </Heading>
              <button onClick={onClose}>
                <Icon className="text-2xl" icon="carbon:close" />
              </button>
            </div>

            <div className="flex w-full flex-1 flex-col">
              <Text>
                Are you sure you want to unfeature &quot;{postData?.title}
                &quot;?
              </Text>
            </div>

            <div className="flex w-full items-center gap-5">
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
                onClick={handeUnfeaturePost}
              >
                Unfeature
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DeleteFeaturedPostModal;
