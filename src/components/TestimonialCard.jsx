// src/components/TestimonialCard.jsx
import { Star } from 'lucide-react';

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < testimonial.rating ? 'fill-accent text-accent' : 'text-gray-300'} />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.comment}"</p>
    </div>
  );
}

export default TestimonialCard;