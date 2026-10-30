---
name: jira-branch-and-pr
description: 'Use before implementing any Jira ticket to update main and create feature/TICKET-ID, and after local verification to commit ticket-only changes, push the same branch to GitHub, and create a pull request for user review.'
---

# Skill: Jira Branch and Pull Request

## Scope

Run the prepare phase before implementation or spec-generation edits for an authorized
Jira implementation request. Run publish after all required local checks pass. Merely
creating or editing a Jira description does not authorize implementation or publication.
The user's Jira delivery policy authorizes routine ticket-scoped commits, branch pushes,
and PR creation for implementation requests, unless that request says otherwise.
It does not authorize merging, public deployment, or including unrelated existing work.

Commands below assume a confirmed GitHub remote named `origin`, base `main`, and branch
`feature/<TICKET-ID>` (for example `feature/ORDUI-1237`). Replace placeholders with the
validated ticket ID; never run placeholder text literally. Validate the ID against the
story heading and filename and use `git check-ref-format --branch` for the branch name.
If the remote, base, or ticket identity is ambiguous, ask before making Git changes.

## Prepare: Before Editing

1. Inspect `git status --short --branch`, including untracked files, and check for an
   in-progress merge/rebase. Verify the configured remote targets the intended GitHub
   repository without exposing embedded credentials. Do not silently change remotes.
2. Require a clean worktree before switching branches or updating `main`. If dirty,
   stop and ask the user to commit/preserve the existing work or explicitly authorize
   another isolation approach. This includes an untracked Jira story: do not automatically
   commit it together with unrelated files. Never reset, clean, discard, auto-stash, or
   move existing changes to the new ticket branch without permission. Do not clean up
   the current workspace merely to satisfy this workflow.
3. Check GitHub access using an available authenticated GitHub integration or `gh`.
   With the CLI, use `gh auth status` and confirm the repository using `gh repo view`.
   If unavailable or unauthenticated, report the blocker. Have the user authenticate
   directly through their terminal/browser; never ask them to send tokens or passwords.
4. Fetch the confirmed remote using `git fetch origin`. For a new ticket branch, switch
   to `main` with `git switch main`, then run `git merge --ff-only origin/main`.
   If local `main` does not exist, create its tracking branch from `origin/main`.
   Require `git rev-parse main` to equal `git rev-parse origin/main` before proceeding.
   Diverged or locally ahead `main`, missing remote `main`, or fetch failures are
   blockers; never reset local commits or silently use a stale base.
5. Check whether `feature/<TICKET-ID>` already exists locally or remotely before creation.
   For a new branch, run `git switch -c feature/<TICKET-ID>` from the verified `main`.
   Record the base SHA and branch name for the implementation handoff.
   If the branch exists, do not overwrite, delete, or recreate it. Confirm it belongs
   to this ticket and repository; resume its existing work only when its history and
   scope are understood. Fetch and fast-forward its remote history when possible;
   divergent branches or unrelated commits require a user decision. Never claim an
   existing branch was freshly created from the latest `main`.
6. Confirm the active branch and clean status. Only then hand off to spec generation
   and implementation. Do not implement on `main` or bypass a blocked preparation.

## Publish: After Local Verification

1. Confirm this is still the prepared `feature/<TICKET-ID>` branch. Require passing
   tests, code review without blocking findings, and a fresh build for the current
   changes. For UI work, also require the local preview skill's real-browser checks
   and exact preview URLs. Documentation-only tickets use applicable documentation
   checks instead of a UI preview. Failed or unavailable gates block publication.
2. Inspect status, the complete diff against `origin/main`, and all commits in
   `origin/main..HEAD`. Include only this ticket's implementation, tests, and relevant
   specs/review records. Exclude secrets, credentials, `.env`, dependency directories,
   generated `dist`, and unrelated changes. Inspect new/untracked files explicitly.
   A PR includes the entire branch history, not just the last staged change; stop if
   that would publish other work. Do not silently remove or rewrite existing commits.
3. Stage explicit ticket file paths, never `git add .` or `git add -A`. Inspect
   `git diff --cached` and run `git diff --cached --check`; confirm nothing unrelated
   was already staged. Commit with a ticket-prefixed message such as
   `ORDUI-1237: Update page heading`. Do not amend existing commits or create empty
   commits. If identity/signing configuration blocks commit, ask the user to configure
   it rather than changing identity or disabling signing. If code changes after
   verification, repeat the affected gates before committing/pushing.
4. Push the exact prepared branch with
   `git push --set-upstream origin feature/<TICKET-ID>`. Verify the remote branch SHA
   matches the local commit. Never push to `main` or force-push. A rejected push is a
   blocker: inspect and reconcile with the user rather than overwriting remote work.
5. Check for an existing open PR with the exact repository, head branch, and base `main`.
   Reuse and update a matching PR rather than creating a duplicate. Otherwise create
   a non-draft PR targeting `main` using the available GitHub integration or:

   ```sh
   gh pr create --repo OWNER/REPO --base main --head feature/TICKET-ID --title "TICKET-ID: Summary" --body "PR description"
   ```

   Replace the example arguments with the verified repository, branch, title, and
   description. Follow the repository's PR template when present. Include the ticket,
   summary, acceptance-criteria coverage, actual test/build/browser results, preview
   URL, and any non-blocking warnings. Label localhost previews as accessible only on
   the serving machine, not as hosted PR previews. Do not claim CI passed without
   checking it; distinguish local results from pending or unavailable GitHub checks.
6. Verify the PR's actual URL, base, head, and head SHA using GitHub. Return its clickable
   URL, branch, commit SHA, verification summary, and local preview URL. Leave the PR
   open and the UI preview running; do not merge, delete branches, or stop the preview.
   If push succeeds but PR creation fails, report that partial state and resume PR
   creation later without duplicating commits or PRs. Mark delivery ready for user
   review only once the PR exists; an open PR is not a merged or production release.

## Safety and Blockers

Never bypass branch protection, hooks, TLS checks, or repository permissions. Do not
request administrator privileges or put credentials in commands, logs, or Markdown.
These are agent execution instructions, not file-save automation or a CI pipeline.