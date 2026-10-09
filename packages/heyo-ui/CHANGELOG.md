# @heyo-sh/heyo-ui

## 0.4.1

### Patch Changes

- f335664: `Select.Content` opens pinned to the trigger's start edge instead of centred on
  it, and takes an `align` prop for the other two.

  Base UI centres a select popup by default, which ties its position to its
  width — and a popup's width is not fixed. An option longer than the trigger
  widens it, and so does the scrollbar on a list long enough to scroll, because
  the gutter counts towards the shrink-to-fit width. Centred, each of those slid
  the whole list sideways by half the change: the list jumped a few pixels the
  moment it became scrollable. `Dropdown` already aligned to `start` and
  `Combobox` takes the anchor's width outright, so this also makes the three
  popups agree.

## 0.4.0

### Minor Changes

- d462cf8: Overlays stack in a fixed order, tables stop pretending empty rows are
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

## 0.3.0

### Minor Changes

- 5f1e0f2: `Sheet` gains the detail-pane shape it was missing.

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

- ffa1de7: Calendar, Skeleton, ScrollArea and Table fixes.

  - **`Calendar` is laid out on a fixed 2rem cell** instead of stretching to its
    container. Weekday headers now line up with the numbers under them, a selected
    range fills edge to edge rather than leaving a gap between every day, and with
    `months={2}` each heading sits over its own grid. Today's dot is centred
    explicitly, weekday abbreviations drop the locale's trailing punctuation
    (`pon.` → `po`), and the month grid is computed once per render instead of
    once per week row.
  - **`Skeleton` sweeps instead of pulsing.** A page of pulsing rectangles all
    breathe at once; a single faint highlight travelling through one block reads
    as "filling in" and is far quieter. New `delay` prop (and the
    `--heyo-skeleton-delay` custom property) staggers a group — `lines` and
    `DataTable`'s loading rows do it for you. Respects
    `prefers-reduced-motion`.
  - **`ScrollArea` no longer stretches its parent** when `orientation` includes
    the horizontal axis, and `fade` now works on that axis too. The two edge masks
    are composited, so `orientation="both"` fades all four edges instead of only
    the last axis declared.
  - **`Table.Row` gained `placeholder`.** A row that is not a record — an empty
    state, a "load more" strip — gets no hover tint, no leading marker, no zebra
    stripe and no pointer. `DataTable` uses it for both empty states, which
    previously highlighted "Nothing here yet" as though it were clickable.

### Patch Changes

- e1c99b1: `icon` props accept `forwardRef` and `memo` components again.

  Every `icon` prop in the library promises three shapes: a component, an
  element, or any node. `renderIcon` only recognised the first one when it was a
  plain function — but `@tabler/icons-react`, `lucide-react` and `react-icons`
  all produce `forwardRef` components, which are _objects_
  (`{ $$typeof, render }`), not functions.

  They fell through to the "render it as-is" branch, where React was handed a
  component object as a child and threw `Objects are not valid as a React child
(found: object with keys {$$typeof, render})`. Since Tabler is the icon set
  the documentation recommends, `<Button icon={IconPlus} />` — the first example
  in the README — crashed.

  `renderIcon` now treats `forwardRef` and `memo` objects as component types,
  which is what they are.

## 0.2.0

### Minor Changes

- fd72ddc: A pass over everything that was decorative, duplicated, or quietly broken.

  **Removed**

  - `Link` — an `<a>` with a `className` was never worth a component.
  - `Banner` — `Badge`'s tints one size up, and nothing more.
  - `Progress` — identical to `Meter` in every way that reaches the screen. One
    bar, `Meter`, now covers both.
  - `AlertDialog` and `ConfirmDialog` — folded into `Dialog`. A dialog that
    demands an answer is `<Dialog dismissible={false}>`; a confirm prompt is a
    dialog with two buttons in the footer.
  - `Avatar`'s `shape` — avatars are `rounded-xs`, always. A circle reads as a
    social profile; this is a console.

  **Added**

  - `Sheet` — the panel that slides in from an edge (right by default), with
    `side`, `size` and the same header/body/footer slots as `Dialog`.
  - `Search` — one field, grouped results, arrow keys and ↵, an optional `⌘K`
    hint that actually binds the shortcut. Filters `items` itself across label,
    description and `keywords`, or hands filtering to you via `onQueryChange`.
  - `ScrollArea` — overlay scrollbars that look identical on every OS, with an
    edge fade keyed to which side still has content behind it.
  - `heyo-scrollbar` — a utility that styles the _native_ scrollbar, for the
    surfaces that shouldn't pay for an extra element. Used by `Table`, `Select`,
    `Dropdown`, `Dialog.Body`, `Sheet.Body` and the sidebar.
  - `useSelection` — row selection for tables: `allSelected`, `someSelected`,
    `toggle`, `toggleAll`.
  - `Badge` gained `variant="count"`, the dashed metadata chip. It is literally
    what `Sidebar.MenuBadge` renders, which now composes it instead of
    re-implementing it.
  - `Table` gained `selected` on rows, `align`/`numeric` on cells, sortable
    headers (`sort` + `onSort`), `stickyHeader`, `maxHeight`, and
    `Table.SelectHeader` / `Table.SelectCell`.

  **Fixed**

  - `Dropdown` and `Select` no longer lock document scroll. Base UI defaults both
    to `modal`, which left the page frozen behind an open menu; both now default
    to `modal={false}` and expose the prop if you want the old behaviour.
  - `Dropdown.RadioItem` shipped completely unstyled, so you could not see which
    option was selected — the one thing a radio group exists to show. It now
    draws the dot on the same gutter as `Dropdown.CheckboxItem`.
  - `Tabs` `variant="segmented"`: the sliding pill was sized from a tab that hugged
    its own text, leaving it floating short inside the track. The list now
    stretches its tabs and the indicator spans the track's full inner height.
  - `Toast` stacked with a translate-and-scale shuffle that turned into an
    unreadable pyramid at three toasts. It's a plain list now, newest nearest the
    corner.
  - `Select` group labels are sticky, and the popup's own padding sits inside the
    scrollport — so scrolled items showed in the strip above the label. The label
    now carries its background over that strip.
  - `Dialog` renders its close button before the content, so a long body can't
    paint over it, and `dismissible` controls Escape as well as the backdrop.

  **Changed**

  - `Spinner` is eight spokes on a stepped rotation instead of a spinning arc. It
    ticks rather than smears.

