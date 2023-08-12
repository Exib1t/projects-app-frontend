import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ROUTES } from "../../../Router/routes";
import { IComment } from "../../../models/comment/IComment";
import { getProjects } from "../projects/projectsThunk";
import { getTasks } from "../tasks/tasksThunk";
import { ISorting } from "../../../models/global";

interface ThunkState {
  sorting?: ISorting;
  projectId: number | string;
  taskId: number | string;
}

export const getComments = createAsyncThunk<IComment[], ThunkState>(
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
  IComment,
  { projectId: string | number; taskId: string | number; commentText: string }
>(
  "comments/createComment",
  async (
    { taskId, projectId, commentText },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { data } = await api.post(
        ROUTES.PROJECT_TASK_COMMENT_CREATE.replace(
          ":projectId",
          String(projectId)
        ).replace(":taskId", String(taskId)),
        commentText
      );
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
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

export const updateComment = createAsyncThunk<
  IComment,
  {
    projectId: string | number;
    taskId: string | number;
    comment: IComment;
  }
>(
  "comments/updateComment",
  async (
    { taskId, projectId, comment },
    { rejectWithValue, dispatch, getState }
  ) => {
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
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
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

export const deleteComment = createAsyncThunk<
  IComment,
  { projectId: string | number; taskId: string | number; commentId: number }
>(
  "comments/deleteComment",
  async (
    { taskId, projectId, commentId },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { data } = await api.delete(
        ROUTES.PROJECT_TASK_COMMENT_EDIT.replace(
          ":projectId",
          String(projectId)
        )
          .replace(":taskId", String(taskId))
          .replace(":commentId", String(commentId))
      );
      await dispatch(getProjects(getState().projects.sorting));
      await dispatch(
        getTasks({ sorting: getState().tasks.sorting, projectId: projectId })
      );
      await dispatch(
        getComments({
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
