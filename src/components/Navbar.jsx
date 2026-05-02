import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store';
import './Navbar.css';
import './Button.css';

const Navbar = () => {
  const { cart, toggleCart, user, openAuthModal, logout } = useStore();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar glass">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="text-gradient">Nex</span>Tech
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#products" className="nav-link">Products</a>
          <a href="#about" className="nav-link">About</a>
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <div className="profile-photo-container">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&bold=true`} 
                  alt={user.name} 
                  className="profile-photo-3d" 
                />
              </div>
              <span className="user-name">
                {user.name}
              </span>
              <button className="icon-btn logout-btn" onClick={logout} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="text-btn" onClick={() => openAuthModal('login')}>Sign In</button>
              <button className="btn btn-primary btn-sm" onClick={() => openAuthModal('signup')}>Sign Up</button>
            </div>
          )}
          
          <button className="cart-btn icon-btn" onClick={toggleCart}>
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="mobile-menu-btn icon-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
