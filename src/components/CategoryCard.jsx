import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Мужская одежда', path: '/men', image: 'https://picsum.photos/id/20/600/400', icon: '👔' },
  { name: 'Женская одежда', path: '/women', image: 'https://picsum.photos/id/30/600/400', icon: '👗' },
  { name: 'Детская одежда', path: '/kids', image: 'https://picsum.photos/id/42/600/400', icon: '🧸' }
];

const CategoryCard = () => {
  const navigate = useNavigate();

  return (
    <div className="categories-grid">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="category-card"
          onClick={() => navigate(cat.path)}
        >
          <img src={cat.image} alt={cat.name} className="category-image" />
          <div className="category-overlay">
            <div style={{ fontSize: '3rem' }}>{cat.icon}</div>
            <h3 className="category-title">{cat.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;