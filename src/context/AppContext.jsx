// src/context/AppContext.jsx - COMPLETE WORKING VERSION
import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockProducts, mockCategories, mockBrands, mockUsers, mockReviews } from '../data/mockData';
import { toast } from 'react-toastify';

const AppContext = createContext();

const initialState = {
  products: [],
  categories: [],
  brands: [],
  cart: [],
  wishlist: [],
  user: null,
  users: [],
  reviews: [],
  orders: [],
  loading: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_BRANDS':
      return { ...state, brands: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    case 'ADD_TO_CART_BULK':
      return { ...state, cart: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
      };
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, cart: [], wishlist: [] };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    case 'ADD_REVIEW':
      return { ...state, reviews: [action.payload, ...state.reviews] };
    case 'UPDATE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload.id ? { ...review, ...action.payload } : review
        ),
      };
    case 'DELETE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload),
      };
    case 'ADD_USER':
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedWishlist = localStorage.getItem('wishlist');
    const storedUser = localStorage.getItem('user');
    const storedOrders = localStorage.getItem('orders');

    if (storedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
    }
    if (storedWishlist) {
      dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(storedWishlist) });
    }
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    }
    if (storedOrders) {
      dispatch({ type: 'SET_ORDERS', payload: JSON.parse(storedOrders) });
    }

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      dispatch({ type: 'SET_USERS', payload: JSON.parse(storedUsers) });
    } else {
      dispatch({ type: 'SET_USERS', payload: mockUsers });
    }

    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
    dispatch({ type: 'SET_CATEGORIES', payload: mockCategories });
    dispatch({ type: 'SET_BRANDS', payload: mockBrands });
    dispatch({ type: 'SET_REVIEWS', payload: mockReviews });
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
    else localStorage.removeItem('user');
    localStorage.setItem('orders', JSON.stringify(state.orders));
    localStorage.setItem('users', JSON.stringify(state.users));
  }, [state.cart, state.wishlist, state.user, state.orders, state.users]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Added to cart!');
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.info('Removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } });
  };

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const login = (email, password) => {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      // eslint-disable-next-line no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      dispatch({ type: 'SET_USER', payload: userWithoutPassword });
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    dispatch({ type: 'SET_USER', payload: userWithoutPassword });
    toast.success('Registration successful!');
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.info('Logged out successfully');
  };

  const updateProfile = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    dispatch({ type: 'SET_USER', payload: updatedUser });
    
    // Update users list as well
    const updatedUsers = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);
    dispatch({ type: 'SET_USERS', payload: updatedUsers });
    
    toast.success('Profile updated successfully!');
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      items: [...state.cart],
      total: orderData.total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Order placed successfully!');
    return newOrder.id;
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), images: product.images || ['https://picsum.photos/500/500'] };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    toast.success('Product added successfully');
  };

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    toast.success('Product updated successfully');
  };

  const deleteProduct = (productId) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
    toast.success('Product deleted successfully');
  };

  const addReview = (review) => {
    const newReview = { ...review, id: Date.now(), createdAt: new Date().toISOString() };
    dispatch({ type: 'ADD_REVIEW', payload: newReview });
    toast.success('Review added');
  };

  const deleteReview = (reviewId) => {
    dispatch({ type: 'DELETE_REVIEW', payload: reviewId });
    toast.success('Review deleted');
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        login,
        register,
        logout,
        updateProfile,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        deleteReview,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}