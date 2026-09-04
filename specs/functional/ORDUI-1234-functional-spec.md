# Functional Spec: ORDUI-1234 - Display Order List with Filtering and Status Badges

## Summary

Customer service representatives need an Orders page that lists orders fetched from
order-service for a selected customer, with a status badge per row, so they can quickly
find and act on that customer's orders.

## User Flow

1. User navigates to `/orders`.
2. Page requests orders from `GET /api/orders` (proxied to order-service) for the selected
   customer, sent via the `X-Customer-Id` header, with `page`/`size` pagination as query
   params.
3. While the request is in flight, a loading indicator is shown in place of the table.
4. On success, the order list renders as a table (Order ID, Customer Name, Order Date,
   Status badge, Total) with pagination controls.
5. User changes the Customer filter; the table re-fetches and re-renders for the newly
   selected customer, and the URL query string is updated to reflect it.
6. If the selected customer has no orders, an empty-state message replaces the table.
7. If the request fails, an inline error message with a "Retry" action replaces the table.
8. User clicks a row; the app navigates to `/orders/:orderId` (order detail page - out of
   scope for this story beyond the navigation itself).

## Screens / States

- **Loading**: spinner/skeleton shown in place of the table body; the Customer filter
  remains interactive.
- **Empty**: "No orders match the selected filters." message, the Customer filter remains
  visible so the user can pick a different customer.
- **Success**: table of orders with a status badge per row and pagination controls.
- **Error**: inline error banner ("Something went wrong loading orders.") with a Retry
  button that re-issues the last request.

## Data Mapping (from API response)

Note: the API's customer field is `customerId` (e.g. `cust-1001`), not a display name.
Since no separate "Customer Name" field/endpoint exists yet, the Customer Name column
displays the `customerId` value until a lookup is available (flagged in Open Questions).

| Column        | Source field           |
|---------------|-------------------------|
| Order ID      | `content[].id`          |
| Customer Name | `content[].customerId`  |
| Order Date    | `content[].createdAt`   |
| Status        | `content[].status`      |
| Total         | `content[].totalAmount` (formatted with `currency`) |

Observed status values in sample data: `COMPLETED`, `PROCESSING`. The badge color mapping
must not hardcode only "Pending/Shipped/Cancelled/Delivered" - it should support whatever
status values the API returns, with a sensible default color for unknown statuses.

## Acceptance Criteria

1. **Given** I navigate to the Orders page, **when** the page loads, **then** I see a
   paginated list of orders (for the default/selected customer) with columns: Order ID,
   Customer Name, Order Date, Status, and Total.
2. **Given** the order list is loading, **when** the API call is in flight, **then** a
   loading indicator is shown instead of a blank table.
3. **Given** the order API call fails, **when** the error occurs, **then** an inline error
   message is shown with a retry action.
4. **Given** I select a different customer, **when** the selection changes, **then** only
   that customer's orders are shown.
5. **Given** the selected customer has no orders, **when** the list is empty, **then** an
   empty-state message is shown instead of an empty table.
6. **Given** I click on an order row, **when** the click is registered, **then** I am
   navigated to that order's detail page (`/orders/:orderId`).
7. **Given** an order's status, **when** it is rendered, **then** it appears as a colored
   badge, with colors mapped per known status and a neutral default for unknown statuses.
8. **Given** I select a customer or change page, **when** the state changes, **then** the
   URL query string reflects `customerId`, `page`, and `size` so the page is
   shareable/bookmarkable.

## Open Questions

- Should the date range filter default to the last 30 days, or show all orders by default?
- Is there a maximum page size enforced by the backend?
- Is there a customer name lookup available, or should the Customer Name column display
  `customerId` as-is for this story?
