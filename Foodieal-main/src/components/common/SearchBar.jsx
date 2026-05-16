import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, X, MapPin, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

const trendingSearches = [
  'Biryani', 'Pizza', 'Burger', 'Chinese', 'South Indian', 'Ice Cream'
];

const popularLocations = [
  'Hitech City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Madhapur'
];

export default function SearchBar({ onSearch, expanded = false }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSearch = (searchQuery) => {
    const q = searchQuery || query;
    if (q.trim() && onSearch) {
      onSearch(q.trim());
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };
      
      recognition.start();
    }
  };

  return (
    <div className="relative w-full">
      <motion.div
        className={`relative flex items-center bg-white rounded-2xl shadow-lg border-2 transition-colors ${
          isFocused ? 'border-[#F77F00]' : 'border-transparent'
        }`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for restaurants, cuisines, or dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-12 pr-24 py-6 text-base border-0 focus-visible:ring-0 bg-transparent rounded-2xl"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-gray-600"
              onClick={() => setQuery('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isListening ? 'text-[#D62828] animate-pulse' : 'text-gray-400 hover:text-[#F77F00]'}`}
            onClick={handleVoiceSearch}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Link to={createPageUrl('Search') + `?q=${encodeURIComponent(query)}`}>
            <Button 
              className="h-9 px-4 bg-gradient-to-r from-[#D62828] to-[#F77F00] hover:opacity-90 text-white rounded-xl"
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFocused && expanded && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item) => (
                  <Link 
                    key={item}
                    to={createPageUrl('Search') + `?q=${encodeURIComponent(item)}`}
                  >
                    <motion.button
                      className="px-3 py-1.5 bg-[#FFF3E0] text-[#D62828] rounded-full text-sm font-medium hover:bg-[#FCBF49] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Popular Areas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularLocations.map((location) => (
                  <Link
                    key={location}
                    to={createPageUrl('Search') + `?location=${encodeURIComponent(location)}`}
                  >
                    <motion.button
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {location}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}