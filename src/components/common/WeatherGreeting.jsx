import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Loader2 } from 'lucide-react';

const getTimeGreeting = (hour) => {
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
};

const getWeatherIcon = (condition) => {
  const iconMap = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Drizzle: CloudRain,
    Snow: CloudSnow,
    default: Wind
  };
  return iconMap[condition] || iconMap.default;
};

const getFoodSuggestion = (temp, condition) => {
  if (temp > 35) return "Perfect lassi weather!";
  if (temp > 30) return "Perfect biryani weather!";
  if (temp > 25) return "Great day for some chai & samosas!";
  if (temp > 20) return "How about some hot haleem?";
  if (condition === 'Rain') return "Rainy day = Pakora time!";
  return "Perfect for hot soup!";
};

export default function WeatherGreeting({ userName }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              // Using a mock response since we don't have API key
              // In production, you'd call OpenWeatherMap API here
              const mockWeather = {
                temp: 28 + Math.floor(Math.random() * 8),
                condition: ['Clear', 'Clouds', 'Clear', 'Clear'][Math.floor(Math.random() * 4)],
                city: 'Hyderabad'
              };
              setWeather(mockWeather);
              setLoading(false);
            },
            () => {
              // Default to Hyderabad if location denied
              setWeather({
                temp: 30,
                condition: 'Clear',
                city: 'Hyderabad'
              });
              setLoading(false);
            }
          );
        } else {
          setWeather({
            temp: 30,
            condition: 'Clear',
            city: 'Hyderabad'
          });
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const hour = new Date().getHours();
  const greeting = getTimeGreeting(hour);

  if (loading) {
    return (
      <motion.div 
        className="flex items-center gap-2 text-[#2B2B2B]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="w-5 h-5 animate-spin text-[#F77F00]" />
        <span className="text-sm">Loading weather...</span>
      </motion.div>
    );
  }

  if (error || !weather) {
    return (
      <motion.div
        className="text-[#2B2B2B]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-lg font-medium">{greeting}{userName ? `, ${userName}` : ''}!</span>
      </motion.div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.condition);
  const foodSuggestion = getFoodSuggestion(weather.temp, weather.condition);

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-lg md:text-xl font-semibold text-[#2B2B2B]">
          {greeting}{userName ? `, ${userName}` : ''}, {weather.city}!
        </span>
        <motion.div 
          className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          <WeatherIcon className="w-4 h-4 text-[#F77F00]" />
          <span className="text-sm font-medium text-[#2B2B2B]">{weather.temp}°C</span>
        </motion.div>
      </div>
      <motion.p 
        className="text-sm text-[#F77F00] font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {foodSuggestion}
      </motion.p>
    </motion.div>
  );
}
