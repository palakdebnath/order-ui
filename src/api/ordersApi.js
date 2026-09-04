// Relative path so requests go through the Vite dev proxy (see vite.config.js),
// avoiding a cross-origin preflight against order-service in the browser.
const BASE_URL = '/api/orders';

/**
 * Fetches orders for the given customer from order-service, with pagination.
 * @param {{ customerId: string, page: number, size: number }} params
 * @returns {Promise<{ content: object[], page: number, size: number, totalElements: number, totalPages: number, hasNext: boolean, hasPrevious: boolean }>}
 */
export async function fetchOrders({ customerId, page, size }) {
  const searchParams = new URLSearchParams();
  searchParams.set('page', String(page));
  searchParams.set('size', String(size));

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
    headers: { 'X-Customer-Id': customerId },
  });

  if (!response.ok) {
    throw new Error(`Failed to load orders (status ${response.status})`);
  }

  return response.json();
}
