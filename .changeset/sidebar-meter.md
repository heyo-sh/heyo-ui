---
"@heyo-sh/heyo-ui": minor
---

Add `Sidebar.Meter`: a measurement for the whole app — an onboarding
checklist, trial days, a storage quota — pinned to the bottom of the sidebar.

Expanded it is a small card with the label, the value (`3/8` or your own
`valueLabel`), the bar and one line of `description`; on the collapsed icon
rail it becomes a ring the size of an icon, so the number never disappears with
the words. It renders a `<button>` and takes `render`, so a `Popover.Trigger` or
a router link opens the detail from anywhere in the app.
