import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

import { cloudinaryLoader, isCloudinaryImage } from '@/utils/cloudinary';

/**
 * Drop-in replacement for `next/image` that lets Cloudinary resize and
 * compress images it hosts. Every other source uses the default loader.
 */
const CloudImage: FC<ImageProps> = ({ src, alt, ...rest }) => {
  const useCloudinary = typeof src === 'string' && isCloudinaryImage(src);

  return (
    <Image
      src={src}
      alt={alt}
      {...(useCloudinary ? { loader: cloudinaryLoader } : {})}
      {...rest}
    />
  );
};

export default CloudImage;
