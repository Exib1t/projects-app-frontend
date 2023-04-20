import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateModel {
  error: string | null;
  theme: 'dark' | 'light';
}

const initialState: InitialStateModel = {
  theme: 'dark',
  error: null,
};

const globalSlicer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export default globalSlicer.reducer;
export const { setError, setTheme } = globalSlicer.actions;
