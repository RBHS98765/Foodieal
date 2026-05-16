import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PlatformPriceCard from '../common/PlatformPriceCard';

export default function MenuItem({ item, restaurantName, onAddToCart, surgeMultiplier = 1 }) {
  const [expanded, setExpanded] = useState(false);

  // Calculate prices for each platform
  const getPlatformPrices = () => {
    if (!item.prices) return [];
    
    return Object.entries(item.prices).map(([platform, price]) => {
      const finalPrice = Math.round((price.base * surgeMultiplier) + price.fee - price.discount);
      return { platform, price, finalPrice };
    }).sort((a, b) => a.finalPrice - b.finalPrice);
  };

  const platformPrices = getPlatformPrices();
  const bestPrice = platformPrices[0];
  const worstPrice = platformPrices[platformPrices.length - 1];
  const savings = worstPrice && bestPrice ? worstPrice.finalPrice - bestPrice.finalPrice : 0;

  const handleAddToCart = (platform, price) => {
    onAddToCart({
      ...item,
      platform,
      price,
      restaurantName,
      quantity: 1
    });
  };

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="p-4">
        <div className="flex gap-4">
          {/* Item image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {/* Veg/Non-veg indicator */}
            <div className={`absolute top-2 left-2 w-5 h-5 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} bg-white flex items-center justify-center rounded-sm`}>
              <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>

          {/* Item details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-lg text-[#2B2B2B]">{item.name}</h3>
                {item.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-[#FCBF49] fill-[#FCBF49]" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                    {item.reviews && (
                      <span className="text-xs text-gray-400">({item.reviews} reviews)</span>
                    )}
                  </div>
                )}
              </div>
              {savings > 0 && (
                <Badge className="bg-green-100 text-green-700 font-semibold shrink-0">
                  Save ₹{savings}
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {item.description || "Delicious dish prepared with finest ingredients"}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.category && (
                <span className="text-xs px-2 py-0.5 bg-[#FFF3E0] text-[#F77F00] rounded-full">
                  {item.category}
                </span>
              )}
              {item.bestseller && (
                <Badge className="bg-[#D62828] text-white text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  Bestseller
                </Badge>
              )}
            </div>

            {/* Quick price preview */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#D62828]">
                  ₹{bestPrice?.finalPrice || 0}
                </span>
                {savings > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{worstPrice?.finalPrice}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setExpanded(!expanded)}
              >
                Compare
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded price comparison */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="pt-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                  Compare prices across platforms
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {platformPrices.map(({ platform, price, finalPrice }, index) => (
                    <PlatformPriceCard
                      key={platform}
                      platform={platform}
                      price={price}
                      isBest={index === 0}
                      savings={index === 0 ? savings : 0}
                      surgeMultiplier={surgeMultiplier}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}