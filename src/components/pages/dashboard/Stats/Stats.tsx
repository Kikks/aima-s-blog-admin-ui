import type { FC } from 'react';
import React from 'react';

import Card from '@/components/lib/Card';
import Heading from '@/components/lib/Heading';
import Loader from '@/components/lib/Loader';

import type StatsProps from './Stats.props';

const Stats: FC<StatsProps> = ({ loading, title, value }) => {
  return (
    <Card title={title} className="min-h-[150px]">
      {loading ? (
        <Loader color="#003049" />
      ) : (
        <Heading variant="h1" className="text-primary-main">
          {value}
        </Heading>
      )}
    </Card>
  );
};

export default Stats;
