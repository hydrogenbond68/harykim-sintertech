// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, CheckCircle, Loader2, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';
import { formatPrice } from '../utils/formatters';

function Checkout() {
  const navigate = useNavigate();
  const { cart, placeOrder, user } = useStore();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentState, setPaymentState] = useState('idle'); // idle, initiating, waiting, success, error
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
  });

  // Redirect if not logged in
  if (!user) {
    toast.warn('Please login to proceed with checkout');
    return <Navigate to="/login" replace />;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    setShowPaymentModal(true);
    setPaymentState('idle');
  };

  const initiateMpesaSTK = () => {
    setPaymentState('initiating');
    
    // Simulate STK Push Initiation
    setTimeout(() => {
      setPaymentState('waiting');
      toast.info('STK Push sent to your phone!');
      
      // Simulate waiting for PIN entry and M-Pesa Callback
      setTimeout(() => {
        handleFinalizeOrder();
      }, 5000);
    }, 2000);
  };

  const handleFinalizeOrder = () => {
    const orderId = placeOrder({
      ...formData,
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod: 'M-Pesa',
      tillNumber: '8379978'
    });
    setOrderReference(orderId);
    setPaymentState('success');
    
    setTimeout(() => {
      setOrderPlaced(true);
      setShowPaymentModal(false);
      toast.success('Payment Received! Your order is being processed.');
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return <Navigate to="/shop" replace />;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-green-100 dark:border-green-900"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-white">Order Confirmed!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for choosing Harykim's Intertech. Your premium accessories are on their way!</p>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Order Reference</p>
            <p className="font-mono text-lg font-bold text-primary">{orderReference}</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-primary text-white px-6 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
          >
            Track Your Order
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <ShieldCheck className="text-primary" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">Secure Checkout</h1>
            <p className="text-gray-500">Complete your purchase safely and seamlessly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Billing Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">1</span>
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Phone Number (M-Pesa) *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0712 345 678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street name, Building, Apartment"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Nairobi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="00100"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 h-fit sticky top-12">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
                Order Summary
              </h2>
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-green-600">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (VAT 16%)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-3xl font-black text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg mt-8 hover:bg-accent/90 transform hover:scale-[1.02] transition-all shadow-lg shadow-accent/20 active:scale-95"
              >
                Proceed to Payment
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={14} />
                Encrypted & Secure Transaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* M-Pesa Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Background Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

              {paymentState === 'idle' && (
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Smartphone size={48} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black mb-2">M-Pesa Payment</h2>
                  <p className="text-gray-500 mb-8">Pay securely via M-Pesa STK Push</p>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl mb-8 border border-gray-100 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Payment to:</span>
                      <span className="font-bold text-gray-900 dark:text-white">Harykim's Intertech</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Till Number:</span>
                      <span className="text-2xl font-black text-primary tracking-wider">8379978</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Amount:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 px-6 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={initiateMpesaSTK}
                      className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-95"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {paymentState === 'initiating' && (
                <div className="text-center py-10 relative z-10">
                  <Loader2 size={64} className="mx-auto text-primary animate-spin mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Initiating Payment...</h2>
                  <p className="text-gray-500">Establishing secure connection with Safaricom</p>
                </div>
              )}

              {paymentState === 'waiting' && (
                <div className="text-center py-10 relative z-10">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <Smartphone size={64} className="mx-auto text-primary animate-bounce" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                    ></motion.div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Check Your Phone</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    An M-Pesa prompt has been sent to <span className="font-bold text-gray-900 dark:text-white">{formData.phone}</span>
                  </p>
                  <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl inline-block border border-primary/10">
                    <p className="text-sm text-primary font-medium flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Waiting for PIN entry...
                    </p>
                  </div>
                </div>
              )}

              {paymentState === 'success' && (
                <div className="text-center py-10 relative z-10">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h2>
                  <p className="text-gray-500">M-Pesa transaction verified successfully</p>
                </div>
              )}

              {paymentState === 'error' && (
                <div className="text-center py-10 relative z-10">
                  <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Payment Failed</h2>
                  <p className="text-gray-500 mb-8">The transaction was cancelled or timed out.</p>
                  <button
                    onClick={() => setPaymentState('idle')}
                    className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-4 rounded-2xl font-bold"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Checkout;