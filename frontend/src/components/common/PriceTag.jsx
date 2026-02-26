import { formatCurrency } from '../../utils/formatters.js';

/**
 * PriceTag – styled price display with optional "was" price for discounts.
 *
 * price    – current price (number)
 * wasPrice – optional original price to show as strikethrough
 * size     – 'sm' | 'md' | 'lg'
 */
const sizeMap = {
  sm: '0.85rem',
  md: '1.05rem',
  lg: '1.35rem',
};

function PriceTag({ price, wasPrice, size = 'md' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <strong style={{ fontSize: sizeMap[size], color: '#0f172a' }}>
        {formatCurrency(price)}
      </strong>
      {wasPrice !== undefined && wasPrice > price && (
        <s style={{ fontSize: '0.85em', color: '#94a3b8' }}>
          {formatCurrency(wasPrice)}
        </s>
      )}
    </span>
  );
}

export default PriceTag;
