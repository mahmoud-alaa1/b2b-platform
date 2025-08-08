import { loginService } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useLogin() {

    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            toast.success("تم تسجيل الدخول بنجاح!");
            console.log(data);
        },
        onError: (error) => {
            toast.error(`فشل تسجيل الدخول: ${error.message}`);
            console.error("Login failed:", error);
        },
    });

}
