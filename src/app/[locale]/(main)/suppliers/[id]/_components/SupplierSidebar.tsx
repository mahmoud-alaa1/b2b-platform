"use client";

import { Badge } from "@/components/ui/badge";
import useGetSupplierViews from "@/hooks/suppliers/useGetSupplierViews";
import { ISupplierInfo } from "@/types/supplier";
import { Box, CheckCircle, Eye, Star } from "lucide-react";
import { motion } from "motion/react";

export default function SupplierSidebar({
  supplier,
}: {
  supplier: ISupplierInfo;
}) {
  const supplierId = supplier.id; // أو لو الاسم مختلف عدلها

  const { data, isLoading, isError } = useGetSupplierViews(supplierId);

  const visitors = Number(data?.data?.message ?? 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full sticky top-20 border-2 md:w-80 bg-white border-gray-200 rounded-xl shadow-lg p-6 space-y-6 "
    >
      <div className="text-2xl font-bold text-gray-800 dark:text-white">
        إحصائيات المورد
      </div>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-between p-3 rounded-lg shadow-sm transition"
        >
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-primary" />
            <p className="font-semibold text-lg">عدد الزوار</p>
          </div>
          <Badge className="px-3 py-1 text-md animate-pulse" variant="default">
            {isLoading ? "..." : isError ? "-" : visitors}
          </Badge>
        </motion.div>

        {/* Products */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-between p-3  rounded-lg shadow-sm transition"
        >
          <div className="flex items-center space-x-2">
            <Box className="w-6 h-6 text-primary" />
            <p className="font-semibold text-lg">عدد المنتجات</p>
          </div>
          <Badge
            className="px-3 py-1 text-md bg-blue-500 text-white"
            variant="destructive"
          >
            {supplier?.productCount || 0}
          </Badge>
        </motion.div>

        {/* Completed Orders */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-between p-3 rounded-lg shadow-sm transition"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="font-semibold text-lg">عدد الطلبات المكتملة</p>
          </div>
          <Badge
            className="px-3 py-1 text-md border bg-green-400 text-white"
            variant="outline"
          >
            {supplier?.countOfOrderAccepted || 0}
          </Badge>
        </motion.div>

        {/* Ratings */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-between p-3   rounded-lg shadow-sm transition"
        >
          <div className="flex items-center space-x-2">
            <Star fill="currentColor" className="w-6 h-6 text-yellow-400" />
            <p className="font-semibold text-lg">عدد التقييمات</p>
          </div>
          <Badge
            className="px-3 py-1 text-md bg-yellow-500 text-white"
            variant="secondary"
          >
            {supplier?.averageRating.toFixed(1)}
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
}
