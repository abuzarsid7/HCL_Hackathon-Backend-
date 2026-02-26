import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../app/styles/app.css';
import Navbar from './layout/Navbar';

function AppLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Outlet />;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

