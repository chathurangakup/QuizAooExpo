import { api } from "../api/auth.api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    return api.post("/auth/login", credentials);
  },

  register: async (credentials: RegisterData) => {
    // Real implementation:
    return api.post("/auth/register", credentials);
  },

  logout: async () => {
    // Clear token from storage
    // await SecureStore.deleteItemAsync('token');
  },

  getProfile: async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
          },
        });
      }, 1000);
    });

    // Real implementation:
    // return api.get('/auth/profile');
  },
};
