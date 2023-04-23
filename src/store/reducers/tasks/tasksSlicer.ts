import { createSlice } from '@reduxjs/toolkit';
import { IProjectTask } from '../../../models';
import { getTasks } from './tasksThunk';

interface InitialStateType {
  tasks: IProjectTask[];
  isLoading: boolean;
  sorting: 'ASC' | 'DESC';
}

const initialState: InitialStateType = {
  tasks: [],
  sorting: 'ASC',
  isLoading: false,
};

const tasksSlicer = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTasks.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTasks.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default tasksSlicer.reducer;
export const {} = tasksSlicer.actions;
