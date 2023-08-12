import { ITask } from "../task/ITask";

export interface IProject {
  id: number | null;
  title: string;
  color: string;
  tasks: ITask[];
  userIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface IProjectCreate
  extends Omit<IProject, "createdAt" | "updatedAt"> {}

export interface IProjectSelect {
  id: number;
  title: string;
}
