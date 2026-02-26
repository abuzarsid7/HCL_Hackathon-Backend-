import { formatCurrency } from '../../../utils/formatters';
import { useCustomerViewModel } from '../../../viewmodels/useCustomerViewModel';

function Cart() {
  const { cartItemsDetailed, cartTotal, updateCartItem, placeOrder } = useCustomerViewModel();

  return (
    <section className="panel">
      <div className="page-header">
        <h1>Your Cart</h1>
        <button className="btn" type="button" disabled={!cartItemsDetailed.length} onClick={placeOrder}>
          Place Order
        </button>
      </div>

      {!cartItemsDetailed.length ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItemsDetailed.map((item) => (
                <tr key={item.id}>
                  <td>{item.product?.name ?? 'Unknown Product'}</td>
                  <td>{formatCurrency(item.price_at_time)}</td>
                  <td>
                    <input
                      min={0}
                      type="number"
                      value={item.quantity}
                      onChange={(event) =>
                        updateCartItem(item.product_id, Number(event.target.value))
                      }
                    />
                  </td>
                  <td>{formatCurrency(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Grand Total: {formatCurrency(cartTotal)}</h2>
        </>
      )}
    </section>
  );
}

export default Cart;