- fd72ddc: Eighteen new components. The library goes from "the pieces a page is made of"
  to "the pieces a console is made of".

  **`Search` is now `Command`.** The inline field was the wrong shape: what a
  console actually wants is the ⌘K palette — one overlay in the middle of the
  screen that searches projects, pages and actions at once. It sits at 12vh
  rather than centred, so results grow downward into space the eye is already on,
  binds its own global shortcut, filters across label / description / `keywords`
  with multi-term matching, and hands filtering over to you with `onQueryChange`
  when the data lives on a server. `Command.Shortcut` renders the `⌘K` hint
  spelled for the current platform. For an inline field with a dropdown, that's
  `Combobox`.

  **Overlays**

  - `Drawer` — the bottom sheet: swipe to dismiss, snap points, grab handle,
    safe-area padding under the footer. The phone half of `Sheet`; separate
    because the interaction differs, not just the edge.
  - `ContextMenu` — the right-click menu, with the same rows as `Dropdown`.

  **Forms**

  - `Combobox` — a `Select` you can type into. `multiple` renders the chosen
    values as removable chips _inside_ the control, with the input keeping its
    place at the end of them.
  - `NumberField` — `Intl` formatting, clamping, ↑/↓ stepping (×10 with Shift),
    a flush unit suffix, and an optional drag-to-sweep grip.
  - `OtpField` — one box per character, paste-aware, `groupAfter` for `123-456`.
  - `FileUpload` — a drop zone that is also a `<label>` for a hidden input, so it
    works with a keyboard and on a phone. Ships the file list with per-file
    progress and error states.
  - `Calendar` + `DatePicker` / `DateRangePicker` — a month grid with no date
    dependency, range preview on hover, presets down the side of the range
    picker.

  **Data**

  - `DataTable` — `Table` with search, sorting, column visibility, selection with
    a bulk-action bar, loading skeletons, and separate "nothing yet" and
    "nothing matches" empty states.
  - `Stat` / `Stat.Group` — one number, its name and how it moved. `deltaGood`
    flips the colours for latency, errors and spend.
  - `Timeline` — deploys and audit logs. The rail belongs to the items, so it
    stops at the last marker instead of dangling past it.
  - `StatusBar` / `StatusBar.Dot` — the uptime bar. Columns flex rather than
    sitting at a fixed width, so ninety days fit a sidebar and a phone.
  - `Tree` — a collapsible hierarchy with a guide line per level.
  - `Resizable` — two panes and a draggable seam, sized in percentages, with
    arrow keys and double-click-to-reset.

  **Everything else**

  - `CopyButton` — clipboard with a tick that stays long enough to be believed,
    and a fallback for insecure contexts.
  - `CodeBlock` — filename bar, line numbers, highlighted lines, copy. It
    deliberately doesn't highlight syntax; pass Shiki's markup as `children`.

  New icons: chevron-left/up, plus, copy, upload, file, folder, calendar,
  grip-vertical, dots, filter, columns.

- fd72ddc: A correction pass, and a much better `Table`.

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

### Patch Changes

- fd72ddc: Fix `Label` outside a `Field`. Base UI's `Field.Label` throws when there's no
  `Field.Root` above it, so a standalone `<Label htmlFor="…">` — the case the
  docstring promised — crashed. It now renders a plain `<label>` whenever an
  explicit `htmlFor` is given, and keeps the field wiring otherwise.
- fd72ddc: Thin the focus ring. `heyo-focus` was a 2px outline at a 1px offset, which read
  as a heavier border rather than as focus — every other edge in the system is a
  hairline. It is now a 1px outline at a 2px offset: the contrast still carries it
  (the ring colour is the inverse of the page) and the gap keeps it clear of the
  control's own ring instead of thickening it. `Table`'s sort headers and
  `FileUpload`'s drop zone, which drew their outlines inline, match again.
