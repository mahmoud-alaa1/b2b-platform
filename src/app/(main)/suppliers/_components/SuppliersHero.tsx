import { Award, CheckCircle } from 'lucide-react'
import React from 'react'

export default function SuppliersHero() {
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200-50-500/10 to-purple-200/60" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div

                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6 py-2">
                        ابحث عن أفضل الموردين
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        اكتشف شبكة واسعة من الموردين المعتمدين والموثوقين في قطاع الضيافة.
                        موردين متخصصين للفنادق والمطاعم والمقاهي مع ضمان الجودة والسعر المناسب.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            موردين معتمدين
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-500" />
                            ضمان الجودة
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
