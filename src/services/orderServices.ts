import api from "@/lib/axios";
import { isAxiosError } from "axios";

// post order funcation
export async function postOrderService(data: IOrder) {
  try {
    const response = await api.post("/order", data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ في ارسال الطلب ",
      );
    }
    throw error;
  }
}
