import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import Newsletter from '../components/Newsletter';

const categories = [
  { name: 'Laptops', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Computer Accessories', icon: '🖱️', color: 'from-purple-500 to-pink-500' },
  { name: 'Networking Devices', icon: '🌐', color: 'from-green-500 to-emerald-500' },
  { name: 'Phone Accessories', icon: '📱', color: 'from-orange-500 to-red-500' },
  { name: 'Computer Components', icon: '🔧', color: 'from-indigo-500 to-blue-500' },
];

const testimonials = [
  { id: 1, name: 'Michael Otieno', role: 'IT Manager', rating: 5, comment: 'Best tech store in Kenya! Got my MacBook at an amazing price.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Sarah Wanjiku', role: 'Software Engineer', rating: 5, comment: 'Fast delivery and genuine products. Highly recommend!', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'James Mwangi', role: 'Business Owner', rating: 4, comment: 'Great customer service and quality products.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

function Home() {
  const { products } = useStore();
  
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const trending = products.filter(p => p.isTrending).slice(0, 4);
  const discounted = products.filter(p => p.discount > 15).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Harykim's <span className="text-accent">Intertech</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6">Your Trusted Technology Partner</p>
            <p className="text-lg mb-8 text-gray-200">Premium laptops, accessories, and gadgets at unbeatable prices.</p>
            <div className="flex gap-4">
              <Link to="/shop" className="bg-accent hover:bg-accent/90 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                Shop Now
              </Link>
              <Link to="/shop" className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-lg font-semibold backdrop-blur-sm transition-all">
                Explore Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/shop?category=${cat.name}`} className="block">
                  <div className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl text-center text-white transform transition-all hover:scale-105 hover:shadow-xl`}>
                    <div className="text-5xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">🔥 Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">✨ New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">📈 Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Products */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">🎯 Special Discounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discounted.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

export default Home;