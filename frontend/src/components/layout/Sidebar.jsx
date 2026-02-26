import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

/**
 * Sidebar – collapsible side navigation (alternative layout for sellers).
 *
 * isOpen   – controls expanded/collapsed state
 * onClose  – called when collapse button is pressed
 */

const sellerNav = [
  { to: '/seller/dashboard',        label: 'Dashboard',        icon: '📊' },
  { to: '/seller/add-product',      label: 'Add Product',      icon: '➕' },
  { to: '/seller/manage-products',  label: 'Manage Products',  icon: '📋' },
  { to: '/seller/sales-analytics',  label: 'Analytics',        icon: '📈' },
];

function Sidebar({ isOpen = true, onClose }) {
  const { currentUser, signOut } = useAuth();

  return (
    <aside
      aria-label="Sidebar navigation"
      style={{
        width: isOpen ? 220 : 0,
        overflow: 'hidden',
        transition: 'width 0.2s ease',
        background: '#1e293b',
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1rem 0.75rem',
          borderBottom: '1px solid #334155',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap' }}>
          🍕 Food Admin
        </span>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav style={{ padding: '0.5rem 0', flexGrow: 1 }}>
        {sellerNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 1rem',
              textDecoration: 'none',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              background: isActive ? '#2563eb' : 'transparent',
              color:      isActive ? '#fff'     : '#cbd5e1',
              borderRadius: 0,
              transition: 'background 0.12s ease',
            })}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User block */}
      {currentUser && (
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #334155' }}>
          <div style={{ fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            <div style={{ fontWeight: 600 }}>{currentUser.name}</div>
            <div style={{ color: '#94a3b8' }}>{currentUser.email}</div>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={signOut}
            style={{ width: '100%', fontSize: '0.82rem' }}
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
