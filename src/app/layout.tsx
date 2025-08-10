import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import RouterInit from "@/components/RouterInit";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
  title: "منصة B2B",
  description: "منصة B2B - منصة متكاملة لتسهيل الأعمال التجارية بين الشركات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={` ${cairo.variable} ${cairo.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
        <RouterInit />
      </body>
    </html>
  );
}
