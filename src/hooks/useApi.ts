import axios from 'axios';
import { useAppSelector } from '../hooks/global';
import { ApiResources } from '../services/Resources';

// const token = localStorage.getItem('token');
//
// export const api = axios.create({
//   baseURL: ApiResources.apiUrl,
//   headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
// });

export function useApi() {
  const { token } = useAppSelector(state => state.user);

  const api = axios.create({
    baseURL: ApiResources.apiUrl,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
  });

  return api;
}
