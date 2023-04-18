import { configureStore, createAsyncThunk, createSlice, createStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/userSlicer';
import globalSlicer from './reducers/globalSlicer';
import projectsSlicer from './reducers/projects/projectsSlicer';

export const store = configureStore({
  reducer: { user: userReducer, global: globalSlicer, projects: projectsSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
