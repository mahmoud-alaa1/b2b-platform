import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from 'js-cookie'
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
      login: (user) => {
        Cookies.set("token", user.accessToken)
        set({ user })
      },
      logout: () => {
        Cookies.remove("token")
        set({ user: null })
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuth;
