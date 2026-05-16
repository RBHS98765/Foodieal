import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-4 border border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 bg-gradient-to-r from-[#D62828] to-[#F77F00]">
          <AvatarFallback className="text-white text-sm font-semibold">
            {review.userName?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-medium text-[#2B2B2B] truncate">
              {review.userName || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-400 shrink-0">
              {review.created_date && format(new Date(review.created_date), 'MMM d, yyyy')}
            </span>
          </div>

          {/* Rating & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= review.rating
                      ? 'text-[#FCBF49] fill-[#FCBF49]'
                      : 'text-gray-200'
                  }`}
                  strokeWidth={star <= review.rating ? 0 : 2}
                />
              ))}
            </div>
            
            {review.tags && review.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {review.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100 italic">
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Comment */}
          {review.comment && (
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50/30 p-2 rounded-lg border border-gray-50/50">
              {review.comment}
            </p>
          )}

          {/* Menu item tag */}
          {review.menuItemName && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-gray-400">Ordered:</span>
              <span className="inline-block text-[10px] px-2 py-0.5 bg-[#FFF3E0] text-[#F77F00] rounded-full font-medium">
                {review.menuItemName}
              </span>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}