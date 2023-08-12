import { useEffect, useState } from "react";
import { IUser } from "../models";
import { useAppDispatch } from "./global";
import { getUser, updateUser } from "../store/reducers/user/userThunk";

export function useUser(id: number | string | null) {
  const [data, setData] = useState<IUser | null>(null);
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    if (id) {
      dispatch(getUser(id))
        .unwrap()
        .then((user) => {
          setData(user);
          return data;
        });
    } else {
      return { msg: "Id is missing" };
    }
  };

  const saveUser = async (updatedData: IUser) => {
    if (updatedData.id) {
      dispatch(updateUser(updatedData))
        .unwrap()
        .then((user) => {
          setData(user);
          return data;
        });
    } else {
      return { msg: "Updated data is missing" };
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { data, refresh: fetchUser, saveUser };
}
