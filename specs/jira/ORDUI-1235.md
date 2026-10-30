# ORDUI-1235: Create and Deploy a Hello World Page

**Project:** Order UI
**Type:** Story
**Status:** Done
**Priority:** Medium

## Summary

As a user, I want a Hello World page deployed to a local browser preview so that I can
open the URL and see the implemented change.

## Description

Create a new page in the order-ui application that displays "Hello World". Make it
available at `/hello-world`, deploy the current build to a running local preview, and
show the change by verifying it in a browser and sharing the exact page URL.

## Acceptance Criteria

1. **Given** I navigate to `/hello-world`, **when** the page loads, **then** I see
   "Hello World" as the main heading.
2. **Given** I open or refresh `/hello-world` directly, **when** the application loads,
   **then** the page renders successfully without a routing error.
3. The page follows the application's existing visual conventions, uses semantic
   markup, and remains readable on desktop and mobile viewports.
4. Existing order routes and behavior remain unchanged, and the Hello World page does
   not require a backend API to render.
5. Automated tests cover the new page and route, the test suite passes, review has no
   blocking issues, and `npm run build` succeeds for the current implementation.
6. **Given** the quality gates pass, **when** the deployment workflow runs, **then** the
   latest production build is served through a persistent local preview.
7. **Given** the preview is running, **when** the page is checked in a real browser,
   **then** "Hello World" is visible, direct loading and refresh work, and the page has
   no related browser errors.
8. The completion response includes the exact verified `/hello-world` preview URL and
   verification results, and the preview remains running so I can view the change.
   Any failed or unavailable check is reported as a blocker rather than completion.

## Suggested Technical Approach

- Reuse the existing React Router setup and page structure.
- Follow the implementation, test, and review stages in
  [the Jira-to-code workflow](../../.claude/workflows/jira-to-code.md).
- Use the [deployment engineer](../../.claude/agents/deployment-engineer.md) and
  [local preview skill](../../.claude/skills/deploy-local-preview/SKILL.md) to build,
  serve, and browser-verify the page before reporting completion.

## Out of Scope

- Public or production hosting.
- Backend changes or API integration.
- Changes to existing order-management functionality.

## Dependencies

- Local Node.js/npm environment and project dependencies.
- An available local preview port and browser verification tools.