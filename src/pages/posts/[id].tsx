import { useLazyQuery, useMutation } from '@apollo/client';
import type EditorJS from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import FullPageLoader from '@/components/lib/FullPageLoader';
import Loader from '@/components/lib/Loader';
import Text from '@/components/lib/Text';
import EditPostSettings from '@/components/pages/posts/EditPostSettings';
import {
  PUBLISH_POST,
  UNPUBLISH_POST,
  UPDATE_POST,
} from '@/graphql/mutations/post.mutations';
import { GET_POST, GET_POSTS } from '@/graphql/queries/post.queries';
import { useToggle } from '@/hooks';
import AutchCheck from '@/layouts/AutchCheck';
import Meta from '@/templates/Meta';
import {
  audiosUploadPreset,
  cloudinaryAudioURL,
  postsUploadPreset,
} from '@/utils/constants';
import uploadFile from '@/utils/uploadFile';
import { isEmpty } from '@/utils/validators/helpers';

const CustomEditor = dynamic(
  () => import('../../components/lib/CustomEditor'),
  {
    ssr: false,
  }
);

const EditPost = () => {
  const router = useRouter();
  const editor = useRef<EditorJS | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [sideNavIsOpen, toggleSideNavIsOpen] = useToggle(false);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [defaultValue, setDefaultValue] = useState<OutputData | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [mutate, { loading }] = useMutation(UPDATE_POST, {
    onCompleted() {
      toggleSideNavIsOpen();
      toast.success('Post updated successfully.');
      router.push('/posts');
    },
    onError(error) {
      toast.error(error?.message);
    },
    refetchQueries: [
      {
        query: GET_POSTS,
      },
      {
        query: GET_POST,
        variables: { postId: router?.query?.id as string },
      },
      'getAllPosts',
    ],
  });

  const [publishOrUnpublishPost, { loading: publishOrUnpublishLoading }] =
    useMutation(isPublished ? UNPUBLISH_POST : PUBLISH_POST, {
      onCompleted() {
        toast.success(`Post updated successfully.`);
      },
      onError(error) {
        toast.error(error?.message);
      },
      refetchQueries: [
        {
          query: GET_POST,
          variables: { postId: router?.query?.id as string },
        },
        'getAllPosts',
      ],
    });

  const [getPost, { loading: postLoading }] = useLazyQuery(GET_POST, {
    variables: { postId: router?.query?.id as string },
    onCompleted(response) {
      setDefaultValue(JSON.parse(response?.adminGetPost?.post?.body));
      setPostTitle(response?.adminGetPost?.post?.title || '');
      setCategory(response?.adminGetPost?.post?.category?.id || '');
      setAudioUrl(response?.adminGetPost?.post?.audio || null);
      setCoverImageUrl(response?.adminGetPost?.post?.coverImage || null);
      setIsPublished(response?.adminGetPost?.post?.isPublished || false);
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (router?.query?.id) {
      getPost();
    }
  }, [router?.query?.id]);

  const handleFileChange = (
    event: FormEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event?.currentTarget?.files?.[0];

    if (file) {
      if (type === 'image') {
        setImageFile(file);
      } else {
        setAudioFile(file);
      }
    }
  };

  const handleRemoveFile = (type: string) => {
    if (type === 'image') {
      setImageFile(null);
      setCoverImageUrl(null);
    } else {
      setAudioFile(null);
      setAudioUrl(null);
    }
  };

  const handlePublishOrUnpublish = () => {
    publishOrUnpublishPost({
      variables: { postId: router?.query?.id as string },
    });
  };

  const handleSave = async () => {
    try {
      const title = document.querySelector('.post-title')?.textContent;
      if (isEmpty(title || '')) {
        throw new Error('Post title cannot be empty.');
      }

      if (isEmpty(category)) {
        throw new Error('Please select a category in post settings.');
      }

      if (!coverImageUrl && !imageFile) {
        throw new Error('Please select a cover image.');
      }

      const editorSavedata = await editor?.current?.save();
      if (!editorSavedata) {
        throw new Error('No saved data.');
      }

      const body = editorSavedata?.blocks;
      if ((body || []).length < 1) {
        throw new Error('Post body cannot be empty.');
      }

      setIsUploading(true);

      let coverImage = coverImageUrl || '';

      if (imageFile) {
        coverImage = await uploadFile(imageFile, postsUploadPreset);
      }

      let audio: string | null = audioUrl;
      if (audioFile) {
        audio = await uploadFile(
          audioFile,
          audiosUploadPreset,
          cloudinaryAudioURL
        );
      }
      setIsUploading(false);

      mutate({
        variables: {
          postId: router?.query?.id as string,
          input: {
            body: JSON.stringify(editorSavedata),
            category,
            coverImage,
            title: title as string,
            audio,
          },
        },
      });
    } catch (error: any) {
      setIsUploading(false);
      toast.error(error?.message || 'Could not save post. Try again later.');
    }
  };

  return (
    <AutchCheck>
      <Meta
        title="Edit Post | Aima's Corner Admin Panel"
        description="Edit post"
      />

      <main className="relative w-full bg-aima-white">
        <nav className="sticky top-0 left-0 z-[1000] mx-auto flex w-full max-w-[1300px] items-center justify-between gap-3 bg-aima-white p-3 md:p-5 lg:bg-transparent">
          <button
            className="flex gap-1 rounded-md p-2 hover:bg-aima-black/10"
            onClick={() => router.push('/posts')}
          >
            <Icon
              icon="material-symbols:chevron-left-rounded"
              className="text-lg text-aima-black"
            />
            <Text variant="caption">Posts</Text>
          </button>

          <Text className="mr-auto text-aima-black/30">Edit</Text>

          <button
            className="rounded-md bg-aima-white p-2 text-sm font-bold uppercase text-aima-black hover:bg-gray-100"
            onClick={() => router.push(`/posts/preview/${router?.query?.id}`)}
          >
            Preview
          </button>

          <button
            className="flex gap-1 rounded-md p-2 text-sm font-bold uppercase text-primary-main hover:bg-primary-main/10"
            onClick={handlePublishOrUnpublish}
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>

          <button
            onClick={toggleSideNavIsOpen}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/10"
          >
            <Icon
              icon="ri:layout-right-line"
              className="text-2xl text-aima-black"
            />
          </button>
        </nav>

        <div className="z-10 mx-auto mt-10 mb-20 grid w-full max-w-[900px] items-center px-5">
          <Suspense
            fallback={
              <div className="my-20 grid w-full place-items-center">
                <Loader />
              </div>
            }
          >
            {imageFile || coverImageUrl ? (
              <div className="mb-10 flex w-full flex-col items-end gap-2">
                <figure className="relative aspect-video w-full">
                  <Image
                    src={
                      coverImageUrl ||
                      (imageFile ? URL.createObjectURL(imageFile) : '')
                    }
                    alt=""
                    layout="fill"
                    className="h-full w-full object-cover duration-500 group-hover:scale-110"
                    quality={100}
                  />
                </figure>
                <button
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRemoveFile('image')}
                >
                  <Icon
                    className="text-xl text-red-500"
                    icon="material-symbols:close"
                  />

                  <Text variant="caption" className="text-red-500">
                    Delete
                  </Text>
                </button>
              </div>
            ) : (
              <label
                htmlFor="coverImage"
                className="mb-10 flex w-full cursor-pointer items-center gap-1 self-start"
              >
                <Icon
                  icon="material-symbols:add"
                  className="text-2xl text-aima-black/30"
                />
                <Text className="text-aima-black/30">Add cover image</Text>

                <input
                  id="coverImage"
                  type="file"
                  className="hidden"
                  accept=".jpeg,.png,.jpg"
                  onChange={(event) => handleFileChange(event, 'image')}
                />
              </label>
            )}

            {audioFile || audioUrl ? (
              <div className="mx-auto mb-10 flex w-full max-w-[500px] flex-col items-end gap-2">
                <audio controls className="w-full">
                  <source
                    src={
                      audioUrl ||
                      (audioFile ? URL.createObjectURL(audioFile) : '')
                    }
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
                <button
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRemoveFile('audio')}
                >
                  <Icon
                    className="text-xl text-red-500"
                    icon="material-symbols:close"
                  />

                  <Text variant="caption" className="text-red-500">
                    Delete
                  </Text>
                </button>
              </div>
            ) : (
              <label
                htmlFor="audio"
                className="mb-10 flex w-full cursor-pointer items-center gap-1 self-start"
              >
                <Icon
                  icon="material-symbols:add"
                  className="text-2xl text-aima-black/30"
                />
                <Text className="text-aima-black/30">Add post audio</Text>

                <input
                  id="audio"
                  type="file"
                  className="hidden"
                  accept=".mp3,.aif,.wav,.ogg"
                  onChange={(event) => handleFileChange(event, 'audio')}
                />
              </label>
            )}

            <span
              id="post-title"
              className="post-title -ml-2"
              role="textbox"
              contentEditable
              dangerouslySetInnerHTML={{ __html: postTitle }}
            />

            {defaultValue && (
              <CustomEditor
                editorJS={editor}
                defaultValue={defaultValue}
                placeholder="Begin writing your post..."
              />
            )}
          </Suspense>
        </div>

        <EditPostSettings
          onSave={handleSave}
          postId={router?.query?.id as string}
          isPublished={isPublished}
          category={category}
          setCategory={setCategory}
          open={sideNavIsOpen}
          onClose={toggleSideNavIsOpen}
        />
      </main>

      {(loading || isUploading || postLoading || publishOrUnpublishLoading) && (
        <FullPageLoader />
      )}
    </AutchCheck>
  );
};

export default EditPost;
