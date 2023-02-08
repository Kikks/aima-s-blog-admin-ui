import { useLazyQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import FullPageLoader from '@/components/lib/FullPageLoader';
import Text from '@/components/lib/Text';
import PostBody from '@/components/pages/posts/PostBody';
import PrevAndNextPosts from '@/components/pages/posts/PrevAndNextPosts';
import SharePost from '@/components/pages/posts/SharePost';
import { GET_POST } from '@/graphql/queries/post.queries';
import AuthCheck from '@/layouts/AutchCheck/AuthCheck';
import type IPost from '@/types/Post.type';
import { isEmpty } from '@/utils/validators/helpers';

const SinglePost = () => {
  const router = useRouter();

  const [post, setPost] = useState<IPost | null>({
    id: '',
    slug: '',
    title: '',
    preview: '',
    coverImage: '',
    createdAt: '',
    audio: '',
    body: null,
  });

  const [getPost, { loading }] = useLazyQuery(GET_POST, {
    variables: { postId: router?.query?.id as string },
    onCompleted(response) {
      setPost(response?.adminGetPost?.post || null);
    },
    onError() {
      router.push('/404');
    },
  });

  useEffect(() => {
    if (router?.query?.id) {
      getPost();
    }
  }, [router?.query?.id]);

  return (
    <AuthCheck>
      <main className="lg:32 relative mb-20 grid w-full gap-10">
        <nav className="sticky top-0 left-0 z-[1000] mx-auto flex w-full max-w-[1300px] items-center justify-between gap-3 bg-aima-white p-3 md:p-5 lg:bg-transparent">
          <button
            className="flex gap-1 rounded-md p-2 hover:bg-aima-black/10"
            onClick={() => router.back()}
          >
            <Icon
              icon="material-symbols:chevron-left-rounded"
              className="text-lg text-aima-black"
            />
            <Text variant="caption">Posts</Text>
          </button>

          <Text className="mr-auto text-aima-black/30">Preview</Text>
        </nav>

        <section className="mx-auto w-full max-w-[900px] px-5">
          <h1 className="relative text-center font-catamaran text-4xl font-medium leading-7 md:font-semibold lg:text-5xl">
            {post?.title || ''}
          </h1>
        </section>

        <section className="mx-auto grid w-full max-w-[900px] place-items-center">
          <figure className="relative aspect-video w-full">
            <Image
              src={post?.coverImage || ''}
              alt={post?.title || ''}
              layout="fill"
              className="h-full w-full object-cover duration-500 group-hover:scale-110"
              quality={100}
            />
          </figure>
        </section>

        <section className="mx-auto w-full max-w-[900px] px-5">
          <Text variant="caption" className="text-center text-primary-main">
            {moment(Number(post?.createdAt || '')).format('MMMM DD, YYYY')}
          </Text>
        </section>

        {!isEmpty(post?.audio || '') && (
          <section className="mx-auto grid h-20 w-full max-w-[900px] place-items-center px-5">
            <audio controls className="w-full max-w-[500px]">
              <source src={post?.audio || ''} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </section>
        )}

        <PostBody body={post?.body} />
        <SharePost slug={post?.slug || ''} />
        <PrevAndNextPosts postId={post?.id || ''} />
      </main>

      {loading && <FullPageLoader />}
    </AuthCheck>
  );
};

export default SinglePost;
