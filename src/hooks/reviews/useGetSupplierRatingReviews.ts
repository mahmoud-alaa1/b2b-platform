import { getSupplierRatingReviews } from "@/services/reviewsService";
import { useQuery } from "@tanstack/react-query";

export default function useGetSupplierRatingReviews({
  supplierId,
}: {
  supplierId: string | number;
}) {
  return useQuery({
    queryKey: ["supplierRatingReviews", supplierId],
    queryFn: () => getSupplierRatingReviews({ supplierId }),
  });
}
