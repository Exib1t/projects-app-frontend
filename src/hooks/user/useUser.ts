import { useEffect, useState } from 'react';
import { IUser } from '../../models';
import UserProvider from '../../services/UserProvider';

export function useUser(id: number | string | null) {
  const [data, setData] = useState<IUser | null>(null);

  const fetchUser = async () => {
    if (id) {
      const { data } = await UserProvider.fetchUser(id);
      setData(data);
      return data;
    } else {
      return { msg: 'Id is missing' };
    }
  };

  const saveUser = async (updatedData: IUser) => {
    if (updatedData.id) {
      const { data } = await UserProvider.updateUser(updatedData);
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
