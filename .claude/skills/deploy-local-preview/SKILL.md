---
name: deploy-local-preview
description: 'Build, serve, and browser-verify order-ui locally after implementing any new feature or updating an existing page. Use after tests and review pass and before reporting UI work complete, including changes without Jira tickets.'
---

# Skill: Deploy Local Preview

## Purpose

Make the latest UI changes directly viewable in a browser and provide verified URLs.
This is a local preview workflow, not public hosting or a production release.
Documentation-only changes do not require starting a preview.

## Steps

1. **Identify the change.** Record affected routes, expected interactions, and acceptance
   criteria from the request or specs. For this app, `/orders` is the list route and
   `/orders/:orderId` is the detail route; use an actual available order ID when testing.
   Inspect current routing and configuration if the implementation changed them.
2. **Check prerequisites.** Work from the repository root and read `package.json` and
   `vite.config.js`. Use the repository's package manager and lockfile. If dependencies
   are absent, install with `npm ci` when a lockfile exists, otherwise `npm install`.
   Do not disable TLS verification or print secrets to resolve installation failures.
3. **Enforce quality gates.** Ensure `npm test` passes for the current changes and review
   has no blocking issues. Reuse recorded results only when they cover this exact revision.
   For direct page edits, perform the same test and review gates without requiring Jira
   specs. If delegation is unavailable, perform the gates in the current agent context.
   Stop on failures and return them to implementation; do not mark the change complete.
4. **Build the current source.** Run `npm run build` synchronously and require success.
   Never serve a previous `dist` after a failed build or substitute a development server
   for this production-build check. Do not edit generated build files.
5. **Serve the build.** Start a persistent preview process using the execution tool's
   background/server mode:

   ```sh
   npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
   ```

   Keep it running after verification. If the port is occupied, reuse the process only
   when it is a known preview for this repository serving the newly built output.
   Otherwise choose an available port such as 4174 and retry; never terminate an unknown
   process. Restart only a preview owned by this workflow when configuration changes
   require it. Record the process identifier and use the actual ready URL from output.
   Do not assume the server started merely because a background process was created.
6. **Check API availability.** The current app calls same-origin `/api/orders` and sends
   `X-Customer-Id`; the Vite configuration proxies `/api` to `http://localhost:8080`.
   Check the current configuration and whether required backend data is available.
   Do not invent credentials, silently replace the backend with mocks, or modify API
   configuration simply to make verification pass. Report an unavailable backend as
   blocking API-dependent acceptance checks, separately from successful static UI checks.
7. **Verify in a real browser.** Use the available browser automation tools to open the
   changed route on the actual preview URL. Check that the app renders, exercise the
   changed behavior against its acceptance criteria, and inspect browser errors and
   failed network requests. Directly load and refresh changed nested routes to check
   SPA routing. For layout changes, check desktop and mobile viewports and capture
   screenshots when supported. HTTP 200 or the Vite ready message alone is insufficient.
   If browser tools are unavailable, provide the running URL but explicitly mark browser
   verification blocked; do not claim the workflow is complete.
8. **Report the result.** Return the exact clickable changed-page URLs, test and build
   results, browser checks performed, and any blockers. Keep the server running so the
   user can inspect the change. Include the process identifier and how to stop it when
   supported. If a browser check fails, route the defect back to implementation and
   repeat the gates, build, and affected browser checks after the fix.

## Completion Criteria

- Tests and review pass for the current implementation.
- A fresh production build succeeds and a reachable local preview serves that build.
- Changed pages and acceptance criteria pass real-browser verification.
- The user receives exact browser URLs and any necessary access prerequisites.

If any required check is blocked, report partial progress and the blocker instead of
declaring the feature done. Never describe a localhost URL as publicly accessible.
Remote hosting requires a separately authorized target and deployment procedure.