import { formatCurrency } from '../../utils/formatters.js';

/**
 * CartSummary – order summary panel shown at the bottom of the cart.
 *
 * itemCount   – number of distinct line items
 * cartTotal   – sum of all line totals (number)
 * onPlaceOrder – () => void
 * disabled    – disables place-order button
 */
const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 500;

function CartSummary({ itemCount = 0, cartTotal = 0, onPlaceOrder, disabled = false }) {
  const deliveryFee = cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal  = cartTotal + deliveryFee;

  return (
    <aside
      className="panel"
      style={{ display: 'grid', gap: '0.6rem', maxWidth: 320 }}
    >
      <h3 style={{ margin: 0, fontSize: '1rem' }}>Order Summary</h3>

      <div style={{ display: 'grid', gap: '0.4rem', fontSize: '0.9rem', color: '#374151' }}>
        <div className="row-between">
          <span>Items ({itemCount})</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <div className="row-between">
          <span>Delivery</span>
          <span>
            {deliveryFee === 0
              ? <span style={{ color: '#16a34a', fontWeight: 500 }}>FREE</span>
              : formatCurrency(deliveryFee)
            }
          </span>
        </div>
        {deliveryFee > 0 && (
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
            Add {formatCurrency(FREE_DELIVERY_THRESHOLD - cartTotal)} more for free delivery
          </p>
        )}
        <hr style={{ margin: '0.25rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
        <div className="row-between" style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn"
        disabled={disabled}
        onClick={onPlaceOrder}
        style={{ marginTop: '0.25rem', width: '100%' }}
      >
        Place Order
      </button>
    </aside>
  );
}

export default CartSummary;
