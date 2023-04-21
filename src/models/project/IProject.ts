export interface IProject {
  id: number | null;
  title: string;
  color: string;
  tasks: IProjectTask[];
  userIds: number[];
}

export interface IProjectTask {
  id: number | null;
  title: string;
  subtitle: string;
  type: string;
  priority: string;
  description: string;
  comments: IProjectTaskComment[];
}

export interface IProjectTaskComment {
  id: number | null;
  author: string;
  body: string;
}

export interface IProjectSelect {
  id: number;
  title: string;
}
