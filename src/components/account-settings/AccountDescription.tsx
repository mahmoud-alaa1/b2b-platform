import { UseFormReturn } from "react-hook-form";
import SkeletonItem from "./SkeletonItem";
import { editSupplierInfoSchemaType } from "@/schemas/accountSettingSchema";

export default function AccountDescription({
  form,
  supplier,
  isPending,
  isEditMode,
}: {
  form: UseFormReturn<editSupplierInfoSchemaType>;
  supplier?: ISupplierInfo;
  isPending: boolean;
  isEditMode: boolean;
}) {
  return (
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
  );
}
