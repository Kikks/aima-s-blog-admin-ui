import type { FC } from 'react';
import React from 'react';

import Card from '@/components/lib/Card';
import Heading from '@/components/lib/Heading';
import Loader from '@/components/lib/Loader';
import Text from '@/components/lib/Text';

import type PostsStatsProps from './PostsStats.props';

const PostsStats: FC<PostsStatsProps> = ({
  total,
  published,
  drafts,
  loading,
}) => {
  return (
    <Card title="Total Posts" className="min-h-[150px]">
      {loading ? (
        <div className="grid h-full w-full place-items-start">
          <Loader color="#003049" />
        </div>
      ) : (
        <div className="flex w-full items-center gap-5">
          <Heading variant="h1" className="text-primary-main">
            {total}
          </Heading>

          <div className="flex flex-col">
            <Text className="font-semibold" variant="caption">
              Drafts -{' '}
              <span className="font-cormorant text-2xl font-bold text-primary-main">
                {drafts}
              </span>
            </Text>

            <Text className="font-semibold" variant="caption">
              Published -{' '}
              <span className="font-cormorant text-2xl font-bold text-primary-main">
                {published}
              </span>
            </Text>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostsStats;
