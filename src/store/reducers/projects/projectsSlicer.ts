import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, IUserSelect } from "../../../models";
import { getProjectAvailableUsers, getProjects } from "./projectsThunk";
import { ISorting } from "../../../models/global";

interface InitialStateType {
  projects: IProject[];
  availableUsers: IUserSelect[];
  isLoading: boolean;
  sorting: ISorting;
}

const initialState: InitialStateType = {
  projects: [],
  availableUsers: [],
  sorting: "ASC",
  isLoading: false,
};

const projectsSlicer = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    changeSorting: (state, action) => {
      state.sorting = state.sorting === "ASC" ? "DESC" : "ASC";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProjectAvailableUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectAvailableUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.availableUsers = action.payload;
    });
    builder.addCase(getProjectAvailableUsers.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default projectsSlicer.reducer;
export const { setProjects, changeSorting } = projectsSlicer.actions;
