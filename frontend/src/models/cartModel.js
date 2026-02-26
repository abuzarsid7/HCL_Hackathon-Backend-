export function createCartItemModel(raw) {
  return {
    id: raw.id,
    cart_id: raw.cart_id,
    product_id: raw.product_id,
    quantity: Number(raw.quantity ?? 0),
    price_at_time: Number(raw.price_at_time ?? 0)
  };
}

export function createCartModel(raw) {
  return {
    id: raw.id,
    customer_id: raw.customer_id,
    items: Array.isArray(raw.items) ? raw.items.map(createCartItemModel) : []
  };
}
