import { Metadata } from "next";
import { fetchSuppliers } from "@/services/suppliersServices";
import { SUPPLIERS_PAGE_SIZE } from "@/lib/constants";
import SuppliersHero from "./_components/SuppliersHero";
import SuppliersMainContent from "./_components/SuppliersMainContent";

export const revalidate = 60;

export const metadata: Metadata = {
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

export default async function SuppliersPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const suppliers = await fetchSuppliers({
        ...(await searchParams),
        pageSize: SUPPLIERS_PAGE_SIZE,
    });

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
            dir="rtl"
        >
            <SuppliersHero />
            <SuppliersMainContent initialSuppliers={suppliers} />
        </div>
    );
}
