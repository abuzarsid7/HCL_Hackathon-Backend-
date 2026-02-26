import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import '../../../app/styles/app.css';

function Login() {
  const { users, isAuthenticated, currentUser, signInAsUser, resetMockData } = useAuth();
  const navigate = useNavigate();

  const customers = useMemo(() => users.filter((user) => user.role === 'CUSTOMER'), [users]);
  const sellers = useMemo(() => users.filter((user) => user.role === 'SELLER'), [users]);

  if (isAuthenticated && currentUser) {
    return <Navigate to={currentUser.role === 'SELLER' ? '/seller/dashboard' : '/customer/home'} replace />;
  }

  const handleSelectUser = (user) => {
    signInAsUser(user.id);
    navigate(user.role === 'SELLER' ? '/seller/dashboard' : '/customer/home');
  };

  return (
    <div className="login-page">
      <div className="panel">
        <h1>Food Ordering System</h1>
        <p>Choose any mock user to continue as CUSTOMER or SELLER.</p>

        <div className="login-grid">
          <section>
            <h2>Customers</h2>
            {customers.map((user) => (
              <button className="user-option" key={user.id} type="button" onClick={() => handleSelectUser(user)}>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </button>
            ))}
          </section>

          <section>
            <h2>Sellers</h2>
            {sellers.map((user) => (
              <button className="user-option" key={user.id} type="button" onClick={() => handleSelectUser(user)}>
                <strong>{user.name}</strong>
                <span>{user.store_name}</span>
              </button>
            ))}
          </section>
        </div>

        <button className="btn" type="button" onClick={resetMockData}>
          Reset Mock Data
        </button>
      </div>
    </div>
  );
}

export default Login;
