import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/userSlicer';
import globalSlicer from './reducers/globalSlicer';
import projectsSlicer from './reducers/projects/projectsSlicer';
import tasksSlicer from './reducers/tasks/tasksSlicer';
import commentsSlice from './reducers/comments/commentsSlice';

export const store = configureStore({
  reducer: { user: userReducer, global: globalSlicer, projects: projectsSlicer, tasks: tasksSlicer, comments: commentsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
