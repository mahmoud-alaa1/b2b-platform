
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Search, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';




export default function HeroSection() {


  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600/5  to-slate-900/5"
        />
        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-3xl blur-xl"
        />
        <div
          className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-500/20 rounded-full blur-lg"
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div
          className="max-w-5xl mx-auto"
        >
          <Badge
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-indigo-700 mb-8 border border-indigo-200/50"
          >
            <Zap className="w-4 h-4" />
            <span>منصة التوريد الذكية </span>
          </Badge>

          <h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-indigo-700 to-purple-600 bg-clip-text text-transparent leading-tight mb-6"
          >
            ثورة في التوريد
          </h1>

          <p
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            احصل على عروض أسعار من موردين موثوقين خلال دقائق، وفّر حتى
            <span className="font-bold text-indigo-600"> 40% من الوقت</span> وزود كفاءة التوريد
          </p>

          <div

            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/suppliers">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>جرّب المنصة مجانًا</span>
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/suppliers">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-indigo-200 hover:border-indigo-300 text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                <Search className="w-5 h-5 ml-2" />
                <span>سجل واطلب الآن</span>
              </Button>
            </Link>
          </div>



          {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <Card className="shadow-lg hover:scale-105 transition">
              <CardHeader className="flex items-center justify-center gap-3" >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  40%
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-medium">أسرع في الاستجابة</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:scale-105 transition">
              <CardHeader className="flex items-center justify-center gap-3 ">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  5 دقائق
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-medium">متوسط الحصول على عرض</p>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* Security Assurance */}
        <div
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-600">
            <div className='flex items-center gap-2'>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">بيانات مشفرة بأعلى معايير الأمان</span>
            </div>
            <span className="text-slate-400">•</span>
            <div className='flex items-center gap-2'>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">دعم فني على مدار الساعة</span>
            </div>
            <span className="text-slate-400">•</span>
            <div className='flex items-center gap-2'>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">ضمان استرداد المال</span>
            </div>
          </div>
        </div>
      </div >
    </section >
  );
}