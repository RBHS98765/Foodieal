import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, ChefHat, Bike, Home, Package } from 'lucide-react';
import { format } from 'date-fns';

const statusConfig = {
  placed: { icon: Package, label: 'Order Placed', color: 'bg-blue-500' },
  confirmed: { icon: Check, label: 'Order Confirmed', color: 'bg-green-500' },
  preparing: { icon: ChefHat, label: 'Preparing Your Food', color: 'bg-orange-500' },
  out_for_delivery: { icon: Bike, label: 'Out for Delivery', color: 'bg-purple-500' },
  delivered: { icon: Home, label: 'Delivered', color: 'bg-green-600' },
};

const statusOrder = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

export default function OrderTimeline({ currentStatus, orderTime }) {
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  // Generate timestamps for completed steps
  const getTimestamp = (index) => {
    if (index > currentIndex) return null;
    const baseTime = new Date(orderTime || Date.now());
    const minutesAdded = index * 8; // ~8 mins per step
    baseTime.setMinutes(baseTime.getMinutes() + minutesAdded);
    return baseTime;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-[#D62828]" />
        <h3 className="font-bold text-[#2B2B2B]">Order Timeline</h3>
      </div>

      <div className="space-y-0">
        {statusOrder.map((status, index) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === statusOrder.length - 1;
          const timestamp = getTimestamp(index);

          return (
            <div key={status} className="relative">
              <div className="flex gap-4">
                {/* Timeline line and dot */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCompleted ? config.color : 'bg-gray-200'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                      boxShadow: isCurrent ? `0 0 20px ${isCompleted ? 'rgba(214, 40, 40, 0.4)' : 'transparent'}` : 'none'
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                  </motion.div>
                  
                  {!isLast && (
                    <div className={`w-0.5 h-12 ${
                      index < currentIndex ? 'bg-gradient-to-b from-green-500 to-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-semibold ${isCompleted ? 'text-[#2B2B2B]' : 'text-gray-400'}`}>
                        {config.label}
                      </p>
                      {isCurrent && !isLast && (
                        <motion.p
                          className="text-sm text-[#F77F00] mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          In progress...
                        </motion.p>
                      )}
                      {isCompleted && !isCurrent && (
                        <p className="text-sm text-green-600 mt-1">Completed</p>
                      )}
                    </div>
                    {timestamp && (
                      <span className="text-xs text-gray-500">
                        {format(timestamp, 'h:mm a')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}