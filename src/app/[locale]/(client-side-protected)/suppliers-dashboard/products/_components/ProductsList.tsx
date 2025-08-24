"use client";

import useGetSupplierProducts from "@/hooks/products/useGetSupplierSelfProducts";
import { Package, Crown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductSkeletonGrid from "./ProductSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyProductsList from "./EmptyProductsList";
import ProductCard from "./ProductCard";
import { AddProduct } from "./AddProduct";

export default function ProductsList() {
  const { data, isPending, error, refetch } = useGetSupplierProducts();
  const products = data?.data || [];

  if (isPending) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-11" />
          </div>
        </div>

        <ProductSkeletonGrid />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        onRetry={() => refetch()}
        title="خطأ في تحميل المنتجات"
        description="عذراً، حدث خطأ أثناء تحميل منتجاتك. تحقق من اتصال الإنترنت وحاول مرة أخرى."
      />
    );
  }

  if (products.length === 0) {
    return <EmptyProductsList />;
  }

  const specialProducts = products.filter(
    (product) => product.isSpecial
  );
  const regularProducts = products.filter(
    (product) => !product.isSpecial
  );

  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            مجموعة منتجاتك
          </h2>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="text-lg">إجمالي {products.length} منتج</span>
            {specialProducts.length > 0 && (
              <>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="flex items-center gap-1">
                  <Crown className="w-4 h-4 text-amber-500" />
                  {specialProducts.length} منتج مميز
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AddProduct />
        </div>
      </div>

      {/* Special Products Section */}
      {specialProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  المنتجات المميزة
                </h3>
                <p className="text-sm text-gray-600">منتجات حصرية بعروض خاصة</p>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-200 via-orange-200 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {specialProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Products Section */}
      {regularProducts.length > 0 && (
        <div className="space-y-6">
          {specialProducts.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    منتجاتك الأساسية
                  </h3>
                  <p className="text-sm text-gray-600">
                    مجموعة متنوعة من المنتجات عالية الجودة
                  </p>
                </div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
