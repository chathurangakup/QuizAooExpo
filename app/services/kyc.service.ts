import { kycApi } from "../api/kyc.api";

export const kycService = {
  getMyKyc: async () => {
    const response = await kycApi.getMyKyc();
    return response.data;
  },
};
