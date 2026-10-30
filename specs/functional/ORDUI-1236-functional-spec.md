# ORDUI-1236: Updated Hello World Message

## Source

[Jira story](../jira/ORDUI-1236.md)

## Behavior

- Replace the heading on `/hello-world` with exactly "Super hello world".
- Preserve the main landmark, H1, existing visual conventions, and backend independence.
- Preserve the order routes and root redirect.
- Direct loading and refresh must show the updated message on desktop and mobile
  without horizontal overflow or related browser errors.

## Delivery

Update the existing assertion and pass all tests, review, and a fresh production build.
Serve the new build in the local preview, verify it in a real browser, and share the
exact page URL with the server left running. Report blockers rather than completion.
No public hosting, new dependencies, or backend changes are required.