import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Share2, Heart, TrendingUp, Leaf, Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import MenuItem from '@/components/menu/MenuItem';
import ReviewsList from '@/components/reviews/ReviewsList';
import { ALL_RESTAURANTS, getSurgeMultiplier, getLocationMultiplier } from '@/components/data/mockData';
import { addToCart, getCart } from '@/components/data/cartStore';
import { getReviewsByRestaurant, getAverageRating } from '@/components/data/reviewStore';

export default function RestaurantPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get('id');

  const [restaurant, setRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');

  const surgeMultiplier = getSurgeMultiplier();
  const locationMultiplier = restaurant ? getLocationMultiplier(restaurant.location) : 1;

  useEffect(() => {
    const found = ALL_RESTAURANTS.find(r => r.id === restaurantId || r.slug === restaurantId);
    setRestaurant(found || ALL_RESTAURANTS[0]);
    setCartCount(getCart().length);
    if (restaurantId) {
      setReviews(getReviewsByRestaurant(restaurantId));
    }
  }, [restaurantId]);

  const categories = useMemo(() => {
    if (!restaurant?.menu) return ['All'];
    const cats = new Set(restaurant.menu.map(item => item.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [restaurant]);

  const filteredMenu = useMemo(() => {
    if (!restaurant?.menu) return [];
    
    let items = [...restaurant.menu];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (vegOnly) {
      items = items.filter(item => item.isVeg);
    }

    return items;
  }, [restaurant, searchQuery, selectedCategory, vegOnly]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartCount(getCart().length);
    toast.success(`Added ${item.name} to cart!`, {
      description: `From ${item.platform.charAt(0).toUpperCase() + item.platform.slice(1)} - ₹${item.price}`
    });
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#FFF3E0] flex items-center justify-center">
        <div className="animate-pulse text-[#D62828]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Search')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Home')}>
                <FoodiealLogo size="sm" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#D62828] text-[#D62828]' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Link to={createPageUrl('Cart')}>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D62828] text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <section className="relative">
        <div className="h-48 md:h-64 overflow-hidden">
          <img
            src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 -mt-16 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#2B2B2B] mb-2">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#F77F00]" />
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{getAverageRating(restaurantId)?.toFixed(1) || restaurant.rating}</span>
                    {reviews.length > 0 && <span className="text-xs">({reviews.length})</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisine?.map((c, i) => (
                    <Badge key={i} variant="secondary" className="bg-[#FFF3E0] text-[#F77F00]">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Surge indicator */}
              {surgeMultiplier > 1 && (
                <motion.div
                  className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold text-orange-700">Peak Hour Pricing</p>
                    <p className="text-xs text-orange-600">
                      +{Math.round((surgeMultiplier - 1) * 100)}% surge on some platforms
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Platform comparison info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>Compare prices across:</span>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">S</span>
                  </div>
                  <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">Z</span>
                  </div>
                  <div className="w-6 h-6 bg-green-600 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">U</span>
                  </div>
                </div>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu/Reviews Toggle */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'menu' ? 'default' : 'outline'}
            onClick={() => setActiveTab('menu')}
            className={activeTab === 'menu' ? 'bg-[#D62828]' : ''}
          >
            Menu
          </Button>
          <Button
            variant={activeTab === 'reviews' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reviews')}
            className={activeTab === 'reviews' ? 'bg-[#D62828]' : ''}
          >
            Reviews ({reviews.length})
          </Button>
        </div>

        {activeTab === 'menu' ? (
          <>
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-0"
              />
            </div>
            <Button
              variant={vegOnly ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${vegOnly ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={() => setVegOnly(!vegOnly)}
            >
              <Leaf className="w-4 h-4" />
              Veg Only
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="mt-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="flex-wrap h-auto bg-transparent gap-2">
                {categories.map(cat => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="data-[state=active]:bg-[#D62828] data-[state=active]:text-white rounded-full px-4"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item, index) => (
              <MenuItem
                key={item.id}
                item={item}
                restaurantName={restaurant.name}
                onAddToCart={handleAddToCart}
                surgeMultiplier={surgeMultiplier}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-500">No items found matching your search</p>
            </div>
          )}
        </div>
          </>
        ) : (
          <ReviewsList reviews={reviews} />
        )}
      </section>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Link to={createPageUrl('Cart')}>
            <Button className="bg-gradient-to-r from-[#D62828] to-[#F77F00] text-white px-8 py-6 rounded-full shadow-2xl flex items-center gap-3">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">View Cart ({cartCount} items)</span>
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}   