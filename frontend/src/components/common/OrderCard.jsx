import Badge from '../ui/Badge.jsx';
import { formatCurrency, formatDateTime } from '../../utils/formatters.js';

/**
 * OrderCard – summary card for a single customer order.
 *
 * order           – order model object (with .items[])
 * getProductName  – (productId: string) => string
 */

const statusVariant = {
  PENDING:   'warning',
  CONFIRMED: 'success',
  CANCELLED: 'danger',
};

function OrderCard({ order, getProductName }) {
  return (
    <article className="card" style={{ gap: '0.6rem' }}>
      {/* Header row */}
      <div className="row-between">
        <div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
            Order #{order.id}
          </span>
          <span style={{ marginLeft: '0.6rem', fontSize: '0.8rem', color: '#64748b' }}>
            {formatDateTime(order.created_at)}
          </span>
        </div>
        <Badge variant={statusVariant[order.status] ?? 'default'}>
          {order.status}
        </Badge>
      </div>

      {/* Items list */}
      <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.25rem' }}>
        {order.items.map((item) => (
          <li key={item.id} style={{ fontSize: '0.87rem', color: '#374151' }}>
            <span style={{ fontWeight: 500 }}>{getProductName?.(item.product_id) ?? 'Unknown'}</span>
            {' '}&times;{item.quantity}
            <span style={{ color: '#64748b', marginLeft: '0.3rem' }}>
              = {formatCurrency(item.quantity * item.price)}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
        <strong style={{ fontSize: '0.95rem' }}>
          Total: {formatCurrency(order.total_amount)}
        </strong>
      </div>
    </article>
  );
}

export default OrderCard;
