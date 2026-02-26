import { createProductModel } from '../../models/productModel';

export const sellerService = {
	getProductsBySellerId(state, sellerId) {
		return state.products
			.filter((product) => product.seller_id === sellerId)
			.map(createProductModel)
			.sort((a, b) => a.name.localeCompare(b.name));
	},
	getSellerOrders(state, sellerId) {
		return state.orders
			.map((order) => {
				const items = order.items.filter((item) => {
					const product = state.products.find((entry) => entry.id === item.product_id);
					return product?.seller_id === sellerId;
				});

				if (!items.length) {
					return null;
				}

				return {
					...order,
					items,
					sellerTotal: items.reduce((sum, item) => sum + item.quantity * item.price, 0)
				};
			})
			.filter(Boolean);
	}
};
