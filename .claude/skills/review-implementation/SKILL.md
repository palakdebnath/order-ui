# Skill: Review Implementation

## Purpose

Review implemented React code and tests against the functional and technical
specifications before the story is considered done.

## Steps

1. Diff the implementation against `specs/technical/<TICKET-ID>-technical-spec.md` to
   confirm component plan, state management, and API contracts were followed.
2. Diff the implementation against `specs/functional/<TICKET-ID>-functional-spec.md` to
   confirm all acceptance criteria are met.
3. Check code quality: naming, component size/composition, duplicated logic, unused code.
4. Check accessibility: semantic HTML, ARIA usage, keyboard operability.
5. Check security: no unsanitized HTML injection, no secrets/tokens hardcoded or logged,
   external links use `rel="noopener noreferrer"` where relevant.
6. Check performance: unnecessary re-renders, missing memoization on expensive
   computations, unnecessarily large new dependencies.
7. Confirm tests exist and map to acceptance criteria; run the test suite.
8. Produce a review report separating blocking issues from suggestions.

## Output Template

```markdown
# Review: <TICKET-ID>

## Blocking Issues
- ...

## Suggestions
- ...

## Acceptance Criteria Coverage
- [x]/[ ] Given ... When ... Then ...
```
