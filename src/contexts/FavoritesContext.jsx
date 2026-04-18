import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`favorites_${user.email}`);
      if (saved) {
        setFavorites(JSON.parse(saved));
      } else {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && favorites.length >= 0) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = (product) => {
    setFavorites(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      favoritesCount: favorites.length
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};