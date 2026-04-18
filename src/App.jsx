import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'; // Убрали BrowserRouter отсюда

// ============ ТОВАРЫ ============
const products = [
  { id: 1, name: "Классическая рубашка", price: 2990, category: "men", image: "https://i0.wp.com/proftextile.uz/wp-content/uploads/2024/01/rubashka1.jpg?fit=700%2C700&ssl=1", sizes: ["S","M","L","XL"], description: "Элегантная классическая рубашка из 100% хлопка." },
  { id: 2, name: "Джинсы Slim Fit", price: 3990, category: "men", image: "https://static.insales-cdn.com/images/products/1/1714/892274354/M00387.jpg", sizes: ["S","M","L","XL"], description: "Узкие джинсы высокого качества." },
  { id: 3, name: "Спортивная куртка", price: 4990, category: "men", image: "https://image.made-in-china.com/202f0j00AChcFGWwedbv/Fashionable-Waterproof-Winter-Rain-Jacket-Hiking-Snowboarding-Ski-Jacket-Wholesale.webp", sizes: ["M","L","XL"], description: "Утепленная спортивная куртка." },
  { id: 4, name: "Летнее платье", price: 3490, category: "women", image: "https://e-ledi.ru/image/cache/catalog/001/479-1-1100x1100.jpg ", sizes: ["XS","S","M","L"], description: "Легкое летнее платье." },
  { id: 5, name: "Шелковая блузка", price: 4290, category: "women", image: "https://static2.issaplus.com/wa-data/public/shop/products/60/47/124760/images/246587/246587.600x900.jpg", sizes: ["S","M","L"], description: "Изысканная шелковая блуза." },
  { id: 6, name: "Юбка миди", price: 2790, category: "women", image: "https://conteshop.by/ru/media/catalog/product/cache/11/image/1405x1879/602f0fa2c1f0d1ba5e241f914e856ff9/a/2/a2a1362cf2f27b3553748b4fa0741f30_2.jpg?v=11", sizes: ["XS","S","M","L","XL"], description: "Элегантная юбка миди." },
  { id: 7, name: "Детская футболка", price: 1490, category: "kids", image: "https://static.markformelle.uz/site/master/catalog/621527/desktop/listing/8218186.webp", sizes: ["2-3","4-5","6-7","8-9"], description: "Мягкая хлопковая футболка." },
  { id: 8, name: "Детские шорты", price: 1890, category: "kids", image: "https://basket-12.wbbasket.ru/vol1730/part173064/173064588/images/big/1.webp", sizes: ["2-3","4-5","6-7","8-9"], description: "Удобные шорты." },
  { id: 9, name: "Платье для девочки", price: 2290, category: "kids", image: "https://content2.flowwow-images.com/data/flowers/1000x1000/68/1706622322_41950868.jpg", sizes: ["2-3","4-5","6-7","8-9"], description: "Нарядное платье." }
];

// ============ КОНТЕКСТ ТЕМЫ ============
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>{children}</ThemeContext.Provider>;
};

