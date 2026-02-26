import { formatCurrency } from '../../utils/formatters.js';

/**
 * CartItemRow – a single row inside the cart table.
 *
 * item         – cartItemDetailed object { product, quantity, price_at_time, lineTotal }
 * onUpdate     – (productId, newQuantity) => void
 * onRemove     – (productId) => void  (quantity set to 0)
 */
function CartItemRow({ item, onUpdate, onRemove }) {
  const handleQuantityChange = (e) => {
    const val = Math.max(0, Number(e.target.value));
    onUpdate?.(item.product_id, val);
  };

  return (
    <tr>
      {/* Product */}
      <td>
        <div style={{ fontWeight: 500 }}>{item.product?.name ?? 'Unknown Product'}</div>
        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
          {item.product?.size} · {item.product?.category}
        </div>
      </td>

      {/* Unit price */}
      <td>{formatCurrency(item.price_at_time)}</td>

      {/* Quantity stepper */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', maxWidth: 110 }}>
          <button
            type="button"
            aria-label="Decrease quantity"
            className="btn btn-secondary"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
            onClick={() => onUpdate?.(item.product_id, Math.max(0, item.quantity - 1))}
          >
            −
          </button>
          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={handleQuantityChange}
            style={{ textAlign: 'center', width: 52 }}
            aria-label="Quantity"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="btn"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
            onClick={() => onUpdate?.(item.product_id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>

      {/* Line total */}
      <td>
        <strong>{formatCurrency(item.lineTotal)}</strong>
      </td>

      {/* Remove */}
      <td>
        <button
          type="button"
          aria-label="Remove item"
          className="btn"
          style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.3rem 0.55rem', fontSize: '0.8rem' }}
          onClick={() => onRemove?.(item.product_id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItemRow;
