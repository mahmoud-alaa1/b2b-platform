
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import useAuth from "@/store/authStore";

export default function LogoutButton() {

    const logout = useAuth((s) => s.logout);
    return (
        <Button
            variant="default"
            className="font-medium transition "
            asChild
            onClick={logout}
        >
            <Link href="/login" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
            </Link>
        </Button>
    )
}
