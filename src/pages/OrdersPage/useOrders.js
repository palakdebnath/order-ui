import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchOrders } from '../../api/ordersApi.js';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_CUSTOMER_ID = 'cust-1001';

/**
 * Owns fetching orders and keeping filters/pagination in sync with the URL query string.
 */
export function useOrders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      customerId: searchParams.get('customerId') || DEFAULT_CUSTOMER_ID,
      page: Number(searchParams.get('page') || 0),
      size: Number(searchParams.get('size') || DEFAULT_PAGE_SIZE),
    }),
    [searchParams],
  );

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    fetchOrders(filters)
      .then((result) => {
        if (!isCancelled) setData(result);
      })
      .catch((err) => {
        if (!isCancelled) setError(err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [filters, reloadToken]);

  const updateFilters = useCallback(
    (partialFilters) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(partialFilters).forEach(([key, value]) => {
        if (value === '' || value === undefined || value === null) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      // Any filter change (other than page itself) resets pagination to the first page.
      if (!('page' in partialFilters)) {
        next.set('page', '0');
      }
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const retry = useCallback(() => setReloadToken((token) => token + 1), []);

  return { filters, updateFilters, data, isLoading, error, retry };
}
