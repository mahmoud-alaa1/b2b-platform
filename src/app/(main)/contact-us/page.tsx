"use client";

import { motion } from "motion/react";
import { Send, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormInput from "@/components/forms-fields/FormInput";
import FormTextarea from "@/components/forms-fields/FormTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z.string().optional(),
    subject: z.string().min(5, "الموضوع مطلوب"),
    message: z.string().min(10, "الرسالة قصيرة جداً"),
});

type ContactFormData = z.infer<typeof contactSchema>;


export default function ContactUsPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = (data: ContactFormData) => {
        console.log("Contact form submitted:", data);
        setIsSubmitted(true);
        form.reset();

        setTimeout(() => setIsSubmitted(false), 5000);
    };

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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-gray-700 font-medium">نحن هنا لمساعدتك</span>
                        </motion.div>

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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative"
                        >
                            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
                                فريقنا جاهز لمساعدتك في{" "}
                                <span className="relative">
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                        تطوير أعمالك
                                    </span>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.8, delay: 1.2 }}
                                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50"
                                    />
                                </span>
                                . تواصل معنا واكتشف كيف يمكن لـ{" "}
                                <span className="relative">
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                                        SupplyFi Horeca
                                    </span>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.8, delay: 1.5 }}
                                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500/50 to-indigo-500/50"
                                    />
                                </span>
                                {" "}أن يحدث فرقاً في رحلتك التجارية
                            </p>
                        </motion.div>

                    </motion.div>


                </div>

                {/* Bottom wave decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            </section>


            {/* Contact Form & Info */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
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

                                {/* Success Message */}
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <p className="text-green-800 font-medium">
                                                تم إرسال رسالتك بنجاح! سنتواصل معك قريباً
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput<ContactFormData>
                                                control={form.control}
                                                name="name"
                                                label="الاسم الكامل"
                                                placeholder="أدخل اسمك الكامل"
                                            />
                                            <FormInput<ContactFormData>
                                                control={form.control}
                                                name="email"
                                                label="البريد الإلكتروني"
                                                placeholder="example@email.com"
                                                type="email"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput<ContactFormData>
                                                control={form.control}
                                                name="phone"
                                                label="رقم الهاتف (اختياري)"
                                                placeholder="01X XXX XXXX"
                                            />
                                            <FormInput<ContactFormData>
                                                control={form.control}
                                                name="subject"
                                                label="موضوع الرسالة"
                                                placeholder="كيف يمكننا مساعدتك؟"
                                            />
                                        </div>

                                        <FormTextarea<ContactFormData>
                                            control={form.control}
                                            name="message"
                                            label="الرسالة"
                                            placeholder="اكتب رسالتك هنا..."
                                            rows={6}
                                        />

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <Send className="w-5 h-5 ml-2" />
                                            إرسال الرسالة
                                        </Button>
                                    </form>
                                </Form>
                            </Card>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
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
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.div>
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
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}