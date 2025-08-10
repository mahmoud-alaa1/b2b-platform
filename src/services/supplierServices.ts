
import api from '@/lib/axios'
import { isAxiosError } from 'axios'
// fetch supplier info function
export async function getSupplierInfo(supplierId: number) {
  try {
    const response = await api.get(`/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error fetching supplier info:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
