import React from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const platformConfig = {
  swiggy: {
    name: 'Swiggy',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    logo: 'S'
  },
  zomato: {
    name: 'Zomato',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    logo: 'Z'
  },
  ubereats: {
    name: 'Uber Eats',
    color: 'bg-green-600',
    textColor: 'text-green-600',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    logo: 'U'
  }
};

export default function PlatformPriceCard({ 
  platform, 
  price, 
  isBest = false, 
  savings = 0,
  surgeMultiplier = 1,
  onAddToCart 
}) {
  const config = platformConfig[platform];
  
  if (!config || !price) return null;

  const finalPrice = Math.round((price.base * surgeMultiplier) + price.fee - price.discount);
  const hasSurge = surgeMultiplier > 1;

  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 transition-all ${
        isBest 
          ? `${config.borderColor} ${config.bgLight} shadow-lg` 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Best deal badge */}
      {isBest && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="bg-[#FCBF49] text-[#2B2B2B] font-bold flex items-center gap-1 shadow-md">
            <Crown className="w-3 h-3" />
            BEST DEAL
          </Badge>
        </motion.div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{config.logo}</span>
          </div>
          <span className="font-semibold text-[#2B2B2B]">{config.name}</span>
        </div>
        {hasSurge && (
          <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Surge
          </Badge>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Base price</span>
          <span className="text-[#2B2B2B]">₹{price.base}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Delivery fee</span>
          <span className="text-[#2B2B2B]">₹{price.fee}</span>
        </div>
        {price.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600">-₹{price.discount}</span>
          </div>
        )}
        {hasSurge && (
          <div className="flex justify-between text-sm">
            <span className="text-orange-500">Surge ({Math.round((surgeMultiplier - 1) * 100)}%)</span>
            <span className="text-orange-500">+₹{Math.round(price.base * (surgeMultiplier - 1))}</span>
          </div>
        )}
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#2B2B2B]">Total</span>
          <span className={`text-2xl font-bold ${isBest ? config.textColor : 'text-[#2B2B2B]'}`}>
            ₹{finalPrice}
          </span>
        </div>
      </div>

      {isBest && savings > 0 && (
        <div className="bg-green-100 text-green-700 text-sm font-medium py-2 px-3 rounded-lg mb-3 text-center">
          You save ₹{savings} compared to other platforms!
        </div>
      )}

      <Button
        onClick={() => onAddToCart && onAddToCart(platform, finalPrice)}
        className={`w-full ${
          isBest 
            ? `${config.color} hover:opacity-90` 
            : 'bg-gray-100 text-[#2B2B2B] hover:bg-gray-200'
        }`}
      >
        {isBest ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Add Best Deal
          </>
        ) : (
          'Add to Cart'
        )}
      </Button>
    </motion.div>
  );
}