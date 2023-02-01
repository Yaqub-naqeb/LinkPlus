import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profille";
import TodoReducer from "./reducers/todoes";
import isOpenReducer from "./reducers/isOpen";

export default configureStore({
  reducer: {
    profile: profileReducer,
    todoes: TodoReducer,
    open: isOpenReducer,
  },
});
