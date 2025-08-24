"use client";
import { useEffect } from "react";
import useAuth from "@/store/authStore";
import Loading from "../(main)/loading";
import { useRouter } from "@/i18n/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.hasHydrated) {
      if (!auth.user) {
        router.replace("/login");
      } else {
        if (auth.user?.role === "Suppliers") {
          router.replace("/suppliers-dashboard/orders");
        } else {
          router.replace("/clients-dashboard/overview");
        }
      }
    }
  }, [auth.hasHydrated, auth.user, router]);

  if (!auth.hasHydrated) {
    return <Loading />;
  }

  return children;
}
