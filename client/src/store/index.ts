import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import surveyReducer from "./survey/surveySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    survey: surveyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
