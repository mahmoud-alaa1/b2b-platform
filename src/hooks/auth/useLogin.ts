import { loginService } from "@/services/authServices";
import useAuth from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useLogin() {

    const login = useAuth((s) => s.login)

    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            toast.success("تم تسجيل الدخول بنجاح!");
            login(data);
        },
        onError: (error) => {
            toast.error(`فشل تسجيل الدخول: ${error.message}`);
            console.error("Login failed:", error);
        },
    });

}
