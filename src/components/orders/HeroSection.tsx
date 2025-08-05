import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] px-3 sm:px-10 py-12">
      <main className=" max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6">
        {/* Text Section */}
        <div className="text-right">
          <h2 className="text-gray-900 font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            أرسل طلبك، وسيصل إلى الموردين
            <span className="text-indigo-600"> فورًا ! </span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
            قم بإرسال طلب المنتج الخاص بك واحصل على أفضل الموردين في ثوانٍ.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/Order-page-hero-section.png"
            alt="Industry banner"
            width={600}
            height={400}
            className="w-full max-w-md rounded-2xl md:max-w-lg lg:max-w-xl h-auto object-contain"
            priority
          />
        </div>
      </main>
    </section>
  );
}
