# order-ui

React UI project for the Order Management system. This `.claude` directory defines the
agents, skills, templates, and workflows used to turn a Jira story into working React code.

## Structure

- `agents/` – role-specific agent definitions (business analyst, solution architect, react
  developer, code reviewer, QA engineer).
- `skills/` – reusable, step-by-step skills that agents invoke (spec creation, code
  generation, test generation, implementation review).
- `templates/` – scaffolding templates used when generating new components/features.
- `workflows/` – end-to-end workflows that chain agents and skills together.

## Primary workflow

See [workflows/jira-to-code.md](workflows/jira-to-code.md) for the Jira ticket → functional
spec → technical spec → React implementation → tests → review pipeline.

Jira stories consumed by this workflow live under `specs/jira/` at the repo root
(e.g. `specs/jira/ORDUI-1234.md`).
