import api from "@/lib/axios";
import { handleApiError } from "@/utils/handleApiError";

export async function getSupplierQuotas() {
  try {
    const res = await api.get<IApiResponse<ISupplierQuota>>(`/quota/supplier`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
