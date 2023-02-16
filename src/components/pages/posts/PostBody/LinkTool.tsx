import type { RenderFn } from 'editorjs-blocks-react-renderer';

import Text from '@/components/lib/Text';

import type { LinkToolProps } from './PostBody.props';

const LinkTool: RenderFn<LinkToolProps> = ({ data }) => {
  return (
    <div className="flex flex-col content-start items-start gap-5 rounded-md border border-gray-500/20 bg-white p-5 md:flex-row">
      <a
        target="_blank"
        href={data?.link}
        rel="noreferrer"
        className="order-2 grid flex-1 gap-3 !text-aima-black no-underline md:order-1"
      >
        <Text className="font-bold italic">{data?.meta?.title}</Text>
        <Text className="not-italic">{data?.meta?.description}</Text>
        <Text className="font-bold italic text-gray-500">{data?.link}</Text>
      </a>

      {data?.meta?.image && (
        <figure className="order-1 mx-0 h-20 w-20 overflow-hidden rounded-md md:order-2">
          <img
            className="h-full w-full object-cover"
            src={data.meta.image?.url}
            alt={data?.meta?.title}
          />
        </figure>
      )}
    </div>
  );
};

export default LinkTool;
