export const navLinks = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Categories',
    url: '/categories',
  },
];

export const clientUrl = process.env.NEXT_PUBLIC_CLIENT_APP as string;

export const cloudinaryImageURL = process.env
  .NEXT_PUBLIC_CLOUDINARY_URL as string;
export const cloudinaryAudioURL = process.env
  .NEXT_PUBLIC_CLOUDINARY_AUDIO_URL as string;
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
export const postsUploadPreset = process.env
  .NEXT_PUBLIC_POSTS_UPLOAD_PRESET as string;
export const audiosUploadPreset = process.env
  .NEXT_PUBLIC_AUDIOS_UPLOAD_PRESET as string;
export const categoriesUploadPreset = process.env
  .NEXT_PUBLIC_CATEGORIES_UPLOAD_PRESET as string;

export const grahpQLApiUri = `${backendUrl}/api`;

export const defaultMeta = { currentPage: 1, pages: 1, total: 1 };

export const MAX_LENGTH_OF_COMMENT_CHARACTERS = 200;

export const postsSortByOptions = [
  {
    label: 'Date created',
    value: 'createdAt',
  },
  {
    label: 'Title',
    value: 'title',
  },
];

export const orderOptions = [
  {
    label: 'Ascending',
    value: 'asc',
  },
  {
    label: 'Descending',
    value: 'desc',
  },
];

export const acceptableImageOrigins = ['res.cloudinary.com'];
