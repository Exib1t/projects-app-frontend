import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProjectSelect, IUser } from "../../../models";
import api from "../../../services/api";

export const getUsers = createAsyncThunk<IUser[]>(
  "users/getUsers",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await api.get("users");
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk<IUser, number | string>(
  "users/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`users/${userId}`);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk<IUser, IUser>(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`users/${user.id}`, user);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getUserProjects = createAsyncThunk<IProjectSelect[]>(
  "users/getUserProjects",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await api.get("users/get_projects");
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
