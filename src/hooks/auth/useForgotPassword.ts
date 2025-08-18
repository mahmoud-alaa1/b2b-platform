import { forgotPasswordService } from "@/services/authServices";
import { ApiError } from "@/utils/handleApiError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordService,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: "top-center",
      });
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
      console.error(error);
    },
  });
}
