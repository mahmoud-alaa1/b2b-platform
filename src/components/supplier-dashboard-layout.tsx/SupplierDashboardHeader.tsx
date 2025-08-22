import UserDropdown from "../UserDropdown";
import SupplierDashboardSidebarV2 from "./SupplierDashboardSidebarV2";

export default function SupplierDashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 p-4 sticky z-50 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="lg:hidden block">
            <SupplierDashboardSidebarV2 />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            مرحباً، أحمد محمد
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
