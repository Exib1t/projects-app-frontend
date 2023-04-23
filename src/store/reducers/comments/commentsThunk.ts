import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { IProjectTaskComment } from '../../../models';

interface ThunkState {
  sorting?: 'ASC' | 'DESC';
  projectId: number | string;
  taskId: number | string;
}

export const getComments = createAsyncThunk<IProjectTaskComment[], ThunkState>(
  'comments/getComments',
  async ({ sorting = 'ASC', projectId, taskId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`projects/${projectId}/tasks/${taskId}/comments?ordering=${sorting}`);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
