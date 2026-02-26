import { formatCurrency } from '../../utils/formatters.js';
import Button from '../ui/Button.jsx';
import EmptyState from '../ui/EmptyState.jsx';

/**
 * CartSummary – order summary panel shown at the bottom of the cart.
 *
 * itemCount   – number of distinct line items
 * cartTotal   – sum of all line totals (number)
 * onPlaceOrder – () => void
 * disabled    – disables place-order button
 */
function CartSummary({ itemCount = 0, cartTotal = 0, onPlaceOrder, disabled = false }) {
  if (itemCount === 0) {
    return (
      <aside className="panel" style={{ width: '100%', maxWidth: '100%' }}>
        <EmptyState
          icon="🧾"
          title="No summary available"
          message="Add items to cart to see total and delivery details."
        />
      </aside>
    );
  }

  const grandTotal = cartTotal;

  return (
    <aside
      className="panel"
      style={{
        width: '100%',
        maxWidth: '100%',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem'
      }}
    >
      <div style={{ width: '100%', display: 'grid', gap: '0.7rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Order Summary</h3>

        <div style={{ display: 'grid', gap: '0.4rem', fontSize: '0.95rem', color: '#374151' }}>
          <div className="row-between">
            <span>Items ({itemCount})</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <hr style={{ margin: '0.25rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
          <div className="row-between" style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        disabled={disabled}
        onClick={onPlaceOrder}
        style={{ marginTop: '0.25rem', width: 'auto', alignSelf: 'flex-start' }}
      >
        Place Order
      </Button>
    </aside>
  );
}

export default CartSummary;
