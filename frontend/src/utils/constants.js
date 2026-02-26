export const USER_ROLES = {
	CUSTOMER: 'CUSTOMER',
	SELLER: 'SELLER'
};

export const PRODUCT_CATEGORIES = {
	PIZZA: 'PIZZA',
	DRINK: 'DRINK',
	BREAD: 'BREAD'
};

export const ORDER_STATUS = {
	PENDING: 'PENDING',
	CONFIRMED: 'CONFIRMED'
};

export const PACKAGING_TYPES = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large'
};

export const PRODUCT_SIZES = {
	SMALL: 'Small',
	MEDIUM: 'Medium',
	LARGE: 'Large'
};

export const CATEGORY_OPTIONS = Object.values(PRODUCT_CATEGORIES);
export const PACKAGING_OPTIONS = Object.values(PACKAGING_TYPES);
export const SIZE_OPTIONS = Object.values(PRODUCT_SIZES);
