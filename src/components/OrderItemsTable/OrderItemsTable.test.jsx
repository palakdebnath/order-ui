import { render, screen } from '@testing-library/react';
import OrderItemsTable from './OrderItemsTable.jsx';

const items = [
  { productCode: 'SKU-1001', productName: 'Wireless Mouse', quantity: 1, unitPrice: 49.99, lineTotal: 49.99 },
  { productCode: 'SKU-1002', productName: 'Mechanical Keyboard', quantity: 1, unitPrice: 100, lineTotal: 100 },
];

describe('OrderItemsTable', () => {
  it('renders a row per line item with formatted prices', () => {
    render(<OrderItemsTable items={items} />);

    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
    expect(screen.getAllByText('49.99')).toHaveLength(2);
  });
});
