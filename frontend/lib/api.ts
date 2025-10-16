const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  auth: {
    register: async (userData: {
      username: string;
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.json();
    },

    login: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return response.json();
    },
  },

  // Games endpoints
  games: {
    getAll: async (params?: { category?: string; search?: string }) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      const response = await fetch(`${API_BASE_URL}/games${query ? `?${query}` : ''}`);
      return response.json();
    },

    getBySlug: async (slug: string) => {
      const response = await fetch(`${API_BASE_URL}/games/${slug}`);
      return response.json();
    },

    getJackpots: async () => {
      const response = await fetch(`${API_BASE_URL}/games/jackpots`);
      return response.json();
    },
  },

  // Promotions endpoints
  promotions: {
    getAll: async (params?: { type?: string; isActive?: boolean }) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      const response = await fetch(`${API_BASE_URL}/promotions${query ? `?${query}` : ''}`);
      return response.json();
    },

    getBySlug: async (slug: string) => {
      const response = await fetch(`${API_BASE_URL}/promotions/${slug}`);
      return response.json();
    },
  },

  // Transactions endpoints
  transactions: {
    getAll: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },

    deposit: async (token: string, data: { amount: number; paymentMethod: string }) => {
      const response = await fetch(`${API_BASE_URL}/transactions/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },

    withdraw: async (token: string, data: { amount: number; paymentMethod: string }) => {
      const response = await fetch(`${API_BASE_URL}/transactions/withdrawal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // User endpoints
  user: {
    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },
};
