import { ORDER_STATUS } from '../utils/constants';

export function createOrderItemModel(raw) {
  return {
    id: raw.id,
    order_id: raw.order_id,
    product_id: raw.product_id,
    quantity: Number(raw.quantity ?? 0),
    price: Number(raw.price ?? 0)
  };
}

export function createOrderModel(raw) {
  return {
    id: raw.id,
    customer_id: raw.customer_id,
    total_amount: Number(raw.total_amount ?? 0),
    status: raw.status ?? ORDER_STATUS.PENDING,
    created_at: raw.created_at,
    items: Array.isArray(raw.items) ? raw.items.map(createOrderItemModel) : []
  };
}
