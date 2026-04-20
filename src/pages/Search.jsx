import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import RestaurantCard from '@/components/common/RestaurantCard';
import { ALL_RESTAURANTS } from '@/components/data/mockData';

const cuisineFilters = ['All', 'Biryani', 'Pizza', 'Burgers', 'Chinese', 'South Indian', 'North Indian', 'Fast Food', 'Desserts'];
const areaFilters = ['All Areas', 'Hitech City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kondapur', 'Kukatpally'];
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'delivery', label: 'Delivery Time' },
  { value: 'savings', label: 'Best Savings' }
];

export default function SearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialLocation = urlParams.get('location') || 'All Areas';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedArea, setSelectedArea] = useState(initialLocation);
  const [sortBy, setSortBy] = useState('relevance');
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filteredRestaurants = useMemo(() => {
    let results = [...ALL_RESTAURANTS];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.cuisine?.some(c => c.toLowerCase().includes(query)) ||
        r.menu?.some(m => m.name.toLowerCase().includes(query))
      );
    }

    // Cuisine filter
    if (selectedCuisine !== 'All') {
      results = results.filter(r => 
        r.cuisine?.some(c => c.toLowerCase().includes(selectedCuisine.toLowerCase()))
      );
    }

    // Area filter
    if (selectedArea !== 'All Areas') {
      results = results.filter(r => r.location === selectedArea);
    }

    // Rating filter
    if (minRating > 0) {
      results = results.filter(r => r.rating >= minRating);
    }

    // Veg only filter
    if (vegOnly) {
      results = results.filter(r => r.menu?.some(m => m.isVeg));
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'delivery':
        results.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime) || 30;
          const bTime = parseInt(b.deliveryTime) || 30;
          return aTime - bTime;
        });
        break;
      case 'savings':
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return results;
  }, [searchQuery, selectedCuisine, selectedArea, sortBy, vegOnly, minRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('All');
    setSelectedArea('All Areas');
    setSortBy('relevance');
    setVegOnly(false);
    setMinRating(0);
  };

  const activeFiltersCount = [
    selectedCuisine !== 'All',
    selectedArea !== 'All Areas',
    vegOnly,
    minRating > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Home')}>
              <FoodiealLogo size="sm" />
            </Link>
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-[#F77F00] rounded-xl"
              />
            </div>

            {/* Filter Button - Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden relative">
                  <SlidersHorizontal className="w-5 h-5" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D62828] text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Area */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Area</label>
                    <Select value={selectedArea} onValueChange={setSelectedArea}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {areaFilters.map(area => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cuisine */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Cuisine</label>
                    <div className="flex flex-wrap gap-2">
                      {cuisineFilters.map(cuisine => (
                        <Badge
                          key={cuisine}
                          variant={selectedCuisine === cuisine ? 'default' : 'outline'}
                          className={`cursor-pointer ${selectedCuisine === cuisine ? 'bg-[#D62828]' : ''}`}
                          onClick={() => setSelectedCuisine(cuisine)}
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Veg Only */}
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="vegOnly" 
                      checked={vegOnly} 
                      onCheckedChange={setVegOnly}
                    />
                    <label htmlFor="vegOnly" className="text-sm font-medium">Veg Only</label>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Min Rating</label>
                    <div className="flex gap-2">
                      {[0, 3.5, 4, 4.5].map(rating => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setMinRating(rating)}
                          className={minRating === rating ? 'bg-[#F77F00]' : ''}
                        >
                          {rating === 0 ? 'Any' : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={clearFilters} variant="outline" className="w-full">
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#2B2B2B]">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#D62828] text-xs">
                    Clear All
                  </Button>
                )}
              </div>

              {/* Area */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Area</label>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger>
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areaFilters.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cuisine */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Cuisine</label>
                <div className="flex flex-wrap gap-2">
                  {cuisineFilters.map(cuisine => (
                    <Badge
                      key={cuisine}
                      variant={selectedCuisine === cuisine ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${selectedCuisine === cuisine ? 'bg-[#D62828] hover:bg-[#D62828]/90' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedCuisine(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Veg Only */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="vegOnlyDesktop" 
                    checked={vegOnly} 
                    onCheckedChange={setVegOnly}
                  />
                  <label htmlFor="vegOnlyDesktop" className="text-sm font-medium cursor-pointer">
                    Veg Only
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#FCBF49]" />
                  Min Rating
                </label>
                <div className="flex flex-wrap gap-2">
                  {[0, 3.5, 4, 4.5].map(rating => (
                    <Button
                      key={rating}
                      variant={minRating === rating ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMinRating(rating)}
                      className={minRating === rating ? 'bg-[#F77F00] hover:bg-[#F77F00]/90' : ''}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#2B2B2B]">
                  {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
                </h1>
                <p className="text-gray-500 text-sm">
                  {filteredRestaurants.length} restaurants found
                  {selectedArea !== 'All Areas' && ` in ${selectedArea}`}
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCuisine !== 'All' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCuisine}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCuisine('All')} />
                  </Badge>
                )}
                {selectedArea !== 'All Areas' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedArea}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedArea('All Areas')} />
                  </Badge>
                )}
                {vegOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Veg Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setVegOnly(false)} />
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {minRating}+ Rating
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              {filteredRestaurants.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">No restaurants found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                  <Button onClick={clearFilters} className="bg-[#D62828] hover:bg-[#D62828]/90">
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}