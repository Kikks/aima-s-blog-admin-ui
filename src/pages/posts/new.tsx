import { useMutation } from '@apollo/client';
import type EditorJS from '@editorjs/editorjs';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { Suspense, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import FullPageLoader from '@/components/lib/FullPageLoader';
import Loader from '@/components/lib/Loader';
import Text from '@/components/lib/Text';
import NewPostSettings from '@/components/pages/posts/NewPostSettings';
import { CREATE_POST } from '@/graphql/mutations/post.mutations';
import { GET_CATEGORIES_STATS } from '@/graphql/queries/category.queries';
import { COUNT_POSTS, GET_POSTS } from '@/graphql/queries/post.queries';
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

const NewPost = () => {
  const router = useRouter();
  const editor = useRef<EditorJS | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [sideNavIsOpen, toggleSideNavIsOpen] = useToggle(false);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState('');

  const [mutate, { loading }] = useMutation(CREATE_POST, {
    onCompleted() {
      toggleSideNavIsOpen();
      toast.success('Post created successfully.');
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
        query: COUNT_POSTS,
      },
      {
        query: GET_CATEGORIES_STATS,
      },
      'getCategoryStats',
      'countPosts',
      'getAllPosts',
    ],
  });

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
    } else {
      setAudioFile(null);
    }
  };

  const handleSave = async () => {
    try {
      const title = document.querySelector('#post-title')?.textContent;
      if (isEmpty(title || '')) {
        throw new Error('Post title cannot be empty.');
      }

      if (isEmpty(category)) {
        throw new Error('Please select a category in post settings.');
      }

      if (!imageFile) {
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
      const coverImage = await uploadFile(imageFile, postsUploadPreset);
      let audio: string | null = null;
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
          input: {
            body: JSON.stringify(editorSavedata),
            category,
            coverImage,
            title: title as string,
            ...(audio ? { audio } : {}),
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
        title="New Post | Aima's Corner Admin Panel"
        description="Create a new post"
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

          <Text className="mr-auto text-aima-black/30">New</Text>

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
            {imageFile ? (
              <div className="mb-10 flex w-full flex-col items-end gap-2">
                <figure className="relative aspect-video w-full">
                  <Image
                    src={URL.createObjectURL(imageFile)}
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

            {audioFile ? (
              <div className="mx-auto mb-10 flex w-full max-w-[500px] flex-col items-end gap-2">
                <audio controls className="w-full">
                  <source
                    src={URL.createObjectURL(audioFile)}
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
            />

            <CustomEditor
              editorJS={editor}
              defaultValue={{
                time: 1635603431943,
                blocks: [],
              }}
              placeholder="Begin writing your post..."
            />
          </Suspense>
        </div>

        <NewPostSettings
          onSave={handleSave}
          category={category}
          setCategory={setCategory}
          open={sideNavIsOpen}
          onClose={toggleSideNavIsOpen}
        />
      </main>

      {(loading || isUploading) && <FullPageLoader />}
    </AutchCheck>
  );
};

export default NewPost;
