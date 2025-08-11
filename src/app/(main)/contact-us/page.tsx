"use client";

import { MessageCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import ContactUsForm from "@/components/forms/ContactUsForm";


export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
            {/* Hero Section */}
            {/* Stunning Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-blue-600/20" />
                    {/* Animated geometric shapes */}
                    <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />

                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div

                        className="text-center max-w-5xl mx-auto"
                    >
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-gray-700 font-medium">نحن هنا لمساعدتك</span>
                        </div>
                        <div

                            className="relative mb-8"
                        >
                            <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 relative">
                                <span className="relative bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                                    تواصل معنا
                                </span>
                            </h1>
                            <div
                                className="h-1 w-30 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
                            />
                        </div>

                        {/* Description with typewriter effect */}
                        <div

                            className="relative"
                        >
                            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
                                فريقنا جاهز لمساعدتك في
                                <span className="relative">
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                        تطوير أعمالك
                                    </span>
                                    <span
                                        className="absolute block bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50"
                                    />
                                </span>
                                . تواصل معنا واكتشف كيف يمكن لـ
                                <span className="relative">
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                                        SupplyFi Horeca
                                    </span>
                                    <span

                                        className="absolute block bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500/50 to-indigo-500/50"
                                    />
                                </span>
                                أن يحدث فرقاً في رحلتك التجارية
                            </p>
                        </div>

                    </div>


                </div>

                {/* Bottom wave decoration */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent" />
            </section>


            {/* Contact Form & Info */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <div

                        >
                            <Card className="p-8 shadow-xl">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                        أرسل لنا رسالة
                                    </h2>
                                    <p className="text-gray-600">
                                        املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                                    </p>
                                </div>

                                <ContactUsForm />

                            </Card>
                        </div>

                        {/* Additional Info */}
                        <div

                            className="space-y-8"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    لماذا تختار SupplyFi Horeca؟
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "منصة آمنة وموثوقة للتعاملات التجارية",
                                        "دعم فني متخصص على مدار الساعة",
                                        "شبكة واسعة من الموردين المعتمدين",
                                        "أدوات ذكية لإدارة العمليات",
                                        "أسعار تنافسية وشفافية كاملة"
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">دعم سريع</h4>
                                        <p className="text-gray-600 text-sm">نرد خلال 24 ساعة</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    فريق الدعم لدينا جاهز لمساعدتك في أي استفسار.
                                    نحن نؤمن بأهمية الدعم السريع والفعال لضمان نجاح أعمالك.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}