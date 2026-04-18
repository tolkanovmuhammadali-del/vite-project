import React from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = ({ products, onQuickView }) => {
  if (!products || products.length === 0) {
    return <div className="empty-message">✨ Товары не найдены</div>;
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;