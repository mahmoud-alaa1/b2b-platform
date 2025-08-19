"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { clearState } from "@/lib/utils";

export default function LogoutButton() {
  return (
    <Button
      variant="default"
      className="font-medium transition "
      asChild
      onClick={clearState}>
      <Link href="/login" className="flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        تسجيل الخروج
      </Link>
    </Button>
  );
}
