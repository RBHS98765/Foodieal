import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, TrendingUp, Utensils, ArrowRight, Leaf, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import WeatherGreeting from '@/components/common/WeatherGreeting';
import SearchBar from '@/components/common/SearchBar';
import FeaturedDeals from '@/components/common/FeaturedDeals';
import RestaurantCard from '@/components/common/RestaurantCard';
import { ALL_RESTAURANTS } from '@/components/data/mockData';
import { getCart } from '@/components/data/cartStore';
import { base44 } from '@/api/base44Client';

const popularAreas = [
  { name: 'Hitech City', count: 120 },
  { name: 'Gachibowli', count: 95 },
  { name: 'Banjara Hills', count: 85 },
  { name: 'Jubilee Hills', count: 78 },
  { name: 'Madhapur', count: 110 }
];

export default function Home() {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });
  const [cartCount, setCartCount] = useState(0);
  const [vegOnly, setVegOnly] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 120]);

  const allFeatured = ALL_RESTAURANTS.filter(r => r.featured);
  const featuredRestaurants = (vegOnly
    ? allFeatured.filter(r => r.menu?.some(m => m.isVeg))
    : allFeatured).slice(0, 6);
  const topRestaurants = (vegOnly
    ? ALL_RESTAURANTS.filter(r => r.menu?.some(m => m.isVeg))
    : ALL_RESTAURANTS).slice(0, 8);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        const user = await base44.auth.me();
        setAuthState({ isAuthenticated: true, user });
      }
    };
    checkAuth();
    setCartCount(getCart().length);
  }, []);

  const navBg = useTransform(scrollY, [0, 50], ['rgba(255, 243, 224, 0)', 'rgba(255, 255, 255, 0.9)']);
  const navBorder = useTransform(scrollY, [0, 50], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.05)']);

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Sticky Navbar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all"
        style={{ 
          backgroundColor: navBg,
          borderColor: navBorder
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl('Home')}>
              <FoodiealLogo size="sm" />
            </Link>
            
            <div className="flex items-center gap-2">
              {/* Pure Veg Toggle */}
              <button
                onClick={() => setVegOnly(v => !v)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold text-[10px] uppercase tracking-wider transition-all ${
                  vegOnly
                    ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-100'
                    : 'bg-white border-green-600 text-green-700 hover:bg-green-50'
                }`}
              >
                <Leaf className="w-3 h-3" />
                Pure Veg
              </button>

              {/* Cart Button */}
              <Link to={createPageUrl('Cart')}>
                <Button variant="ghost" size="sm" className="relative gap-2 font-bold text-xs">
                  <ShoppingCart className="w-4 h-4 text-[#D62828]" />
                  <span className="hidden sm:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D62828] text-white text-[10px] rounded-full flex items-center justify-center font-black">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {authState.isAuthenticated ? (
                <Link to={createPageUrl('Profile')}>
                  <Button variant="ghost" size="sm" className="font-bold text-xs">
                    Profile
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-[#D62828] to-[#F77F00] text-white font-bold text-xs rounded-full px-4 shadow-md shadow-red-100"
                  onClick={() => base44.auth.redirectToLogin()}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D62828' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-6 pb-8 md:pt-10 md:pb-16">
          {/* Weather Greeting */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherGreeting userName={authState.user?.name?.split(' ')[0]} />
          </motion.div>


          {/* Hero Content */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-12 items-center max-w-7xl mx-auto pt-2 lg:pt-4">
            <motion.div
              className="w-full flex flex-col items-start z-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#2B2B2B] mb-4 xl:mb-6 leading-tight">
                Compare & Save on <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-[#D62828] to-[#F77F00] bg-clip-text text-transparent"> Every Order</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 font-medium max-w-md lg:max-w-xl">
                Find the best prices across Swiggy, Zomato & Uber Eats. 
                Save up to <span className="font-bold text-[#D62828]">30%</span> on your favorite food!
              </p>

              {/* Search Bar */}
              <div className="mb-6 lg:mb-8 w-full max-w-md lg:max-w-[480px]">
                <SearchBar expanded={true} />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 lg:gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#F77F00]" />
                  <span className="text-base lg:text-lg text-gray-700"><strong>500+</strong> Restaurants</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#D62828]" />
                  <span className="text-base lg:text-lg text-gray-700"><strong>₹2.5L+</strong> Saved</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image - Biryani */}
            <motion.div
              className="relative hidden md:flex items-center justify-center w-full h-[500px] lg:h-[700px] mt-2 translate-x-4 lg:translate-x-12"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[500px] lg:max-w-[700px] aspect-square">
                {/* Plate of Biryani (No Parallax) */}
                <img
                  src="https://png.pngtree.com/png-clipart/20240705/original/pngtree-chicken-biryani-plate-with-legs-piece-white-top-view-png-image_15495814.png"
                  alt="Hyderabadi Biryani"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]"
                />

                {/* Left Floating Card - Zomato */}
                <motion.div
                  className="absolute left-0 md:left-[-5%] top-[50%] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 pr-6 sm:p-4 sm:pr-8 z-10 flex items-center gap-3 sm:gap-4 border border-gray-50/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E23744] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl sm:text-2xl">%</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-bold text-[#1C1C1C] leading-none mb-1">50% OFF</p>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider leading-none">ZOMATO GOLD</p>
                  </div>
                </motion.div>

                {/* Top Right Floating Card - Swiggy */}
                <motion.div
                  className="absolute right-0 md:right-[-5%] top-[15%] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 pr-6 sm:p-4 sm:pr-8 z-10 flex items-center gap-3 sm:gap-4 border border-gray-50/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FC8019] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl sm:text-2xl">S</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-bold text-[#1C1C1C] leading-none mb-1">Save ₹30</p>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider leading-none">SWIGGY INSTANT</p>
                  </div>
                </motion.div>

                {/* Bottom Right Floating Card - Foodieal */}
                <motion.div
                  className="absolute right-[5%] md:right-0 bottom-[10%] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 pr-6 sm:p-4 sm:pr-8 z-10 flex items-center gap-3 sm:gap-4 border border-gray-50/50"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 10V6a2 2 0 00-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-6 7h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-bold text-[#1C1C1C] leading-none mb-1">FOODIEAL</p>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider leading-none">15% EXTRA OFF</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <FeaturedDeals />
      </section>

      {/* Popular Areas */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D62828]" />
            <h2 className="text-xl font-bold text-[#2B2B2B]">Popular Areas in Hyderabad</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {popularAreas.map((area, index) => (
            <Link 
              key={area.name}
              to={createPageUrl('Search') + `?location=${encodeURIComponent(area.name)}`}
            >
              <motion.div
                className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: '#FFF3E0' }}
              >
                <MapPin className="w-4 h-4 text-[#F77F00]" />
                <span className="font-medium text-[#2B2B2B]">{area.name}</span>
                <span className="text-xs text-gray-400">({area.count})</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2B2B2B]">Featured Restaurants</h2>
          <Link to={createPageUrl('Search')}>
            <Button variant="ghost" className="text-[#D62828] hover:text-[#F77F00]">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
          ))}
        </div>
      </section>

      {/* Top Restaurants */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2B2B2B]">Top Restaurants Near You</h2>
          <Link to={createPageUrl('Search')}>
            <Button variant="ghost" className="text-[#D62828] hover:text-[#F77F00]">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRestaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B2B2B] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <FoodiealLogo variant="monochrome" size="sm" className="invert" />
            <p className="text-gray-400 text-sm">
              © 2024 Foodieal. Compare prices, save money!
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Made with ❤️ in Hyderabad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}