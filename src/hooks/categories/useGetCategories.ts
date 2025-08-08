import { getCategories } from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories(params: ICategoryFilters) {
    return useQuery({
        queryKey: ['categories', params],
        queryFn: async () => getCategories(params),
    })
}
