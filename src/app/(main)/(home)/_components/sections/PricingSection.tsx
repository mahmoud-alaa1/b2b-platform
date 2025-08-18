import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  ArrowLeft,
  Package,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

interface PricingSectionProps {
  plans: IPlan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  // Helper function to get plan icon based on price or name
  const getPlanIcon = (plan: IPlan, index: number) => {
    if (plan.price === 0) return Package;
    if (
      index === 1 ||
      plan.planName.toLowerCase().includes("متقدم") ||
      plan.planName.toLowerCase().includes("pro")
    )
      return Star;
    if (
      plan.price >= 1000 ||
      plan.planName.toLowerCase().includes("احترافي") ||
      plan.planName.toLowerCase().includes("premium")
    )
      return Crown;
    return Briefcase;
  };

  // Helper function to get plan colors based on price or index
  const getPlanColors = (plan: IPlan, index: number) => {
    if (plan.price === 0) {
      return {
        bgColor: "from-slate-50 to-slate-100",
        color: "from-slate-500 to-slate-600",
      };
    }

    const colorSchemes = [
      {
        bgColor: "from-blue-50 to-indigo-100",
        color: "from-blue-500 to-indigo-600",
      },
      {
        bgColor: "from-indigo-50 to-purple-100",
        color: "from-indigo-500 to-purple-600",
      },
      {
        bgColor: "from-purple-50 to-violet-100",
        color: "from-purple-500 to-violet-600",
      },
    ];

    return colorSchemes[index % colorSchemes.length];
  };

  const isPopular = (plan: IPlan, index: number, allPlans: IPlan[]) => {
    if (allPlans.length === 3 && index === 1) return true;

    return (
      plan.planName.toLowerCase().includes("متقدم") ||
      plan.planName.toLowerCase().includes("pro") ||
      plan.planName.toLowerCase().includes("شعبي")
    );
  };

  const formatDuration = (duration: number) => {
    if (duration === 1) return "شهر";
    if (duration <= 10) return `${duration} أشهر`;
    if (duration === 12) return "سنة";
    if (duration === 24) return "سنتين";
    return `${duration} شهر`;
  };

  const sortedPlans = [...plans].sort((a, b) => {
    if (a.price === 0 && b.price > 0) return -1;
    if (b.price === 0 && a.price > 0) return 1;
    return a.price - b.price;
  });

  if (!plans || plans.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-br from-white to-indigo-50/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            خطط الأسعار
          </h2>
          <p className="text-slate-600">لا توجد خطط متاحة حالياً</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white to-indigo-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full blur-3xl" />
      </div>

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

        <div
          className={`grid grid-cols-1 gap-8 max-w-6xl mx-auto ${
            sortedPlans.length === 1
              ? "md:grid-cols-1 max-w-md"
              : sortedPlans.length === 2
              ? "md:grid-cols-2 max-w-4xl"
              : "lg:grid-cols-3"
          }`}>
          {sortedPlans.map((plan, index) => {
            const PlanIcon = getPlanIcon(plan, index);
            const colors = getPlanColors(plan, index);
            const popular = isPopular(plan, index, sortedPlans);

            return (
              <div key={plan.id} className="relative">
                <Card
                  className={`relative border-2 transition-all duration-300 h-full hover:shadow-2xl hover:-translate-y-1 ${
                    popular
                      ? "border-indigo-300 shadow-xl shadow-indigo-500/20 scale-105"
                      : "border-indigo-200 shadow-lg hover:border-indigo-300"
                  }`}>
                  {popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        الأكثر شعبية
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-0">
                    {/* Header */}
                    <div
                      className={`bg-gradient-to-br ${colors.bgColor} p-8 border-b border-slate-100`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${colors.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <PlanIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">
                            {plan.planName}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {formatDuration(plan.duration)}
                          </p>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-6 line-clamp-2">
                        {plan.description}
                      </p>

                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          {plan.price === 0
                            ? "مجاني"
                            : `${plan.price.toLocaleString("ar-SA")} ج`}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-slate-600">
                            / {formatDuration(plan.duration)}
                          </span>
                        )}
                      </div>

                      {/* Price per month calculation */}
                      {plan.price > 0 && plan.duration > 1 && (
                        <p className="text-sm text-slate-500 mt-1">
                          (
                          {Math.round(
                            plan.price / plan.duration
                          ).toLocaleString("ar-SA")}{" "}
                          ج/شهر)
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="p-8">
                      {/* Pros */}
                      {plan.pros && plan.pros.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            المميزات
                          </h4>
                          <ul className="space-y-3">
                            {plan.pros.map((pro, proIndex) => (
                              <li
                                key={proIndex}
                                className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-slate-700 text-sm leading-relaxed">
                                  {pro}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Cons */}
                      {plan.cons && plan.cons.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <X className="w-4 h-4 text-red-500" />
                            القيود
                          </h4>
                          <ul className="space-y-3">
                            {plan.cons.map((con, conIndex) => (
                              <li
                                key={conIndex}
                                className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-slate-600 text-sm leading-relaxed">
                                  {con}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link href={`/register`}>
                        <Button
                          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                            popular
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 hover:border-slate-300"
                          }`}>
                          {plan.price === 0 ? "ابدأ مجاناً" : "اشترك الآن"}
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            جميع الخطط تشمل ضمان استرداد المال خلال 30 يوم •{" "}
            <button className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2">
              اتصل بنا للمساعدة
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
