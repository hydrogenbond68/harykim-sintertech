// src/pages/admin/AdminDashboard.jsx
import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, Star, Banknote, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/format';

function AdminDashboard() {
  const { products, users, orders, reviews } = useApp();

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Products', value: products.length, icon: Package, color: 'bg-green-500' },
    { title: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-purple-500' },
    { title: 'Total Reviews', value: reviews.length, icon: Star, color: 'bg-yellow-500' },
  ];

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length ? totalRevenue / orders.length : 0;
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Banknote className="text-primary" size={24} />
            <h2 className="text-xl font-semibold">Revenue Statistics</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Revenue</span>
              <span className="font-bold text-xl text-primary">{formatPrice(totalRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Average Order Value</span>
              <span className="font-semibold">{formatPrice(averageOrderValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Orders</span>
              <span className="font-semibold">{orders.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-accent" size={24} />
            <h2 className="text-xl font-semibold">Quick Stats</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Products in Stock</span>
              <span className="font-semibold text-green-600">{products.filter(p => p.stock > 0).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Low Stock Items</span>
              <span className="font-semibold text-orange-600">{products.filter(p => p.stock > 0 && p.stock < 10).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Out of Stock</span>
              <span className="font-semibold text-red-600">{products.filter(p => p.stock === 0).length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left py-3">Customer</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Total</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 font-mono text-sm">{order.id}</td>
                    <td className="py-3">{order.fullName}</td>
                    <td className="py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 font-semibold">{formatPrice(order.total)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;