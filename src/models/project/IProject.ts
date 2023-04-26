export interface IProject {
  id: number | null;
  title: string;
  color: string;
  tasks: IProjectTask[];
  userIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface IProjectCreate extends Omit<IProject, 'createdAt' | 'updatedAt'> {}

export interface IProjectTask {
  id: number | null;
  title: string;
  subtitle: string;
  type: string;
  status: 1 | 2 | 3;
  time: {
    estimated: number;
    remaining: number;
    logged: number;
  };
  priority: string;
  description: string;
  comments: IProjectTaskComment[];
  createdAt: string;
  updatedAt: string;
}

export interface IProjectTaskCreate extends Omit<IProjectTask, 'status' | 'createdAt' | 'updatedAt' | 'time'> {
  estimate: string;
}

export interface IProjectTaskEdit extends Omit<IProjectTask, 'time'> {
  time: {
    estimated: string | number;
    logged: string | number;
    remaining: number | string;
  };
}

export interface IProjectTaskComment {
  id: number | null;
  author: ICommentAuthor;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface ICommentAuthor {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IProjectSelect {
  id: number;
  title: string;
}
