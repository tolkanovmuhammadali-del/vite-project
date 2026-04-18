import React, { useState } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Modal from '../components/Modal';
import { products } from '../data/products';

const KidsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const kidsProducts = products.filter(p => p.category === 'kids');

  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: '100px' }}>Детская одежда</h1>
      <ProductsGrid products={kidsProducts} onQuickView={setSelectedProduct} />
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default KidsPage;