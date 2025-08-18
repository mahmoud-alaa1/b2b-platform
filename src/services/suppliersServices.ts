import api from "@/lib/axios";
import { SUPPLIERS_BASE_KEY, SUPPLIERS_PAGE_SIZE } from "@/lib/constants";
import { fetchData } from "@/lib/fetchApi";
import { buildQueryString, buildQueryStringWithBase } from "@/lib/utils";
import { handleApiError } from "@/utils/handleApiError";

export async function getSuppliers(params?: ISuppliersFilters) {
  try {
    const res = await api.get<IPaginatedResponse<ISupplier>>("/suppliers", {
      params: { ...params, pageSize: SUPPLIERS_PAGE_SIZE },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function fetchSuppliers(params?: ISuppliersFilters) {
  try {
    const query1 = buildQueryStringWithBase({ ...params }, SUPPLIERS_BASE_KEY);
    const query2 = buildQueryString({ pageSize: SUPPLIERS_PAGE_SIZE });
    const response = await fetchData<IPaginatedResponse<ISupplier>>(
      `/suppliers?${query1}&${query2}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 60 * 60 },
      },
    );
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
}
