// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/productsData';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onUserChange, setOnUserChange] = useState(null);

  // Initialize Auth State
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (email, password) => {
    const cleanEmail = email.toLowerCase().trim();
    let allUsers = [...mockUsers];
    
    try {
      const storedUsersRaw = localStorage.getItem('users');
      if (storedUsersRaw && storedUsersRaw !== 'undefined') {
        const parsedUsers = JSON.parse(storedUsersRaw);
        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          allUsers = parsedUsers;
        }
      }
    } catch (e) {
      console.error('Error parsing users from localStorage:', e);
    }
    
    // Check if user exists in the current list
    let foundUser = allUsers.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    // Emergency Admin Recovery: If the hardcoded admin isn't in the list (e.g. deleted), 
    // but the credentials match, restore it to the users list.
    if (!foundUser && cleanEmail === 'hkintertech22@gmail.com' && password === 'admin123') {
      foundUser = mockUsers.find(u => u.email === 'hkintertech22@gmail.com');
      const updatedUsers = [foundUser, ...allUsers.filter(u => u.email !== foundUser.email)];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      if (onUserChange) onUserChange(updatedUsers);
    }

    if (foundUser) {
      // eslint-disable-next-line no-unused-vars
      const { password: _, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));
      toast.success(`Welcome back, ${safeUser.name}!`);
      return { success: true, role: safeUser.role };
    }

    toast.error('Invalid email or password');
    return { success: false };
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
      createdAt: new Date().toISOString(),
    };
    
    let storedUsers = [...mockUsers];
    try {
      const storedUsersRaw = localStorage.getItem('users');
      if (storedUsersRaw && storedUsersRaw !== 'undefined') {
        const parsedUsers = JSON.parse(storedUsersRaw);
        if (Array.isArray(parsedUsers)) {
          storedUsers = parsedUsers;
        }
      }
    } catch (e) {
      console.error('Error parsing users during registration:', e);
    }
    
    if (storedUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      toast.error('Email already registered');
      return { success: false };
    }

    const updatedUsers = [newUser, ...storedUsers];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // IMMEDIATE BROADCAST: Ensure the StoreContext hears about this new user right away
    if (onUserChange && typeof onUserChange === 'function') {
      onUserChange(updatedUsers);
    }
    
    // Log the user in
    // eslint-disable-next-line no-unused-vars
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('user', JSON.stringify(safeUser));
    
    toast.success('Registration successful!');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  const updateAuthUser = (updatedUserData) => {
    const newUserState = { ...user, ...updatedUserData };
    setUser(newUserState);
    localStorage.setItem('user', JSON.stringify(newUserState));

    const storedUsers = JSON.parse(localStorage.getItem('users')) || mockUsers;
    const updatedUsers = storedUsers.map(u => 
      u.email.toLowerCase() === newUserState.email.toLowerCase() 
        ? { ...u, ...updatedUserData } 
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Notify StoreContext if callback exists
    if (onUserChange) onUserChange(updatedUsers);
    
    toast.success('Profile updated');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, updateAuthUser, setOnUserChange }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
