import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onQuickView }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(product);
  };

  return (
    <div className="product-card" onClick={() => onQuickView(product)}>
      <div className="product-image-wrapper">
        <div className="product-badge">🔥 ХИТ</div>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-category">
          {product.category === 'men' ? 'МУЖСКАЯ' : product.category === 'women' ? 'ЖЕНСКАЯ' : 'ДЕТСКАЯ'}
        </div>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">{product.price.toLocaleString()} ₽</div>
        <div className="card-actions">
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            {user && isFavorite(product.id) ? '❤️' : '🤍'}
          </button>
          <button className="detail-btn" onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}>
            Подробнее →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;