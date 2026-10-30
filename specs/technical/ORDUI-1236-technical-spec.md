# ORDUI-1236: Technical Specification

## Source

[Functional specification](../functional/ORDUI-1236-functional-spec.md)

## Implementation

- Change only the H1 text in `src/pages/HelloWorldPage/HelloWorldPage.jsx`.
- Update the expected heading in `src/App.test.jsx` to "Super hello world" with exact
  matching. Retain the no-fetch assertion and existing route regression cases.
- Leave routing, styling, API configuration, and dependencies unchanged.

## Verification and Deployment

Run the focused App tests first, then the full suite and review. Build the production
bundle and use the local preview skill to serve it, reusing the known existing preview
when available. Verify the exact updated heading, direct loading, refresh, no related
errors or API requests, and no desktop/mobile horizontal overflow. Share the verified
URL and keep the preview running.