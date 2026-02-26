import { formatCurrency, formatDateTime } from '../../../utils/formatters';
import { useCustomerViewModel } from '../../../viewmodels/useCustomerViewModel';

function Orders() {
  const { orders, products } = useCustomerViewModel();

  const getProductName = (productId) => products.find((product) => product.id === productId)?.name ?? 'Unknown';

  return (
    <section className="panel">
      <h1>Order History</h1>

      {!orders.length ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="stack">
          {orders.map((order) => (
            <article className="card" key={order.id}>
              <div className="row-between">
                <h3>Order {order.id}</h3>
                <span>{order.status}</span>
              </div>
              <p>{formatDateTime(order.created_at)}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {getProductName(item.product_id)} × {item.quantity} = {formatCurrency(item.quantity * item.price)}
                  </li>
                ))}
              </ul>
              <strong>Total: {formatCurrency(order.total_amount)}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;
