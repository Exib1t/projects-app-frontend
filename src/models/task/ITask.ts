import { IComment } from "../comment/IComment";

export interface ITask {
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
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCreate
  extends Omit<ITask, "status" | "createdAt" | "updatedAt" | "time"> {
  estimate: string;
}

export interface ITaskEdit extends Omit<ITask, "time"> {
  time: {
    estimated: string | number;
    logged: string | number;
    remaining: number | string;
  };
}
