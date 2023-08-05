import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { IProject } from "../../../models";
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
