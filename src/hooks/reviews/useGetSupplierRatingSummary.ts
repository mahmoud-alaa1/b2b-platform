import { getSupplierRatingSummary } from "@/services/reviewsService";
import { useQuery } from "@tanstack/react-query";

export default function useGetSupplierRatingSummary({
  supplierId,
}: {
  supplierId: string | number;
}) {
  return useQuery({
    queryKey: ["supplierRatingSummary", supplierId],
    queryFn: () => getSupplierRatingSummary({ supplierId }),
  });
}
