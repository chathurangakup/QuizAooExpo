// app/store/wallet/wallet.service.ts
import { walletApi } from "../api/wallet.api";
import { mapWalletResponse } from "../store/wallet/wallet.mappers";

export const walletService = {
  getWallet: async () => {
    const data = await walletApi.getWallet();
    return mapWalletResponse(data.wallet);
  },
};
