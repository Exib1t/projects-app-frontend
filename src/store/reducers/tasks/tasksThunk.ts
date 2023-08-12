import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ITask, ITaskCreate, ITaskEdit } from "../../../models/task/ITask";
import { getComments } from "../comments/commentsThunk";
import { getProjects } from "../projects/projectsThunk";
import { ISorting } from "../../../models/global";

interface ThunkState {
  sorting?: ISorting;
  projectId: number | string;
}

export const getTasks = createAsyncThunk<ITask[], ThunkState>(
  "tasks/getTasks",
  async ({ sorting = "ASC", projectId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `projects/${projectId}/tasks?ordering=${sorting}`
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createTask = createAsyncThunk<
  ITask,
  { task: ITaskCreate; projectId: number | string }
>(
  "tasks/createTask",
  async ({ task, projectId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.post(`projects/${projectId}/tasks`, task);
      // @ts-ignore
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        // @ts-ignore
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
          // @ts-ignore
          sorting: getState().comments.sorting,
          taskId: data.id,
          projectId: projectId,
        })
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateTask = createAsyncThunk<
  ITask,
  { task: ITaskEdit; projectId: number | string }
>(
  "tasks/updateTask",
  async ({ task, projectId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.put(
        `projects/${projectId}/tasks/${task.id}`,
        task
      );
      // @ts-ignore
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        // @ts-ignore
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
          // @ts-ignore
          sorting: getState().comments.sorting,
          taskId: data.id,
          projectId: projectId,
        })
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteTask = createAsyncThunk<
  { msg: string },
  { taskId: number | string; projectId: number | string }
>(
  "tasks/deleteTask",
  async ({ taskId, projectId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.delete(
        `projects/${projectId}/tasks/${taskId}`
      );
      // @ts-ignore
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        // @ts-ignore
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
          // @ts-ignore
          sorting: getState().comments.sorting,
          taskId: taskId,
          projectId: projectId,
        })
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateTaskStatus = createAsyncThunk<
  1 | 2 | 3,
  { taskId: number | string; projectId: number | string; status: 1 | 2 | 3 }
>(
  "tasks/updateTaskStatus",
  async (
    { taskId, projectId, status },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { data } = await api.post(
        `projects/${projectId}/tasks/${taskId}/set_status`,
        { status }
      );
      // @ts-ignore
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        // @ts-ignore
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
          // @ts-ignore
          sorting: getState().comments.sorting,
          taskId: taskId,
          projectId: projectId,
        })
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateTaskLogTime = createAsyncThunk<
  number,
  {
    taskId: number | string;
    projectId: number | string;
    timeLogged: string;
    remaining: number;
  }
>(
  "tasks/updateTaskLogTime",
  async (
    { taskId, projectId, timeLogged, remaining },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { data } = await api.post(
        `projects/${projectId}/tasks/${taskId}/log_time`,
        {
          logged: timeLogged,
          remaining: remaining,
        }
      );
      // @ts-ignore
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        // @ts-ignore
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
          // @ts-ignore
          sorting: getState().comments.sorting,
          taskId: taskId,
          projectId: projectId,
        })
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
