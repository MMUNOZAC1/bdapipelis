import { axiosInstance } from '../helper/axios-config';

// Obtener todas las productoras
const getProductoras = () => {
  return axiosInstance.get('/productora');
};

// Crear una nueva productora
const createProductora = (data) => {
  return axiosInstance.post('/productora', data);
};

// Actualizar una productora por nombre
const updateProductora = (nombre, data) => {
  return axiosInstance.put(`/productora/${nombre}`, data);
};

// Eliminar una productora por nombre
const deleteProductora = (nombre) => {
  return axiosInstance.delete(`/productora/${nombre}`);
};

export {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora
};