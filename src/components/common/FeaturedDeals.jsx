import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const deals = [
  {
    id: 1,
    title: "Biryani Festival",
    subtitle: "Up to 40% off on top restaurants",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop",
    gradient: "from-[#D62828] to-[#F77F00]",
    restaurants: ["Paradise", "Bawarchi", "Shah Ghouse"],
    validUntil: "Today only"
  },
  {
    id: 2,
    title: "Pizza Mania",
    subtitle: "BOGO on large pizzas",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=400&fit=crop",
    gradient: "from-[#F77F00] to-[#FCBF49]",
    restaurants: ["Dominos", "Pizza Hut", "La Pino'z"],
    validUntil: "Ends in 3 hours"
  },
  {
    id: 3,
    title: "Midnight Cravings",
    subtitle: "Flat ₹50 off after 10 PM",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
    gradient: "from-[#2B2B2B] to-[#D62828]",
    restaurants: ["McDonald's", "KFC", "Burger King"],
    validUntil: "Daily 10 PM - 2 AM"
  },
  {
    id: 4,
    title: "South Indian Specials",
    subtitle: "Authentic taste, best prices",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&h=400&fit=crop",
    gradient: "from-[#FCBF49] to-[#F77F00]",
    restaurants: ["Chutneys", "Dosa Plaza", "Rayalaseema"],
    validUntil: "All week"
  }
];

export default function FeaturedDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % deals.length;
      }
      return prev === 0 ? deals.length - 1 : prev - 1;
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FCBF49]" />
          <h2 className="text-xl font-bold text-[#2B2B2B]">Featured Deals</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[200px] md:h-[280px] overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <Link to={createPageUrl('Search') + `?deal=${deals[currentIndex].id}`}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group">
                <img
                  src={deals[currentIndex].image}
                  alt={deals[currentIndex].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${deals[currentIndex].gradient} opacity-80`} />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5" />
                      <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {deals[currentIndex].validUntil}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold mb-1">
                      {deals[currentIndex].title}
                    </h3>
                    <p className="text-lg md:text-xl opacity-90 mb-3">
                      {deals[currentIndex].subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {deals[currentIndex].restaurants.map((r, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {deals.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex 
                ? 'w-6 bg-[#D62828]' 
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}