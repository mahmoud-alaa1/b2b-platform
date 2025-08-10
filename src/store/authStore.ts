import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from 'js-cookie'
interface AuthState {
  user: IUser | null;
}

interface AuthActions {
  login: (loginData: ILoginResponse) => void;
  logout: () => void;
}

const useAuth = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      login: (loginData) => {
        Cookies.set("token", loginData.token)
        set({ user: loginData.user })
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
