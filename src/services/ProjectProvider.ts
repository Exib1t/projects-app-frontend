import api from './api';
import { IProject } from '../models';

class ProjectProvider {
  fetchProject = async (projectId: number | string) => {
    return api.get(`projects/${projectId}`);
  };

  fetchAvailableUsers = async () => {
    return api.get('projects/get_users');
  };

  updateProject = async (project: IProject) => {
    return api.put(`projects/${project.id}`, project);
  };

  createProject = async (project: IProject) => {
    return api.post(`projects`, project);
  };

  deleteProject = async (projectId: number | string) => {
    return api.delete(`projects/${projectId}`);
  };
}

export default new ProjectProvider();
