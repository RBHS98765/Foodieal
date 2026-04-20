import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const platformConfig = {
  swiggy: { name: 'Swiggy', color: 'bg-orange-500', logo: 'S' },
  zomato: { name: 'Zomato', color: 'bg-red-500', logo: 'Z' },
  ubereats: { name: 'Uber Eats', color: 'bg-green-600', logo: 'U' }
};

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const config = platformConfig[item.platform] || platformConfig.swiggy;

  return (
    <motion.div
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
    >
      {/* Item image */}
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {/* Platform badge */}
        <div className={`absolute -bottom-1 -right-1 ${config.color} w-5 h-5 rounded-full flex items-center justify-center border-2 border-white`}>
          <span className="text-[8px] text-white font-bold">{config.logo}</span>
        </div>
      </div>

      {/* Item details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#2B2B2B] truncate">{item.name}</h4>
        <p className="text-sm text-gray-500 truncate">{item.restaurantName}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {config.name}
          </span>
          {item.isVeg !== undefined && (
            <span className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
              <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            </span>
          )}
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-100 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-l-lg hover:bg-gray-200"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center font-semibold text-[#2B2B2B]">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-r-lg hover:bg-gray-200"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Price and remove */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-bold text-lg text-[#2B2B2B]">
          ₹{(item.price * item.quantity).toFixed(0)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}