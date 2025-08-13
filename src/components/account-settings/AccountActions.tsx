import { PencilLine } from "lucide-react";
import { Button } from "../ui/button";
import { editSupplierInfoSchemaType } from "@/schemas/accountSettingSchema";
import { UseFormReturn } from "react-hook-form";

export default function AccountActions({
  isEditMode,
  setIsEditMode,
  form,
  isUpdating,
  isPending,
  resetFormWithSupplier,
}: {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  form: UseFormReturn<editSupplierInfoSchemaType>;
  isUpdating: boolean;
  isPending: boolean;
  resetFormWithSupplier: () => void;
}) {
  return (
    <div className="mb-6 flex gap-3">
      {isEditMode ? (
        <>
          <Button
            type="submit"
            disabled={isUpdating || !form.formState.isDirty}
          >
            {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsEditMode(false);
              resetFormWithSupplier();
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
  );
}
