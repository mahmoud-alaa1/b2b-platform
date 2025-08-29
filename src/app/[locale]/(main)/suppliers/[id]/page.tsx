import React from "react";
import SupplierHero from "./_components/SupplierHero";
import SupplierSidebar from "./_components/SupplierSidebar";
import { getSupplierInfo } from "@/services/accountSettingServices";
import { getSupplierProductsAndReviews } from "@/services/suppliersServices";
import { notFound } from "next/navigation";
import ProductList from "./_components/ProductList";
import SupplierReviews from "./_components/SupplierReviews";
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const supplier = await getSupplierInfo(Number((await params).id));

    if (!supplier) {
      return {
        title: "مورد غير موجود | SupplyFi Horeca",
        description: "لم يتم العثور على المورد المطلوب.",
        robots: { index: false },
      };
    }

    return {
      title: `${supplier.name} | SupplyFi Horeca`,
      description: `اكتشف منتجات وخدمات المورد ${supplier.name} مع تقييمات حقيقية من العملاء.`,
      keywords: `${supplier.name}, موردين, SupplyFi, Horeca`,
      openGraph: {
        title: `${supplier.name} | SupplyFi Horeca`,
        description: `صفحة المورد ${supplier.name} مع المنتجات والتقييمات.`,
        type: "profile",
        locale: "ar_SA",
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `/suppliers/${(await params).id}`,
      },
    };
  } catch {
    return {
      title: "خطأ في تحميل المورد | SupplyFi Horeca",
      description: "حدث خطأ أثناء تحميل بيانات المورد.",
      robots: { index: false },
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supplier = await getSupplierInfo(Number(id));

  if (!supplier) {
    notFound();
  }

  const supplierProductsAndReviews = await getSupplierProductsAndReviews(
    Number(id)
  );

  return (
    <>
      <main className="mb-10 bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 min-h-full relative overflow-hidden">
        <div className="flex flex-col gap-8">
          <SupplierHero supplier={supplier} />
        </div>
      </main>

      <div className="container flex flex-col md:flex-row gap-6 mt-8 px-4 md:px-16">
        <div className="flex-1">
          <ProductList products={supplierProductsAndReviews.products} />
          <SupplierReviews
            allReviews={supplierProductsAndReviews.allReviews}
          />

          <div className="block md:hidden mt-6">
            <SupplierSidebar supplier={supplier} />
          </div>
        </div>

        <div className="hidden md:block w-80 flex-shrink-0 self-start sticky top-20">
          <SupplierSidebar supplier={supplier} />
        </div>
      </div>
    </>
  );
}
