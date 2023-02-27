import axios from 'axios';

import { cloudinaryImageURL } from './constants';

const uploadFile = async (
  file: File,
  uploadPreset: string,
  uploadURL?: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await axios.post(uploadURL || cloudinaryImageURL, formData);

  return response?.data?.secure_url || '';
};

export default uploadFile;
