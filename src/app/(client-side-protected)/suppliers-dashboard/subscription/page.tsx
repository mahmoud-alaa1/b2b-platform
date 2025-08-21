import PricingSection from "@/app/(main)/(home)/_components/sections/PricingSection";
import { fetchPlans } from "@/services/plansServices";
import React from "react";

export default async function page() {
  const plans = await fetchPlans();
  return (
    <div className="space-y-8">
      <PricingSection plans={plans.data} />
    </div>
  );
}
