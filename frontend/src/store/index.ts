import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import carouselReducer from "./slices/carouselSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    carousel: carouselReducer,
  },
});

// useful types (TypeScript muscle memory)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
