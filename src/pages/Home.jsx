import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import Newsletter from '../components/Newsletter';

const heroSlides = [
  {
    image: '/001.jpg',
    title: 'Oraimo FreePods 4',
    subtitle: 'Perfect Sound Experience',
    specs: [
      { icon: '🔋', label: '35.5h Playtime', color: 'blue' },
      { icon: '🔇', label: 'Pro ANC', color: 'purple' },
      { icon: '💧', label: 'IPX5 Water', color: 'green' },
      { icon: '⚡', label: 'Flash Charge', color: 'orange' }
    ]
  },
  {
    image: '/003.jpg',
    title: 'Oraimo Watch 3',
    subtitle: 'Smart Fitness Companion',
    specs: [
      { icon: '⌚', label: '1.83" Display', color: 'indigo' },
      { icon: '💓', label: 'Heart Rate', color: 'red' },
      { icon: '🏃', label: '120+ Sports', color: 'green' },
      { icon: '🔋', label: '7-Day Battery', color: 'blue' }
    ]
  },
  {
    image: '/2.jpg',
    title: 'Oraimo SoundBox',
    subtitle: 'Powerful Bass Anywhere',
    specs: [
      { icon: '🔊', label: 'Deep Bass', color: 'pink' },
      { icon: '📻', label: 'FM Radio', color: 'blue' },
      { icon: '🔋', label: '12h Playback', color: 'orange' },
      { icon: '📶', label: 'BT 5.1', color: 'purple' }
    ]
  }
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const trending = products.filter(p => p.isTrending).slice(0, 4);
  const discounted = products.filter(p => p.discount > 15).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Slider Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gray-900 text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={heroSlides[currentSlide].image} 
              alt={heroSlides[currentSlide].title} 
              className="w-full h-full object-cover opacity-40 transition-transform duration-[10000ms] scale-110"
              style={{ transform: 'scale(1.1) translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Dynamic Image */}
            <motion.div
              key={`img-${currentSlide}`}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex justify-center order-2 lg:order-1"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-accent rounded-full blur-[100px] opacity-30 animate-pulse transition-opacity"></div>
                <img 
                  src={heroSlides[currentSlide].image} 
                  alt={heroSlides[currentSlide].title} 
                  className="relative z-10 w-[500px] h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.3)] transform transition-all duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right Side: Content */}
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-accent/30 uppercase tracking-widest backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Flash Deals
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-2">Harykim's Intertech</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title.split(' ')[0]} <span className="text-white">{heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-xl border-l-4 border-accent pl-6 italic">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              {/* Dynamic Specs Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12">
                {heroSlides[currentSlide].specs.map((spec, idx) => (
                  <div key={idx} className={`group bg-${spec.color}-500/10 hover:bg-${spec.color}-500/20 p-4 rounded-2xl border border-${spec.color}-500/30 transition-all duration-300`}>
                    <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{spec.icon}</div>
                    <p className="font-bold text-lg">{spec.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="bg-accent hover:bg-accent/90 text-gray-900 px-10 py-4 rounded-2xl font-black transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                  GET IT NOW
                </Link>
                <div className="flex gap-2 ml-auto lg:ml-0">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-3 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-accent' : 'w-3 bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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