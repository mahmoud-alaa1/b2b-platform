import { getCategories } from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}
