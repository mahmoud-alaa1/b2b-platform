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

export async function getSupplierRatingSummary(userId: number) {
  try {
    const res = await api.get<IApiResponse<IRatingSummary>>(
      `/ratings/summary/${userId}`
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
export async function getSupplierRatingReviews(
  userId: number,
  page: number,
  pageSize: number
) {
  try {
    const res = await api.get<IPaginatedResponse<IReview>>(
      `/ratings/reviews/${userId}`,
      {
        params: {
          page,
          pageSize,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
