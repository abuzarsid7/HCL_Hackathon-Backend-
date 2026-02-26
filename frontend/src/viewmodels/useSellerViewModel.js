import { useAppStore } from '../app/store';
import { authService } from '../features/auth/authService';
import { sellerService } from '../features/seller/sellerService';

export function useSellerViewModel() {
  const { state, actions } = useAppStore();
  const currentUser = authService.getCurrentUser(state);

  const sellerProducts = currentUser?.id ? sellerService.getProductsBySellerId(state, currentUser.id) : [];

  const sellerOrders = currentUser?.id ? sellerService.getSellerOrders(state, currentUser.id) : [];

  const revenue = sellerOrders.reduce((sum, order) => sum + order.sellerTotal, 0);
  const totalUnitsSold = sellerOrders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );
  const lowStockCount = sellerProducts.filter((product) => product.stock <= 5).length;

  const dashboardStats = {
    totalProducts: sellerProducts.length,
    totalOrders: sellerOrders.length,
    totalUnitsSold,
    revenue,
    lowStockCount
  };

  return {
    currentUser,
    sellerProducts,
    sellerOrders,
    dashboardStats,
    addProduct: (payload) => actions.addProduct({ sellerId: currentUser.id, payload }),
    updateProductStock: (productId, stock) => actions.updateProductStock({ productId, stock })
  };
}
