# Skill: Generate React Components

## Purpose

Implement React components/hooks/pages from a technical specification, following the
project's templates and conventions.

## Steps

1. Read the technical spec from `specs/technical/<TICKET-ID>-technical-spec.md`.
2. Scaffold new components/pages using the structure defined in `templates/react-component/`.
3. Implement state management as specified (local state/context/state library).
4. Implement API integration per the defined contract, handling loading, empty, success,
   and error states explicitly.
5. Ensure accessibility: semantic elements, labeled form controls, keyboard focus
   management, ARIA attributes where semantic HTML is insufficient.
6. Avoid inline styles/`dangerouslySetInnerHTML`; sanitize any user-generated content that
   must be rendered as HTML.
7. Keep components small and composable; extract shared logic into hooks.
8. Update routing configuration if new pages were added.

## Conventions

- Co-locate a component's styles and tests next to the component file.
- Prefer named exports for components.
- Document expected props with `prop-types` (or JSDoc) since the project uses plain JavaScript/JSX, not TypeScript.
