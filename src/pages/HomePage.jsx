import React, { useState } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Modal from '../components/Modal';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import { products } from '../data/products';

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />
      <div className="container">
        <div className="categories-section">
          <h2 className="section-title">Категории</h2>
          <CategoryCard />
        </div>
        <div className="categories-section">
          <h2 className="section-title">Популярные товары</h2>
          <ProductsGrid products={featuredProducts} onQuickView={setSelectedProduct} />
        </div>
        <div className="categories-section">
          <h2 className="section-title">Все товары</h2>
          <ProductsGrid products={products} onQuickView={setSelectedProduct} />
        </div>
      </div>
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default HomePage;