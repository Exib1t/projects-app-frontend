import { IUserLogin, IUserRegister } from '../models';
import api from './api';
import { useAppDispatch } from '../hooks/global';
import { setAuthorized, setToken, setUserId } from '../store/reducers/user/userSlicer';
import { setError } from '../store/reducers/globalSlicer';
import { useState } from 'react';

export const useAuth = () => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useAppDispatch();
  const createUser = async (user: IUserRegister) => {
    try {
      setIsFetching(true);
      const { data } = await api.post('register', user);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      console.log(data);
      dispatch(setError(null));
      refresh();
      setIsFetching(false);
      return data;
    } catch (e: any) {
      setIsFetching(false);
      dispatch(setError(e?.response?.data?.message));
    }
  };
  const login = async (user: IUserLogin) => {
    try {
      setIsFetching(true);
      const { data } = await api.post('login', user);
      if (data.token) {
        localStorage.setItem('token', data.token);
        dispatch(setToken(data.token));
      }
      console.log(data);
      refresh();
      setIsFetching(false);
    } catch (e: any) {
      dispatch(setError(e?.response?.data?.message));
      setIsFetching(false);
    }
  };
  const refresh = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setIsFetching(true);
        const { data } = await api.post('refresh', { accessToken: token });
        console.log(data);
        if (data.userId) {
          dispatch(setUserId(data.userId));
          dispatch(setAuthorized(true));
        }
        setIsFetching(false);
      }
    } catch (e: any) {
      dispatch(setError(e?.response?.data?.message));
      setIsFetching(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    dispatch(setUserId(null));
    dispatch(setAuthorized(false));
    dispatch(setToken(null));
  };

  return { createUser, refresh, login, logout, isFetching };
};
