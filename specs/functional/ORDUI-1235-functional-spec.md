# ORDUI-1235: Hello World Page

## Source

[Jira story](../jira/ORDUI-1235.md)

## Behavior

- Opening `/hello-world` displays a main landmark with an H1 reading "Hello World".
- The page uses existing visual conventions and is readable on desktop and mobile.
- Direct navigation and browser refresh work without a backend API.
- Existing order routes and the root redirect remain unchanged.

## Acceptance and Delivery

Story criteria 1-4 are verified through route tests and desktop/mobile browser checks.
Criteria 5-8 require passing automated tests, review without blocking findings, a fresh
production build, and a persistent local preview verified in a real browser. Share the
exact page URL and verification results; report blockers instead of claiming completion.
Public hosting and backend changes are out of scope.