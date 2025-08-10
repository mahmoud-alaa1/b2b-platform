// src/components/HomePage/cartegory-section/CategoriesSection.tsx
"use client";

import useInfinite from "@/hooks/useInfinite";
import { getCategories } from "@/services/categoriesServices";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoryCard from "./CategoryCard";
import Spinner from "@/components/ui/spinner";
import { CATEGORIES_PAGE_SIZE } from "@/lib/constants";
import { InfiniteData } from "@tanstack/react-query"; // ✅ استيراد InfiniteData

interface CategoriesSectionProps {
  initialCategories: ICategory[];
  revalidateInterval: number;
}

export default function CategoriesSection({
  initialCategories,
  revalidateInterval,
}: CategoriesSectionProps) {
  const initialData: InfiniteData<IPaginatedResponse<ICategory>> = {
    pages: [
      {
        data: initialCategories,
        meta: {
          totalPages: 1000,
          currentPage: 1,
          pageSize: CATEGORIES_PAGE_SIZE,
          totalItems: 10000,
        },
      },
    ],
    pageParams: [1],
  };

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    ref,
  } = useInfinite<ICategory>({
    queryKey: ["categories-infinite"],
    fetchFn: (page) => getCategories({ page, pageSize: CATEGORIES_PAGE_SIZE }),
    enabled: true,
    initialData, 
    staleTime: revalidateInterval * 1000,
  });

  const allCategories = data?.pages.flatMap((page) => page.data) || [];
  const skeletonCount = 10;

  if (isLoading && allCategories.length === 0) {
    return (
      <div className="px-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.message || "حدث خطأ غير متوقع."}
      </div>
    );
  }

  if (allCategories.length === 0) {
    return (
      <div className="text-center text-gray-500">لا توجد فئات لعرضها.</div>
    );
  }

  return (
    <div className="px-4 pb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allCategories.map((category) => (
          <CategoryCard key={category.categoryId} category={category} />
        ))}
        {hasNextPage && (
          <div
            ref={ref}
            className="min-h-[120px] col-span-full text-center text-gray-500 flex items-center justify-center p-4"
          >
            {isFetchingNextPage ? <Spinner /> : <p>تحميل المزيد...</p>}
          </div>
        )}
      </div>
    </div>
  );
}
