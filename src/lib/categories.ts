import { queryClient } from "@/providers/ReactQueryProvider";
import { InfiniteData } from "@tanstack/react-query";

const cachedCats = queryClient
  .getQueryCache()
  .findAll({ queryKey: ["categories"] })
  .map(
    (query) => query.state.data as InfiniteData<IPaginatedResponse<ICategory>>
  )
  .filter(Boolean);

export const allCachedCategories =
  cachedCats.flatMap((cache) => cache.pages.flatMap((page) => page.data)) ?? [];
