import { Star } from "lucide-react";

export default function page() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">تقييمك</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Summary */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">4.8</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-gray-600">من 127 تقييم</p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                  style={{
                    width: `${
                      rating === 5
                        ? 70
                        : rating === 4
                        ? 20
                        : rating === 3
                        ? 7
                        : rating === 2
                        ? 2
                        : 1
                    }%`,
                  }}></div>
              </div>
              <span className="text-sm text-gray-600">
                {rating === 5
                  ? "89"
                  : rating === 4
                  ? "25"
                  : rating === 3
                  ? "9"
                  : rating === 2
                  ? "3"
                  : "1"}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Reviews */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">آخر التقييمات</h4>
          <div className="space-y-3">
            {[
              {
                name: "فندق النيل",
                rating: 5,
                comment: "خدمة ممتازة وجودة عالية",
              },
              {
                name: "مطعم الأندلس",
                rating: 4,
                comment: "توصيل سريع ومنتجات جيدة",
              },
            ].map((review, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{review.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
