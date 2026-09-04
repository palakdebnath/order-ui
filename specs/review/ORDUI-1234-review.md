# Review: ORDUI-1234 - Display Order List with Filtering and Status Badges

## Scope Reviewed

- Functional spec: `specs/functional/ORDUI-1234-functional-spec.md`
- Technical spec: `specs/technical/ORDUI-1234-technical-spec.md`
- Implementation: `src/pages/OrdersPage/`, `src/components/StatusBadge/`,
  `src/components/OrderItemsTable/`, `src/api/ordersApi.js`, `src/App.jsx`
- Tests: `src/pages/OrdersPage/OrdersPage.test.jsx`, `src/components/StatusBadge/StatusBadge.test.jsx`,
  `src/components/OrderItemsTable/OrderItemsTable.test.jsx`, `src/api/ordersApi.test.js`

## Blocking Issues

None. `npm install` and `npm test` should be run before merge to confirm the test suite is
green in CI (not executed as part of this review).

## Suggestions

- `OrdersPage`'s row click/keyboard handlers use `role="button"` on a `<tr>`; consider
  wrapping the row's primary cell content in a real `<a>`/`<Link>` for better native
  accessibility and middle-click/"open in new tab" support, rather than relying on a
  synthetic button role plus `onKeyDown`.
- `useOrders` resets to page 0 on every filter change except explicit page changes; confirm
  this matches product expectations for e.g. re-selecting the same status.
- The "Customer Name" column currently displays the raw `customerId` (e.g. `cust-1001`) per
  the Open Question in the functional spec — revisit once a customer name lookup exists.
- No debounce on date filter inputs; each keystroke-driven change triggers a fetch once the
  URL updates. Consider a "Apply" button or debounce if this becomes a perceived
  performance issue with real backend latency.
- Table styling is minimal/inline; a follow-up should apply the project's design system
  once one exists.

## Acceptance Criteria Coverage

1. [x] Paginated order list with required columns — `OrdersTable` + `useOrders`, covered by
   `OrdersPage.test.jsx` ("renders the order list on success").
2. [x] Loading indicator while fetching — covered by "shows a loading indicator...".
3. [x] Inline error with retry — covered by "shows an error banner with a retry action...".
4. [x] Status filter — covered by "applies the status filter and re-fetches with it".
5. [ ] Date range filter — UI and fetch wiring implemented (`OrdersFilters`, `useOrders`),
   but not covered by an automated test yet. **Suggest qa-engineer add a test** asserting
   `fetchOrders` is called with `startDate`/`endDate` when those inputs change.
6. [x] Empty state — covered by "shows an empty state when no orders match the filters".
7. [x] Row click navigates to `/orders/:orderId` — covered by "navigates to the order
   detail page when a row is clicked".
8. [x] Status rendered as a colored badge with a safe default for unknown statuses —
   covered by `StatusBadge.test.jsx`.
9. [ ] Filters/pagination reflected in the URL query string — implemented via
   `useSearchParams` in `useOrders`, but not directly asserted by a test (tests assert the
   `fetchOrders` call args, not the URL itself). **Suggest qa-engineer add a test**
   asserting the `location.search` after a filter/page change.

## Recommendation

Approve pending: (a) adding the two missing test assertions noted above (AC5, AC9), and
(b) running `npm install && npm test` locally/in CI to confirm a green suite.
