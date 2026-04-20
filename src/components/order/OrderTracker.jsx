import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChefHat, Bike, Home, Package, Clock, RefreshCw } from 'lucide-react';

const orderSteps = [
  { id: 'placed', label: 'Order Placed', icon: Package, description: 'Your order has been confirmed' },
  { id: 'confirmed', label: 'Confirmed', icon: Check, description: 'Restaurant accepted your order' },
  { id: 'preparing', label: 'Preparing', icon: ChefHat, description: 'Your food is being prepared' },
  { id: 'out_for_delivery', label: 'On the Way', icon: Bike, description: 'Your order is out for delivery' },
  { id: 'delivered', label: 'Delivered', icon: Home, description: 'Enjoy your meal!' }
];

export default function OrderTracker({ status = 'placed', estimatedTime = '30-40 min', onStatusChange, enableSimulation = false }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  useEffect(() => {
    const index = orderSteps.findIndex(step => step.id === status);
    setCurrentStepIndex(index >= 0 ? index : 0);
    
    // Calculate remaining time based on status
    const times = { placed: 35, confirmed: 30, preparing: 20, out_for_delivery: 10, delivered: 0 };
    setRemainingTime(times[status] || 30);
  }, [status]);

  // Countdown timer
  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0 || status === 'delivered') return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [remainingTime, status]);

  // Simulation for demo
  const simulateProgress = () => {
    if (!enableSimulation || !onStatusChange) return;
    setIsSimulating(true);
    
    const statusSequence = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    let currentIdx = statusSequence.indexOf(status);
    
    const advanceStatus = () => {
      currentIdx++;
      if (currentIdx < statusSequence.length) {
        onStatusChange(statusSequence[currentIdx]);
        if (currentIdx < statusSequence.length - 1) {
          setTimeout(advanceStatus, 3000);
        } else {
          setIsSimulating(false);
        }
      }
    };
    
    setTimeout(advanceStatus, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg text-[#2B2B2B]">Order Status</h3>
          {status !== 'delivered' && (
            <p className="text-xs text-gray-500 mt-1">Updates automatically</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {enableSimulation && status !== 'delivered' && (
            <button
              onClick={simulateProgress}
              disabled={isSimulating}
              className="text-xs text-[#F77F00] hover:text-[#D62828] flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
              {isSimulating ? 'Updating...' : 'Simulate'}
            </button>
          )}
          <div className="flex items-center gap-2 bg-[#FFF3E0] px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-[#F77F00]" />
            <span className="text-sm font-semibold text-[#D62828]">
              {status === 'delivered' ? 'Delivered!' : remainingTime ? `${remainingTime} min` : estimatedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D62828] to-[#F77F00] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepIndex / (orderSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="relative flex justify-between">
          {orderSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-gradient-to-r from-[#D62828] to-[#F77F00] border-transparent'
                      : 'bg-white border-gray-300'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: isCurrent ? 1.1 : 1,
                    boxShadow: isCurrent ? '0 0 20px rgba(214, 40, 40, 0.4)' : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                </motion.div>
                <span className={`text-xs mt-2 text-center font-medium ${
                  isCompleted ? 'text-[#2B2B2B]' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current step detail */}
      <motion.div
        className="text-center p-4 bg-[#FFF3E0] rounded-xl"
        key={currentStepIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-[#D62828] font-semibold text-lg">
          {orderSteps[currentStepIndex].label}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          {orderSteps[currentStepIndex].description}
        </p>
      </motion.div>

      {/* Animated delivery person */}
      {status === 'out_for_delivery' && (
        <motion.div
          className="mt-6 relative h-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute"
            animate={{
              x: ['0%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="flex items-center gap-2">
              <Bike className="w-8 h-8 text-[#D62828]" />
              <span className="text-sm font-medium text-gray-600">On the way...</span>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </motion.div>
      )}
    </div>
  );
}