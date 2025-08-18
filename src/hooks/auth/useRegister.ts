import { registerService } from "@/services/authServices";
import { ApiError } from "@/utils/handleApiError";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRegister() {
  const router = useRouter();

  return useMutation<IApiResponse<IRegisterResponse>, ApiError, FormData>({
    mutationFn: registerService,
    onSuccess: (data) => {
      toast.success("تم تسجيل بنجاح!");
      router.push("/login");

      console.log(data);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          `${error.response?.data?.data.message || "فشل تسجيل الحساب بسبب خطأ في الخادم"}`,
        );
      }
    },
  });
}
