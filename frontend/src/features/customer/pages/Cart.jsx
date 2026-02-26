import { Link } from 'react-router-dom';
import { CartItemRow, CartSummary, PageHeader } from '../../../components/common';
import { Button, EmptyState } from '../../../components/ui';
import { useCustomerViewModel } from '../../../viewmodels/useCustomerViewModel';

function Cart() {
  const { cartItemsDetailed, cartTotal, updateCartItem, placeOrder } = useCustomerViewModel();

  return (
    <section className="panel">
      <PageHeader
        title="Your Cart"
        subtitle={`${cartItemsDetailed.length} line item(s)`}
        action={
          <Button type="button" disabled={!cartItemsDetailed.length} onClick={placeOrder}>
            Place Order
          </Button>
        }
      />

      {!cartItemsDetailed.length ? (
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Browse products and add your favorites."
          action={
            <Link to="/customer/home">
              <Button>Browse Items</Button>
            </Link>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'start' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItemsDetailed.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdate={updateCartItem}
                  onRemove={(productId) => updateCartItem(productId, 0)}
                />
              ))}
            </tbody>
          </table>

          <CartSummary
            itemCount={cartItemsDetailed.length}
            cartTotal={cartTotal}
            onPlaceOrder={placeOrder}
            disabled={!cartItemsDetailed.length}
          />
        </div>
      )}
    </section>
  );
}

export default Cart;
