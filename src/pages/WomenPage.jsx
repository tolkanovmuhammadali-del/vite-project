import React, { useState } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Modal from '../components/Modal';
import { products } from '../data/products';

const WomenPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const womenProducts = products.filter(p => p.category === 'women');

  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: '100px' }}>Женская одежда</h1>
      <ProductsGrid products={womenProducts} onQuickView={setSelectedProduct} />
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default WomenPage;