const STATUS_STYLES = {
  COMPLETED: { background: '#e6f4ea', color: '#1e7e34', label: 'Completed' },
  PROCESSING: { background: '#fff8e1', color: '#8a6d00', label: 'Processing' },
  PENDING: { background: '#fff8e1', color: '#8a6d00', label: 'Pending' },
  SHIPPED: { background: '#e8f0fe', color: '#1a56db', label: 'Shipped' },
  CANCELLED: { background: '#fdecea', color: '#c62828', label: 'Cancelled' },
};

const DEFAULT_STYLE = { background: '#eee', color: '#333' };

/** Colored badge for an order status; falls back to a neutral style for unknown statuses. */
export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE;
  const label = style.label ?? status;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: style.background,
        color: style.color,
      }}
    >
      {label}
    </span>
  );
}
