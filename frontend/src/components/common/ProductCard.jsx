import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { formatCurrency, toTitleCase } from '../../utils/formatters.js';

/**
 * ProductCard – displays a single food product with category badge,
 * stock indicator, and an "Add to Cart" action.
 *
 * product  – product model object
 * onAdd    – (productId) => void
 */

const categoryIcons = {
  PIZZA: '🍕',
  DRINK: '🥤',
  BREAD: '🍞',
};

function ProductCard({ product, onAdd }) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock   = product.stock > 0 && product.stock <= 5;

  return (
    <article
      className="card"
      style={{
        gap: '0.5rem',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
      }}
    >
      {/* Category icon */}
      <div style={{ fontSize: '2.5rem', textAlign: 'center', padding: '0.5rem 0' }}>
        {categoryIcons[product.category] ?? '🍽️'}
      </div>

      {/* Name & badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{product.name}</h3>
        <Badge variant="info">{toTitleCase(product.category)}</Badge>
      </div>

      {/* Details row */}
      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
        {product.size} · {toTitleCase(product.packaging_type)} packaging
      </p>

      {/* Stock indicator */}
      {isOutOfStock && <Badge variant="danger">Out of Stock</Badge>}
      {isLowStock  && <Badge variant="warning">Only {product.stock} left</Badge>}
      {!isOutOfStock && !isLowStock && (
        <Badge variant="success">In Stock ({product.stock})</Badge>
      )}

      {/* Price + CTA row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
        <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>
          {formatCurrency(product.price)}
        </strong>
        <Button
          size="sm"
          disabled={isOutOfStock}
          onClick={() => onAdd?.(product.id)}
        >
          {isOutOfStock ? 'Sold Out' : '+ Add'}
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
