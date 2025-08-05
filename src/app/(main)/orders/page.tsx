import OrderForm from "@/components/forms/OrderForm";
import HeroSection from "@/components/orders/HeroSection";
import React from "react";

export default function page() {
  return (
    <div className="">
      <HeroSection />

      <OrderForm />
    </div>
  );
}
