import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import {
  IProjectTask,
  IProjectTaskCreate,
  IProjectTaskEdit,
} from "../../../models";

interface ThunkState {
  sorting?: "ASC" | "DESC";
  projectId: number | string;
}

export const getTasks = createAsyncThunk<IProjectTask[], ThunkState>(
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
  IProjectTask,
  { task: IProjectTaskCreate; projectId: number | string }
>("tasks/createTask", async ({ task, projectId }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`projects/${projectId}/tasks`, task);
    return data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const updateTask = createAsyncThunk<
  IProjectTask,
  { task: IProjectTaskEdit; projectId: number | string }
>("tasks/updateTask", async ({ task, projectId }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(
      `projects/${projectId}/tasks/${task.id}`,
      task
    );
    return data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const deleteTask = createAsyncThunk<
  { msg: string },
  { taskId: number | string; projectId: number | string }
>("tasks/deleteTask", async ({ taskId, projectId }, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`projects/${projectId}/tasks/${taskId}`);
    return data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const updateTaskStatus = createAsyncThunk<
  1 | 2 | 3,
  { taskId: number | string; projectId: number | string; status: 1 | 2 | 3 }
>(
  "tasks/updateTaskStatus",
  async ({ taskId, projectId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `projects/${projectId}/tasks/${taskId}/set_status`,
        { status }
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
  async ({ taskId, projectId, timeLogged, remaining }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `projects/${projectId}/tasks/${taskId}/log_time`,
        {
          logged: timeLogged,
          remaining: remaining,
        }
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
