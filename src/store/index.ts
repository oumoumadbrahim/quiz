import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user';
import quizReducer from '../features/quiz';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
