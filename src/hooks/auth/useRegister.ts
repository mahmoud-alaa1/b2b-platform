import { registerService, } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRegister() {

    const router = useRouter();

    return useMutation({
        mutationFn: registerService,
        onSuccess: (data) => {
            toast.success("تم تسجيل بنجاح!");
            router.push("/login");

            console.log(data);
        },
        onError: (error) => {
            toast.error(`${error.message}`);
            console.error("Register failed:", error);
        },
    });

}
