"use client";

import { Button } from "@/components/ui/button";
import { ISupplierProducts } from "@/types/supplier";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

export default function ProductPreview({
  product,
}: {
  product: ISupplierProducts;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative w-full border-2 hover:border-primary transition-all duration-300 bg-white border-gray-200 rounded-2xl shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
    >
      {/* Special Badge */}
      {product.isSpecial && (
        <Badge className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-md animate-pulse">
          منتج مميز
        </Badge>
      )}

      {/* Product Image */}
      <Link href="#">
        <Image
          className=" rounded-t-lg object-contain  "
          src={product.productImageURl || "/logo-placeholder.png"}
          alt={product.name || "Product Image"}
          sizes="(max-width: 450px) 100vw, 450px"
          width={450}
          height={450}
        />
      </Link>

      <div className="px-5 pb-5">
        {/* Product Name */}
        <Link href="#">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {product.name || "اسم المنتج"}
          </h5>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-4">
          {product.isSpecial && product.offer > 0 ? (
            <div className="flex justify-between w-full">
              <span className="text-gray-400 line-through text-sm">
                {product.price} ج.م
              </span>
              <span className="text-lg font-bold text-green-600">
                {product.offer} ج.م
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.price} ج.م
            </span>
          )}
        </div>

        {/* Button */}
        <div className="flex items-center mt-4">
          <Button className="w-full rounded-xl shadow-md hover:scale-105 transition-all">
            تفاصيل المنتج
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
