// src/components/Navbar.jsx - FIXED with correct icons
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist, user } = useStore();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const whatsappNumber = "+254118477340";
  const whatsappMessage = encodeURIComponent("Hello, I have an enquiry about your products.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${whatsappMessage}`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Harykim's Intertech" className="h-10 w-10 rounded-full object-cover border-2 border-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary leading-tight">Harykim's</span>
                <span className="text-sm font-semibold text-secondary dark:text-white leading-tight">Intertech</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Home</Link>
              <Link to="/shop" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Shop</Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">About Us</Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Contact Us</a>
              {user && <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Dashboard</Link>}
              {user?.role === 'admin' && <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Admin</Link>}
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Search size={20} />
              </button>
              
              <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-2 border-l pl-4 dark:border-gray-700">
                <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300" title="Toggle Mode">
                  {darkMode ? (
                    <Moon size={20} className="text-blue-400 fill-blue-400/20" />
                  ) : (
                    <Sun size={20} className="text-yellow-500 fill-yellow-500/20" />
                  )}
                </button>
                {user ? (
                  <Link to="/dashboard" className="flex items-center space-x-2">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border-2 border-primary" />
                  </Link>
                ) : (
                  <Link to="/login" className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition shadow-sm font-semibold">
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                <Link to="/" className="py-2 text-gray-700 dark:text-gray-300 font-medium border-b dark:border-gray-800" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" className="py-2 text-gray-700 dark:text-gray-300 font-medium border-b dark:border-gray-800" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                <Link to="/about" className="py-2 text-gray-700 dark:text-gray-300 font-medium border-b dark:border-gray-800" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="py-2 text-gray-700 dark:text-gray-300 font-medium border-b dark:border-gray-800" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
                {user && <Link to="/dashboard" className="py-2 text-gray-700 dark:text-gray-300 font-medium border-b dark:border-gray-800" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>}
                {user?.role === 'admin' && <Link to="/admin" className="py-2 text-gray-700 dark:text-gray-300 font-medium border-b dark:border-gray-800" onClick={() => setMobileMenuOpen(false)}>Admin</Link>}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex space-x-4">
                    <Link to="/wishlist" className="relative p-2" onClick={() => setMobileMenuOpen(false)}>
                      <Heart size={24} />
                      {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{wishlistCount}</span>}
                    </Link>
                    <Link to="/cart" className="relative p-2" onClick={() => setMobileMenuOpen(false)}>
                      <ShoppingCart size={24} />
                      {cartCount > 0 && <span className="absolute top-0 right-0 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cartCount}</span>}
                    </Link>
                  </div>
                  <button onClick={toggleDarkMode} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                    {darkMode ? (
                      <Moon size={20} className="text-blue-400" />
                    ) : (
                      <Sun size={20} className="text-yellow-500" />
                    )}
                    <span className="font-medium">{darkMode ? 'Dark' : 'Light'} Mode</span>
                  </button>
                </div>
                {!user && (
                  <Link to="/login" className="bg-primary text-white px-4 py-3 rounded-lg text-center font-bold shadow-lg" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600"
                  autoFocus
                />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">Search</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;