import { Mail, Phone } from "lucide-react";
import InfoItem from "./infoItem";

export default function AccountContactInfo({
  supplier,
  isPending,
}: {
  supplier?: ISupplierInfo;
  isPending: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">تفاصيل الاتصال</h3>
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
  );
}
