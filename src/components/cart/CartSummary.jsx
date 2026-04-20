import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, TrendingDown, Truck, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const platformConfig = {
  swiggy: { name: 'Swiggy', color: 'bg-orange-500', textColor: 'text-orange-500', logo: 'S' },
  zomato: { name: 'Zomato', color: 'bg-red-500', textColor: 'text-red-500', logo: 'Z' },
  ubereats: { name: 'Uber Eats', color: 'bg-green-600', textColor: 'text-green-600', logo: 'U' }
};

export default function CartSummary({ items, platformBreakdown }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = platformBreakdown.reduce((sum, p) => sum + p.total, 0);
  const totalSavings = platformBreakdown.reduce((sum, p) => sum + (p.savings || 0), 0);

  // Find best platform
  const bestPlatform = platformBreakdown.reduce((best, current) => 
    current.total < best.total ? current : best
  , platformBreakdown[0]);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-5 h-5 text-[#D62828]" />
        <h3 className="font-bold text-lg text-[#2B2B2B]">Order Summary</h3>
      </div>

      {/* Platform breakdown */}
      <div className="space-y-3 mb-6">
        {platformBreakdown.map((platform, index) => {
          const config = platformConfig[platform.platform];
          const isBest = platform.platform === bestPlatform?.platform;
          
          return (
            <motion.div
              key={platform.platform}
              className={`p-3 rounded-xl border-2 transition-all ${
                isBest ? 'border-[#FCBF49] bg-[#FFF3E0]' : 'border-gray-100 bg-gray-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 ${config.color} rounded-md flex items-center justify-center`}>
                    <span className="text-[10px] text-white font-bold">{config.logo}</span>
                  </div>
                  <span className="font-medium text-[#2B2B2B]">{config.name}</span>
                  {isBest && (
                    <Badge className="bg-[#FCBF49] text-[#2B2B2B] text-[10px] px-1.5">
                      <Crown className="w-3 h-3 mr-0.5" />
                      Best
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">{platform.itemCount} items</span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{platform.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Delivery
                  </span>
                  <span>₹{platform.deliveryFee}</span>
                </div>
                {platform.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{platform.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-[#2B2B2B] pt-1 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{platform.total}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Savings highlight */}
      {totalSavings > 0 && (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-700">Your Savings</span>
            </div>
            <span className="text-xl font-bold text-green-600">₹{totalSavings}</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            By comparing prices across platforms!
          </p>
        </motion.div>
      )}

      {/* Grand total */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Grand Total</p>
            <p className="text-xs text-gray-400">{totalItems} items</p>
          </div>
          <p className="text-3xl font-bold text-[#2B2B2B]">₹{grandTotal}</p>
        </div>
      </div>

      {/* Checkout button */}
      <Link to={createPageUrl('Checkout')}>
        <Button className="w-full h-14 bg-gradient-to-r from-[#D62828] to-[#F77F00] hover:opacity-90 text-white font-semibold text-lg rounded-xl shadow-lg">
          Proceed to Checkout
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>

      <p className="text-xs text-center text-gray-400 mt-3">
        Orders will be placed on respective platforms
      </p>
    </motion.div>
  );
}