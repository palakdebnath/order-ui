# Skill: Create Technical Spec

## Purpose

Turn a functional specification into a technical specification that a react-developer
agent can implement directly, mirroring how `generate-spring-api` works for backend
services but targeted at the React UI layer.

## Steps

1. Read the functional spec from `specs/functional/<TICKET-ID>-functional-spec.md`.
2. Identify where the feature fits in the existing component tree (new page, new
   component, or modification of an existing one).
3. Decide state management:
   - Local component state for isolated UI state.
   - React Context for cross-cutting/shared state.
   - A state library only if the functional spec's complexity justifies it.
4. Define the API contract(s) the UI needs (endpoint, request/response shape, error
   shape), referencing the backend OpenAPI spec if available.
5. Identify shared/template components to reuse (see `templates/`) and any new reusable
   components to extract.
6. Note routing changes (new routes, guards/redirects).
7. Call out non-functional requirements: accessibility, responsiveness, performance
   (memoization, code-splitting), and security (input sanitization, auth token handling).
8. Save the output as `specs/technical/<TICKET-ID>-technical-spec.md`.

## Output Template

```markdown
# Technical Spec: <TICKET-ID> - <Title>

## Component Plan
- New components:
- Modified components:
- Shared/template components reused:

## State Management
<approach and justification>

## API Contract
- `GET/POST ... <endpoint>`
  - Request:
  - Response:
  - Error handling:

## Routing
- ...

## Non-Functional Requirements
- Accessibility:
- Performance:
- Security:
```
