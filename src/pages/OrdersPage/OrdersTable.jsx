import { useMemo } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString();
}

function formatTotal(amount, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/** Server-paginated table of orders; clicking a row navigates to the order's detail page. */
export default function OrdersTable({ orders, page, totalPages, onPageChange }) {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'Order ID' },
      { accessorKey: 'customerId', header: 'Customer Name' },
      {
        accessorKey: 'createdAt',
        header: 'Order Date',
        cell: (info) => formatDate(info.getValue()),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue()} />,
      },
      {
        id: 'total',
        header: 'Total',
        cell: (info) => formatTotal(info.row.original.totalAmount, info.row.original.currency),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              tabIndex={0}
              role="button"
              onClick={() => navigate(`/orders/${row.original.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') navigate(`/orders/${row.original.id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button type="button" disabled={page <= 0} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.max(totalPages, 1)}
        </span>
        <button
          type="button"
          disabled={page + 1 >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
