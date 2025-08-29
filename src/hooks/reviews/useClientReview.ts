import { clientReviewSchemaOutput } from "@/schemas/clientReviewSchema";
import { postClientReview } from "@/services/reviewsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useClientReview({ orderId }: { orderId: string | number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: clientReviewSchemaOutput) =>
      postClientReview({ ...data, orderId }),
    onSuccess: () => {
      toast.success("تم إرسال المراجعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["client-deals"] });
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      toast.error("فشل إرسال المراجعة");
    },
  });
}
