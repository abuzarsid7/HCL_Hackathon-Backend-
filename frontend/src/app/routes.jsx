import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import Cart from '../features/customer/pages/Cart';
import Home from '../features/customer/pages/Home';
import Orders from '../features/customer/pages/Orders';
import AddProduct from '../features/seller/pages/AddProduct';
import Dashboard from '../features/seller/pages/Dashboard';
import ManageProducts from '../features/seller/pages/ManageProducts';
import SalesAnalytics from '../features/seller/pages/SalesAnalytics';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../hooks/useAuth';

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
				<Route
					path="/seller/add-product"
					element={
						<RoleGuard allowedRole="SELLER">
							<AddProduct />
						</RoleGuard>
					}
				/>
				<Route
					path="/seller/manage-products"
					element={
						<RoleGuard allowedRole="SELLER">
							<ManageProducts />
						</RoleGuard>
					}
				/>
				<Route
					path="/seller/sales-analytics"
					element={
						<RoleGuard allowedRole="SELLER">
							<SalesAnalytics />
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
