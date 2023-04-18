import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateModel {
  userId: string | null;
  authorized: boolean;
  token: string | null;
}

const initialState: InitialStateModel = {
  userId: null,
  authorized: false,
  token: null,
};

const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export default userSlicer.reducer;
export const { setUserId, setAuthorized, setToken } = userSlicer.actions;
