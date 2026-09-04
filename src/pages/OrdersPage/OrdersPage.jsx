import OrdersFilters from './OrdersFilters.jsx';
import OrdersTable from './OrdersTable.jsx';
import { useOrders } from './useOrders.js';

export default function OrdersPage() {
  const { filters, updateFilters, data, isLoading, error, retry } = useOrders();

  return (
    <main>
      <h1>Orders</h1>

      <OrdersFilters filters={filters} onChange={updateFilters} />

      {isLoading && <p role="status">Loading orders…</p>}

      {!isLoading && error && (
        <div role="alert">
          <p>Something went wrong loading orders.</p>
          <button type="button" onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && data && data.content.length === 0 && (
        <p>No orders match the selected filters.</p>
      )}

      {!isLoading && !error && data && data.content.length > 0 && (
        <OrdersTable
          orders={data.content}
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => updateFilters({ page })}
        />
      )}
    </main>
  );
}
