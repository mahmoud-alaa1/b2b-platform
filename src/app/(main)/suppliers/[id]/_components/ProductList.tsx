import React from "react";
import ProductPreview from "./ProductPreview";
import { Button } from "@/components/ui/button";
import { ISupplierProducts } from "@/types/supplier";

export default function ProductList({
  products,
}: {
  products: ISupplierProducts[];
}) {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        المنتجات ذات الصلة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-20">
        {products.map((product) => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </div>

      <Button className="w-fit  md:w-auto text-center md:flex items-center justify-center mx-auto font-semibold py-4 px-6 rounded-full shadow-lg transition-all hover:shadow-xl">
        استعرض جميع المنتجات
        <span className="font-extrabold text-lg ml-2 ">({products.length}+)</span>
      </Button>
    </>
  );
}
