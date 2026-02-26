export function isRequired(value) {
	return String(value ?? '').trim().length > 0;
}

export function isPositiveNumber(value) {
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0;
}

export function isNonNegativeInteger(value) {
	const parsed = Number(value);
	return Number.isInteger(parsed) && parsed >= 0;
}

export function validateProductForm(payload) {
	const errors = {};

	if (!isRequired(payload.name)) {
		errors.name = 'Name is required';
	}

	if (!isPositiveNumber(payload.price)) {
		errors.price = 'Price must be greater than 0';
	}

	if (!isNonNegativeInteger(payload.stock)) {
		errors.stock = 'Stock must be a non-negative integer';
	}

	if (!isRequired(payload.category)) {
		errors.category = 'Category is required';
	}

	if (!isRequired(payload.size)) {
		errors.size = 'Size is required';
	}

	if (!isRequired(payload.packaging_type)) {
		errors.packaging_type = 'Packaging type is required';
	}

	return errors;
}
