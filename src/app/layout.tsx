import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import RouterInit from "@/components/RouterInit";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة Supplify | تسهيل الأعمال التجارية بين الشركات",
  description:
    "منصة Supplify هي منصة متكاملة لتسهيل الأعمال التجارية بين الشركات (B2B)، حيث يمكن للشركات العثور على الموردين والعملاء بسهولة وسرعة.",
  keywords: [
    "منصة B2B",
    "تجارة بين الشركات",
    "Supplify",
    "موردين",
    "عملاء",
    "بيع بالجملة",
    "استيراد وتصدير",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    siteName: "منصة Supplify",
    title: "منصة Supplify | تسهيل الأعمال التجارية بين الشركات",
    description:
      "منصة متكاملة لربط الموردين والعملاء، وتسهيل عمليات البيع والشراء بين الشركات.",
    images: [
      {
        url: "/placeholder.webp",
        width: 1200,
        height: 630,
        alt: "منصة Supplify",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${cairo.className} antialiased`}>
          <Providers>{children}</Providers>
          <Toaster />
          <RouterInit />
      </body>
    </html>
  );
}
