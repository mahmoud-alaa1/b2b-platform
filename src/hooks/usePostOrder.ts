import { postOrderService } from "@/services/orderServices";
import { ApiError } from "@/utils/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CompleteOrderOutput } from "@/schemas/orderSchema";
export default function usePostOrder() {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<{ message: string }>,
    ApiError,
    CompleteOrderOutput
  >({
    mutationFn: postOrderService,
    onSuccess: () => {
      toast.success("تم ارسال الطلب بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(`فشل ارسال الطلب: ${error.message}`);
    },
  });
}
