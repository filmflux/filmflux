import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // <-- type-only import

type CarouselState = {
  currentIndex: number;
  isPaused: boolean;
};

const initialState: CarouselState = {
  currentIndex: 0,
  isPaused: false,
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    next(state, action: PayloadAction<number>) {
      state.currentIndex = (state.currentIndex + 1) % action.payload;
    },
    prev(state, action: PayloadAction<number>) {
      state.currentIndex =
        (state.currentIndex - 1 + action.payload) % action.payload;
    },
    pause(state) {
      state.isPaused = true;
    },
    resume(state) {
      state.isPaused = false;
    },
  },
});

export const { setIndex, next, prev, pause, resume } = carouselSlice.actions;

export default carouselSlice.reducer;
