import { PACKAGING_TYPES, PRODUCT_CATEGORIES, PRODUCT_SIZES } from '../utils/constants';

export function createProductModel(raw) {
  return {
    id: raw.id,
    name: raw.name,
    price: Number(raw.price),
    category: raw.category ?? PRODUCT_CATEGORIES.PIZZA,
    stock: Number(raw.stock ?? 0),
    size: raw.size ?? PRODUCT_SIZES.MEDIUM,
    seller_id: raw.seller_id,
    packaging_type: raw.packaging_type ?? PACKAGING_TYPES.MEDIUM
  };
}
