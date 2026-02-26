import { createContext, createElement, useContext, useMemo, useState } from 'react';
import { createInitialMockData, createProductId, createOrderId, deepClone } from '../utils/mockData';
import { createOrderModel } from '../models/orderModel';
import { createProductModel } from '../models/productModel';

const AppStoreContext = createContext(null);

function getOrCreateCart(state, customerId) {
	const existing = state.carts.find((cart) => cart.customer_id === customerId);
	if (existing) {
		return existing;
	}

	const newCart = {
		id: `cart-${customerId}`,
		customer_id: customerId,
		items: []
	};

	state.carts.push(newCart);
	return newCart;
}

export function AppStoreProvider({ children }) {
	const [state, setState] = useState(createInitialMockData());

	const actions = useMemo(
		() => ({
			resetMockData() {
				setState(createInitialMockData());
			},
			signInAsUser(userId) {
				setState((prev) => ({
					...prev,
					currentUserId: userId
				}));
			},
			signOut() {
				setState((prev) => ({
					...prev,
					currentUserId: null
				}));
			},
			addToCart({ customerId, productId, quantity }) {
				setState((prev) => {
					const next = deepClone(prev);
					const cart = getOrCreateCart(next, customerId);
					const product = next.products.find((entry) => entry.id === productId);

					if (!product || quantity <= 0 || product.stock < quantity) {
						return prev;
					}

					const existingItem = cart.items.find((item) => item.product_id === productId);
					if (existingItem) {
						const updatedQty = existingItem.quantity + quantity;
						if (product.stock < updatedQty) {
							return prev;
						}
						existingItem.quantity = updatedQty;
						existingItem.price_at_time = product.price;
					} else {
						cart.items.push({
							id: `${cart.id}-item-${productId}`,
							cart_id: cart.id,
							product_id: product.id,
							quantity,
							price_at_time: product.price
						});
					}

					return next;
				});
			},
			updateCartItem({ customerId, productId, quantity }) {
				setState((prev) => {
					const next = deepClone(prev);
					const cart = getOrCreateCart(next, customerId);
					const cartItem = cart.items.find((item) => item.product_id === productId);
					const product = next.products.find((entry) => entry.id === productId);

					if (!cartItem || !product) {
						return prev;
					}

					if (quantity <= 0) {
						cart.items = cart.items.filter((item) => item.product_id !== productId);
						return next;
					}

					if (quantity > product.stock) {
						return prev;
					}

					cartItem.quantity = quantity;
					return next;
				});
			},
			placeOrder({ customerId }) {
				setState((prev) => {
					const next = deepClone(prev);
					const cart = getOrCreateCart(next, customerId);
					if (!cart.items.length) {
						return prev;
					}

					const orderId = createOrderId();
					const orderItems = cart.items.map((item) => ({
						id: `oi-${item.id}`,
						order_id: orderId,
						product_id: item.product_id,
						quantity: item.quantity,
						price: item.price_at_time
					}));

					const canFulfill = orderItems.every((item) => {
						const product = next.products.find((entry) => entry.id === item.product_id);
						return product && product.stock >= item.quantity;
					});

					if (!canFulfill) {
						return prev;
					}

					orderItems.forEach((item) => {
						const product = next.products.find((entry) => entry.id === item.product_id);
						product.stock -= item.quantity;
					});

					const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
					const order = createOrderModel({
						id: orderId,
						customer_id: customerId,
						total_amount: Number(totalAmount.toFixed(2)),
						status: 'CONFIRMED',
						created_at: new Date().toISOString(),
						items: orderItems
					});

					next.orders.unshift(order);
					cart.items = [];
					return next;
				});
			},
			addProduct({ sellerId, payload }) {
				setState((prev) => {
					const next = deepClone(prev);
					const newProduct = createProductModel({
						id: createProductId(),
						seller_id: sellerId,
						...payload
					});

					next.products.unshift(newProduct);
					return next;
				});
			},
			updateProductStock({ productId, stock }) {
				setState((prev) => {
					const next = deepClone(prev);
					const product = next.products.find((entry) => entry.id === productId);
					if (!product || stock < 0) {
						return prev;
					}

					product.stock = stock;
					return next;
				});
			}
		}),
		[]
	);

	const value = useMemo(() => ({ state, actions }), [actions, state]);

	return createElement(AppStoreContext.Provider, { value }, children);
}

export function useAppStore() {
	const context = useContext(AppStoreContext);
	if (!context) {
		throw new Error('useAppStore must be used inside AppStoreProvider');
	}

	return context;
}
