"use client";

import Loading from "@/app/loading";
import SupplierDashboardHeader from "@/components/supplier-dashboard-layout.tsx/SupplierDashboardHeader";
import SupplierDashboardSidebar from "@/components/supplier-dashboard-layout.tsx/SupplierDashboardSidebar";
import useAuth from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.hasHydrated) {
      if (auth.user?.role !== "Suppliers") {
        router.replace("/");
      }
    }
  }, [auth.hasHydrated, auth.user, router]);

  if (!auth.hasHydrated) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-screen w-full">
      <div className="lg:col-span-2 hidden h-full lg:block">
        <SupplierDashboardSidebar />
      </div>
      <div className="lg:col-span-10">
        <SupplierDashboardHeader />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
