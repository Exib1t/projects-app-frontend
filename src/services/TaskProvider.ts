import api from './api';
import { IProjectTask, IProjectTaskCreate } from '../models';

class TaskProvider {
  deleteOne = async (projectId: string | number, taskId: string | number) => {
    return api.delete(`projects/${projectId}/tasks/${taskId}`);
  };

  createOne = async (projectId: string | number, task: IProjectTaskCreate) => {
    return api.post(`projects/${projectId}/tasks`, task);
  };

  updateOne = async (projectId: string | number, updatedTask: IProjectTask) => {
    return api.put(`projects/${projectId}/tasks/${updatedTask.id}`, updatedTask);
  };

  updateStatus = async (projectId: string | number, taskId: string | number, status: 1 | 2 | 3) => {
    return api.post(`projects/${projectId}/tasks/${taskId}/set_status`, {
      status,
    });
  };

  logTime = async (projectId: string | number, taskId: string | number, timeLogged: string) => {
    return api.post(`projects/${projectId}/tasks/${taskId}/log_time`, {
      logged: timeLogged,
    });
  };
}

export default new TaskProvider();
