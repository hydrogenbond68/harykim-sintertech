// src/pages/UserDashboard.jsx
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { User, Package, Heart, Settings, LogOut, Edit2, Check, Camera, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { toast } from 'react-toastify';

function UserDashboard() {
  const { user, orders, wishlist, logout, updateProfile } = useStore();
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateProfile({ avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random` });
    toast.info('Profile photo removed');
  };

  const handleProfileUpdate = () => {
    updateProfile(profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="relative inline-block group">
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-primary" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <label className="p-2 bg-primary text-white rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg" title="Upload Photo">
                        <Camera size={16} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                      <button onClick={removePhoto} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg" title="Remove Photo">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Edit2 size={16} />
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={handleProfileUpdate}
                        className="flex items-center gap-2 text-green-600 hover:underline"
                      >
                        <Check size={16} />
                        Save Changes
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="mt-1 text-lg">{user.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="mt-1">{user.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="mt-1">{user.phone || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Address</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                          rows="2"
                        />
                      ) : (
                        <p className="mt-1">{user.address || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                  {orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-mono text-sm text-gray-500">{order.id}</p>
                              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {order.items.slice(0, 2).map(item => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                            )}
                          </div>
                          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-primary">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                  {wishlist.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items in wishlist</p>
                  ) : (
                    <div className="space-y-4">
                      {wishlist.map(product => (
                        <div key={product.id} className="flex gap-4 border-b pb-4">
                          <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                            <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about orders and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={darkMode} 
                          onChange={toggleDarkMode} 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;