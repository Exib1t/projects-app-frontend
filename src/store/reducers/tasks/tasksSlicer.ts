import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "./tasksThunk";
import { ITask } from "../../../models/task/ITask";
import { ISorting } from "../../../models/global";

interface InitialStateType {
  tasks: ITask[];
  isLoading: boolean;
  sorting: ISorting;
}

const initialState: InitialStateType = {
  tasks: [],
  sorting: "ASC",
  isLoading: false,
};

const tasksSlicer = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default tasksSlicer.reducer;
export const {} = tasksSlicer.actions;
