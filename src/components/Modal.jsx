import React, { useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Modal = ({ product, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/login');
      onClose();
      return;
    }
    toggleFavorite(product);
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-info">
            <h2>{product.name}</h2>
            <div className="modal-price">{product.price.toLocaleString()} ₽</div>
            <p className="modal-description">{product.description}</p>
            <select className="size-select">
              <option>Выберите размер</option>
              {product.sizes.map(size => (
                <option key={size}>{size}</option>
              ))}
            </select>
            <button className="modal-favorite-btn" onClick={handleFavoriteClick}>
              {user && isFavorite(product.id) ? '❤️ В избранном' : '🤍 Добавить в избранное'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;