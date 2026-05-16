import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Trash2, Plus, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, getCartSummary } from '@/components/data/cartStore';
import { base44 } from '@/api/base44Client';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [authState, setAuthState] = useState({ isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
    const checkAuth = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        const user = await base44.auth.me();
        setAuthState({ isAuthenticated: true, user });
      }
    };
    checkAuth();
  }, []);

  const handleUpdateQuantity = (itemId, quantity) => {
    const updated = updateCartItemQuantity(itemId, quantity);
    setCartItems(updated);
  };

  const handleRemove = (itemId) => {
    const updated = removeFromCart(itemId);
    setCartItems(updated);
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  const platformBreakdown = getCartSummary(cartItems);

  const handleProceedToCheckout = async () => {
    const isAuth = await base44.auth.isAuthenticated();
    if (!isAuth) {
      base44.auth.redirectToLogin(createPageUrl('Checkout'));
    } else {
      navigate(createPageUrl('Checkout'));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
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
            <h1 className="text-lg font-semibold text-[#2B2B2B]">Your Cart</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-[#2B2B2B] mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet.
              <br />Start comparing prices and saving money!
            </p>
            <Link to={createPageUrl('Search')}>
              <Button className="bg-gradient-to-r from-[#D62828] to-[#F77F00] text-white px-8">
                <Plus className="w-5 h-5 mr-2" />
                Browse Restaurants
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Auth warning */}
              {!authState.isAuthenticated && (
                <Alert className="bg-orange-50 border-orange-200">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <AlertDescription className="text-orange-700">
                    <button onClick={() => base44.auth.redirectToLogin()} className="font-semibold underline">Sign in</button> to save your cart and track your orders!
                  </AlertDescription>
                </Alert>
              )}

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2B2B2B]">
                  Cart Items ({cartItems.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleClearCart}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </div>

              {/* Items list */}
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.platform}`}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </AnimatePresence>

              {/* Smart suggestion */}
              <motion.div
                className="bg-gradient-to-r from-[#D62828]/10 to-[#F77F00]/10 rounded-xl p-4 border border-[#F77F00]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-semibold text-[#2B2B2B] mb-2">💡 Smart Tip</h4>
                <p className="text-sm text-gray-600">
                  You've selected items from different platforms. We'll optimize your order to get the best prices from each platform!
                </p>
              </motion.div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary items={cartItems} platformBreakdown={platformBreakdown} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}