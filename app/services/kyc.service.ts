export const kycService = {
  submitKYC: async (data: FormData) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: "1",
            status: "pending",
            submittedAt: new Date().toISOString(),
          },
        });
      }, 2000);
    });

    // Real implementation:
    // return api.post('/kyc/submit', data, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
  },

  getKYCStatus: async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            status: "pending",
            submittedAt: "2024-01-15",
          },
        });
      }, 500);
    });

    // Real implementation:
    // return api.get('/kyc/status');
  },
};
