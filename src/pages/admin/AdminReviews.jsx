// src/pages/admin/AdminReviews.jsx
import { useState } from 'react';
import { Search, Star, Trash2, CheckCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { toast } from 'react-toastify';

function AdminReviews() {
  const { reviews, products, deleteReview, dispatch } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  const filteredReviews = reviews.filter(review =>
    review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (reviewId) => {
    dispatch({ type: 'UPDATE_REVIEW', payload: { id: reviewId, approved: true } });
    toast.success('Review approved');
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Management</h1>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reviews found</p>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{review.comment}</p>
                  <p className="text-xs text-primary">Product: {getProductName(review.productId)}</p>
                </div>
                <div className="flex gap-2">
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Approve"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminReviews;