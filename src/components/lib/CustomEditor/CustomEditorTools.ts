// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Table from '@editorjs/table';
import { toast } from 'react-hot-toast';

import { acceptableImageOrigins, backendUrl } from '@/utils/constants';
import uploadFile from '@/utils/uploadFile';

const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  header: Header,
  quote: Quote,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: `${backendUrl}/url-metadata`,
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file?: File | null) {
          try {
            if (!file) {
              throw new Error('No File was selected.');
            }

            const imageUrl = await uploadFile(
              file,
              process.env.NEXT_PUBLIC_POSTS_UPLOAD_PRESET as string
            );

            return {
              success: 1,
              file: {
                url: imageUrl,
              },
            };
          } catch (error: any) {
            toast.error(
              error?.message ||
                'An error occured while trying to upload your image'
            );
            toast.error('');
            throw new Error(error);
          }
        },
        async uploadByUrl(url?: string | null) {
          try {
            if (!url) {
              throw new Error('No URL was passed.');
            }

            let fileOrigin: string | undefined;

            for (let i = 0; i < acceptableImageOrigins.length; i += 1) {
              if (url?.includes(acceptableImageOrigins?.[i] || '')) {
                fileOrigin = acceptableImageOrigins[i];
                break;
              }
            }

            if (!fileOrigin) {
              throw new Error(
                'The origin of the image selected is not supported.'
              );
            }

            return {
              success: 1,
              file: {
                url,
              },
            };
          } catch (error: any) {
            toast.error(
              error?.message ||
                'An error occured while trying to upload your image'
            );
            throw new Error(error);
          }
        },
      },
    },
  },
};

export default EDITOR_JS_TOOLS;
