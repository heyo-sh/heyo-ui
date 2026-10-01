---
"@heyo-sh/heyo-ui": minor
---

A pass over everything that was decorative, duplicated, or quietly broken.

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
