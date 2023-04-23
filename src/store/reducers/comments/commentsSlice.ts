import { createSlice } from '@reduxjs/toolkit';
import { IProjectTaskComment } from '../../../models';
import { getComments } from './commentsThunk';

interface InitialStateType {
  comments: IProjectTaskComment[];
  isLoading: boolean;
  sorting: 'ASC' | 'DESC';
}

const initialState: InitialStateType = {
  comments: [],
  sorting: 'ASC',
  isLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getComments.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default commentsSlice.reducer;
export const {} = commentsSlice.actions;
