// src/components/Newsletter.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Send } from 'lucide-react';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Get the latest updates on new products and exclusive offers
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
            <Send size={18} />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;