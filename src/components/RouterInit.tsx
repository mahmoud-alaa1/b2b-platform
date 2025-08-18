"use client";
import { setRouterPush } from "@/utils/navigationHelper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouterInit() {
  const router = useRouter();
  useEffect(() => {
    setRouterPush(router.push);
  }, [router]);

  return null;
}
