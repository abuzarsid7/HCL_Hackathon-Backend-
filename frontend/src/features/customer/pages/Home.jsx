import { useMemo, useState } from 'react';
import { CategoryFilter, PageHeader, ProductCard } from '../../../components/common';
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
      <PageHeader
        title="Browse Food Items"
        subtitle={`${visibleProducts.length} items available`}
        action={<CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />}
      />

      <div className="card-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={(productId) => addToCart(productId, 1)} />
        ))}
      </div>
    </section>
  );
}

export default Home;
