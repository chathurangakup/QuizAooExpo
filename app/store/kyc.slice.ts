import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface KYCData {
  id: string;
  userId: string;
  status: "pending" | "verified" | "rejected";
  firstName: string;
  lastName: string;
  idNumber: string;
  idType: "passport" | "driver_license" | "national_id";
  idFrontImage: string;
  idBackImage: string;
  selfieImage: string;
  addressProof: string;
  submittedAt: string;
  verifiedAt?: string;
}

interface KYCState {
  data: KYCData | null;
  loading: boolean;
  error: string | null;
}

const initialState: KYCState = {
  data: {
    id: "1",
    userId: "1",
    status: "pending",
    firstName: "John",
    lastName: "Doe",
    idNumber: "ABC123456",
    idType: "national_id",
    idFrontImage: "",
    idBackImage: "",
    selfieImage: "",
    addressProof: "",
    submittedAt: "2024-01-15",
  },
  loading: false,
  error: null,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    submitKYC: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      state.error = null;
    },
    submitKYCSuccess: (state, action: PayloadAction<KYCData>) => {
      state.data = action.payload;
      state.loading = false;
    },
    submitKYCFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateKYCStatus: (
      state,
      action: PayloadAction<"pending" | "verified" | "rejected">
    ) => {
      if (state.data) {
        state.data.status = action.payload;
      }
    },
    resetKYC: (state) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  submitKYC,
  submitKYCSuccess,
  submitKYCFailure,
  updateKYCStatus,
  resetKYC,
} = kycSlice.actions;

export default kycSlice.reducer;
