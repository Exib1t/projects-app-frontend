import api from './api';
import { ROUTES } from '../Router/routes';
import { IProjectTaskComment } from '../models';

class CommentProvider {
  createOne = async (projectId: string | number, taskId: string | number, newComment: string) => {
    return api.post(`${ROUTES.PROJECT_TASK_COMMENT_CREATE.replace(':projectId', String(projectId)).replace(':taskId', String(taskId))}`, {
      body: newComment,
    });
  };

  updateOne = async (projectId: string | number, taskId: string | number, data: IProjectTaskComment) => {
    return api.put(
      ROUTES.PROJECT_TASK_COMMENT_EDIT.replace(':projectId', String(projectId)).replace(':taskId', String(taskId)).replace(':commentId', String(data.id)),
      data
    );
  };

  deleteOne = async (projectId: string | number, taskId: string | number, commentId: string | number) => {
    return api.delete(
      ROUTES.PROJECT_TASK_COMMENT_EDIT.replace(':projectId', String(projectId)).replace(':taskId', String(taskId)).replace(':commentId', String(commentId))
    );
  };
}

export default new CommentProvider();
