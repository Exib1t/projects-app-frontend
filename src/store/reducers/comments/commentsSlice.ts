import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "./commentsThunk";
import { IComment } from "../../../models/comment/IComment";
import { ISorting } from "../../../models/global";

interface InitialStateType {
  comments: IComment[];
  isLoading: boolean;
  sorting: ISorting;
}

const initialState: InitialStateType = {
  comments: [],
  sorting: "ASC",
  isLoading: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default commentsSlice.reducer;
export const {} = commentsSlice.actions;
