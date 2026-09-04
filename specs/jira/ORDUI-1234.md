# ORDUI-1234: Display Order List with Filtering and Status Badges

**Project:** Order UI
**Type:** Story
**Status:** To Do
**Priority:** High

## Summary

As a customer service representative, I want to view a list of orders with filtering by
status and date range, so that I can quickly find and act on orders relevant to my work
queue.

## Description

The order-ui application needs a new "Orders" page that lists orders retrieved from the
order-service API. Users should be able to filter the list by order status and a date
range, see a status badge per order, and navigate to an order's detail page by clicking a
row.

## Acceptance Criteria

1. **Given** I navigate to the Orders page, **when** the page loads, **then** I see a
   paginated list of orders with columns: Order ID, Customer Name, Order Date, Status,
   and Total.
2. **Given** the order list is loading, **when** the API call is in flight, **then** a
   loading indicator is shown instead of a blank table.
3. **Given** the order API call fails, **when** the error occurs, **then** an inline error
   message is shown with a retry action.
4. **Given** I select a status filter (e.g. "Pending", "Shipped", "Cancelled"), **when**
   the filter is applied, **then** only orders matching that status are shown.
5. **Given** I select a date range filter, **when** the filter is applied, **then** only
   orders placed within that range are shown.
6. **Given** no orders match the applied filters, **when** the filtered list is empty,
   **then** an empty-state message is shown instead of an empty table.
7. **Given** I click on an order row, **when** the click is registered, **then** I am
   navigated to that order's detail page (`/orders/:orderId`).
8. **Given** an order's status, **when** it is rendered, **then** it appears as a colored
   badge (e.g. green = Delivered, yellow = Pending, red = Cancelled).
9. Filters and pagination state should be reflected in the URL query string so the page is
   shareable/bookmarkable.

## Suggested Technical Approach

- Use `@tanstack/react-table` to render the order list and, on the order detail page, the
  nested order line-items table — it handles pagination, sorting, and column definitions
  without dictating markup/styling.

## Out of Scope

- Editing or cancelling an order from this page (handled in the order detail page).
- Bulk actions on multiple orders.

## Dependencies

- `GET http://localhost:8080/api/orders` endpoint on order-service supporting `status`,
  `startDate`, `endDate`, `page`, and `size` query parameters.

### Sample Response

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
                {
                    "productCode": "SKU-1008",
                    "productName": "Desk Lamp",
                    "quantity": 1,
                    "unitPrice": 120.00,
                    "lineTotal": 120.00
                },
                {
                    "productCode": "SKU-1009",
                    "productName": "Office Chair Cushion",
                    "quantity": 1,
                    "unitPrice": 95.25,
                    "lineTotal": 95.25
                },
                {
                    "productCode": "SKU-1010",
                    "productName": "Notebook Set",
                    "quantity": 3,
                    "unitPrice": 31.67,
                    "lineTotal": 95.00
                }
            ]
        },
        {
            "id": 2,
            "customerId": "cust-1001",
            "status": "PROCESSING",
            "createdAt": "2026-09-01T14:20:00Z",
            "totalAmount": 89.50,
            "currency": "USD",
            "items": [
                {
                    "productCode": "SKU-1003",
                    "productName": "USB-C Hub",
                    "quantity": 1,
                    "unitPrice": 89.50,
                    "lineTotal": 89.50
                }
            ]
        },
        {
            "id": 1,
            "customerId": "cust-1001",
            "status": "COMPLETED",
            "createdAt": "2026-08-31T10:15:30Z",
            "totalAmount": 149.99,
            "currency": "USD",
            "items": [
                {
                    "productCode": "SKU-1001",
                    "productName": "Wireless Mouse",
                    "quantity": 1,
                    "unitPrice": 49.99,
                    "lineTotal": 49.99
                },
                {
                    "productCode": "SKU-1002",
                    "productName": "Mechanical Keyboard",
                    "quantity": 1,
                    "unitPrice": 100.00,
                    "lineTotal": 100.00
                }
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

## Open Questions

- Should the date range filter default to the last 30 days, or show all orders by default?
- Is there a maximum page size enforced by the backend?
