"use client";

import useInfinite from "@/hooks/useInfinite";
import { getCategories } from "@/services/categoriesServices";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoryCard from "./CategoryCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Spinner from "@/components/ui/spinner";

export default function CategoriesSection() {
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
    fetchFn: getCategories,
    enabled: true,
  });

  const allCategories = data?.pages.flatMap((page) => page.data) || [];
  const skeletonCount = 5;

  if (isLoading) {
    return (
      <div className="relative w-full overflow-hidden pb-20 px-4">
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              direction: "rtl",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: skeletonCount }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2"
                >
                  <CategoryCardSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
            <CarouselNext className="-right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          </Carousel>
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
    <div className="relative w-full overflow-hidden pb-20 px-4">
      <div className="relative">
        
        <Carousel
          opts={{
            align: "start",
            loop: false,
            direction: "rtl",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent>
            {allCategories.map((category) => (
              <CarouselItem
                key={category.categoryId}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2"
              >
                <CategoryCard category={category} />
              </CarouselItem>
            ))}

            {hasNextPage && (
              <CarouselItem className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2">
                <div
                  ref={ref}
                  className="min-h-[120px] text-center text-gray-500 w-full h-full flex items-center justify-center p-4"
                >
                  {isFetchingNextPage ? <Spinner /> : <p>اسحب للمزيد</p>}
                </div>
              </CarouselItem>
            )}
          </CarouselContent>

          <CarouselPrevious className="absolute -right-4 hover:text-white text-white bg-primary hover:bg-primary-foreground rounded-full top-1/2 -translate-y-1/2 z-50  md:flex" />
          <CarouselNext className="absolute -left-4 top-1/2 hover:text-white -translate-y-1/2 z-10  md:flex text-white bg-primary hover:bg-primary-foreground rounded-full" />
        </Carousel>
      </div>
    </div>
  );
}
