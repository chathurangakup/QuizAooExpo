// store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import taskReducer from "./task/task.slice";
import walletReducer from "./wallet/wallet.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
