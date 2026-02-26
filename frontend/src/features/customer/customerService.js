import { createCartModel } from '../../models/cartModel';
import { createOrderModel } from '../../models/orderModel';
import { createProductModel } from '../../models/productModel';

export const customerService = {
	getCatalog(state) {
		return state.products.map(createProductModel);
	},
	getCartByCustomerId(state, customerId) {
		const cart = state.carts.find((entry) => entry.customer_id === customerId);
		return cart ? createCartModel(cart) : createCartModel({ id: `cart-${customerId}`, customer_id: customerId, items: [] });
	},
	getOrdersByCustomerId(state, customerId) {
		return state.orders
			.filter((order) => order.customer_id === customerId)
			.map(createOrderModel)
			.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	}
};
