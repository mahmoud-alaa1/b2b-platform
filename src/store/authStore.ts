import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: IAdmin | null;
}

interface AuthActions {
  login: (user: IAdmin) => void;
  logout: () => void;
}

const useAuth = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuth;
