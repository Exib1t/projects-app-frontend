import api from './api';
import { ROUTES } from '../Router/routes';

class CommentProvider {
  createOne = async (projectId: string | number, taskId: string | number, newComment: string) => {
    return api.post(`${ROUTES.PROJECT_TASK.replace(':projectId', String(projectId)).replace(':taskId', String(taskId))}/comments`, {
      body: newComment,
    });
  };

  deleteOne = async (projectId: string | number, taskId: string | number, commentId: string | number) => {
    return api.delete(`${ROUTES.PROJECT_TASK.replace(':projectId', String(projectId)).replace(':taskId', String(taskId))}/comments/${commentId}`);
  };
}

export default new CommentProvider();
