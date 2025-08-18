import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface AuthState {
  user: IUser | null;
  hasHydrated: boolean;
}

interface AuthActions {
  login: (loginData: ILoginResponse) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

const useAuth = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      login: (loginData) => {
        Cookies.set("token", loginData.token);
        set({ user: loginData.user });
      },
      logout: () => {
        toast.success("تم تسجيل الخروج بنجاح");
        Cookies.remove("token");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuth;
