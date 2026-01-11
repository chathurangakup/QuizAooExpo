// store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import taskReducer from "./task.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
