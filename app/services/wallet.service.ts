export const walletService = {
  getBalance: async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { balance: 156.8 },
        });
      }, 500);
    });

    // Real implementation:
    // return api.get('/wallet/balance');
  },

  getTransactions: async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockTransactions = [
          {
            id: "1",
            type: "credit",
            amount: 5.0,
            description: "Task completion",
            date: "2024-01-15",
            status: "completed",
          },
          // ... more transactions
        ];
        resolve({ data: mockTransactions });
      }, 500);
    });

    // Real implementation:
    // return api.get('/wallet/transactions');
  },

  withdraw: async (amount: number, method: string) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true, transactionId: "txn_123" },
        });
      }, 1000);
    });

    // Real implementation:
    // return api.post('/wallet/withdraw', { amount, method });
  },

  getWithdrawalMethods: async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: "1", type: "bank", name: "Bank Transfer" },
            { id: "2", type: "paypal", name: "PayPal" },
            { id: "3", type: "giftcard", name: "Gift Card" },
          ],
        });
      }, 500);
    });

    // Real implementation:
    // return api.get('/wallet/withdrawal-methods');
  },
};
