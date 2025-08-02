'use client'

import { getCategories } from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  return useQuery<IApiResponse<ICategory[]>, IErrorResponse>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
