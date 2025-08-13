import api from '@/lib/axios';
import { SUPPLIERS_BASE_KEY, SUPPLIERS_PAGE_SIZE } from '@/lib/constants';
import { fetchData } from '@/lib/fetchApi';
import { buildQueryString, buildQueryStringWithBase } from '@/lib/utils';
import { handleApiError } from '@/utils/handleApiError'

export async function getSuppliers(params?: ISuppliersFilters, signal?: AbortSignal) {
    try {
        const res = await api.get<IPaginatedResponse<ISupplier>>('/users', {
            params: { ...params, role: "Suppliers", pageSize: SUPPLIERS_PAGE_SIZE },
            signal,
        });
        return res.data;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function fetchSuppliers(params?: ISuppliersFilters) {
    try {
        const query1 = buildQueryStringWithBase({ ...params }, SUPPLIERS_BASE_KEY);
        const query2 = buildQueryString({ role: "Suppliers", pageSize: SUPPLIERS_PAGE_SIZE });
        const response = await fetchData<IPaginatedResponse<ISupplier>>(`/users?${query1}&${query2}`, {
            method: 'GET',
            cache: "force-cache",
        });
        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}