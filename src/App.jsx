import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from './context/StoreContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminOrders from './pages/admin/AdminOrders';

// Scroll to top wrapper
const ScrollToTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={
              <ScrollToTop>
                <Home />
              </ScrollToTop>
            } />
            <Route path="shop" element={
              <ScrollToTop>
                <Shop />
              </ScrollToTop>
            } />
            <Route path="product/:id" element={
              <ScrollToTop>
                <ProductDetails />
              </ScrollToTop>
            } />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="about" element={
              <ScrollToTop>
                <About />
              </ScrollToTop>
            } />
          </Route>
        </Routes>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;