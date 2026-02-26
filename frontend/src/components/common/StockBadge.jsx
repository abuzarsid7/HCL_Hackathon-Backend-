import Badge from '../ui/Badge.jsx';

/**
 * StockBadge – displays a colour-coded stock level indicator.
 *
 * stock     – current stock number
 * threshold – number below-or-equal which "low stock" warning is shown (default 5)
 */
function StockBadge({ stock, threshold = 5 }) {
  if (stock <= 0) {
    return <Badge variant="danger">Out of Stock</Badge>;
  }
  if (stock <= threshold) {
    return <Badge variant="warning">Low Stock ({stock})</Badge>;
  }
  return <Badge variant="success">In Stock ({stock})</Badge>;
}

export default StockBadge;
