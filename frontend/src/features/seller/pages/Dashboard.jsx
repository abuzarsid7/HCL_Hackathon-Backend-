import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import {
	CATEGORY_OPTIONS,
	PACKAGING_OPTIONS,
	PRODUCT_CATEGORIES,
	PRODUCT_SIZES,
	SIZE_OPTIONS,
} from '../../../utils/constants';
import { formatCurrency } from '../../../utils/formatters';
import { validateProductForm } from '../../../utils/validators';
import { useSellerViewModel } from '../../../viewmodels/useSellerViewModel';

const initialForm = {
	name: '',
	price: 0,
	category: PRODUCT_CATEGORIES.PIZZA,
	stock: 0,
	size: PRODUCT_SIZES.MEDIUM,
	packaging_type: 'medium',
};

function Dashboard() {
	const { currentUser, dashboardStats, sellerProducts, addProduct, updateProductStock } =
		useSellerViewModel();
	const [showAddModal, setShowAddModal] = useState(false);
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});

	const openModal = () => {
		setForm(initialForm);
		setErrors({});
		setShowAddModal(true);
	};

	const closeModal = () => {
		setShowAddModal(false);
		setErrors({});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validateProductForm(form);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;
		addProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
		closeModal();
	};

	const statsConfig = [
		{ label: 'Total Products', value: dashboardStats.totalProducts, icon: '📦', color: '#2563eb' },
		{ label: 'Total Orders', value: dashboardStats.totalOrders, icon: '🧾', color: '#7c3aed' },
		{ label: 'Units Sold', value: dashboardStats.totalUnitsSold, icon: '📊', color: '#0891b2' },
		{ label: 'Revenue', value: formatCurrency(dashboardStats.revenue), icon: '💰', color: '#059669' },
		{
			label: 'Low Stock',
			value: dashboardStats.lowStockCount,
			icon: '⚠️',
			color: dashboardStats.lowStockCount > 0 ? '#dc2626' : '#16a34a',
		},
	];

	return (
		<div className="dashboard-page">
			{/* Page header */}
			<div className="page-header dash-header">
				<div>
					<h1 className="dash-title">{currentUser?.store_name} Dashboard</h1>
					<p className="dash-subtitle">Welcome back, {currentUser?.name}</p>
				</div>
				<button className="btn btn-add-product" type="button" onClick={openModal}>
					<span>+</span> Add Product
				</button>
			</div>

			{/* Stats */}
			<div className="card-grid stats-grid dash-stats">
				{statsConfig.map(({ label, value, icon, color }) => (
					<article className="card stat-card" key={label} style={{ borderTop: `3px solid ${color}` }}>
						<span className="stat-icon">{icon}</span>
						<div className="stat-body">
							<div className="stat-label">{label}</div>
							<strong className="stat-value" style={{ color }}>
								{value}
							</strong>
						</div>
					</article>
				))}
			</div>

			{/* Manage Products */}
			<div className="panel manage-panel">
				<div className="row-between manage-header">
					<div>
						<h2 className="manage-title">Manage Products</h2>
						<p className="manage-subtitle">Update stock levels or review your catalogue</p>
					</div>
					<span className="item-count-badge">{sellerProducts.length} items</span>
				</div>

				{!sellerProducts.length ? (
					<div className="dash-empty">
						<span className="dash-empty-icon">📭</span>
						<p>
							No products yet. Click <strong>+ Add Product</strong> to get started.
						</p>
					</div>
				) : (
					<div className="table-wrap">
						<table className="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Category</th>
									<th>Size</th>
									<th>Price</th>
									<th>Stock</th>
									<th>Update Stock</th>
								</tr>
							</thead>
							<tbody>
								{sellerProducts.map((product, idx) => (
									<tr key={product.id}>
										<td className="row-num">{idx + 1}</td>
										<td className="product-name-cell">{product.name}</td>
										<td>
											<span className="cat-badge">{product.category}</span>
										</td>
										<td>{product.size ?? '—'}</td>
										<td>{formatCurrency(product.price)}</td>
										<td>
											<span
												className={product.stock <= 5 ? 'stock-badge stock-low' : 'stock-badge stock-ok'}
											>
												{product.stock}
											</span>
										</td>
										<td>
											<input
												className="stock-input"
												min={0}
												type="number"
												defaultValue={product.stock}
												onBlur={(e) => updateProductStock(product.id, Number(e.target.value))}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Add Product Modal */}
			<Modal isOpen={showAddModal} onClose={closeModal} title="➕ Add New Product" size="md">
				<form className="form-grid" onSubmit={handleSubmit}>
					<label>
						Name
						<input
							value={form.name}
							placeholder="e.g. Margherita Pizza"
							onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
						/>
						{errors.name && <small className="error">{errors.name}</small>}
					</label>

					<label>
						Price ($)
						<input
							min={0}
							step="0.01"
							type="number"
							value={form.price}
							onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
						/>
						{errors.price && <small className="error">{errors.price}</small>}
					</label>

					<label>
						Stock
						<input
							min={0}
							type="number"
							value={form.stock}
							onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
						/>
						{errors.stock && <small className="error">{errors.stock}</small>}
					</label>

					<label>
						Category
						<select
							value={form.category}
							onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
						>
							{CATEGORY_OPTIONS.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</label>

					<label>
						Size
						<select
							value={form.size}
							onChange={(e) => setForm((prev) => ({ ...prev, size: e.target.value }))}
						>
							{SIZE_OPTIONS.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					</label>

					<label>
						Packaging
						<select
							value={form.packaging_type}
							onChange={(e) => setForm((prev) => ({ ...prev, packaging_type: e.target.value }))}
						>
							{PACKAGING_OPTIONS.map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</select>
					</label>

					<div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
						<button className="btn btn-ghost" type="button" onClick={closeModal}>
							Cancel
						</button>
						<button className="btn" type="submit">
							Save Product
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default Dashboard;
