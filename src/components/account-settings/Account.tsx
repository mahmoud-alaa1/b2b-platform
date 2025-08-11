"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Tag,
  CheckCircle,
  Phone,
  Mail,
  PlusCircleIcon,
  PencilLine,
} from "lucide-react";
import useGetSupplierInfo from "@/hooks/supplier-profile/useGetSupplierInfo";
import StatsCard from "../StatsCard";
import InfoItem from "./infoItem";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import usePatchSupplierInfo from "@/hooks/supplier-profile/usePatchSupplierInfo";
import { editSupplierInfoSchema } from "@/schemas/accountSettingSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import SkeletonItem from "./SkeletonItem";

export default function Account() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isPending } = useGetSupplierInfo();
  const { mutate, isPending: isUpdating } = usePatchSupplierInfo();

  const form = useForm<editSupplierInfoSchema>({
    resolver: zodResolver(editSupplierInfoSchema),
    defaultValues: {
      description: "",
      locations: [],
      logoUrl: null,
    },
  });

  const {
    fields: ponsFields,
    append: appendPons,
    remove: removePons,
  } = useFieldArray<editSupplierInfoSchema>({
    control: form.control,
    //@ts-expect-error i know this is a string array
    name: "locations",
  });

  const supplier = data?.data;

  // استخدام form.reset مع البيانات من السيرفر بعد تحميلها
  useEffect(() => {
    if (supplier) {
      form.reset({
        description: supplier.description ?? "",
        locations: supplier.locations?.filter((loc) => loc !== null) ?? [],
        logoUrl: supplier.logoUrl ?? null,
      });
    }
  }, [supplier, form]);

  const onSubmit = (values: editSupplierInfoSchema) => {
    mutate(values, {
      onSuccess() {
        setIsEditMode(false);
        // إعادة تعيين حالة الفورم بعد النجاح
        form.reset(values);
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            ملف شركتك
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            نظرة عامة ومعلومات عن شركتك
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* نظرة عامة */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {isPending ? (
                    <Skeleton className="w-20 h-20 rounded-full" />
                  ) : (
                    <Image
                      suppressHydrationWarning
                      src={
                        supplier?.logoUrl ??
                        "https://placehold.co/100x100/A0AEC0/ffffff?text=NA"
                      }
                      alt={supplier?.name ?? "شعار"}
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20"
                      priority
                    />
                  )}
                </div>

                <div>
                  {isPending ? (
                    <Skeleton className="h-6 w-40" />
                  ) : (
                    <h2 className="text-lg font-medium text-gray-900">
                      {supplier?.name ?? "لا يوجد اسم لشركتك"}
                    </h2>
                  )}
                </div>
              </div>
            </div>

            {/* الإحصائيات */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsCard
                title="الطلبات المقبولة"
                value={supplier ? supplier.countOfOrderAccepted ?? 0 : 0}
                icon={<CheckCircle className="w-5 h-5 text-primary" />}
              />
              <StatsCard
                title="فئات الخدمة"
                value={supplier ? (supplier.categories ?? []).length : 0}
                icon={<Tag className="w-5 h-5 text-primary" />}
              />
              <StatsCard
                title="المواقع"
                value={
                  supplier
                    ? (supplier.locations ?? []).filter(Boolean).length
                    : 0
                }
                icon={<MapPin className="w-5 h-5 text-primary" />}
              />
            </div>
          </div>

          {/* تفاصيل الاتصال */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                تفاصيل الاتصال
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoItem
                label="عنوان البريد الإلكتروني"
                value={supplier?.email ?? ""}
                icon={<Mail size={16} className="text-primary" />}
                isLoading={isPending}
              />
              <InfoItem
                label="رقم الهاتف"
                value={supplier?.phoneNumber ?? ""}
                icon={<Phone size={16} className="text-primary" />}
                isLoading={isPending}
              />
            </div>
          </div>

          {/* نبذة عن الشركة */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                نبذة عن الشركة
              </h3>
            </div>

            {isEditMode ? (
              <textarea
                {...form.register("description")}
                className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="أدخل نبذة عن الشركة"
              />
            ) : (
              <>
                {isPending ? (
                  <SkeletonItem className="h-10 w-40" />
                ) : (
                  <p className="text-sm text-gray-500">
                    {supplier?.description ?? "— لم يتم تقديم وصف —"}
                  </p>
                )}
              </>
            )}
          </div>

          {/* المواقع */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                مواقع شركتك
              </h3>
              {isEditMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendPons("")}
                  className="mt-2"
                >
                  <PlusCircleIcon size={16} /> إضافة موقع
                </Button>
              )}
            </div>

            <div className="space-y-3 min-h-[60px]">
              {ponsFields.length === 0 && !isPending ? (
                <p className="text-sm text-gray-500">لا توجد مواقع متاحة</p>
              ) : (
                ponsFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <MapPin
                      size={18}
                      className="text-gray-400 flex-shrink-0 mt-1"
                    />
                    {isEditMode ? (
                      <>
                        <input
                          {...form.register(`locations.${index}` as const)}
                          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="أدخل موقع الشركة"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removePons(index)}
                          className="ml-2"
                        >
                          حذف
                        </Button>
                      </>
                    ) : (
                      <div className="flex-1">
                        {isPending ? (
                          <SkeletonItem className="h-6 w-40" />
                        ) : (
                          supplier?.locations?.[index] || "موقع غير معروف"
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* فئات الخدمة */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                فئات الخدمة
              </h3>
              {/* {isEditMode && (
                <FormInfiniteMultiCombobox<
                  editSupplierInfoSchema,
                  ICategory
                >
                  name="categories"
                  label="الخدمات"
                  queryKey={["categories"]}
                  fetchFn={(pageNumber) =>
                    getCategories({
                      page: pageNumber,
                    })
                  }
                  getOptionLabel={(item) => item.categoryName}
                  getOptionValue={(item) => item.categoryId}
                />
              )} */}
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {(supplier?.categories ?? []).length === 0 ? (
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

          {/* أزرار التحكم */}
          <div className="mb-6 flex gap-3">
            {isEditMode ? (
              <>
                <Button
                  type="submit"
                  disabled={isUpdating || !form.formState.isDirty} // <-- التعديل هنا
                >
                  {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditMode(false);
                    // إعادة تعيين الفورم للحالة الأصلية عند الإلغاء
                    form.reset({
                      description: supplier?.description ?? "",
                      locations:
                        supplier?.locations?.filter((loc) => loc !== null) ??
                        [],
                      logoUrl: supplier?.logoUrl ?? null,
                    });
                  }}
                  className="border-2 bg-neutral-200 hover:bg-neutral-300"
                >
                  إلغاء
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="default"
                className="flex items-center gap-2"
                onClick={() => setIsEditMode(true)}
                disabled={isPending || isUpdating}
              >
                <PencilLine size={16} /> تعديل البيانات
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
