---
"@heyo-sh/heyo-ui": minor
---

A correction pass, and a much better `Table`.

**Removed**

- `Drawer`, `ContextMenu`, `Resizable`. All three were reasonable components
  and none of them earned their place in a console toolkit: the drawer is a
  phone pattern in a desktop library, a right-click menu can never be the only
  route to an action so it's always the second copy of a `Dropdown`, and a
  split pane belongs to the app's layout rather than to its widgets.

**`Table` and `DataTable`, rebuilt**

- Headers are micro-caps — 11px, tracked, muted — so the label row registers
  once and then gets out of the way of the data.
- Hovering a row draws a 2px marker on its leading edge as well as a tint. On
  a 1200px-wide table a tint alone is invisible under the cursor at the far
  right, and the marker is what tells you which row you're actually on.
- `Table.Cell` gained `primary` (the column you scan for: full contrast,
  medium weight) and `Table.ActionCell`, a trailing column that fades its
  buttons in on hover and keeps them visible for the keyboard.
- Sort headers now show two stacked chevrons with the active direction lit,
  instead of a single arrow that said nothing until you'd clicked. They no
  longer take a focus ring on click, and no longer select their own label when
  you double-click to reverse the order.
- Sticky headers use a shadow rather than a border, which Safari used to scroll
  away with the cell it was drawn on.
- `DataTable` is one card: toolbar, rows and footer share a single ring instead
  of reading as three stacked widgets. Selecting swaps the toolbar for the bulk
  bar **in place** — the old bar appeared above the table and pushed every row
  down the instant you ticked a box, out from under the cursor. It also gained
  `title`/`description`, an actions column, a live "N of M" count while
  filtering, ragged skeleton widths, and it clears the selection when the
  filter changes so a bulk action can't hit rows you can no longer see.

**`Timeline`, rebuilt**

One continuous rail masked at both ends instead of per-item segments, which
left visible seams wherever two markers had different tones; it fades out at
the bottom because a feed doesn't end, it just stops being loaded. Rows now
highlight on hover, `active` gives the in-progress entry a halo, and
`Timeline.Separator` adds sticky date headings.

**`CodeBlock` highlights now**

A tiny built-in tokenizer (one regex per language — `ts`, `tsx`, `js`, `jsx`,
`json`, `sh`, `css`, `html`, `yaml`, `sql`) and an always-dark palette. It stays
dark in both colour modes on purpose: a code block is a quotation from a
terminal, and a light one reads as another piece of UI. Colours are `--code-*`
custom properties, so retheming is a handful of variables. Shipping Shiki or
Prism already? Pass its markup as `children`; that still renders untouched.

**Fixed**

- `ToggleGroup attached` drew a 2px double seam between buttons. Rings are
  box-shadows painted _outside_ the border box, so pulling two ringed buttons
  together by 1px doesn't collapse them — it traps a sliver of background
  between two lines. The frame now belongs to the group, with hairline dividers
  inside it. Vertical groups also stretch their toggles to one width, and
  `equal` does the same horizontally.
- `Combobox multiple`'s list narrowed every time you picked something: Base UI
  anchors the popup to the input group, falling back to the bare `<input>` —
  and that input shrinks as chips take its place. The chips now live inside a
  real `InputGroup`, whose width doesn't move.
- `Toast` stacks as a deck again, with the hover-to-fan-out animation. What made
  it a pyramid before was that every queued toast kept full opacity and kept
  climbing; the depth is now capped at three cards however many are waiting, and
  top-corner stacks fall downward instead of upward.
- `Command` left a black focus ring on the trigger after ⌘K. It now returns
  focus to wherever it actually came from, and nowhere at all when that was the
  page itself.
- `OtpField` slots are square and on the 8px control rhythm — `base` is the
  32px control height, not a squashed text field.

**Changed**

- `Empty` no longer looks like a 404. The default is a left-aligned block
  against a rule, on the same grid as the rest of the page; `align="center"` is
  there for the one case that wants it, an entirely empty pane. New `hint` slot
  for the footnote under the action.
