import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { favoritesCount } = useFavorites();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMenu(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">✦ FASHION</Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/men" className="nav-link">Мужская</Link>
          <Link to="/women" className="nav-link">Женская</Link>
          <Link to="/kids" className="nav-link">Детская</Link>
          {user && (
            <Link to="/favorites" className="nav-link favorites-link">
              ❤️ Избранное
              {favoritesCount > 0 && (
                <span className="favorites-count">{favoritesCount}</span>
              )}
            </Link>
          )}
          
          <button onClick={toggleTheme} className="theme-toggle">
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="user-menu">
              <button onClick={() => setShowMenu(!showMenu)} className="user-btn">
                👤 {user.name}
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="dropdown-item">
                    🚪 Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link">🔑 Войти</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;