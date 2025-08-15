"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { Check, Star, Zap, Crown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const plans = [
    {
        name: "مجاني",
        nameEn: "Free",
        price: 0,
        period: "دائمًا",
        description: "للشركات الناشئة والمطاعم الصغيرة",
        features: [
            "5 طلبات توريد شهريًا",
            "الوصول لأساسيات الموردين",
            "دعم عبر البريد الإلكتروني",
            "تقارير أساسية"
        ],
        cta: "ابدأ مجانًا",
        popular: false,
        icon: Star,
        color: "from-slate-500 to-slate-600",
        bgColor: "from-slate-50 to-slate-100"
    },
    {
        name: "الأساسي",
        nameEn: "Basic",
        price: 700,
        period: "شهريًا",
        description: "للمطاعم والكافيهات المتوسطة",
        features: [
            "25 طلب توريد شهريًا",
            "إظهار مميز للمنتجات",
            "تحليلات متقدمة للمبيعات",
            "دعم هاتفي على مدار الساعة",
            "إدارة الموردين المفضلين",
            "تقارير مفصلة"
        ],
        cta: "جرّب 14 يوم مجانًا",
        popular: true,
        icon: Zap,
        color: "from-indigo-500 to-purple-600",
        bgColor: "from-indigo-50 to-purple-50"
    },
    {
        name: "المتقدم",
        nameEn: "Premium",
        price: 1000,
        period: "شهريًا",
        description: "للفنادق والسلاسل الكبيرة",
        features: [
            "طلبات توريد غير محدودة",
            "مدير حساب مخصص",
            "تكامل مع أنظمة ERP",
            "تحليلات وتقارير متطورة",
            "إدارة متعددة المواقع",
            "تدريب مخصص للفريق",
            "أولوية في الدعم الفني"
        ],
        cta: "تحدث مع المبيعات",
        popular: false,
        icon: Crown,
        color: "from-purple-500 to-violet-600",
        bgColor: "from-purple-50 to-violet-50"
    }
];

export default function PricingSection() {
    const [selectedPlan, setSelectedPlan] = useState(1);

    return (
        <section className="py-24 bg-gradient-to-br from-white to-indigo-50/30 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
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
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            onHoverStart={() => setSelectedPlan(index)}
                            className="relative"
                        >
                            <Card className={`relative overflow-hidden border-2 transition-all duration-300 h-full ${plan.popular
                                    ? 'border-indigo-300 shadow-xl shadow-indigo-500/20'
                                    : selectedPlan === index
                                        ? 'border-indigo-200 shadow-lg'
                                        : 'border-slate-200 shadow-md hover:border-indigo-200 hover:shadow-lg'
                                }`}>
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            الأكثر شعبية
                                        </Badge>
                                    </div>
                                )}

                                <CardContent className="p-0">
                                    {/* Header */}
                                    <div className={`bg-gradient-to-br ${plan.bgColor} p-8 border-b border-slate-100`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                                <plan.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                                                <p className="text-sm text-slate-600">{plan.nameEn}</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 mb-6">{plan.description}</p>

                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-slate-900">
                                                {plan.price === 0 ? 'مجاني' : `${plan.price.toLocaleString('ar-SA')} ج`}
                                            </span>
                                            {plan.price > 0 && (
                                                <span className="text-slate-600">/ {plan.period}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="p-8">
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, featureIndex) => (
                                                <motion.li
                                                    key={featureIndex}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-slate-700">{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <Button
                                            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.popular
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            {plan.cta}
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-slate-600">
                        جميع الخطط تشمل ضمان استرداد المال خلال 30 يوم •{' '}
                        <Button variant="link" className="text-indigo-600 hover:text-indigo-700 p-0 h-auto">
                            مقارنة مفصلة للخطط
                        </Button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}