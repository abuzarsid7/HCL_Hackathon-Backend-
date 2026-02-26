export function isRequired(value) {
	return String(value ?? '').trim().length > 0;
}

export function isValidEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim());
}

export function isMinLength(value, min) {
	return String(value ?? '').trim().length >= min;
}

/**
 * Validate the sign-in form.
 * @param {{ email: string, password: string }} payload
 * @returns {Object} errors – empty object means valid
 */
export function validateSignInForm(payload) {
	const errors = {};

	if (!isRequired(payload.email)) {
		errors.email = 'Email is required';
	} else if (!isValidEmail(payload.email)) {
		errors.email = 'Enter a valid email address';
	}

	if (!isRequired(payload.password)) {
		errors.password = 'Password is required';
	}

	return errors;
}

/**
 * Validate the sign-up form.
 * @param {{ name: string, email: string, password: string, confirmPassword: string, role: string, store_name?: string }} payload
 * @returns {Object} errors – empty object means valid
 */
export function validateSignUpForm(payload) {
	const errors = {};

	if (!isRequired(payload.name)) {
		errors.name = 'Full name is required';
	} else if (!isMinLength(payload.name, 2)) {
		errors.name = 'Name must be at least 2 characters';
	}

	if (!isRequired(payload.email)) {
		errors.email = 'Email is required';
	} else if (!isValidEmail(payload.email)) {
		errors.email = 'Enter a valid email address';
	}

	if (!isRequired(payload.password)) {
		errors.password = 'Password is required';
	} else if (!isMinLength(payload.password, 6)) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (!isRequired(payload.confirmPassword)) {
		errors.confirmPassword = 'Please confirm your password';
	} else if (payload.password !== payload.confirmPassword) {
		errors.confirmPassword = 'Passwords do not match';
	}

	if (!isRequired(payload.role)) {
		errors.role = 'Please select a role';
	}

	if (payload.role === 'SELLER' && !isRequired(payload.store_name)) {
		errors.store_name = 'Store name is required for sellers';
	}

	return errors;
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
