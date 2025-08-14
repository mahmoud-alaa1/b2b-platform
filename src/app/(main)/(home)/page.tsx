import CategoriesSection from "@/components/HomePage/cartegory-section/CategoriesSection";
import HeroSection from "@/components/HomePage/HeroSection";
import { UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/services/categoriesServices"; 
import { CATEGORIES_PAGE_SIZE } from "@/lib/constants"; 

export const revalidate = 3600;

export default async function Home() {
  const initialCategoriesData = await getCategories({ page: 1, pageSize: CATEGORIES_PAGE_SIZE });

  return (
    <main className="max-w-7xl mx-auto px-6">
      <HeroSection />

      {/* suppliers section */}
      <h2 className="text-3xl mt-32 text-center font-bold text-gray-900 leading-tight">
        اجعل المشترين المناسبين يعثرون عليك
      </h2>
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16">
        <div className="flex flex-col justify-center ">
          <div className="flex gap-3 items-center ailgn-center">
            <span className="rounded-full bg-primary-foreground p-3">
              <UsersRound className="text-white" />
            </span>
            <p className="text-sm md:text-base leading-loose text-gray-600 mt-4">
              انضم إلى B2B للمطابقة الذكية وعرض المنتجات للمشترين الذين يبحثون
              عن فئتك
            </p>
          </div>

          <div className="flex gap-3 items-center ailgn-center">
            <span className="rounded-full bg-primary-foreground p-3">
              <UsersRound className="text-white" />
            </span>
            <p className="text-sm md:text-base leading-loose text-gray-600 mt-4">
              يمكنك التواصل مع المشترين عبر سوق طلبات التوريد لدينا والعثور على
              طلباتهم لإرسال عرض سعر المبيعات الخاص بك. إنه مزاد مفتوح حيث يمكن
              لكل عضو في B2B العثور على مشترين وتقديم عروض لكسب عملاء جدد.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/#"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-primary-foreground transition"
            >
              سجل شركتك الآن
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/supplier-section-image.png"
            alt="Illustration of B2B workflow"
            className="w-full max-w-md"
            loading="lazy"
            decoding="async"
            width={500}
            height={500}
          />
        </div>
      </section>

      {/* clients section */}
      <h2 className="text-3xl mt-32 text-center font-bold text-gray-900 leading-tight">
        مساحة مخصصة لنجاحك في التوريد
      </h2>
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16">
        <div className="flex items-center justify-center">
          <Image
            src="/client-section-image.png"
            alt="Illustration of B2B workflow"
            className="w-full"
            loading="lazy"
            decoding="async"
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-col justify-center ">
          <ul className="flex flex-col gap-4">
            <li className="text-sm md:text-base leading-loose text-gray-600 mt-4">
              الوصول الفوري إلى الموردين المتخصصين
            </li>
            <li className="text-sm md:text-base leading-loose text-gray-600 mt-4">
              اكتشف على الفور البائعين الموثوق بهم والمستعدين للاستجابة
              لاحتياجاتك.
            </li>
            <li className="text-sm md:text-base leading-loose text-gray-600 mt-4">
              أرسل طلب التوريد الخاص بك في دقائق
            </li>
            <li className="text-sm md:text-base leading-loose text-gray-600 mt-4">
              كل ما عليك فعله هو وصف طلبك - ودع الموردين يتنافسون لتقديم أفضل
              العروض لك.
            </li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/#"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-primary-foreground transition"
            >
              سجل شركتك الآن
            </Link>
          </div>
        </div>
      </section>

      {/* categories section */}
      <h2 className="text-3xl mt-32 mb-16 text-center font-bold text-gray-900 leading-tight">
        تعرف على الفئات المرتبطة بشركتك
      </h2>
      <CategoriesSection initialCategories={initialCategoriesData} />
    </main>
  );
}