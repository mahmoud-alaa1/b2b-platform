import React from "react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="flex py-10  flex-col items-center bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBg.svg')] bg-cover text-gray-800 pb-16 text-sm">
      <h1 className="text-4xl md:text-6xl text-center font-medium max-w-3xl my-5 bg-gradient-to-r from-primary to-black text-transparent bg-clip-text">
        ابداء بالتواصل، ووسّع شبكتك
      </h1>
      <p className="text-slate-600 leading-7 md:text-base max-md:px-2 text-center max-w-xl mt-3">
        أربط شركتك بالموردين والمستوردين في عالم الضيافة والمطاعم . ابدأ
        بالتواصل، ووسّع شبكتك، وانطلق نحو شراكات ناجحة وفرص نمو حقيقية!
      </p>

      <Button className="flex  shadow-lg hover:shadow-xl   duration-200 transform cursor-pointer text-white px-6 py-3 rounded-full font-medium text-sm items-center gap-2  mt-8 transition">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.166 10h11.667m0 0L9.999 4.167M15.833 10l-5.834 5.834"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>انضم الآن</span>
      </Button>
    </section>
  );
}
