// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden h-48">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-md text-xs font-bold">
              -{product.discount}%
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              NEW
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.stock} in stock)</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Cart</span>
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-lg border transition-colors ${
              isWishlisted 
                ? 'bg-red-500 text-white border-red-500' 
                : 'border-gray-300 dark:border-gray-600 hover:border-primary text-gray-600 dark:text-gray-300'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'white' : 'none'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;