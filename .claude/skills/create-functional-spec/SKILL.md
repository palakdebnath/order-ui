# Skill: Create Functional Spec

## Purpose

Turn a Jira story into a functional specification that is unambiguous enough for a
solution architect to design against and a QA engineer to test against.

## Steps

1. Read the Jira story from `specs/jira/<TICKET-ID>.md`, including title, description,
   acceptance criteria, and any linked design/UX assets.
2. Identify the primary user persona(s) and the trigger/entry point for the flow.
3. Enumerate the user flow step by step, including:
   - Screens/states involved (loading, empty, success, error).
   - Inputs, validations, and user-facing error messages.
   - Navigation/routing changes.
4. List explicit acceptance criteria in "Given/When/Then" form, deriving them from the
   Jira story if not already in that form.
5. Call out assumptions and open questions that need stakeholder clarification rather than
   guessing silently.
6. Save the output as `specs/functional/<TICKET-ID>-functional-spec.md`.

## Output Template

```markdown
# Functional Spec: <TICKET-ID> - <Title>

## Summary
<one paragraph>

## User Flow
1. ...

## Screens / States
- Loading:
- Empty:
- Success:
- Error:

## Acceptance Criteria
- Given ... When ... Then ...

## Open Questions
- ...
```
