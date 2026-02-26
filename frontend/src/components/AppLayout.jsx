import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../app/styles/app.css';

const navigationByRole = {
  CUSTOMER: [
    { to: '/customer/home', label: 'Home' },
    { to: '/customer/cart', label: 'Cart' },
    { to: '/customer/orders', label: 'Orders' }
  ],
  SELLER: [
    { to: '/seller/dashboard', label: 'Dashboard' },
    { to: '/seller/add-product', label: 'Add Product' },
    { to: '/seller/manage-products', label: 'Manage Products' },
    { to: '/seller/sales-analytics', label: 'Sales Analytics' }
  ]
};

function AppLayout() {
  const { currentUser, role, signOut } = useAuth();

  if (!currentUser) {
    return <Outlet />;
  }

  const navItems = navigationByRole[role] ?? [];

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to={role === 'SELLER' ? '/seller/dashboard' : '/customer/home'}>
          Food Ordering System
        </Link>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-user-block">
          <div className="user-meta">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{role}</span>
          </div>
          <button className="btn btn-secondary" type="button" onClick={signOut}>
            Logout
          </button>
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
