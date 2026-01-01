import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import kycReducer from "./kyc.slice";
import taskReducer from "./task.slice";
import walletReducer from "./wallet.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    wallet: walletReducer,
    kyc: kycReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
