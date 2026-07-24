import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sistema-de-gestao-escolar-api-rest.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;