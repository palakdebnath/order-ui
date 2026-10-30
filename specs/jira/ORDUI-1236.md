# ORDUI-1236: Update and Deploy the Hello World Message

**Project:** Order UI
**Type:** Story
**Status:** Done
**Priority:** Medium

## Summary

As a user, I want the Hello World page to display "Super hello world" and be deployed
to a local browser preview so that I can open the URL and see the updated message.

## Description

Update the existing page at `/hello-world` by changing its main heading from
"Hello World" to "Super hello world", preserving the exact capitalization. Build and
deploy the updated application to a running local preview, verify the change in a
browser, and share the exact page URL.

## Acceptance Criteria

1. **Given** I navigate to `/hello-world`, **when** the page loads, **then** the main
   heading displays exactly "Super hello world" instead of "Hello World".
2. **Given** I open or refresh `/hello-world` directly, **when** the application loads,
   **then** the updated heading remains visible without a routing error.
3. The page retains its existing semantic structure and visual conventions, remains
   readable without horizontal overflow on desktop and mobile, and requires no backend API.
4. Existing order routes and the root redirect remain unchanged.
5. Tests are updated to assert the new heading, the full test suite passes, review has
   no blocking issues, and `npm run build` succeeds for the updated source.
6. **Given** the quality gates pass, **when** deployment runs, **then** a persistent
   local preview serves the freshly built application rather than a stale build.
7. **Given** the preview is running, **when** the page is checked in a real browser on
   desktop and mobile, **then** "Super hello world" is visible, direct loading and
   refresh work, and there are no related browser errors.
8. The completion response includes the exact verified `/hello-world` preview URL and
   verification results. Keep the preview running so I can see the change. Report failed
   or unavailable checks as blockers rather than claiming completion.

## Suggested Technical Approach

- Update the existing Hello World page and its current route tests; do not add a new route.
- Follow [the Jira-to-code workflow](../../.claude/workflows/jira-to-code.md).
- Use the [deployment engineer](../../.claude/agents/deployment-engineer.md) and
  [local preview skill](../../.claude/skills/deploy-local-preview/SKILL.md) to rebuild,
  serve, and browser-verify the updated page before reporting completion.

## Out of Scope

- Public or production hosting.
- Backend changes, new dependencies, or API integration.
- Changes to existing order-management functionality or unrelated page styling.

## Dependencies

- The Hello World page implemented in [ORDUI-1235](ORDUI-1235.md).
- Local Node.js/npm environment, project dependencies, an available preview port, and
  browser verification tools.