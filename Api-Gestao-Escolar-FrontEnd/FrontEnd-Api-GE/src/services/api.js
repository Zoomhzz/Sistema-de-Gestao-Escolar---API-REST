import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sistema-de-gestao-escolar-api-rest.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});