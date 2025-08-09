import { loginService } from "@/services/authServices";
import useAuth from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogin() {

    const login = useAuth((s) => s.login)
    const router = useRouter();

    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            toast.success("تم تسجيل الدخول بنجاح!");
            login(data);
            router.push("/");
        },
        onError: (error) => {
            toast.error(`فشل تسجيل الدخول: ${error.message}`);
            console.error("Login failed:", error);
        },
    });

}
