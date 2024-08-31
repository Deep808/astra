import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "../slices/promptSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
    user: userReducer,
  },
});
