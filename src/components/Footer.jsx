// src/components/Footer.jsx - FIXED with correct icon names
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaTiktok } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Harykim's Intertech</h3>
            <p className="text-gray-400 mb-4">Your trusted technology partner since 2026. Quality products, best prices, excellent service.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                <FaXTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://tiktok.com/@harykimsintertech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                <FaTiktok size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-primary transition">Shop</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition">About Us</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=Laptops" className="text-gray-400 hover:text-primary transition">Laptops</Link></li>
              <li><Link to="/shop?category=Computer Accessories" className="text-gray-400 hover:text-primary transition">Accessories</Link></li>
              <li><Link to="/shop?category=Networking Devices" className="text-gray-400 hover:text-primary transition">Networking</Link></li>
              <li><Link to="/shop?category=Technology Gadgets" className="text-gray-400 hover:text-primary transition">Gadgets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+254 118 477 340</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>hkintertech22@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Harykim's Intertech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;