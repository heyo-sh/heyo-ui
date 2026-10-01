---
"@heyo-sh/heyo-ui": minor
---

Eighteen new components. The library goes from "the pieces a page is made of"
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
