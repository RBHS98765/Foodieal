import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Wallet, Building2, CheckCircle, Loader2, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FoodiealLogo from '@/components/ui/FoodiealLogo';
import { getCart, getCartSummary, clearCart, saveOrder } from '@/components/data/cartStore';
import { base44 } from '@/api/base44Client';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Wallet, description: 'Pay with any UPI app' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, etc.' },
  { id: 'cod', name: 'Cash on Delivery', icon: Building2, description: 'Pay when delivered' }
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [platformBreakdown, setPlatformBreakdown] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    flat: '',
    area: '',
    landmark: '',
    city: 'Hyderabad'
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(createPageUrl('Checkout'));
        return;
      }
      
      const items = getCart();
      if (items.length === 0) {
        navigate(createPageUrl('Cart'));
        return;
      }
      
      setCartItems(items);
      setPlatformBreakdown(getCartSummary(items));
      
      // Pre-fill from auth state
      const user = await base44.auth.me();
      if (user) {
        setAddress(prev => ({
          ...prev,
          name: user.full_name || '',
          phone: user.phone || ''
        }));
      }
    };
    checkAuth();
  }, [navigate]);

  const grandTotal = platformBreakdown.reduce((sum, p) => sum + p.total, 0);

  const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.flat || !address.area) {
      toast.error('Please fill in all required address fields (Name, Phone, Flat, Area)');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order = {
      orderNumber: `FD${Date.now()}`,
      items: cartItems,
      totalAmount: grandTotal,
      savings: platformBreakdown.reduce((sum, p) => sum + (p.savings || 0), 0),
      deliveryAddress: `${address.flat}, ${address.area}, ${address.landmark ? address.landmark + ', ' : ''}${address.city}`,
      platformBreakdown,
      paymentMethod,
      status: 'placed',
      estimatedDelivery: '30-40 min'
    };

    saveOrder(order);
    clearCart();

    navigate(createPageUrl('OrderSuccess') + `?orderId=${order.orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Cart')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Home')}>
                <FoodiealLogo size="sm" />
              </Link>
            </div>
            <h1 className="text-lg font-semibold text-[#2B2B2B]">Checkout</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Address */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#D62828]" />
                <h2 className="text-lg font-bold text-[#2B2B2B]">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="flat">Flat / House No / Building</Label>
                  <Input
                    id="flat"
                    value={address.flat}
                    onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                    placeholder="Flat 302, Tower A"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="area">Area / Street / Sector</Label>
                  <Input
                    id="area"
                    value={address.area}
                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    placeholder="Hitech City, Madhapur"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    placeholder="Near Metro Station"
                    className="mt-1"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#D62828]" />
                <h2 className="text-lg font-bold text-[#2B2B2B]">Payment Method</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-[#D62828] bg-[#FFF3E0]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      paymentMethod === method.id ? 'bg-[#D62828]' : 'bg-gray-100'
                    }`}>
                      <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={method.id} className="cursor-pointer font-medium">
                        {method.name}
                      </Label>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-bold text-[#2B2B2B] mb-4">Order Summary</h2>

              {/* Items preview */}
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.platform}`} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                {platformBreakdown.map((platform) => (
                  <div key={platform.platform} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{platform.platform} Total</span>
                    <span>₹{platform.total}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span className="text-[#D62828]">₹{grandTotal}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 h-14 bg-gradient-to-r from-[#D62828] to-[#F77F00] text-white font-semibold text-lg rounded-xl"
                onClick={handlePlaceOrder}
                disabled={isProcessing || !address.name || !address.phone || !address.flat || !address.area}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Place Order • ₹{grandTotal}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secure checkout powered by Razorpay</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}