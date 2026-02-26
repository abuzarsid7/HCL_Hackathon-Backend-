import { formatCurrency } from '../../../utils/formatters';
import { useSellerViewModel } from '../../../viewmodels/useSellerViewModel';

function ManageProducts() {
	const { sellerProducts, updateProductStock } = useSellerViewModel();

	return (
		<section className="panel">
			<h1>Manage Products</h1>

			{!sellerProducts.length ? (
				<p>No products yet. Add one from Add Product page.</p>
			) : (
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Stock</th>
							<th>Update Stock</th>
						</tr>
					</thead>
					<tbody>
						{sellerProducts.map((product) => (
							<tr key={product.id}>
								<td>{product.name}</td>
								<td>{formatCurrency(product.price)}</td>
								<td>{product.category}</td>
								<td>{product.stock}</td>
								<td>
									<input
										min={0}
										type="number"
										defaultValue={product.stock}
										onBlur={(event) => updateProductStock(product.id, Number(event.target.value))}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	);
}

export default ManageProducts;
