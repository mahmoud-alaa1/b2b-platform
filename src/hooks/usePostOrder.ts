import { postOrderService } from "@/services/orderServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export default function usePostOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postOrderService,
    onSuccess: (data) => {
      toast.success("تم ارسال الطلب بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(`فشل ارسال الطلب: ${error.message}`);
    },
  });
}
