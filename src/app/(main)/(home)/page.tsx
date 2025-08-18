import { Metadata } from "next";
import HeroSection from "@/pages/landing/sections/HeroSection";
import HowItWorksSection from "@/pages/landing/sections/HowItWorksSection";
import ValuePropositionSection from "@/pages/landing/sections/ValuePropositionSection/ValuePropositionSection";

import FAQSection from "@/pages/landing/sections/FAQSection";
import CTASection from "@/pages/landing/sections/CTASection";
import StructuredData from "@/pages/landing/StructuredData";
import { getCategoriesServer } from "@/services/categoriesServices";
import Categories from "@/pages/landing/sections/categories-section/Categories";
import { fetchAdvertisements } from "@/services/advertisementsServices";
import CarouselSection from "@/components/CarouselSection";

export const metadata: Metadata = {
  title: "منصة SupplyFi Horeca | ابحث عن الموردين وقدّم RFQ خلال دقائق",
  description:
    "منصة B2B متطورة تربط الفنادق والمطاعم والمقاهي بموردين موثوقين. احصل على عروض أسعار فورية، وفّر حتى 40% من الوقت، وزيد كفاءة التوريد.",
  keywords: "B2B, موردين, فنادق, مطاعم, مقاهي, هوريكا, عروض أسعار, RFQ, توريد",
  authors: [{ name: "SupplyFi Team" }],
  openGraph: {
    title: "منصة SupplyFi Horeca | ثورة في التوريد للضيافة",
    description:
      "اكتشف آلاف الموردين الموثوقين، احصل على عروض أسعار تنافسية خلال دقائق",
    type: "website",
    locale: "ar_EG",
    siteName: "SupplyFi Horeca",
    images: [
      {
        url: "/placeholder.webp",
        width: 1200,
        height: 630,
        alt: "منصة SupplyFi Horeca",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "index": true,
      "follow": true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  const categories = await getCategoriesServer();
  const advertisements = await fetchAdvertisements();
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <CarouselSection advertisements={advertisements} />
        <HeroSection />
        <HowItWorksSection />
        <Categories categories={categories} />
        <ValuePropositionSection />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
}
