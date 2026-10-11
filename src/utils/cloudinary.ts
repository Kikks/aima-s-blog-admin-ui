import type { ImageLoader } from 'next/image';

const CLOUDINARY_UPLOAD_SEGMENT = '/image/upload/';

export const isCloudinaryImage = (src?: string | null) =>
  !!src &&
  src.includes('res.cloudinary.com') &&
  src.includes(CLOUDINARY_UPLOAD_SEGMENT);

/**
 * Adds delivery transformations to a Cloudinary image URL so the CDN serves a
 * resized, compressed image in a modern format instead of the original upload.
 * Non-Cloudinary URLs are returned unchanged.
 */
export const optimiseCloudinaryImage = (
  src: string,
  width: number,
  quality?: number
) => {
  if (!isCloudinaryImage(src)) return src;

  const transformations = [
    'f_auto',
    quality ? `q_${quality}` : 'q_auto',
    'c_limit',
    `w_${width}`,
  ].join(',');

  return src.replace(
    CLOUDINARY_UPLOAD_SEGMENT,
    `${CLOUDINARY_UPLOAD_SEGMENT}${transformations}/`
  );
};

export const cloudinaryLoader: ImageLoader = ({ src, width, quality }) =>
  optimiseCloudinaryImage(src, width, quality);
