import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeToken, isExpired } from "@/utils/jwt";
import type { AuthState } from "../types";
import type { User } from "@/types";
import * as authService from "@/services/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isReady: false,

      setToken: (token: string) => {
        set({ token });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) {
          set({ isReady: true });
          return;
        }

        const payload = decodeToken(token);
        if (!payload) {
          set({ isReady: true });
          return;
        }

        if (!isExpired(payload)) {
          set({
            user: { id: payload.sub, email: payload.email, name: payload.name },
            isReady: true,
          });
        } else {
          set({ user: null, token: null, isReady: true });
        }
      },

      login: async (email, password) => {
        const { token, user } = await authService.login(email, password);
        set({ token, user });
      },

      signUp: async (name, email, password) => {
        const { token, user } = await authService.signup(name, email, password);
        set({ token, user });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "jwt",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => () => {
        useAuthStore.getState().fetchUser();
      },
    }
  )
);
