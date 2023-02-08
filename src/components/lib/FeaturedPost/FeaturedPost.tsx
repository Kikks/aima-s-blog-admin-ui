import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import match from '@/utils/match';
import trimString from '@/utils/trimString';

import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import styles from './FeaturedPost.module.scss';
import type FeaturedPostProps from './FeaturedPost.props';

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childrenVariants = {
  initial: { translateX: 100, opacity: 0 },
  animate: { translateX: 0, opacity: 1, transition: { duration: 1 } },
};

const FeaturedPost: FC<FeaturedPostProps> = ({
  post,
  theme,
  variant = 'short',
}) => {
  const variantBase = match(variant, {
    short: styles.base,
    long: `${styles.base} ${styles.base__long}`,
    default: styles.base || '',
  });

  const postTheme = match(theme?.name || '', {
    cool__love: styles['theme__cool-love'],
    passion: styles.theme__passion,
    default: styles['theme__cool-love'] || '',
  });

  return (
    <div className={`${variantBase}  ${postTheme} group overflow-hidden`}>
      <motion.div
        className="col-span-1 grid justify-start justify-items-start gap-2"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={childrenVariants}>
          <Heading className="font-ephesis capitalize" variant="h3">
            {post?.category?.name}
          </Heading>
        </motion.div>

        <motion.div variants={childrenVariants}>
          <Heading className="leading-tight">{post?.title}</Heading>
        </motion.div>

        <motion.div variants={childrenVariants}>
          <Text>
            {trimString(post?.preview || '', variant === 'long' ? 200 : 100)}
          </Text>
        </motion.div>

        <motion.div variants={childrenVariants}>
          <Link href={`/posts/${post?.id}`} passHref>
            <a>
              <Button variant="outline" className="mt-5">
                Edit Post
              </Button>
            </a>
          </Link>
        </motion.div>
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
        className="duration-110 relative z-10  
        after:absolute after:top-0 after:left-0 after:-z-10 after:h-full after:w-full after:border-[6px] after:border-white after:bg-gray-300 after:duration-500 group-hover:after:rotate-[5deg]
        "
      >
        <div className="relative h-full w-full overflow-hidden border-[6px] border-white">
          <Image
            src={post?.coverImage || '/assets/images/logo.png'}
            alt={post?.title || ''}
            layout="fill"
            className="h-full w-full object-cover duration-500 group-hover:scale-110"
            quality={100}
          />
        </div>
      </motion.figure>
    </div>
  );
};

export default FeaturedPost;
