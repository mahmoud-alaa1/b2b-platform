"use client";

import Loading from "@/app/loading";
import ClientDashboardHeader from "@/components/client-dashboard/ClientDashboardHeader";
import ClientDashboardSidebar from "@/components/client-dashboard/ClientDashboardSidebar";
import useAuth from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.hasHydrated) {
      if (auth.user?.role !== "Clients") {
        router.replace("/");
      }
    }
  }, [auth.hasHydrated, auth.user, router]);

  if (!auth.hasHydrated) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col w-full">
      <div className="lg:col-span-12 col-span-1 bg-white border-r border-gray-200">
        <ClientDashboardHeader />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        <div className="lg:col-span-3 col-span-1 lg:block hidden shadow-lg">
          <ClientDashboardSidebar />
        </div>
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
