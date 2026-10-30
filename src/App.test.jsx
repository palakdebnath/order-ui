import { render, screen, within } from '@testing-library/react';
import App from './App.jsx';

vi.mock('./pages/OrdersPage/OrdersPage.jsx', () => ({
  default: () => <h1>Orders route</h1>,
}));

vi.mock('./pages/OrderDetailPage/OrderDetailPage.jsx', () => ({
  default: () => <h1>Order detail route</h1>,
}));

describe('App routing', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    window.history.replaceState({}, '', '/');
  });

  it('renders the Hello World page directly without a backend request', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    window.history.replaceState({}, '', '/hello-world');

    render(<App />);

    expect(within(screen.getByRole('main')).getByRole('heading', {
      level: 1,
      name: 'Super hello world',
      exact: true,
    })).toBeVisible();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([
    ['/orders', 'Orders route'],
    ['/orders/5', 'Order detail route'],
    ['/', 'Orders route'],
  ])('preserves the existing %s route', (path, heading) => {
    window.history.replaceState({}, '', path);

    render(<App />);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    if (path === '/') {
      expect(window.location.pathname).toBe('/orders');
    }
  });
});