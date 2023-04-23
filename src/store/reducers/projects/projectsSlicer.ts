import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../../../models';
import { getProjects } from './projectsThunk';

interface InitialStateType {
  projects: IProject[];
  isLoading: boolean;
  sorting: 'ASC' | 'DESC';
}

const initialState: InitialStateType = {
  projects: [],
  sorting: 'ASC',
  isLoading: false,
};

const projectsSlicer = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    changeSorting: (state, action) => {
      state.sorting = state.sorting === 'ASC' ? 'DESC' : 'ASC';
    },
  },
  extraReducers: builder => {
    builder.addCase(getProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default projectsSlicer.reducer;
export const { setProjects, changeSorting } = projectsSlicer.actions;
