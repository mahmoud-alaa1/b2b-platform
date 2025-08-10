// src/hooks/useInfinite.ts
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query"; // ✅ استيراد InfiniteData
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function useInfinite<T>({
  queryKey,
  fetchFn,
  refetchInterval,
  enabled = true,
  initialData,
  staleTime, // ✅ أضفنا `staleTime` هنا
}: {
  queryKey: string[];
  fetchFn: (pageNumber: number) => Promise<IPaginatedResponse<T>>;
  refetchInterval?: number;
  enabled?: boolean;
  initialData?: InfiniteData<IPaginatedResponse<T>>; // ✅ تحديد نوع دقيق لـ initialData
  staleTime?: number; // ✅ إضافة `staleTime` كخاصية اختيارية
}) {
  const result = useInfiniteQuery({
    queryKey,
    refetchInterval,
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam as number),
    getNextPageParam: (lastPage) => {
      // تم تعديل هذا الجزء بناءً على بنية البيانات التي قدمتها
      const nextPage =
        lastPage.meta.currentPage < lastPage.meta.totalPages
          ? lastPage.meta.currentPage + 1
          : undefined;
      return nextPage;
    },
    initialPageParam: 1,
    enabled,
    initialData,
    staleTime, // ✅ تمرير `staleTime` إلى useInfiniteQuery
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && result.hasNextPage && !result.isFetchingNextPage) {
      result.fetchNextPage();
    }
  }, [
    inView,
    result.hasNextPage,
    result.isFetchingNextPage,
    result.fetchNextPage,
    result,
  ]);
  return {
    ...result,
    ref,
  };
}

export default useInfinite;
