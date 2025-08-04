import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getCategories(
  page: number = 1
): Promise<IPaginatedResponse<ICategory>> {
  try {
    const res = await api.get<IPaginatedResponse<ICategory>>(
      `/categories?page=${page}`
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch categories"
      );
    }
    throw error;
  }
}
