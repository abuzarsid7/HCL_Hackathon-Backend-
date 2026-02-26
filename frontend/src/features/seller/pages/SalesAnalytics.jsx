import { formatCurrency, formatDateTime } from '../../../utils/formatters';
import { useSellerViewModel } from '../../../viewmodels/useSellerViewModel';

function SalesAnalytics() {
	const { sellerOrders, sellerProducts } = useSellerViewModel();

	const getProductName = (productId) => {
		return sellerProducts.find((product) => product.id === productId)?.name ?? 'Unknown Product';
	};

	return (
		<section className="panel">
			<h1>Sales Analytics</h1>

			{!sellerOrders.length ? (
				<p>No sales yet.</p>
			) : (
				<div className="stack">
					{sellerOrders.map((order) => (
						<article className="card" key={order.id}>
							<div className="row-between">
								<h3>Order {order.id}</h3>
								<span>{formatDateTime(order.created_at)}</span>
							</div>
							<ul>
								{order.items.map((item) => (
									<li key={item.id}>
										{getProductName(item.product_id)} × {item.quantity} = {formatCurrency(item.quantity * item.price)}
									</li>
								))}
							</ul>
							<strong>Seller Revenue: {formatCurrency(order.sellerTotal)}</strong>
						</article>
					))}
				</div>
			)}
		</section>
	);
}

export default SalesAnalytics;
