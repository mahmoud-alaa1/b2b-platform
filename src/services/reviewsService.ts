import api from "@/lib/axios";
import { supplierReviewSchemaOutput } from "@/schemas/supplierReviewsSchema";

import { handleApiError } from "@/utils/handleApiError";

export async function postSupplierReview(
  data: supplierReviewSchemaOutput & { dealId: string | number }
) {
  try {
    const res = await api.post(`/supplier/review`, data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function postClientReview(
  data: supplierReviewSchemaOutput & { orderId: string | number }
) {
  try {
    const res = await api.post(`/client/review`, data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
export async function getSupplierRatingSummary({
  supplierId,
}: {
  supplierId: string | number;
}) {
  try {
    const res = await api.get<IApiResponse<IRatingSummary>>(
      `/ratings/summary/${supplierId}`
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
export async function getSupplierRatingReviews({
  supplierId,
}: {
  supplierId: string | number;
}) {
  try {
    const res = await api.get(`/ratings/reviews/${supplierId}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
