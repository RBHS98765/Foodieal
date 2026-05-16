import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Loader2, ThumbsUp, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/txt-area';
import { toast } from 'sonner';

const QUICK_TAGS = [
  'Tasty Food', 'Fast Delivery', 'Great Packing', 
  'Best Price', 'Good Portion', 'Hot & Fresh'
];

export default function ReviewForm({ restaurantId, restaurantName, menuItemId, menuItemName, orderId, onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    await onSubmit({
      restaurantId,
      restaurantName,
      menuItemId,
      menuItemName,
      orderId,
      rating,
      comment,
      tags: selectedTags,
      timestamp: new Date().toISOString()
    });
    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl overflow-hidden relative"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFF3E0] rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-bold text-xl text-[#2B2B2B]">
              {menuItemName ? `Rate ${menuItemName}` : `Overall Experience`}
            </h4>
            <p className="text-sm text-gray-500">
              at <span className="text-[#D62828] font-medium">{restaurantName}</span>
            </p>
          </div>
          {onCancel && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 rounded-full h-8 w-8"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Star Rating Section */}
        <div className="flex flex-col items-center py-4 bg-gray-50/50 rounded-xl mb-6">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-all hover:scale-125 active:scale-95"
              >
                <Star
                  className={`w-10 h-10 transition-all duration-300 ${
                    star <= (hoveredRating || rating)
                      ? 'text-[#FCBF49] fill-[#FCBF49] drop-shadow-[0_0_8px_rgba(252,191,73,0.4)]'
                      : 'text-gray-300'
                  }`}
                  strokeWidth={star <= (hoveredRating || rating) ? 0 : 2}
                />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={rating}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-bold h-5 ${
                rating >= 4 ? 'text-green-600' : rating >= 3 ? 'text-orange-500' : 'text-gray-500'
              }`}
            >
              {['', 'Not Happy 😕', 'Could be better 😐', 'Good! 🙂', 'Very Good! 😊', 'Excellent! 😍'][rating]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Quick Tags Selection */}
        {rating > 0 && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ThumbsUp className="w-3 h-3" />
              What did you love?
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#F77F00] text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FCBF49]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comment Section */}
        <div className="relative mb-6">
          <Textarea
            placeholder="Tell us more about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] bg-gray-50 border-gray-100 focus:bg-white transition-all resize-none pr-10"
          />
          <button className="absolute bottom-3 right-3 text-gray-400 hover:text-[#F77F00] transition-colors p-1 rounded-lg hover:bg-white border border-transparent hover:border-gray-100">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Submit Actions */}
        <div className="flex gap-3">
          {onCancel && (
            <Button 
              variant="outline" 
              onClick={onCancel} 
              disabled={isSubmitting}
              className="flex-1 h-12 border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl"
            >
              Maybe Later
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className={`flex-[2] h-12 rounded-xl text-white font-bold transition-all ${
              rating > 0 
                ? 'bg-gradient-to-r from-[#D62828] to-[#F77F00] shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5' 
                : 'bg-gray-200'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Submit Review
              </div>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}