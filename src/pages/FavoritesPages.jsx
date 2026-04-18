import React, { useState } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Modal from '../components/Modal';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: '100px' }}>Избранное</h1>
      {favorites.length === 0 ? (
        <div className="empty-message">🤍 Нет избранных товаров</div>
      ) : (
        <ProductsGrid products={favorites} onQuickView={setSelectedProduct} />
      )}
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default FavoritesPage;