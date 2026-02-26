import { formatCurrency } from '../../../utils/formatters';
import { useSellerViewModel } from '../../../viewmodels/useSellerViewModel';

function Dashboard() {
	const { currentUser, dashboardStats } = useSellerViewModel();

	return (
		<section className="panel">
			<h1>{currentUser?.store_name} Dashboard</h1>
			<div className="card-grid stats-grid">
				<article className="card">
					<h3>Total Products</h3>
					<strong>{dashboardStats.totalProducts}</strong>
				</article>
				<article className="card">
					<h3>Total Orders</h3>
					<strong>{dashboardStats.totalOrders}</strong>
				</article>
				<article className="card">
					<h3>Units Sold</h3>
					<strong>{dashboardStats.totalUnitsSold}</strong>
				</article>
				<article className="card">
					<h3>Revenue</h3>
					<strong>{formatCurrency(dashboardStats.revenue)}</strong>
				</article>
				<article className="card">
					<h3>Low Stock Items</h3>
					<strong>{dashboardStats.lowStockCount}</strong>
				</article>
			</div>
		</section>
	);
}

export default Dashboard;
