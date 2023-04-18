import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateModel {
  error: string | null;
}

const initialState: InitialStateModel = {
  error: null,
};

const globalSlicer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export default globalSlicer.reducer;
export const { setError } = globalSlicer.actions;
