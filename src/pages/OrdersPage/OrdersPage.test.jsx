import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import OrdersPage from './OrdersPage.jsx';
import { fetchOrders } from '../../api/ordersApi.js';

vi.mock('../../api/ordersApi.js', () => ({
  fetchOrders: vi.fn(),
}));

// Exposes the current URL search string so tests can assert filters/pagination are reflected in it.
function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
}

const sampleResponse = {
  content: [
    {
      id: 1,
      customerId: 'cust-1001',
      status: 'COMPLETED',
      createdAt: '2026-08-31T10:15:30Z',
      totalAmount: 149.99,
      currency: 'USD',
      items: [],
    },
  ],
  page: 0,
  size: 20,
  totalElements: 1,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

function renderOrdersPage(initialEntries = ['/orders']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <LocationProbe />
      <Routes>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<div>Order detail</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('OrdersPage', () => {
  beforeEach(() => {
    fetchOrders.mockReset();
  });

  it('shows a loading indicator while the request is in flight', async () => {
    fetchOrders.mockReturnValue(new Promise(() => {}));

    renderOrdersPage();

    expect(screen.getByRole('status')).toHaveTextContent('Loading orders');
  });

  it('renders the order list on success', async () => {
    fetchOrders.mockResolvedValue(sampleResponse);

    renderOrdersPage();

    expect(await screen.findByRole('cell', { name: 'cust-1001' })).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows an empty state when no orders match the filters', async () => {
    fetchOrders.mockResolvedValue({ ...sampleResponse, content: [] });

    renderOrdersPage();

    expect(await screen.findByText('No orders match the selected filters.')).toBeInTheDocument();
  });

  it('shows an error banner with a retry action on failure', async () => {
    fetchOrders.mockRejectedValue(new Error('network error'));

    renderOrdersPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong loading orders.');

    fetchOrders.mockResolvedValue(sampleResponse);
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(await screen.findByRole('cell', { name: 'cust-1001' })).toBeInTheDocument();
  });

  it('defaults to customer cust-1001 and re-fetches when the customer filter changes', async () => {
    fetchOrders.mockResolvedValue(sampleResponse);

    renderOrdersPage();
    await screen.findByRole('cell', { name: 'cust-1001' });

    expect(fetchOrders).toHaveBeenLastCalledWith(
      expect.objectContaining({ customerId: 'cust-1001', page: 0 }),
    );

    await userEvent.selectOptions(screen.getByLabelText('Customer'), 'cust-1002');

    await waitFor(() =>
      expect(fetchOrders).toHaveBeenLastCalledWith(
        expect.objectContaining({ customerId: 'cust-1002', page: 0 }),
      ),
    );
  });

  it('reflects the customer and pagination in the URL query string', async () => {
    fetchOrders.mockResolvedValue({ ...sampleResponse, totalPages: 2 });

    renderOrdersPage();
    await screen.findByRole('cell', { name: 'cust-1001' });

    await userEvent.selectOptions(screen.getByLabelText('Customer'), 'cust-1002');
    await waitFor(() =>
      expect(screen.getByTestId('location-search').textContent).toContain('customerId=cust-1002'),
    );

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() =>
      expect(screen.getByTestId('location-search').textContent).toContain('page=1'),
    );
  });

  it('navigates to the order detail page when a row is clicked', async () => {
    fetchOrders.mockResolvedValue(sampleResponse);

    renderOrdersPage();
    const customerCell = await screen.findByRole('cell', { name: 'cust-1001' });

    await userEvent.click(customerCell);

    expect(await screen.findByText('Order detail')).toBeInTheDocument();
  });
});
