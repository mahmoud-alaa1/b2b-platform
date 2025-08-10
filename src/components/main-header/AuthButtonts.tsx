"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, UserPlus } from "lucide-react";
import useAuth from "@/store/authStore";
import LogoutButton from "../LogoutButton";

export default function AuthButtonts() {

    const auth = useAuth();
    return (<div className="flex md:flex-row flex-col md:items-center gap-4">
        {auth.user ?
            <LogoutButton /> :
            <>
                <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                    asChild
                >
                    <Link href="/login" className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        تسجيل الدخول
                    </Link>
                </Button>
                <Button
                    className="  font-medium px-6 py-2 rounded-xl shadow-lg hover:shadow-xl text-white transition-all duration-200 transform "
                    asChild
                >
                    <Link href="/register" className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        إنشاء حساب
                    </Link>
                </Button>
            </>
        }
    </div>
    )
}
