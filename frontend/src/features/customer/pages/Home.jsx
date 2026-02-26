import { useMemo, useState } from 'react';
import { PRODUCT_CATEGORIES } from '../../../utils/constants';
import { formatCurrency, toTitleCase } from '../../../utils/formatters';
import { useCustomerViewModel } from '../../../viewmodels/useCustomerViewModel';

function Home() {
  const { products, addToCart } = useCustomerViewModel();
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const visibleProducts = useMemo(() => {
    if (categoryFilter === 'ALL') {
      return products;
    }
    return products.filter((product) => product.category === categoryFilter);
  }, [categoryFilter, products]);

  return (
    <section className="panel">
      <div className="page-header">
        <h1>Browse Food Items</h1>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option value="ALL">All Categories</option>
          {Object.values(PRODUCT_CATEGORIES).map((category) => (
            <option key={category} value={category}>
              {toTitleCase(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="card-grid">
        {visibleProducts.map((product) => (
          <article className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{toTitleCase(product.category)} · {product.size}</p>
            <p>Packaging: {toTitleCase(product.packaging_type)}</p>
            <p>Stock: {product.stock}</p>
            <strong>{formatCurrency(product.price)}</strong>
            <button
              className="btn"
              type="button"
              disabled={product.stock <= 0}
              onClick={() => addToCart(product.id, 1)}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
