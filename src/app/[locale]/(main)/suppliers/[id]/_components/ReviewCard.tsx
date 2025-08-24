import { ISupplierReviews } from "@/types/supplier";

export default function ReviewCard({ review }: { review: ISupplierReviews }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary-200 ">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-10 h-10 rounded-full bg-gray-100  flex items-center justify-center ml-3`}
        >
          <span className={`text-gray-600  font-bold`}>
            {review.reviewerName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">
            {review.reviewerName}
          </h4>
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < review.rating ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
    </div>
  );
}
