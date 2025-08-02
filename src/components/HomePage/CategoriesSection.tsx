"use client";

import useGetCategories from "@/hooks/useGetCategories";
import Image from "next/image";

export default function CategoriesSection() {
  const { data, isPending, error } = useGetCategories();

  if (error) {
    return <div className="text-center text-red-500">{error.message}</div>;
  }

  const categories = data?.data ?? [];

  return (
    <div className="grid grid-cols-3 gap-4">
      {!isPending && categories.length === 0 ? (
        <div className="text-center text-gray-500">لا توجد بيانات لعرضها</div>
      ) : (
        categories.map((category: ICategory) => (
          <div
            key={category.categoryId}
            className="flex flex-col items-center justify-center gap-2"
          >
            {category.imageURL && (
              <Image
                src={category.imageURL ?? "/placeholder.jpg"}
                alt={category.categoryName}
                width={100}
                height={100}
              />
            )}
            <span className="text-sm">{category.categoryName}</span>
            <span className="text-xs text-gray-500">
              {category.numberOfAssociatedSuppliers}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
