import type { User } from "@/types";

export interface AuthMethods {
  login(email: string, password: string): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
  logout(): void;
}

export interface AuthContextType extends AuthMethods {
  user: boolean;
  isLoading: boolean;
  signInWithGoogle(): Promise<void>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isReady: boolean;

  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
}
