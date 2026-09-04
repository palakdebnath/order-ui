const CUSTOMER_OPTIONS = ['cust-1001', 'cust-1002', 'cust-1003'];

/** Controlled filter bar for the customer whose orders are shown. */
export default function OrdersFilters({ filters, onChange }) {
  return (
    <form
      aria-label="Order filters"
      onSubmit={(event) => event.preventDefault()}
      style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem' }}
    >
      <label>
        Customer &nbsp;
        <select
          value={filters.customerId}
          onChange={(event) => onChange({ customerId: event.target.value })}
        >
          {CUSTOMER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
