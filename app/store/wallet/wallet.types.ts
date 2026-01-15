// app/store/wallet/wallet.types.ts

export interface Wallet {
  id: string;
  totalEarnings: number;
  todayEarnings: number;
  availableToWithdraw: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletState {
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
}
