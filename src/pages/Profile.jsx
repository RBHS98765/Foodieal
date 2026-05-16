import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Settings, LogOut, ChevronRight, TrendingDown, Star, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import { getOrders } from '@/components/data/cartStore';
import { base44 } from '@/api/base44Client';
import { getReviewsByUser } from '@/components/data/reviewStore';
import ReviewCard from '@/components/reviews/ReviewCard';
import { format } from 'date-fns';

const statusColors = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-yellow-100 text-yellow-700',
  preparing: 'bg-orange-100 text-orange-700',
  out_for_delivery: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700'
};

export default function ProfilePage() {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeSection, setActiveSection] = useState('orders');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin();
        return;
      }
      const user = await base44.auth.me();
      setAuthState({ isAuthenticated: true, user });
      setOrders(getOrders());
      if (user?.email) {
        setReviews(getReviewsByUser(user.email));
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    base44.auth.logout(createPageUrl('Home'));
  };

  const totalSavings = orders.reduce((sum, order) => sum + (order.savings || 0), 0);
  const totalOrders = orders.length;

  if (!authState.isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Home')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Home')}>
                <FoodiealLogo size="sm" />
              </Link>
            </div>
            <h1 className="text-lg font-semibold text-[#2B2B2B]">Profile</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 bg-gradient-to-r from-[#D62828] to-[#F77F00]">
              <AvatarFallback className="text-white text-xl font-bold">
                {authState.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-[#2B2B2B]">
                {authState.user?.name || 'User'}
              </h2>
              <p className="text-gray-500">{authState.user?.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FFF3E0] rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-[#D62828]">{totalOrders}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Saved</p>
              <p className="text-2xl font-bold text-green-600">₹{totalSavings}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { icon: Heart, label: 'Favorites', href: '#' },
            { icon: MessageSquare, label: 'My Reviews', onClick: () => setActiveSection('reviews') },
            { icon: Settings, label: 'Settings', href: '#' }
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${
                index !== 0 ? 'border-t border-gray-100' : ''
              }`}
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFF3E0] rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#F77F00]" />
                </div>
                <span className="font-medium text-[#2B2B2B]">{item.label}</span>
                {item.label === 'My Reviews' && reviews.length > 0 && (
                  <span className="text-xs bg-[#D62828] text-white px-2 py-0.5 rounded-full">{reviews.length}</span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </motion.div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeSection === 'orders' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('orders')}
            className={activeSection === 'orders' ? 'bg-[#D62828]' : ''}
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Orders
          </Button>
          <Button
            variant={activeSection === 'reviews' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('reviews')}
            className={activeSection === 'reviews' ? 'bg-[#D62828]' : ''}
          >
            <Star className="w-4 h-4 mr-1" />
            My Reviews ({reviews.length})
          </Button>
        </div>

        {activeSection === 'orders' ? (
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-[#D62828]" />
            <h3 className="text-lg font-bold text-[#2B2B2B]">Order History</h3>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders yet</p>
              <Link to={createPageUrl('Search')}>
                <Button className="mt-4 bg-[#D62828]">Start Ordering</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-[#2B2B2B]">
                        #{order.orderNumber || order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.createdAt && format(new Date(order.createdAt), 'MMM d, yyyy • h:mm a')}
                      </p>
                    </div>
                    <Badge className={statusColors[order.status] || statusColors.placed}>
                      {order.status?.replace(/_/g, ' ') || 'placed'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {order.items?.length || 0} items
                    </div>
                    <div className="flex items-center gap-3">
                      {order.savings > 0 && (
                        <span className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingDown className="w-4 h-4" />
                          Saved ₹{order.savings}
                        </span>
                      )}
                      <span className="font-bold text-[#2B2B2B]">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-[#FCBF49]" />
              <h3 className="text-lg font-bold text-[#2B2B2B]">My Reviews</h3>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No reviews yet</p>
                <p className="text-sm text-gray-400 mt-1">Rate your orders to help others!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Logout */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}