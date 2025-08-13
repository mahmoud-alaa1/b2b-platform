import { getSuppliers } from '@/services/suppliersServices'
import useGetSearchQueries from '../useGetSearchQueries';
import useInfinite from '../useInfinite';
import { SUPPLIERS_BASE_KEY } from '@/lib/constants';

export default function useGetSuppliers({ initialData }: { initialData?: IPaginatedResponse<ISupplier> } = {}) {
    const searchQueries = useGetSearchQueries(SUPPLIERS_BASE_KEY).filters;
    console.log(`the client filters`, searchQueries)

    return useInfinite<ISupplier>({
        fetchFn: (page, options) => getSuppliers({ ...searchQueries, page }, options?.signal),
        queryKey: [SUPPLIERS_BASE_KEY, searchQueries],
        initialData
    });
}
