import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import ReviewCard from './ReviewCard';

export default function ReviewsList({ reviews = [], showEmpty = true }) {
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => Math.round(r.rating) === rating).length,
    percent: reviews.length > 0 
      ? (reviews.filter(r => Math.round(r.rating) === rating).length / reviews.length) * 100 
      : 0
  }));

  if (reviews.length === 0 && showEmpty) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl">
        <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500">No reviews yet</p>
        <p className="text-sm text-gray-400">Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-start gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2B2B2B]">{avgRating}</div>
              <div className="flex items-center justify-center gap-0.5 my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(parseFloat(avgRating))
                        ? 'text-[#FCBF49] fill-[#FCBF49]'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">{reviews.length} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 space-y-1.5">
              {ratingCounts.map(({ rating, count, percent }) => (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-3 text-gray-500">{rating}</span>
                  <Star className="w-3 h-3 text-[#FCBF49] fill-[#FCBF49]" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#FCBF49] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.5, delay: 0.1 * (5 - rating) }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}