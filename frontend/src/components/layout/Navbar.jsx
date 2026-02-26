import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

/**
 * Navbar – top navigation bar extracted as a standalone layout component.
 * Matches the existing .app-header CSS classes from app.css.
 *
 * navItems – array of { to, label } objects (auto-derived from role if not passed)
 */

const navigationByRole = {
  CUSTOMER: [
    { to: '/customer/home',   label: '🏠 Home' },
    { to: '/customer/cart',   label: '🛒 Cart' },
    { to: '/customer/orders', label: '📦 Orders' },
  ],
  SELLER: [
    { to: '/seller/dashboard',        label: '📊 Dashboard' },
    { to: '/seller/add-product',      label: '➕ Add Product' },
    { to: '/seller/manage-products',  label: '📋 Manage Products' },
    { to: '/seller/sales-analytics',  label: '📈 Analytics' },
  ],
};

function Navbar({ navItems }) {
  const { currentUser, role, signOut } = useAuth();
  const { pathname } = useLocation();

  const guestAuthItem = pathname === '/signup'
    ? [{ to: '/login', label: '🔐 Login' }]
    : [{ to: '/signup', label: '📝 Signup' }];

  const items = currentUser
    ? (navItems ?? navigationByRole[role] ?? [])
    : guestAuthItem;
  const homeRoute = role === 'SELLER' ? '/seller/dashboard' : '/customer/home';
  const shouldShowNavLinks = currentUser || items.length > 0;

  return (
    <header className="app-header">
      {/* Brand */}
      <Link className="brand" to={homeRoute} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        🍕 <span>Food Ordering</span>
      </Link>

      {/* Nav links */}
      {shouldShowNavLinks && (
        <nav className="nav-links" aria-label="Main navigation">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      {/* User block */}
      {currentUser && (
        <div className="header-user-block">
          <div className="user-meta">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{role}</span>
          </div>
          <button className="btn btn-secondary" type="button" onClick={signOut}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
