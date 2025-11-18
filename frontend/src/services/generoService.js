import { axiosInstance } from '../helper/axios-config';

const getGeneros = () => {
  return axiosInstance.get('genero');
};

const getGenerosActivos = () => {
  return axiosInstance.get('genero/activos');
};

const createGenero = (data) => {
  return axiosInstance.post('genero', data);
};

const updateGenero = (nombre, data) => {
  return axiosInstance.put(`genero/${nombre}`, data);
};

const deleteGenero = (nombre) => {
  return axiosInstance.delete(`genero/${nombre}`);
};

export {
  getGeneros,
  getGenerosActivos, // 👈 Esta es la nueva función
  createGenero,
  updateGenero,
  deleteGenero,
};