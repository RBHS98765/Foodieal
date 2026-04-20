import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, FileText, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import OrderTracker from '@/components/order/OrderTracker';
import OrderTimeline from '@/components/order/OrderTimeline';
import DeliveryPersonCard from '@/components/order/DeliveryPersonCard';
import LiveTrackingMap from '@/components/order/LiveTrackingMap';
import ReviewForm from '@/components/reviews/ReviewForm';
import { getOrders } from '@/components/data/cartStore';
import { saveReview, hasUserReviewedOrder } from '@/components/data/reviewStore';
import { base44 } from '@/api/base44Client';

export default function OrderSuccessPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  
  const [order, setOrder] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [authState, setAuthState] = useState({ user: null });
  const [orderStatus, setOrderStatus] = useState('placed');

  useEffect(() => {
    const init = async () => {
      const orders = getOrders();
      const found = orders.find(o => o.id === orderId || o.orderNumber === orderId);
      const orderData = found || orders[0];
      setOrder(orderData);
      setOrderStatus(orderData?.status || 'placed');
      
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        const user = await base44.auth.me();
        setAuthState({ user });
        if (user && orderId) {
          setHasReviewed(hasUserReviewedOrder(orderId, user.email));
        }
      }
    };
    init();

    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [orderId]);

  const handleStatusChange = (newStatus) => {
    setOrderStatus(newStatus);
    // Update order in localStorage
    if (order) {
      const orders = getOrders();
      const updatedOrders = orders.map(o => 
        (o.id === order.id || o.orderNumber === order.orderNumber) 
          ? { ...o, status: newStatus } 
          : o
      );
      localStorage.setItem('foodieal_orders', JSON.stringify(updatedOrders));
      setOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleSubmitReview = async (reviewData) => {
    saveReview({
      ...reviewData,
      userName: authState.user?.full_name,
      userEmail: authState.user?.email
    });
    setHasReviewed(true);
    setShowReviewForm(false);
    toast.success('Thank you for your review!');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFF3E0] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Order not found</h2>
          <Link to={createPageUrl('Home')}>
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3E0] relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#D62828', '#F77F00', '#FCBF49', '#2B2B2B'][i % 4],
                left: `${Math.random() * 100}%`,
              }}
              initial={{ top: -20, rotate: 0 }}
              animate={{
                top: '100%',
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                x: (Math.random() - 0.5) * 200
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Link to={createPageUrl('Home')}>
              <FoodiealLogo size="md" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <motion.div
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-14 h-14 text-green-600" />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-[#2B2B2B] mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Order Placed! 🎉
          </motion.h1>

          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your order <span className="font-semibold text-[#D62828]">#{order.orderNumber}</span> has been confirmed
          </motion.p>
        </motion.div>

        {/* Order Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <OrderTracker 
            status={orderStatus} 
            estimatedTime={order.estimatedDelivery}
            onStatusChange={handleStatusChange}
            enableSimulation={true}
          />
        </motion.div>

        {/* Live Map - Show when out for delivery */}
        {(orderStatus === 'out_for_delivery' || orderStatus === 'preparing') && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <LiveTrackingMap status={orderStatus} deliveryAddress={order.deliveryAddress} />
          </motion.div>
        )}

        {/* Delivery Person - Show when out for delivery */}
        {orderStatus === 'out_for_delivery' && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}
          >
            <DeliveryPersonCard orderId={order.orderNumber} />
          </motion.div>
        )}

        {/* Order Timeline */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <OrderTimeline currentStatus={orderStatus} orderTime={order.createdAt} />
        </motion.div>

        {/* Order Details */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-bold text-[#2B2B2B] mb-4">Order Details</h3>

          <div className="space-y-3 mb-4">
            {order.items?.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
            {order.items?.length > 3 && (
              <p className="text-sm text-gray-500">
                +{order.items.length - 3} more items
              </p>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-[#D62828]">₹{order.totalAmount}</span>
            </div>
            {order.savings > 0 && (
              <p className="text-sm text-green-600 mt-1">
                You saved ₹{order.savings} on this order!
              </p>
            )}
          </div>

          {/* Delivery Address */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Delivering to</p>
            <p className="font-medium text-[#2B2B2B]">{order.deliveryAddress}</p>
          </div>
        </motion.div>

        {/* Review Section */}
        {order.status === 'delivered' || order.status === 'placed' ? (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            {hasReviewed ? (
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <Star className="w-6 h-6 text-[#FCBF49] mx-auto mb-2" />
                <p className="text-green-700 font-medium">Thanks for your review!</p>
              </div>
            ) : showReviewForm ? (
              <ReviewForm
                restaurantId={order.items?.[0]?.restaurantId || order.platformBreakdown?.[0]?.platform}
                restaurantName={order.items?.[0]?.restaurantName || 'Restaurant'}
                menuItemId={order.items?.[0]?.id}
                menuItemName={order.items?.[0]?.name}
                orderId={order.orderNumber || order.id}
                onSubmit={handleSubmitReview}
                onCancel={() => setShowReviewForm(false)}
              />
            ) : (
              <Button
                variant="outline"
                className="w-full h-12 border-[#FCBF49] text-[#F77F00] hover:bg-[#FFF3E0]"
                onClick={() => setShowReviewForm(true)}
              >
                <Star className="w-5 h-5 mr-2" />
                Rate Your Order
              </Button>
            )}
          </motion.div>
        ) : null}

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to={createPageUrl('Home')} className="flex-1">
            <Button variant="outline" className="w-full h-12">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to={createPageUrl('Profile')} className="flex-1">
            <Button className="w-full h-12 bg-gradient-to-r from-[#D62828] to-[#F77F00] text-white">
              <FileText className="w-5 h-5 mr-2" />
              View All Orders
            </Button>
          </Link>
        </motion.div>

        {/* Share */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-500 mb-2">Love saving money? Share Foodieal!</p>
          <Button variant="ghost" className="text-[#F77F00]">
            <Share2 className="w-4 h-4 mr-2" />
            Share with Friends
          </Button>
        </motion.div>
      </div>
    </div>
  );
}