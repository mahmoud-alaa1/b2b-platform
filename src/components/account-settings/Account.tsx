"use client";
import useGetSupplierInfo from "@/hooks/supplier-profile/useGetSupplierInfo";
import usePatchSupplierInfo from "@/hooks/supplier-profile/usePatchSupplierInfo";
import usePatchSupplierLogo from "@/hooks/supplier-profile/usePatchSupplierLogo";
import {
  editSupplierInfoSchema,
  editSupplierInfoSchemaType,
} from "@/schemas/accountSettingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import AccountHeader from "./AccountHeader";
import AccountContactInfo from "./AccountContactInfo";
import AccountDescription from "./AccountDescription";
import AccountLocations from "./AccountLocations";
import AccountCategories from "./AccountCategories";
import AccountActions from "./AccountActions";
import { useCallback, useEffect, useState } from "react";
import { Building2 } from "lucide-react";

export default function Account() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { data, isPending } = useGetSupplierInfo();
  const { mutate, isPending: isUpdating } = usePatchSupplierInfo();
  const { mutate: patchLogo, isPending: isUploadingLogo } =
    usePatchSupplierLogo();

  const form = useForm<editSupplierInfoSchemaType>({
    resolver: zodResolver(editSupplierInfoSchema),
    defaultValues: { description: "", locations: [], logoUrl: null },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    //@ts-expect-error i know this is a string array
    name: "locations",
  });

  const supplier = data?.data;

  const resetFormWithSupplier = useCallback(() => {
    form.reset({
      description: supplier?.description ?? "",
      locations: supplier?.locations?.filter(Boolean) ?? [],
      logoUrl: supplier?.logoUrl ?? null,
    });
  }, [supplier, form]);

  useEffect(() => {
    if (supplier) resetFormWithSupplier();
  }, [supplier, resetFormWithSupplier]);

  const onSubmit = (values: editSupplierInfoSchemaType) => {
    mutate(values, {
      onSuccess() {
        setIsEditMode(false);
        form.reset(values);
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Building2 className="w-12 h-12 text-indigo-600" />
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              ملف شركتك
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              نظرة عامة ومعلومات عن شركتك
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AccountHeader
            supplier={supplier}
            isPending={isPending}
            logoPreview={logoPreview}
            setLogoPreview={setLogoPreview}
            patchLogo={patchLogo}
            isUploadingLogo={isUploadingLogo}
          />

          {/* <AccountStats supplier={supplier} /> */}

          <AccountContactInfo supplier={supplier} isPending={isPending} />

          <AccountDescription
            form={form}
            supplier={supplier}
            isPending={isPending}
            isEditMode={isEditMode}
          />

          <AccountLocations
            form={form}
            supplier={supplier}
            isPending={isPending}
            isEditMode={isEditMode}
            fields={fields}
            append={append}
            remove={remove}
          />

          <AccountCategories supplier={supplier} isPending={isPending} />

          <AccountActions
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            form={form}
            isUpdating={isUpdating}
            isPending={isPending}
            resetFormWithSupplier={resetFormWithSupplier}
          />
        </form>
      </Form>
    </div>
  );
}
