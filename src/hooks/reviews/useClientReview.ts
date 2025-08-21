import { supplierReviewSchemaOutput } from "@/schemas/supplierReviewsSchema";
import { postClientReview } from "@/services/reviewsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useClientReview({ orderId }: { orderId: string | number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: supplierReviewSchemaOutput) =>
      postClientReview({ ...data, orderId }),
    onSuccess: (data) => {
      console.log("Review submitted successfully:", data);
      toast.success("تم إرسال المراجعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["client-deals"] });
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      toast.error("فشل إرسال المراجعة");
    },
  });
}
