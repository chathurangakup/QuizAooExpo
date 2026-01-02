import api from "../services/api";

export const kycApi = {
  getMyKyc: () => {
    return api.get("/kyc/my-kyc");
  },
};
