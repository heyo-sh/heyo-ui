---
"@heyo-sh/heyo-ui": minor
---

Overlays stack in a fixed order, tables stop pretending empty rows are
records, and `Select` takes a label.

**One layering scale, applied to positioners.** Every floating surface used to
be `z-50` and sort itself out by DOM order, which is not a thing you can rely
on: a menu opened inside a dialog is portalled into the _dialog's_ portal node
and positioned with a `transform`, so the positioner becomes a stacking
context and the `z-50` on the popup inside it is scoped to that context — it
loses to the dialog every time. That is why a `Select` in a dialog opened
behind it, and why a tooltip could end up under a menu. The index now lives on
the positioner, in three layers: `z-50` for dialogs, sheets and the command
palette; `z-[60]` for select, dropdown, popover, combobox and toasts (an
answer must clear the dialog that asked); `z-[70]` for tooltips, which nothing
covers.

**A table row only looks clickable when it is one.** `Table.Row` already
dropped the hover tint, the leading marker and the pointer for `placeholder`
rows, and people kept forgetting the flag — so a row whose cell spans the
table now loses them too. One `<td colspan>` across a table is an empty state,
a loading strip or a group heading, never a record, and "No pages yet"
lighting up under the cursor promises something to click that is not there.

**And a row that _is_ clickable is reachable.** `Table.Row` with `onClick`
becomes focusable, answers Enter and takes the pointer cursor without the
table having to be marked `interactive`. The whole row is the target, instead
of whatever link the first cell happened to contain.

**`Select` takes the field props `Input` has** — `label`, `description`,
`error`, `optional`, `labelAside` — so a labelled select is one prop rather
than a hand-built `<label>` over a trigger, with the same 6px gap under the
label as every other control. Omit them and it is the bare control as before.
