import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function RestaurantCard({ restaurant, index = 0 }) {
  const getBestDeal = () => {
    if (!restaurant.menu || restaurant.menu.length === 0) return null;
    
    let maxSavings = 0;
    restaurant.menu.forEach(item => {
      if (item.prices) {
        const prices = Object.values(item.prices).map(p => p.base - p.discount + p.fee);
        const diff = Math.max(...prices) - Math.min(...prices);
        if (diff > maxSavings) maxSavings = diff;
      }
    });
    
    return maxSavings > 0 ? maxSavings : null;
  };

  const bestDeal = getBestDeal();

  return (
    <Link to={createPageUrl('Restaurant') + `?id=${restaurant.id || restaurant.slug}`}>
      <motion.div
        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop`}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Featured badge */}
          {restaurant.featured && (
            <motion.div
              className="absolute top-3 left-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge className="bg-[#FCBF49] text-[#2B2B2B] font-semibold">
                ⭐ Featured
              </Badge>
            </motion.div>
          )}
          
          {/* Savings badge */}
          {bestDeal && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              <Badge className="bg-[#D62828] text-white font-bold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Save ₹{bestDeal}
              </Badge>
            </motion.div>
          )}
          
          {/* Rating & Time */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-[#FCBF49] fill-[#FCBF49]" />
              <span className="text-sm font-bold text-[#2B2B2B]">{restaurant.rating || 4.2}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-[#F77F00]" />
              <span className="text-xs font-medium text-[#2B2B2B]">{restaurant.deliveryTime || '25-35 min'}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-[#2B2B2B] mb-1 group-hover:text-[#D62828] transition-colors">
            {restaurant.name}
          </h3>
          
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
            <MapPin className="w-3 h-3" />
            <span>{restaurant.location}</span>
          </div>
          
          {restaurant.cuisine && restaurant.cuisine.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {restaurant.cuisine.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-[#FFF3E0] text-[#F77F00] rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          
          {/* Price comparison indicator */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Compare prices on</span>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">S</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">Z</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">U</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}