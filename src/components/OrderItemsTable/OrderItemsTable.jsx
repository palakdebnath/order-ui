import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

/** Read-only table of an order's line items, rendered client-side (data is already loaded). */
export default function OrderItemsTable({ items }) {
  const columns = [
    { accessorKey: 'productCode', header: 'Product Code' },
    { accessorKey: 'productName', header: 'Product Name' },
    { accessorKey: 'quantity', header: 'Quantity' },
    {
      accessorKey: 'unitPrice',
      header: 'Unit Price',
      cell: (info) => info.getValue().toFixed(2),
    },
    {
      accessorKey: 'lineTotal',
      header: 'Line Total',
      cell: (info) => info.getValue().toFixed(2),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
