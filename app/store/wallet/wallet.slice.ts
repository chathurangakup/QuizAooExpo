// app/store/wallet/wallet.slice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { walletService } from "../../services/wallet.service";
import { Wallet, WalletState } from "./wallet.types";

/* ================= THUNK ================= */

export const fetchWallet = createAsyncThunk<
  Wallet,
  void,
  { rejectValue: string }
>("wallet/fetchWallet", async (_, { rejectWithValue }) => {
  try {
    return await walletService.getWallet();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch wallet"
    );
  }
});

/* ================= STATE ================= */

const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null,
};

/* ================= SLICE ================= */

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default walletSlice.reducer;
