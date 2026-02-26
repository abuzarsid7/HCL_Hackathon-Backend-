import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
/**
 * Navbar – top navigation bar.
 * Seller role shows only Dashboard nav link and a profile dropdown
 * (name, store name, logout) in the right corner.
 */

const navigationByRole = {
  CUSTOMER: [
    { to: '/customer/home',   label: '🏠 Home' },
    { to: '/customer/cart',   label: '🛒 Cart' },
    { to: '/customer/orders', label: '📦 Orders' },
  ],
  SELLER: [
    { to: '/seller/dashboard', label: '📊 Dashboard' },
  ],
};

function ProfileDropdown({ currentUser, role, signOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = (currentUser?.name ?? '?')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-wrap" ref={ref}>
      <button
        type="button"
        className="profile-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="profile-avatar">{initials}</div>
        <div className="profile-meta">
          <span className="profile-name">{currentUser?.name}</span>
          <span className="profile-role">{role}</span>
        </div>
        <span className="profile-caret" aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-dropdown-info">
            <div className="profile-avatar profile-avatar-lg">{initials}</div>
            <div>
              <div className="profile-dropdown-name">{currentUser?.name}</div>
              {currentUser?.store_name && (
                <div className="profile-dropdown-store">🏪 {currentUser.store_name}</div>
              )}
              <span className="profile-dropdown-role-badge">{role}</span>
            </div>
          </div>
          <div className="profile-dropdown-divider" />
          <button
            type="button"
            className="profile-dropdown-logout"
            role="menuitem"
            onClick={() => { setOpen(false); signOut(); }}
          >
            <span>🚪</span> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

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
      {currentUser ? (
        <ProfileDropdown currentUser={currentUser} role={role} signOut={signOut} />
      ) : null}
    </header>
  );
}

export default Navbar;

