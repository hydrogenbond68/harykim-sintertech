// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      
      // Simulate API call and email sending
      setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true);
        toast.success(`Reset link sent successfully to ${email}`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Reset Password</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter the email you registered with to receive a reset link
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700"
                  placeholder="hkintertech22@gmail.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Send size={18} className={isLoading ? 'animate-bounce' : ''} />
              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl mb-6 border border-green-200 dark:border-green-800">
              <p className="font-semibold">Check your inbox!</p>
              <p className="text-sm mt-1">We've sent a password reset link to:</p>
              <p className="font-mono mt-2 text-primary">{email}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">If you don't see the email, check your spam folder.</p>
            <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg inline-block hover:bg-primary/90 transition-colors">
              Back to Login
            </Link>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-primary hover:underline">
            Remember your password? Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;