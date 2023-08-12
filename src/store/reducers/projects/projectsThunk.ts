import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { IProject, IProjectCreate, IUserSelect } from "../../../models";
import { getTasks } from "../tasks/tasksThunk";
import { ISorting } from "../../../models/global";

export const getProjects = createAsyncThunk<IProject[], ISorting>(
  "projects/getProjects",
  async (sorting, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`projects?ordering=${sorting}`);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getProject = createAsyncThunk<IProject, number | string>(
  "projects/getProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`projects/${projectId}`);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getProjectAvailableUsers = createAsyncThunk<IUserSelect[]>(
  "projects/getProjectAvailableUsers",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await api.get("projects/get_users");
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateProject = createAsyncThunk<IProject, IProjectCreate>(
  "projects/updateProject",
  async (project, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.put(`projects/${project.id}`, project);
      await dispatch(
        getTasks({ sorting: getState().tasks.sorting, projectId: data.id })
      );
      await dispatch(getProjects(getState().projects.sorting));
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createProject = createAsyncThunk<IProject, IProjectCreate>(
  "projects/createProject",
  async (project, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.post("projects", project);
      await dispatch(
        getTasks({ sorting: getState().tasks.sorting, projectId: data.id })
      );
      await dispatch(getProjects(getState().projects.sorting));
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteProject = createAsyncThunk<{ msg: string }, number | string>(
  "projects/deleteProject",
  async (projectId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.delete(`projects/${projectId}`);
      await dispatch(
        getTasks({ sorting: getState().tasks.sorting, projectId: data.id })
      );
      await dispatch(getProjects(getState().projects.sorting));
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
