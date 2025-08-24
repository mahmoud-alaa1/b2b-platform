import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import PlanCardList from "../../../../../../../components/plan-cards/PlanCardList";

export default function PricingSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-white to-indigo-50/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-indigo-200/50">
            <Zap className="w-4 h-4 mr-1" />
            خطط مرنة لكل حجم أعمال
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            اختر الخطة المناسبة لك
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ابدأ مجانًا وارتقِ مع نمو أعمالك - أسعار شفافة بدون مفاجآت
          </p>
        </div>

        <PlanCardList />

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            جميع الخطط تشمل ضمان استرداد المال خلال 30 يوم
          </p>
        </div>
      </div>
    </section>
  );
}
