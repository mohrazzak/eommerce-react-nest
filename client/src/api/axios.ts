import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true,
});

export default api;
