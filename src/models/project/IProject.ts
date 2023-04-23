export interface IProject {
  id: number | null;
  title: string;
  color: string;
  tasks: IProjectTask[];
  userIds: number[];
  dateCreated: string;
  dateUpdated: string;
}

export interface IProjectTask {
  id: number | null;
  title: string;
  subtitle: string;
  type: string;
  status: 1 | 2 | 3;
  priority: string;
  description: string;
  comments: IProjectTaskComment[];
  dateCreated: string;
  dateUpdated: string;
}

export interface IProjectTaskComment {
  id: number | null;
  author: ICommentAuthor;
  body: string;
  dateCreated: string;
  dateUpdated: string;
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
