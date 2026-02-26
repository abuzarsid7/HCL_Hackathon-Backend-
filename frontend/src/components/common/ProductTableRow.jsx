import Badge from '../ui/Badge.jsx';
import { formatCurrency, toTitleCase } from '../../utils/formatters.js';
import StockBadge from './StockBadge.jsx';

/**
 * ProductTableRow – row used in the seller's Manage Products table.
 *
 * product          – product model
 * onUpdateStock    – (productId, newStock: number) => void
 */
function ProductTableRow({ product, onUpdateStock }) {
  return (
    <tr>
      <td style={{ fontWeight: 500 }}>{product.name}</td>
      <td>{formatCurrency(product.price)}</td>
      <td>
        <Badge variant="info">{toTitleCase(product.category)}</Badge>
      </td>
      <td>{product.size}</td>
      <td>
        <StockBadge stock={product.stock} />
      </td>
      <td>
        <input
          type="number"
          min={0}
          defaultValue={product.stock}
          style={{ width: 80 }}
          aria-label={`Update stock for ${product.name}`}
          onBlur={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val) && val >= 0) {
              onUpdateStock?.(product.id, val);
            }
          }}
        />
      </td>
    </tr>
  );
}

export default ProductTableRow;
