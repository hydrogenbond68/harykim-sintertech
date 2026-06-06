// src/pages/ProductDetails.jsx
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist, addReview, reviews: allReviews } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const product = products.find(p => p.id === parseInt(id));
  const productReviews = allReviews.filter(r => r.productId === product?.id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const isWishlisted = wishlist.some(item => item.id === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-primary hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error('Please enter a review');
      return;
    }
    addReview({
      productId: product.id,
      userName: 'Guest User',
      rating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0],
    });
    setReviewText('');
    setRating(5);
    toast.success('Review added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link> / 
          <Link to="/shop" className="hover:text-primary"> Shop</Link> / 
          <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div>
              <div className="rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="ml-1 font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{productReviews.length} reviews</span>
                <span className="text-gray-400">•</span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    <span className="ml-2 bg-accent text-white px-2 py-1 rounded-md text-sm">-{product.discount}%</span>
                  </>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate('/checkout');
                  }}
                  disabled={product.stock === 0}
                  className="flex-1 bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition disabled:opacity-50"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-lg border transition ${
                    isWishlisted 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'white' : 'none'} />
                </button>
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Truck size={16} />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield size={16} />
                  <span>2-year warranty on all products</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <RotateCcw size={16} />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t p-6">
            <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="w-32 font-medium text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                  <span className="text-gray-800 dark:text-gray-200">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t p-6">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            
            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-3">Write a Review</h3>
              <div className="mb-3">
                <label className="block mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRating(r)}
                      className="focus:outline-none"
                    >
                      <Star size={24} className={r <= rating ? 'fill-accent text-accent' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary mb-3 dark:bg-gray-600"
                rows="3"
              />
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                Submit Review
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              ) : (
                productReviews.map(review => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{review.userName}</span>
                        <div className="flex items-center gap-1 ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;