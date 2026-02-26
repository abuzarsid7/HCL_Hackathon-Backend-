import { useState } from 'react';
import {
	CATEGORY_OPTIONS,
	PACKAGING_OPTIONS,
	PRODUCT_CATEGORIES,
	PRODUCT_SIZES,
	SIZE_OPTIONS
} from '../../../utils/constants';
import { validateProductForm } from '../../../utils/validators';
import { useSellerViewModel } from '../../../viewmodels/useSellerViewModel';

const initialForm = {
	name: '',
	price: 0,
	category: PRODUCT_CATEGORIES.PIZZA,
	stock: 0,
	size: PRODUCT_SIZES.MEDIUM,
	packaging_type: 'medium'
};

function AddProduct() {
	const { addProduct } = useSellerViewModel();
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validateProductForm(form);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		addProduct({
			...form,
			price: Number(form.price),
			stock: Number(form.stock)
		});

		setForm(initialForm);
	};

	return (
		<section className="panel">
			<h1>Add Product</h1>

			<form className="form-grid" onSubmit={handleSubmit}>
				<label>
					Name
					<input
						value={form.name}
						onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
					/>
					{errors.name && <small className="error">{errors.name}</small>}
				</label>

				<label>
					Price
					<input
						min={0}
						step="0.01"
						type="number"
						value={form.price}
						onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
					/>
					{errors.price && <small className="error">{errors.price}</small>}
				</label>

				<label>
					Stock
					<input
						min={0}
						type="number"
						value={form.stock}
						onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))}
					/>
					{errors.stock && <small className="error">{errors.stock}</small>}
				</label>

				<label>
					Category
					<select
						value={form.category}
						onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
					>
						{CATEGORY_OPTIONS.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</label>

				<label>
					Size
					<select value={form.size} onChange={(event) => setForm((prev) => ({ ...prev, size: event.target.value }))}>
						{SIZE_OPTIONS.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</label>

				<label>
					Packaging
					<select
						value={form.packaging_type}
						onChange={(event) => setForm((prev) => ({ ...prev, packaging_type: event.target.value }))}
					>
						{PACKAGING_OPTIONS.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</label>

				<button className="btn" type="submit">
					Save Product
				</button>
			</form>
		</section>
	);
}

export default AddProduct;
