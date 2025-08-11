import api from "@/lib/axios";
import { editSupplierInfoSchema } from "@/schemas/accountSettingSchema";
import { handleApiError } from "@/utils/handleApiError";

// fetch supplier info function
export async function getSupplierInfo(supplierId: number) {
  try {
    const response = await api.get<IApiResponse<ISupplierInfo>>(
      `/supplier-info/${supplierId}`
    );
    return response?.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// function to patch supplier info
export async function patchSupplierInfo(
  id: number | string,
  data: editSupplierInfoSchema
) {
  try {
    const response = await api.patch<IAccountInfoPatchResponse>(
      `/supplier-info/${id}`,
      data
    );
    return response?.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

