import { Metadata } from "next";

export const suppliersMetadata: Metadata = {
  title: "البحث عن الموردين | SupplyFi Horeca",
  description:
    "ابحث عن أفضل الموردين المعتمدين. مئات الموردين الموثوقين مع تقييمات حقيقية وأسعار تنافسية.",
  keywords: [
    "موردين",
    "فنادق",
    "مطاعم",
    "مقاهي",
    "موردين معتمدين",
    "SupplyFi Horeca",
    "قطاع الضيافة",
    "موردين موثوقين",
  ].join(", "),
  openGraph: {
    title: "البحث عن الموردين | SupplyFi Horeca",
    description: "ابحث عن أفضل الموردين المعتمدين",
    type: "website",
    locale: "ar_EG",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/suppliers",
  },
};
