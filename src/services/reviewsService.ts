import api from "@/lib/axios";
import { supplierReviewSchemaOutput } from "@/schemas/supplierReviewsSchema";

import { handleApiError } from "@/utils/handleApiError";

export async function postSupplierReview(data: supplierReviewSchemaOutput & { dealId: string | number }) {
  try {
    const res = await api.post(`/supplier/review`, data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
