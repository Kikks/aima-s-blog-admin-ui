import { Icon } from '@iconify/react';
import type { FC } from 'react';

import FeaturedPost from '@/components/lib/FeaturedPost';

import EmptyItem from './EmptyItem';
import type SelectFeaturedPostProps from './SelectFeaturedPost.props';

const SelectFeaturedPost: FC<SelectFeaturedPostProps> = ({
  onDeleteClicked,
  onAddFeaturedPost,
  featuredPost,
  index,
}) => {
  return featuredPost ? (
    <div
      className={`relative h-full w-full grid-cols-1 gap-5 ${
        featuredPost?.index === 0
          ? 'col-span-1 lg:col-span-2 lg:grid-cols-2'
          : 'col-span-1'
      }`}
    >
      <FeaturedPost
        {...featuredPost}
        showEditButton={false}
        variant={featuredPost?.index === 0 ? 'long' : 'short'}
      />

      <button
        onClick={() => onDeleteClicked(index)}
        className="absolute top-1 right-1 z-[50] grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg"
      >
        <Icon
          className="text-2xl text-primary-main"
          icon="material-symbols:delete-outline-rounded"
        />
      </button>
    </div>
  ) : (
    <EmptyItem
      variant={index === 0 ? 'long' : 'short'}
      onClick={() => onAddFeaturedPost(index)}
    />
  );
};

export default SelectFeaturedPost;
