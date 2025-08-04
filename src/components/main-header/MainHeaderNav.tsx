import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, UserPlus } from "lucide-react";

const HEADER_LINKS = [
    { href: "/", label: "الرئيسية" },
    { href: "/services", label: "الخدمات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "اتصل بنا" },
];
export default function MainHeaderNav() {
    return (
        <>
            <nav className="flex md:flex-row flex-col md:items-center  gap-4">
                {HEADER_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                    >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </nav>

            <div className="flex md:flex-row flex-col md:items-center gap-4">
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
            </div>
        </>
    )
}
