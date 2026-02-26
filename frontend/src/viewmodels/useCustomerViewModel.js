import { useAppStore } from '../app/store';
import { customerService } from '../features/customer/customerService';
import { authService } from '../features/auth/authService';

export function useCustomerViewModel() {
  const { state, actions } = useAppStore();
  const currentUser = authService.getCurrentUser(state);

  const products = customerService.getCatalog(state);
  const cart = currentUser?.id
    ? customerService.getCartByCustomerId(state, currentUser.id)
    : { id: '', customer_id: '', items: [] };

  const cartItemsDetailed = cart.items.map((item) => {
    const product = products.find((entry) => entry.id === item.product_id);
    return {
      ...item,
      product,
      lineTotal: item.quantity * item.price_at_time
    };
  });

  const cartTotal = cartItemsDetailed.reduce((sum, item) => sum + item.lineTotal, 0);

  const orders = currentUser?.id ? customerService.getOrdersByCustomerId(state, currentUser.id) : [];

  return {
    currentUser,
    products,
    cart,
    cartItemsDetailed,
    cartTotal,
    orders,
    addToCart: (productId, quantity = 1) =>
      actions.addToCart({ customerId: currentUser.id, productId, quantity }),
    updateCartItem: (productId, quantity) =>
      actions.updateCartItem({ customerId: currentUser.id, productId, quantity }),
    placeOrder: () => actions.placeOrder({ customerId: currentUser.id })
  };
}
