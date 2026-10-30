# order-ui

React UI project for the Order Management system. This `.claude` directory defines the
agents, skills, templates, and workflows used to turn a Jira story into working React code.

## Structure

- `agents/` – role-specific agent definitions (business analyst, solution architect, react
  developer, code reviewer, QA engineer, deployment engineer, Git delivery engineer).
- `skills/` – reusable, step-by-step skills that agents invoke (spec creation, code
  generation, test generation, implementation review, local preview deployment, Jira
  branching and GitHub pull request delivery).
- `templates/` – scaffolding templates used when generating new components/features.
- `workflows/` – end-to-end workflows that chain agents and skills together.

## Primary workflow

See [workflows/jira-to-code.md](workflows/jira-to-code.md) for the Jira ticket → functional
spec → technical spec → React implementation → tests → review → local preview → GitHub
pull request pipeline. Ticket implementation starts with Git branch preparation.

Jira stories consumed by this workflow live under `specs/jira/` at the repo root
(e.g. `specs/jira/ORDUI-1234.md`).

## Jira Git Delivery Rule

For every Jira implementation request, run the
[git-delivery-engineer](agents/git-delivery-engineer.md) agent with the
[jira-branch-and-pr](skills/jira-branch-and-pr/SKILL.md) skill's prepare phase before
any spec-generation or implementation edits. Update `main` from the confirmed remote
and create `feature/<TICKET-ID>` from that exact latest base. If the worktree is dirty,
stop for a safe handoff; do not discard, auto-stash, or include unrelated changes.

After local tests, review, build, and required browser verification pass, run the skill's
publish phase: commit only ticket changes, push the same feature branch to GitHub, and
create or update a PR targeting `main`. This policy authorizes those ticket-scoped Git
operations for implementation requests, unless the user says otherwise. Do not push to
`main`, force-push, or merge the PR. Share the actual PR URL and preview URL; do not
report Jira delivery complete without the PR. An open PR means ready for user review,
not merged or released. Merely adding a Jira description does not trigger publication.
If delegation is unavailable, execute the skill in the current agent context. Report
authentication, repository, branch, or verification blockers without bypassing them.

## UI Completion Rule

After every new feature implementation or update to an existing page, including direct
requests without a Jira ticket, run the
[deployment-engineer](agents/deployment-engineer.md) agent using the
[deploy-local-preview](skills/deploy-local-preview/SKILL.md) skill after tests and review
pass. If agent delegation is unavailable, execute the skill in the current agent context.
Do not report UI work complete until a fresh build is served locally, the changed pages
are verified in a browser, and the user receives the exact URLs. Keep the preview running.
Report failed or unavailable checks as blockers, not successful deployment.

Local browser preview is the default; public hosting requires explicit authorization.
Documentation-only changes do not require a preview. These files guide agent execution;
they do not automatically run on file saves or replace CI/CD automation.
