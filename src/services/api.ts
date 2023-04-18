import axios from 'axios';
import { ApiResources } from './Resources';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: ApiResources.apiUrl,
  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
});

api.interceptors.request.use(config => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default api;
