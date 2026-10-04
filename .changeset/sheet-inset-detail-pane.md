---
"@heyo-sh/heyo-ui": minor
---

`Sheet` gains the detail-pane shape it was missing.

A sheet used to be one thing: a wall flush with the viewport edge, with a
scrim behind it and the page locked. That is right for a task you have to
finish — filters, a create form — and wrong for the other half of what side
panels are for: pick a row, read it, pick the next row. Every library screen
that needed the second one hand-rolled a `Card` pinned to the right instead,
which is how you end up with four different detail panes in one product.

- **`variant="inset"`** floats the panel off every edge with a radius, a ring
  and a shadow, and drops the scrim by default. Paired with `modal={false}`
  the list behind stays live, so choosing the next record is one press rather
  than close-then-pick. Its exit is a short slide plus a fade rather than a
  full-width sweep — a framed panel that flies off screen reads as a mistake.
- **`backdrop`** overrides the per-variant default in either direction, for an
  inset panel that still wants to dim the page.
- **`Sheet.Header` takes `actions`**: controls that belong to the panel rather
  than to its content — a status chip, an overflow menu — laid out on the
  title's row, before the close button, so the header stays one line deep.
  `Sheet.Title` truncates, because a filename is a title now.

Nothing changes for existing sheets: `variant` defaults to `flush`, which is
the current geometry, motion and scrim exactly.
