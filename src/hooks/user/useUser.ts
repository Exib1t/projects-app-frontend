import { useEffect, useState } from 'react';
import { IUser } from '../../models';
import api from '../../services/api';

export function useUser(id: number | string | null) {
  const [data, setData] = useState<IUser | null>(null);

  const fetchUser = async () => {
    if (id) {
      const { data } = await api.get(`users/${id}`);
      setData(data);
      return data;
    } else {
      return { msg: 'Id is missing' };
    }
  };

  const saveUser = async (updatedData: IUser) => {
    if (updatedData.id) {
      const { data } = await api.put(`users/${updatedData.id}`, updatedData);
      setData(data);
      return data;
    } else {
      return { msg: 'Updated data is missing' };
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { data, refresh: fetchUser, saveUser };
}
