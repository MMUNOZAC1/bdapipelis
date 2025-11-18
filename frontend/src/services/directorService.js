import { axiosInstance } from '../helper/axios-config';

const getDirectors = () => {
  return axiosInstance.get('director');
};

const getDirectorsActivos = () => {
  return axiosInstance.get('director/activos');
};

const createDirector = (data) => {
  return axiosInstance.post('director', data);
};

const updateDirector = (id, data) => {
  return axiosInstance.put(`director/${id}`, data);
};

export {
  getDirectors,
  getDirectorsActivos,
  createDirector,
  updateDirector
};