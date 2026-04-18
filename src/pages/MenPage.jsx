import React, { useState } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Modal from '../components/Modal';
import { products } from '../data/products';

const MenPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const menProducts = products.filter(p => p.category === 'men');

  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: '100px' }}>Мужская одежда</h1>
      <ProductsGrid products={menProducts} onQuickView={setSelectedProduct} />
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default MenPage;