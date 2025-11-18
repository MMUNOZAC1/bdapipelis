import { axiosInstance } from '../helper/axios-config';

const getMedias = () => {
  return axiosInstance.get('media');
};

const createMedia = (data) => {
  return axiosInstance.post('media', data);
};

const updateMedia = (serial, data) => {
  return axiosInstance.put(`media/${serial}`, data);
};

const deleteMedia = (serial) => {
  return axiosInstance.delete(`media/${serial}`);
};

export {
  getMedias,
  createMedia,
  updateMedia,
  deleteMedia
};