// ============ КОНТЕКСТ АВТОРИЗАЦИИ ============
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    if (email && password && password.length >= 4) {
      const userData = { email, name: email.split('@')[0] };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// ============ КОНТЕКСТ ИЗБРАННОГО ============
const FavoritesContext = createContext();
const useFavorites = () => useContext(FavoritesContext);

const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`fav_${user.email}`);
      if (saved) setFavorites(JSON.parse(saved));
      else setFavorites([]);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`fav_${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);
      return exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
    });
  };

  const isFavorite = (id) => favorites.some(p => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ============ КОМПОНЕНТ HEADER ============
const Header = () => {
  const { user, logout } = useAuth();
  const { count } = useFavorites();
  const { isDark, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">✦ FASHION</Link>
        <button className="burger-btn" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '✕' : '☰'}</button>
        <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMobileOpen(false)}>Главная</Link>
          <Link to="/men" onClick={() => setMobileOpen(false)}>Мужская</Link>
          <Link to="/women" onClick={() => setMobileOpen(false)}>Женская</Link>
          <Link to="/kids" onClick={() => setMobileOpen(false)}>Детская</Link>
          {user && (
            <Link to="/favorites" onClick={() => setMobileOpen(false)} className="favorites-link">
              ❤️ Избранное {count > 0 && <span className="favorites-count">{count}</span>}
            </Link>
          )}
          <button onClick={toggleTheme} className="theme-toggle">{isDark ? '☀️' : '🌙'}</button>
          {user ? (
            <div className="user-menu">
              <button onClick={() => setShowMenu(!showMenu)} className="user-btn">👤 {user.name}</button>
              {showMenu && (
                <div className="dropdown-menu">
                  <button onClick={logout} className="dropdown-item">🚪 Выйти</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={() => setMobileOpen(false)}>Войти</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

// ============ КОМПОНЕНТ PRODUCT CARD ============
const ProductCard = ({ product, onQuickView }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    toggleFavorite(product);
  };

  return (
    <div className="product-card" onClick={() => onQuickView(product)}>
      <div className="product-image-wrapper">
        <div className="product-badge">🔥 ХИТ</div>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-category">{product.category === 'men' ? 'МУЖСКАЯ' : product.category === 'women' ? 'ЖЕНСКАЯ' : 'ДЕТСКАЯ'}</div>
        <h3>{product.name}</h3>
        <div className="product-price">{product.price.toLocaleString()} ₽</div>
        <div className="card-actions">
          <button className="favorite-btn" onClick={handleFavorite}>{isFavorite(product.id) ? '❤️' : '🤍'}</button>
          <button className="detail-btn" onClick={(e) => { e.stopPropagation(); onQuickView(product); }}>Подробнее →</button>
        </div>
      </div>
    </div>
  );
};

// ============ КОМПОНЕНТ PRODUCTS GRID ============
const ProductsGrid = ({ products, onQuickView }) => {
  if (!products || products.length === 0) return <div className="empty-message">✨ Товары не найдены</div>;
  return <div className="products-grid">{products.map(p => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}</div>;
};

// ============ КОМПОНЕНТ MODAL ============
const Modal = ({ product, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  const handleFavorite = () => {
    if (!user) { navigate('/login'); onClose(); return; }
    toggleFavorite(product);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-info">
            <h2>{product.name}</h2>
            <div className="modal-price">{product.price.toLocaleString()} ₽</div>
            <p>{product.description}</p>
            <select className="size-select">
              <option>Выберите размер</option>
              {product.sizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="modal-favorite-btn" onClick={handleFavorite}>{isFavorite(product.id) ? '❤️ В избранном' : '🤍 Добавить в избранное'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ СТРАНИЦЫ ============

// Главная страница
const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Стильная одежда<br />для всей семьи</h1>
          <p className="hero-subtitle">Откройте для себя коллекцию премиальной одежды</p>
          <Link to="/men" className="hero-btn">Начать покупки →</Link>
        </div>
      </section>
      <div className="container">
        <div className="categories-section">
          <h2 className="section-title">Категории</h2>
          <div className="categories-grid">
            <Link to="/men" className="category-card"><img src="https://cdn-ildmmeg.nitrocdn.com/HsBoHCElQfPSMjUNFwFaglHkPqsfelDP/assets/images/optimized/rev-b8a992c/hespokestyle.com/wp-content/uploads/2024/06/casual-clothes-for-men-dressing-down-guide-672x752.jpg" alt="Мужская" className="category-image" /><div className="category-overlay"><h3>Мужская</h3></div></Link>
            <Link to="/women" className="category-card"><img src="https://www.rollingstone.com/wp-content/uploads/2024/01/Best-Sites-for-Womenswear-15-Gap-1.jpg" alt="Женская" className="category-image" /><div className="category-overlay"><h3>Женская</h3></div></Link>
            <Link to="/kids" className="category-card"><img src="https://bachaaparty.com/cdn/shop/collections/Girls_Apparel_62efb296-4e20-403b-9f2c-f39b5727fad8_1024x1024.jpg?v=1759499033" alt="Детская" className="category-image" /><div className="category-overlay"><h3>Детская</h3></div></Link>
          </div>
        </div>
        <div className="categories-section">
          <h2 className="section-title">Популярные товары</h2>
          <ProductsGrid products={featured} onQuickView={setSelectedProduct} />
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

// Страница мужской одежды
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

// Страница женской одежды
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

// Страница детской одежды
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

// Страница избранного
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

// Страница входа
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Ошибка входа (пароль мин. 4 символа)');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль (мин. 4 символа)" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-btn">Войти</button>
        </form>
        <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
      </div>
    </div>
  );
};

// Страница регистрации
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setError('Пароль должен быть минимум 4 символа');
      return;
    }
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Ошибка регистрации');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль (мин. 4 символа)" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-btn">Зарегистрироваться</button>
        </form>
        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </div>
  );
};

// Приватный маршрут
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// ============ APP ============
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;