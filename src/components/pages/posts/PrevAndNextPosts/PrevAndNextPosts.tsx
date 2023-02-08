import { useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import Text from '@/components/lib/Text';
import type { PreviousAndNextPosts } from '@/graphql/__generated__/graphql';
import { GET_PREVIOUS_AND_NEXT_POST } from '@/graphql/queries/post.queries';
import { isEmpty } from '@/utils/validators/helpers';

import type PrevAndNextProps from './PrevAndNextPosts.props';

const PrevAndNextPosts: FC<PrevAndNextProps> = ({ postId }) => {
  const [prevAndNext, setPrevAndNext] = useState<PreviousAndNextPosts | null>(
    null
  );

  const [getPreviousAndNextPosts, { loading }] = useLazyQuery(
    GET_PREVIOUS_AND_NEXT_POST,
    {
      variables: {
        postId: postId || '',
      },
      onCompleted(response) {
        // @ts-ignore
        setPrevAndNext(response?.getPreviousAndNextPosts || null);
      },
    }
  );

  useEffect(() => {
    if (!isEmpty(postId || '')) {
      getPreviousAndNextPosts();
    }
  }, [postId]);

  return postId ? (
    <section className="mx-auto flex w-full max-w-[900px] flex-col items-start justify-between gap-5 px-5 md:flex-row md:items-center">
      {loading ? (
        <>
          <div className="min-h-[40]">
            <Skeleton className="h-3 w-12 lg:w-24" />
            <Skeleton className="h-6 w-32 lg:w-64" />
          </div>

          <div className="flex min-h-[40] flex-col items-end self-end md:self-center">
            <Skeleton className="h-3 w-12 lg:w-24" />
            <Skeleton className="h-6 w-32 lg:w-64" />
          </div>
        </>
      ) : (
        <>
          <div className="grid min-h-[40] items-center">
            {prevAndNext?.prev && (
              <Link href={`/posts/preview/${prevAndNext.prev.id}`}>
                <a className="flex  flex-col items-start gap-1">
                  <Text variant="caption" className="text-primary-main">
                    Previous Article
                  </Text>

                  <Text variant="subheading" className="font-semibold">
                    {prevAndNext?.prev?.title}
                  </Text>
                </a>
              </Link>
            )}
          </div>

          <div className="grid min-h-[40] items-center self-end md:self-center">
            {prevAndNext?.next && (
              <Link href={`/posts/preview/${prevAndNext.next.id}`}>
                <a className="flex  flex-col items-end gap-1">
                  <Text variant="caption" className="text-primary-main">
                    Next Article
                  </Text>

                  <Text variant="subheading" className="font-semibold">
                    {prevAndNext?.next?.title}
                  </Text>
                </a>
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  ) : (
    <></>
  );
};

export default PrevAndNextPosts;
