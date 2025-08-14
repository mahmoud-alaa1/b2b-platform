"use client";

import { Tag } from "lucide-react";
import { Badge } from "../ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface CategoryAccountProps {
  supplier: ISupplierInfo | null | undefined;
  isPending: boolean;
}

export default function CategoryAccount({
  supplier,
  isPending,
}: CategoryAccountProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">فئات الخدمة</h3>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {isPending ? (
          <Skeleton className="h-8 w-40" />
        ) : (supplier?.categories ?? []).length === 0 ? (
          <div className="text-sm text-gray-500">لا توجد فئات</div>
        ) : (
          (supplier?.categories ?? []).map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="p-3 bg-gray-100 text-black"
            >
              <Tag className="w-3 h-3" />
              <span className="font-medium">{category}</span>
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}
