import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import Cart from '../features/customer/pages/Cart';
import Home from '../features/customer/pages/Home';
import Orders from '../features/customer/pages/Orders';
import Dashboard from '../features/seller/pages/Dashboard';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../hooks/useAuth';
import AllProducts from '../features/public/pages/Home';

function RoleGuard({ allowedRole, children }) {
	const { isAuthenticated, role } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (role !== allowedRole) {
		return <Navigate to={role === 'SELLER' ? '/seller/dashboard' : '/customer/home'} replace />;
	}

	return children;
}

function AppRoutes() {
	return (
		<Routes>
			<Route path="/login"  element={<Login />} />
			<Route path="/signup" element={<Signup />} />

			<Route element={<AppLayout />}>

                <Route path="/" element={<AllProducts />} />

				<Route
					path="/customer/home"
					element={
						<RoleGuard allowedRole="CUSTOMER">
							<Home />
						</RoleGuard>
					}
				/>
				<Route
					path="/customer/cart"
					element={
						<RoleGuard allowedRole="CUSTOMER">
							<Cart />
						</RoleGuard>
					}
				/>
				<Route
					path="/customer/orders"
					element={
						<RoleGuard allowedRole="CUSTOMER">
							<Orders />
						</RoleGuard>
					}
				/>

				<Route
					path="/seller/dashboard"
					element={
						<RoleGuard allowedRole="SELLER">
							<Dashboard />
						</RoleGuard>
					}
				/>
			</Route>

			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default AppRoutes;
