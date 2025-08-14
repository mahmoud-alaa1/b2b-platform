import { Metadata } from "next";
import { fetchSuppliers } from "@/services/suppliersServices";
import { SUPPLIERS_PAGE_SIZE } from "@/lib/constants";
import SuppliersHero from "./_components/SuppliersHero";
import SuppliersMainContent from "./_components/SuppliersMainContent";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Button } from "@/components/ui/button";

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
            <ScrollToTopButton />
            <div
                className="mt-12 text-center"
            >
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        لا تجد المورد المناسب؟
                    </h3>
                    <p className="text-gray-600 mb-6">
                        يمكنك طلب عرض أسعار مخصص أو تصفية النتائج بشكل أكثر دقة
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                            طلب عرض سعر مخصص
                        </Button>
                        <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                            تحسين البحث
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
