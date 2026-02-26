import { ORDER_STATUS, PACKAGING_TYPES, PRODUCT_CATEGORIES, PRODUCT_SIZES, USER_ROLES } from './constants.js';

const BASE_USERS = [
  {
    id: 'u-c-1',
    name: 'Aarav Sharma',
    email: 'aarav.customer@example.com',
    password: 'customer123',
    role: USER_ROLES.CUSTOMER,
    store_name: null
  },
  {
    id: 'u-c-2',
    name: 'Meera Iyer',
    email: 'meera.customer@example.com',
    password: 'customer123',
    role: USER_ROLES.CUSTOMER,
    store_name: null
  },
  {
    id: 'u-s-1',
    name: 'Rohan Kapoor',
    email: 'rohan.seller@example.com',
    password: 'seller123',
    role: USER_ROLES.SELLER,
    store_name: 'Pizza Planet'
  },
  {
    id: 'u-s-2',
    name: 'Sanya Verma',
    email: 'sanya.seller@example.com',
    password: 'seller123',
    role: USER_ROLES.SELLER,
    store_name: 'Bread & Brew'
  }
];

const BASE_PRODUCTS = [
  {
    id: 'p-1',
    name: 'Margherita Pizza',
    price: 299,
    category: PRODUCT_CATEGORIES.PIZZA,
    stock: 18,
    size: PRODUCT_SIZES.MEDIUM,
    seller_id: 'u-s-1',
    packaging_type: PACKAGING_TYPES.MEDIUM
  },
  {
    id: 'p-2',
    name: 'Pepperoni Pizza',
    price: 399,
    category: PRODUCT_CATEGORIES.PIZZA,
    stock: 10,
    size: PRODUCT_SIZES.LARGE,
    seller_id: 'u-s-1',
    packaging_type: PACKAGING_TYPES.LARGE
  },
  {
    id: 'p-3',
    name: 'Garlic Bread',
    price: 149,
    category: PRODUCT_CATEGORIES.BREAD,
    stock: 22,
    size: PRODUCT_SIZES.SMALL,
    seller_id: 'u-s-2',
    packaging_type: PACKAGING_TYPES.SMALL
  },
  {
    id: 'p-4',
    name: 'Cold Coffee',
    price: 129,
    category: PRODUCT_CATEGORIES.DRINK,
    stock: 35,
    size: PRODUCT_SIZES.MEDIUM,
    seller_id: 'u-s-2',
    packaging_type: PACKAGING_TYPES.MEDIUM
  }
];

const BASE_CARTS = [
  {
    id: 'c-1',
    customer_id: 'u-c-1',
    items: [
      {
        id: 'ci-1',
        cart_id: 'c-1',
        product_id: 'p-1',
        quantity: 1,
        price_at_time: 299
      }
    ]
  },
  {
    id: 'c-2',
    customer_id: 'u-c-2',
    items: []
  }
];

const BASE_ORDERS = [
  {
    id: 'o-1',
    customer_id: 'u-c-1',
    total_amount: 528,
    status: ORDER_STATUS.CONFIRMED,
    created_at: '2026-02-20T12:30:00.000Z',
    items: [
      {
        id: 'oi-1',
        order_id: 'o-1',
        product_id: 'p-2',
        quantity: 1,
        price: 399
      },
      {
        id: 'oi-2',
        order_id: 'o-1',
        product_id: 'p-4',
        quantity: 1,
        price: 129
      }
    ]
  }
];

let productCounter = 100;
let orderCounter = 100;

export function createProductId() {
  productCounter += 1;
  return `p-${productCounter}`;
}

export function createOrderId() {
  orderCounter += 1;
  return `o-${orderCounter}`;
}

export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

export function createInitialMockData() {
  return {
    users: deepClone(BASE_USERS),
    products: deepClone(BASE_PRODUCTS),
    carts: deepClone(BASE_CARTS),
    orders: deepClone(BASE_ORDERS),
    currentUserId: null
  };
}
