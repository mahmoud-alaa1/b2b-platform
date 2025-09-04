"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import FormInput from "@/components/forms-fields/FormInput";
import FormTextArea from "@/components/forms-fields/FormTextArea";

export default function ProductDescription() {
  const form = useFormContext();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">تفاصيل الطلب</h3>
          <p className="text-xs text-gray-500 mt-1">
            يرجى تقديم تفاصيل دقيقة حول الطلب لتسهيل فهم الموردين لاحتياجاتك.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {fields.length === 0 && (
          <div className="text-center font-bold  text-red-600 py-6">
            لم تقم بإضافة أي منتجات بعد.
          </div>
        )}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col md:flex-row gap-3 items-end bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm rounded-2xl p-4 relative group transition">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
              <FormInput
                name={`orderItems.${index}.name`}
                placeholder="اسم المنتج"
                label="اسم المنتج"
                control={control}
              />
              <FormInput
                name={`orderItems.${index}.quantity`}
                placeholder="الكمية"
                label="الكمية المطلوبة"
                control={control}
                type="number"
                min={1}
              />
              <FormInput
                name={`orderItems.${index}.notes`}
                placeholder="ادخل ملاحظات (اختياري)"
                label="ملاحظات (اختياري)"
                control={control}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              className="text-red-500 hover:bg-red-50 ml-0 md:ml-2 mt-2 md:mt-0"
              onClick={() => remove(index)}
              aria-label="حذف المنتج">
              <Trash2 className="w-5 h-5" />
              حذف هذا المنتج
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="default"
          size="sm"
          className="mt-2 sm:mt-0 rounded-full"
          onClick={() => append({ name: "", quantity: 1, notes: "" })}>
          <Plus className="w-4 h-4 ml-1" />
          اضغط هنا لاضافة منتج جديد
        </Button>
      </div>
    </div>
  );
}
