import { editSupplierInfoSchemaType } from "@/schemas/accountSettingSchema";
import { patchSupplierInfo } from "@/services/accountSettingServices";
import useAuth from "@/store/authStore";
import useOptimisticUpdate from "../useOptimisticUpdate";

export default function usePatchSupplierInfo() {
  const id = useAuth((state) => state.user?.id);
  return useOptimisticUpdate<
    IAccountInfoPatchResponse,
    editSupplierInfoSchemaType
  >({
    updateFn: (data) => patchSupplierInfo(id!, data),
    queryKey: ["supplier", id],
    messages: {
      success: "تم تحديث بيانات شركتك بنجاح",
      error: "حدث خطأ أثناء تحديث بيانات شركتك",
    },
    matcher: (supplier) => supplier.id === id,
    updater: (supplier, input) => ({
      ...supplier,
      ...Object.fromEntries(
        Object.entries(input).filter(
          ([, value]) => value !== undefined && value !== null
        )
      ),
    }),
  });
}
