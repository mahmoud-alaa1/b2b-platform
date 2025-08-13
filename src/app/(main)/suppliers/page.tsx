
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "البحث عن الموردين | SupplyFi Horeca",
    description: "ابحث عن أفضل الموردين المعتمدين للفنادق والمطاعم والمقاهي. مئات الموردين الموثوقين مع تقييمات حقيقية وأسعار تنافسية.",
    keywords: [
        "موردين",
        "فنادق",
        "مطاعم",
        "مقاهي",
        "موردين معتمدين",
        "SupplyFi Horeca",
        "قطاع الضيافة",
        "موردين موثوقين"
    ].join(", "),
    openGraph: {
        title: "البحث عن الموردين | SupplyFi Horeca",
        description: "ابحث عن أفضل الموردين المعتمدين للفنادق والمطاعم والمقاهي",
        type: "website",
        locale: "ar_SA",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/suppliers"
    }
};

import SuppliersHero from "./_components/SuppliersHero";
import { fetchSuppliers } from "@/services/suppliersServices";
import SuppliersMainContent from "./_components/SuppliersMainContent";
import { SUPPLIERS_PAGE_SIZE } from "@/lib/constants";


// Main Component
export default async function SuppliersSearchClient({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {


    const suppliersFilters = await searchParams;

    const suppliers = await fetchSuppliers({
        ...suppliersFilters,
        pageSize: SUPPLIERS_PAGE_SIZE,
    });

    console.log(`the server suppliers`, suppliers)

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
            <SuppliersHero />

            {/* Main Content */}
            <SuppliersMainContent initialSuppliers={suppliers} />

        </div>
    );
}