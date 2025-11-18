import { axiosInstance as axios } from '../helper/axios-config';

// Obtener todos los tipos
export const getTipos = async () => {
  return await axios.get('/tipo');
};

// Crear un nuevo tipo
export const createTipo = async (data) => {
  return await axios.post('/tipo', data);
};

// Actualizar tipo por nombre (no ID)
export const updateTipo = async (nombre, data) => {
  return await axios.put(`/tipo/${nombre}`, data);
};

// Eliminar tipo por nombre (no ID)
export const deleteTipo = async (nombre) => {
  return await axios.delete(`/tipo/${nombre}`);
};