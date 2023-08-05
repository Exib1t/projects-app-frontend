import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { IProject, IProjectCreate, IUserSelect } from "../../../models";

export const getProjects = createAsyncThunk<IProject[], "ASC" | "DESC">(
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
  async (project, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`projects/${project.id}`, project);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createProject = createAsyncThunk<IProject, IProjectCreate>(
  "projects/createProject",
  async (project, { rejectWithValue }) => {
    try {
      const { data } = await api.post("projects", project);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteProject = createAsyncThunk<{ msg: string }, number | string>(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`projects/${projectId}`);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
