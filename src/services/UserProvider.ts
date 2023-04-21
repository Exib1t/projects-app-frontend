import api from './api';
import { IUser } from '../models';

class UserProvider {
  fetchUsers = async () => {
    return api.get('users');
  };

  fetchUserProjects = async () => {
    return api.get('users/get_projects');
  };

  fetchUser = async (id: number | string) => {
    return api.get(`users/${id}`);
  };

  updateUser = async (updatedData: IUser) => {
    return api.put(`users/${updatedData.id}`, updatedData);
  };
}

export default new UserProvider();
