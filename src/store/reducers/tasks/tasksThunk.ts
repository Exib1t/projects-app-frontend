import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { IProjectTask } from '../../../models';

interface ThunkState {
  sorting?: 'ASC' | 'DESC';
  projectId: number | string;
}

export const getTasks = createAsyncThunk<IProjectTask[], ThunkState>('tasks/getTasks', async ({ sorting = 'ASC', projectId }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`projects/${projectId}/tasks?ordering=${sorting}`);
    return data;
  } catch (err) {
    rejectWithValue(err);
  }
});
