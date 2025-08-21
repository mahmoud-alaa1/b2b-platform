"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/store/authStore";
import Loading from "../(main)/loading";

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
      }
    }
  }, [auth.hasHydrated, auth.user, router]);

  if (!auth.hasHydrated) {
    return <Loading />;
  }

  return children;
}
