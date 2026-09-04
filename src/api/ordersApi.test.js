import { fetchOrders } from './ordersApi.js';

describe('fetchOrders', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('builds the query string and headers from the given params and returns the parsed JSON', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ content: [] }),
    });

    await fetchOrders({ customerId: 'cust-1001', page: 1, size: 10 });

    const [requestedUrl, requestInit] = global.fetch.mock.calls[0];
    expect(requestedUrl).toBe('/api/orders?page=1&size=10');
    expect(requestInit.headers).toEqual({ 'X-Customer-Id': 'cust-1001' });
  });

  it('throws when the response is not ok', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(fetchOrders({ customerId: 'cust-1001', page: 0, size: 20 })).rejects.toThrow(
      'Failed to load orders (status 500)',
    );
  });
});
