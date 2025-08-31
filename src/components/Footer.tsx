import { Link } from "@/i18n/navigation";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="bg-gradient-to-tr from-purple-900 via-purple-700 to-purple-500 text-white py-8 px-4  shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Vision */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            SupplifyHub
          </span>
          <span className="text-xs text-indigo-100 max-w-xs text-center md:text-right">
            منصة رقمية تربط الموردين بأصحاب الأعمال وتدعم نمو قطاع الأعمال B2B
            بكفاءة واحترافية.
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="فيسبوك"
            className="hover:bg-white/10 p-2 rounded-full transition">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تويتر"
            className="hover:bg-white/10 p-2 rounded-full transition">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="انستجرام"
            className="hover:bg-white/10 p-2 rounded-full transition">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="لينكدإن"
            className="hover:bg-white/10 p-2 rounded-full transition">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-indigo-400/20 pt-4 text-lg text-indigo-100 text-center">
        © {new Date().getFullYear()} منصة SupplifyHub. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
