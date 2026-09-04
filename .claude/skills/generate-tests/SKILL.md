# Skill: Generate Tests

## Purpose

Produce automated tests that verify the implementation against the functional spec's
acceptance criteria.

## Steps

1. Read acceptance criteria from `specs/functional/<TICKET-ID>-functional-spec.md`.
2. For each hook/utility function, write unit tests covering normal input, edge cases, and
   error handling.
3. For each component, write component tests covering:
   - Initial render (loading/empty states).
   - User interactions (clicks, form input, keyboard navigation).
   - Success and error states after async operations.
   - Accessible roles/labels are present and correctly wired.
4. For multi-step user flows, write an integration test exercising the flow end to end
   against mocked API responses.
5. Map each acceptance criterion to at least one test; note any criterion that cannot be
   automated and why.

## Conventions

- Co-locate test files with the code under test (`ComponentName.test.jsx`).
- Mock network calls at the API-client boundary, not deep implementation details.
- Prefer queries that mirror how a user finds elements (role/label/text) over test IDs.
