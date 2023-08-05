import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { IProjectTaskComment } from "../../../models";
import { ROUTES } from "../../../Router/routes";

interface ThunkState {
  sorting?: "ASC" | "DESC";
  projectId: number | string;
  taskId: number | string;
}

export const getComments = createAsyncThunk<IProjectTaskComment[], ThunkState>(
  "comments/getComments",
  async ({ sorting = "ASC", projectId, taskId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `projects/${projectId}/tasks/${taskId}/comments?ordering=${sorting}`
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createComment = createAsyncThunk<
  IProjectTaskComment,
  { projectId: string | number; taskId: string | number; commentText: string }
>(
  "comments/createComment",
  async ({ taskId, projectId, commentText }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        ROUTES.PROJECT_TASK_COMMENT_CREATE.replace(
          ":projectId",
          String(projectId)
        ).replace(":taskId", String(taskId)),
        commentText
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateComment = createAsyncThunk<
  IProjectTaskComment,
  {
    projectId: string | number;
    taskId: string | number;
    comment: IProjectTaskComment;
  }
>(
  "comments/updateComment",
  async ({ taskId, projectId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        ROUTES.PROJECT_TASK_COMMENT_EDIT.replace(
          ":projectId",
          String(projectId)
        )
          .replace(":taskId", String(taskId))
          .replace(":commentId", String(comment.id)),
        comment
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteComment = createAsyncThunk<
  IProjectTaskComment,
  { projectId: string | number; taskId: string | number; commentId: number }
>(
  "comments/deleteComment",
  async ({ taskId, projectId, commentId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        ROUTES.PROJECT_TASK_COMMENT_EDIT.replace(
          ":projectId",
          String(projectId)
        )
          .replace(":taskId", String(taskId))
          .replace(":commentId", String(commentId))
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
