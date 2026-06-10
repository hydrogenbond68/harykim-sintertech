// src/pages/admin/AdminOrders.jsx
import { useState } from 'react';
import { Search, Package, CheckCircle, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { formatPrice } from '../../utils/formatters';

function AdminOrders() {
  const { orders, dispatch } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statuses = ['all', 'pending', 'processing', 'completed'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status: newStatus } });
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch({ type: 'SET_ORDERS', payload: orders.filter(o => o.id !== orderId) });
      toast.success('Order deleted successfully');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filterStatus === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No orders found</p>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <p className="font-mono text-sm text-gray-500">{order.id}</p>
                  <p className="font-semibold">{order.fullName}</p>
                  <p className="text-sm text-gray-500">{order.email} • {order.phone}</p>
                </div>
                <div className="flex flex-col items-end gap-2 mt-3 md:mt-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-primary">{formatPrice(order.total)}</p>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <p className="text-sm font-medium mb-2">Items:</p>
                <div className="space-y-1">
                  {order.items?.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Delivery Address: {order.address}</p>
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'processing')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                    >
                      <Package size={14} />
                      Process Order
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      <CheckCircle size={14} />
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;