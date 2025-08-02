import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getCategories() {
  try {
    const res = await api.get<IApiResponse<ICategory[]>>(`/categories`);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch categories"
      );
    }
    throw error;
  }
}
