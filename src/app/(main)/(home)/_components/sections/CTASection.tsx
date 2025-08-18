import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  TrendingUp,
  CheckCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  "تسجيل مجاني خلال دقيقتين",
  "عروض أسعار خلال 15 دقيقة",
  "دعم فني 24/7",
];

const stats = [
  { icon: Clock, value: "75%", label: "توفير في الوقت" },
  { icon: TrendingUp, value: "30%", label: "توفير في التكاليف" },
];

export default function CTASection() {
  return (
    <section className="py-24  bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white mb-8 border border-white/30">
            <Sparkles className="w-4 h-4" />
            <span>العرض محدود الوقت</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-24 mb-6">
            جاهز لثورة في التوريد؟
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              ابدأ مجانا اليوم
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            انضم لآلاف الشركات التي تستخدم SupplyFi وابدأ في توفير الوقت والمال
            من أول طلب
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-right">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 group"
              >
                <Zap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                <span>ابدأ مجاناً الآن</span>
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
                <p className="text-indigo-100 font-medium text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center my-16">
          <p className="text-indigo-200 text-sm mb-4">
            موثوق من قبل أكبر الشركات في المنطقة
          </p>
        </div>
      </div>
    </section>
  );
}
