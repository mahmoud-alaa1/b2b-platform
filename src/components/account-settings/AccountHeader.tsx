import { CheckCircle, MapPin, Pencil, Tag } from "lucide-react";
import StatsCard from "../StatsCard";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

export default function AccountHeader({
  supplier,
  isPending,
  logoPreview,
  setLogoPreview,
  patchLogo,
  isUploadingLogo,
}: {
  supplier?: ISupplierInfo;
  isPending: boolean;
  logoPreview: string | null;
  setLogoPreview: (v: string | null) => void;
  patchLogo: (file: File) => void;
  isUploadingLogo: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative w-20 h-20">
          {isPending ? (
            <Skeleton className="w-20 h-20 rounded-full" />
          ) : (
            <Image
              suppressHydrationWarning
              src={logoPreview || supplier?.logoUrl || ""}
              alt={supplier?.name ?? "شعار"}
              width={80}
              height={80}
              className="object-cover rounded-full w-20 h-20 border"
              priority
            />
          )}

          <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100">
            <Pencil size={14} className="text-primary" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLogoPreview(URL.createObjectURL(file));
                  patchLogo(file);
                }
              }}
            />
          </label>

          {isUploadingLogo && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
              <Skeleton className="w-20 h-20 rounded-full" />
            </div>
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="الطلبات المقبولة"
          value={supplier ? supplier.countOfOrderAccepted ?? 0 : 0}
          icon={<CheckCircle className="w-5 h-5 text-white" />}
          color="from-green-400 to-green-600"
        />
        <StatsCard
          title="فئات الخدمة"
          value={supplier ? (supplier.categories ?? []).length : 0}
          icon={<Tag className="w-5 h-5 text-white" />}
          color="from-blue-400 to-blue-600"
        />
        <StatsCard
          title="المواقع"
          value={
            supplier ? (supplier.locations ?? []).filter(Boolean).length : 0
          }
          icon={<MapPin className="w-5 h-5 text-white" />}
          color="from-red-400 to-red-600"
        />
      </div>
    </div>
  );
}
