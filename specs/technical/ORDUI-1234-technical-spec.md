# Technical Spec: ORDUI-1234 - Display Order List with Filtering and Status Badges

## Component Plan

- New page: `src/pages/OrdersPage/OrdersPage.jsx` - top-level route component for `/orders`.
- New components:
  - `src/pages/OrdersPage/OrdersFilters.jsx` - customer select, controlled via URL search
    params.
  - `src/pages/OrdersPage/OrdersTable.jsx` - renders the order list using
    `@tanstack/react-table`.
  - `src/components/StatusBadge/StatusBadge.jsx` - shared colored badge for an order status,
    reusable on the (future) order detail page.
  - `src/components/OrderItemsTable/OrderItemsTable.jsx` - reusable nested table for an
    order's line items (`@tanstack/react-table`), for reuse on the order detail page.
- New hook: `src/pages/OrdersPage/useOrders.js` - encapsulates fetching, loading/error
  state, and syncing filters/pagination with the URL query string.
- New API client: `src/api/ordersApi.js` - wraps `GET /api/orders` with query params.
- Modified: `src/App.jsx` (or router config) - add `/orders` and `/orders/:orderId` (detail
  page route stubbed, out of scope for implementation).

## State Management

- Local component state only, driven by the URL: the selected customer and pagination
  (`customerId`, `page`, `size`) live in the URL query string via `useSearchParams`
  (React Router), read/derived in `useOrders`.
- `useOrders` owns `data`, `isLoading`, `error` local state for the current fetch — no
  global state library needed since no other part of the app needs this data yet.
- Table UI state (column defs, pagination display) is managed by `@tanstack/react-table`'s
  own internal state, driven by the `data`/`pageCount` passed in as props (manual
  pagination mode, since pagination happens server-side).

## API Contract

- `GET http://localhost:8080/api/orders?page=&size=`
  - The UI calls this via the relative path `/api/orders`, proxied to
    `http://localhost:8080` by the Vite dev server (`vite.config.js`) so the browser makes
    a same-origin request. This avoids a CORS preflight for the custom `X-Customer-Id`
    header, which order-service does not currently allow cross-origin. A production
    deployment needs an equivalent reverse-proxy rule (or order-service needs to add
    proper CORS headers, including `Access-Control-Allow-Headers: X-Customer-Id`).
  - Headers: `X-Customer-Id` (required) — one of `cust-1001`, `cust-1002`, `cust-1003`.
    Selected via a "Customer" filter in `OrdersFilters`, defaulting to `cust-1001` and
    reflected in the URL query string (`customerId`).
  - Query params: `page` (0-based), `size`. Status/date-range filtering was removed from
    scope — the list is scoped to the selected customer only.
  - Response:
    ```json
    {
      "content": [
        {
          "id": 5,
          "customerId": "cust-1001",
          "status": "COMPLETED",
          "createdAt": "2026-09-02T11:30:00Z",
          "totalAmount": 310.25,
          "currency": "USD",
          "items": [
            { "productCode": "SKU-1008", "productName": "Desk Lamp", "quantity": 1,
              "unitPrice": 120.00, "lineTotal": 120.00 }
          ]
        }
      ],
      "page": 0,
      "size": 20,
      "totalElements": 3,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
    ```
  - Error handling: non-2xx or network failure surfaces as `error` state in `useOrders`;
    `OrdersPage` renders the error banner with a Retry button that re-runs the last fetch.

## Table Rendering

- `@tanstack/react-table` (`useReactTable`) drives both `OrdersTable` (top-level order
  list, manual/server-side pagination) and `OrderItemsTable` (client-side, since an order's
  `items` array is already fully loaded with the order).
- Column defs use `accessorKey` against the API field names directly (`id`, `customerId`,
  `createdAt`, `status`, `totalAmount`); a custom cell renderer formats `createdAt` as a
  date and `totalAmount` with `currency`, and renders `status` via `StatusBadge`.

## Routing

- Add `/orders` route rendering `OrdersPage`.
- Add `/orders/:orderId` route as a stub (renders a placeholder) so row-click navigation
  (AC7) has a valid destination; full detail page implementation is a separate story.

## Non-Functional Requirements

- **Accessibility**: table uses semantic `<table>`/`<thead>`/`<tbody>` markup (via
  `flexRender` with real table elements, not `div`s); filters are labeled form controls;
  status badges include the status text (not color alone) for colorblind users.
- **Performance**: `useOrders` re-fetches only when filter/pagination search params
  change; table column defs are memoized with `useMemo` to avoid re-creating them each
  render.
- **Security**: order data rendered as text content only (no `dangerouslySetInnerHTML`);
  the order detail link uses the app router's `Link`, not a raw anchor with
  attacker-controlled `href`.
