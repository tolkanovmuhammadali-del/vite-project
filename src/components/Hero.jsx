import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Стильная одежда
          <br />
          для всей семьи
        </h1>
        <p className="hero-subtitle">
          Откройте для себя коллекцию премиальной одежды
        </p>
        <Link to="/men" className="hero-btn">
          Начать покупки →
        </Link>
      </div>
    </section>
  );
};

export default Hero;