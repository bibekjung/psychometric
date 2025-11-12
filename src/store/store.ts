import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import sidebarReducer from '../slices/sidebarSlice';
import quizReducer from '../slices/quizSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
