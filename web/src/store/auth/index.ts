import { create } from 'zustand';

interface AuthState {
  redirectTo: string;
  setRedirectTo: (domain: string) => void;

  cookieDomain: string;
  setCookieDomain: (domain: string) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  redirectTo: '',
  setRedirectTo: (domain) => set({ redirectTo: domain }),

  cookieDomain: '',
  setCookieDomain: (domain) => set({ cookieDomain: domain }),
}));

// Export store hooks
export * from './hooks/use-auth-logic';
