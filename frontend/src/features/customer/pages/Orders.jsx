import { OrderCard, PageHeader } from '../../../components/common';
import { EmptyState } from '../../../components/ui';
import { useCustomerViewModel } from '../../../viewmodels/useCustomerViewModel';

function Orders() {
  const { orders, products } = useCustomerViewModel();

  const getProductName = (productId) => products.find((product) => product.id === productId)?.name ?? 'Unknown';

  return (
    <section className="panel">
      <PageHeader title="Order History" subtitle={`${orders.length} order(s)`} />

      {!orders.length ? (
        <EmptyState icon="📦" title="No orders yet" message="Place your first order to see it here." />
      ) : (
        <div className="stack">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} getProductName={getProductName} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;
