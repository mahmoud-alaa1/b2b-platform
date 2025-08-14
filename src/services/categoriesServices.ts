import api from "@/lib/axios";
import { CATEGORIES_PAGE_SIZE } from "@/lib/constants";
import { handleApiError } from "@/utils/handleApiError";

export async function getCategories(params: ICategoryFilters) {
  try {
    const response = await api.get<IPaginatedResponse<ICategory>>(
      "/categories",
      {
        params: {
          ...params,
          pageSize: CATEGORIES_PAGE_SIZE,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
