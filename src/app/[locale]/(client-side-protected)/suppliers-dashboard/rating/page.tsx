"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  TrendingUp, 
  Award, 
  Users, 
  MessageSquare,
  ThumbsUp,
  Building2
} from "lucide-react";
import { useMemo } from "react";

// Mock data - replace with your actual API calls
const mockRecentRatings = [
  {
    companyName: "فندق النيل الفاخر",
    comment: "خدمة ممتازة وجودة عالية، التسليم كان في الوقت المحدد والمنتجات فاقت التوقعات. نتطلع للتعامل مرة أخرى",
    rate: 5,
  },
  {
    companyName: "مطعم الأندلس",
    comment: "توصيل سريع ومنتجات جيدة جداً، الأسعار مناسبة والتعامل محترف",
    rate: 4,
  },
  {
    companyName: "شركة التقنية المتقدمة",
    comment: "منتجات عالية الجودة وخدمة عملاء ممتازة",
    rate: 5,
  },
  {
    companyName: "مؤسسة البناء الحديث",
    comment: "جودة جيدة لكن التسليم تأخر قليلاً",
    rate: 3,
  },
  {
    companyName: "شركة المستقبل للتجارة",
    comment: "أسعار معقولة وخدمة جيدة",
    rate: 4,
  },
];

// Mock rating breakdown - [1star, 2star, 3star, 4star, 5star]
const mockRatingBreakdown = [2, 3, 9, 25, 89];
const mockTotalRatings = 128;

interface RatingData {
  recentRatings: Array<{
    companyName: string;
    comment: string;
    rate: number;
  }>;
  ratingBreakdown: number[]; // [1star, 2star, 3star, 4star, 5star]
  totalRatings: number;
}

export default function RatingPage() {
  // Use mock data - replace with actual API data
  const data: RatingData = {
    recentRatings: mockRecentRatings,
    ratingBreakdown: mockRatingBreakdown,
    totalRatings: mockTotalRatings,
  };

  // Calculate average rating
  const averageRating = useMemo(() => {
    const totalWeightedRating = data.ratingBreakdown.reduce(
      (sum, count, index) => sum + count * (index + 1),
      0
    );
    return data.totalRatings > 0 ? (totalWeightedRating / data.totalRatings).toFixed(1) : "0.0";
  }, [data.ratingBreakdown, data.totalRatings]);

  const getRatingBadgeColor = (rating: number) => {
    if (rating === 5) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (rating === 4) return "bg-green-100 text-green-800 border-green-200";
    if (rating === 3) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (rating === 2) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          تقييماتك
        </h1>
        <p className="text-gray-600 mt-1">
          عرض تقييمات عملائك وتحليل أدائك
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-medium">متوسط التقييم</p>
                <p className="text-3xl font-bold text-indigo-900">{averageRating}</p>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(Number(averageRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">إجمالي التقييمات</p>
                <p className="text-3xl font-bold text-green-900">{data.totalRatings}</p>
                <p className="text-xs text-green-600 mt-1">تقييم حتى الآن</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">نسبة الرضا</p>
                <p className="text-3xl font-bold text-purple-900">
                  {Math.round(((data.ratingBreakdown[3] + data.ratingBreakdown[4]) / data.totalRatings) * 100)}%
                </p>
                <p className="text-xs text-purple-600 mt-1">4+ نجوم</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            أحدث التقييمات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.recentRatings.map((review, index) => (
            <div key={index} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                      {review.companyName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-900 text-sm">
                        {review.companyName}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge 
                  className={`${getRatingBadgeColor(review.rate)} font-medium`}
                  variant="outline"
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {review.rate}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rate
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {review.comment}
              </p>
              
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  مفيد
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  رد
                </Button>
              </div>
            </div>
          ))}
          
          {data.recentRatings.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                لا توجد تقييمات
              </h3>
              <p className="text-gray-500">
                لم تحصل على أي تقييمات حتى الآن
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}