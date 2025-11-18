import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // sin 'api/' porque tus rutas no tienen ese prefijo
  headers: {
    'Content-Type': 'application/json'
  }
});

export { axiosInstance };
