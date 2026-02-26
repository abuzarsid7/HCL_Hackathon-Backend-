export function formatCurrency(amount) {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 2
	}).format(Number(amount || 0));
}

export function formatDateTime(dateString) {
	if (!dateString) {
		return '-';
	}

	return new Date(dateString).toLocaleString('en-IN', {
		dateStyle: 'medium',
		timeStyle: 'short'
	});
}

export function toTitleCase(value) {
	if (!value) {
		return '';
	}

	return value
		.toLowerCase()
		.split('_')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}
