// src/context/StoreContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockProducts, mockCategories, mockBrands, mockUsers, mockReviews } from '../data/productsData';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const StoreContext = createContext();

const initialState = {
  products: [],
  categories: [],
  brands: [],
  cart: [],
  wishlist: [],
  users: [],
  reviews: [],
  orders: [],
  loading: false,
  isInitialized: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return { ...state, isInitialized: true };
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

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { setOnUserChange } = useAuth();

  // Load data from localStorage on mount
  useEffect(() => {
    const safeParse = (key, fallback) => {
      try {
        const item = localStorage.getItem(key);
        if (!item || item === 'undefined' || item === 'null') return fallback;
        const parsed = JSON.parse(item);
        return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed;
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return fallback;
      }
    };

    const storedCart = safeParse('cart', []);
    const storedWishlist = safeParse('wishlist', []);
    const storedOrders = safeParse('orders', []);
    const storedUsers = safeParse('users', mockUsers);
    const storedProducts = safeParse('products', mockProducts);
    const storedReviews = safeParse('reviews', mockReviews);

    dispatch({ type: 'SET_CART', payload: storedCart });
    dispatch({ type: 'SET_WISHLIST', payload: storedWishlist });
    dispatch({ type: 'SET_ORDERS', payload: storedOrders });
    dispatch({ type: 'SET_USERS', payload: storedUsers });
    dispatch({ type: 'SET_PRODUCTS', payload: storedProducts });
    dispatch({ type: 'SET_REVIEWS', payload: storedReviews });

    dispatch({ type: 'SET_CATEGORIES', payload: mockCategories });
    dispatch({ type: 'SET_BRANDS', payload: mockBrands });
    dispatch({ type: 'SET_INITIALIZED' });
  }, []);

  // Link AuthContext changes to StoreContext
  useEffect(() => {
    if (setOnUserChange) {
      setOnUserChange((updatedUsers) => {
        if (updatedUsers && Array.isArray(updatedUsers)) {
          dispatch({ type: 'SET_USERS', payload: updatedUsers });
        }
      });
    }
  }, [setOnUserChange]);

  // Save to localStorage on state changes
  useEffect(() => {
    if (!state.isInitialized) return;
    
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('orders', JSON.stringify(state.orders));
    localStorage.setItem('users', JSON.stringify(state.users));
    localStorage.setItem('products', JSON.stringify(state.products));
    localStorage.setItem('reviews', JSON.stringify(state.reviews));
  }, [state.cart, state.wishlist, state.orders, state.users, state.products, state.reviews, state.isInitialized]);

  const addToCart = (product, quantity = 1) => {
    // Check stock
    const currentProduct = state.products.find(p => p.id === product.id);
    if (!currentProduct || currentProduct.stock < quantity) {
      toast.error('Not enough stock available');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.info('Removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    // Check stock
    const product = state.products.find(p => p.id === productId);
    if (product && quantity > product.stock) {
      toast.error(`Only ${product.stock} units available`);
      return;
    }

    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } });
  };

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const toggleUserRole = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const updatedUsers = state.users.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    );
    
    dispatch({ type: 'SET_USERS', payload: updatedUsers });
    
    toast.success(`User role updated to ${newRole}`);
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

    // Decrease stock for each item in the cart
    const updatedProducts = state.products.map(product => {
      const cartItem = state.cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: Math.max(0, product.stock - cartItem.quantity) };
      }
      return product;
    });

    dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
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

  const approveReview = (reviewId) => {
    const updatedReviews = state.reviews.map(review =>
      review.id === reviewId ? { ...review, status: 'approved' } : review
    );
    dispatch({ type: 'SET_REVIEWS', payload: updatedReviews });
    toast.success('Review approved');
  };

  const deleteReview = (reviewId) => {
    dispatch({ type: 'DELETE_REVIEW', payload: reviewId });
    toast.success('Review deleted');
  };

  return (
    <StoreContext.Provider value={{
      ...state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      toggleUserRole,
      placeOrder,
      addProduct,
      updateProduct,
      deleteProduct,
      addReview,
      approveReview,
      deleteReview
    }}>
      {children}
    </StoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}