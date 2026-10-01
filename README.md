# heyo-ui

Monorepo for [`@heyo-sh/heyo-ui`](./packages/heyo-ui) — a flat, dense,
developer-first React component library. Built on
[Base UI](https://base-ui.com) and Tailwind CSS v4.

## Install

```sh
bun add @heyo-sh/heyo-ui       # npm / pnpm / yarn all fine
```

One line in your CSS. That is the whole setup:

```css
@import "@heyo-sh/heyo-ui";
```

```tsx
import { Button } from "@heyo-sh/heyo-ui";

<Button variant="primary">Deploy</Button>;
```

No `tailwind.config.js`, no `@source`, no provider, no `cn()` helper to copy.
The package [README](./packages/heyo-ui/README.md) covers colour modes, the
tokens-only entry point, and every component.

## Repository

```
packages/heyo-ui              the library
examples/playground           every component on one page, light + dark
examples/playground/sections  one file per component — Button, Checkbox, Select, …
examples/playground/src/icons.tsx                 Tabler outline paths, inlined
examples/playground/sections/section-icons.ts     one glyph per component
```

## Getting started

```sh
bun install
bun run dev        # playground on http://localhost:5173
```

## Scripts

| Command                   | What it does                                                     |
| ------------------------- | ---------------------------------------------------------------- |
| `bun run dev`             | Runs the playground against the library **source** (instant HMR) |
| `bun run build`           | Builds `@heyo-sh/heyo-ui` to `dist/` (JS, types, CSS)            |
| `bun run typecheck`       | Typechecks the library and the playground                        |
| `bun run lint` / `format` | Prettier                                                         |
| `bun run verify`          | Packs the tarball, installs it clean, asserts the one-line setup |
| `bun run smoke`           | Server-renders the whole playground                              |
| `bun run quality`         | lint + typecheck + build + verify + smoke                        |

Two checks worth knowing about, because neither is a normal unit test:

- **`bun run verify`** packs the real tarball, installs it into a throwaway
  project outside this repo, and asserts that `@import "@heyo-sh/heyo-ui";`
  alone emits the component classes and that the `exports` map resolves for
  both barrel and granular imports. A broken `exports` map or a missing
  `@source` is invisible to unit tests yet breaks every consumer.
- **`bun run smoke`** renders the whole playground through `react-dom/server`,
  catching broken Base UI composition without opening a browser. It also asserts
  that every entry in the section registry rendered its anchor, so a renamed
  section can't silently break the sidebar.

CI runs `bun run quality` on every pull request, and the release workflow runs
it again before anything reaches npm.

## Design rules

1. **Semantic tokens only.** Never a raw Tailwind colour inside a component.
   `bg-heyo-base`, not `bg-white dark:bg-neutral-900`.
2. **No `dark:` variants.** Tokens resolve both modes with `light-dark()`;
   `data-mode` on any ancestor switches them.
3. **Rings, not borders,** for control edges — a border would change the box.
   Edge colours are translucent so one value is correct on every surface.
4. **One focus ring:** the `heyo-focus` utility. Never hand-roll it.
5. **Dense first.** Default control height is 32px, default body text 14px.
   Hierarchy comes from weight and colour, not size: **medium** names a surface
   or group, **normal** lives inside one.
6. **The sidebar is not a panel.** It shares the page background; a single
   hairline separates it. Same rule for any pane chrome.
7. **Every component forwards `className`** through `cn()` (clsx +
   tailwind-merge) and sets a stable `data-slot`.
8. **No icon dependency.** Icon props accept a component, an element, or a node.
   The internal glyphs are Tabler paths, inlined verbatim, so they sit flush
   with `@tabler/icons-react`. Same rule in the playground: every glyph it
   renders is a real Tabler icon, copied from the package.
9. **Nothing locks the page unless it's a modal task.** `Dropdown` and `Select`
   default to `modal={false}` — unlike Base UI — because a menu is a list of
   things you might not do, and freezing the page behind one feels broken. Only
   `Dialog` and `Sheet` lock scroll, because only they demand an answer.
10. **One component per job.** There is one `Dialog` (not dialog + alert dialog
    - confirm dialog), one bar (`Meter`, not meter + progress), one avatar
      radius. A second component that differs by a prop is a prop.

## Scrolling

Two tools, and they are not interchangeable:

- **`ScrollArea`** replaces the browser's scrollbar with real elements: a 6px
  overlay thumb that appears while you hover or scroll and fades out after, plus
  an optional mask that fades content at whichever edge still has more behind
  it. Use it for designed surfaces — panes, cards, log views.
- **`heyo-scrollbar`**, a plain utility, styles the _native_ scrollbar instead:
  thin, translucent, no track, no buttons. No extra DOM, no JS, and it survives
  anything (a `<table>` wrapper, a dialog body, the sidebar). Every scrollable
  surface inside the library uses it.

## Adding a component

1. Create `packages/heyo-ui/src/components/<name>.tsx`, starting with
   `"use client"`.
2. Reach for Base UI when there's behaviour or accessibility involved; plain
   elements when there isn't.
3. Pull shared chrome from `lib/control.ts` (form controls) or `lib/surface.ts`
   (anything floating).
4. Export it from `src/index.ts` **and** add the entry point to `build:js` in
   `packages/heyo-ui/package.json` so it stays granularly importable.
5. Add it to the playground: a new
   `examples/playground/src/sections/<name>.tsx` exporting `<Name>Section`,
   registered in `sections/index.tsx`.

## Notable pieces

| Component      | Why it's here                                                                            |
| -------------- | ---------------------------------------------------------------------------------------- |
| `Command`      | The ⌘K palette. Mount it once; it binds the shortcut and searches everything.            |
| `DataTable`    | `Table` plus search, sorting, column visibility, selection, skeletons, two empty states. |
| `Combobox`     | A `Select` you can type into. `multiple` turns the choices into removable chips.         |
| `Sheet`        | The edge panel — detail panes, filters, a record in full.                                |
| `CodeBlock`    | Highlighted, always dark, themed with `--code-*`. No grammar bundle.                     |
| `Timeline`     | Deploys and audit logs, on one continuous rail that fades out at the bottom.             |
| `Calendar`     | A month grid with no date dependency — `Intl` plus `Date` is the whole implementation.   |
| `ScrollArea`   | Overlay scrollbars that look the same on every OS.                                       |
| `useSelection` | Row selection for tables, including the indeterminate select-all box.                    |

### Deliberate non-features

- **No grammars.** `CodeBlock` highlights with one regex per language, which
  covers the snippets that actually appear in a UI — a config file, an import
  block, a curl command — for about a kilobyte. Real grammars belong to Shiki;
  pass its markup as `children` and the block renders it untouched.
- **No right-click menu, no bottom sheet, no split pane.** A context menu can
  never be the only route to an action, so it is always a second copy of a
  `Dropdown`; a drawer is a phone pattern; a resizable pane belongs to the app's
  layout, not to its widget library.
- **No date library.** `Calendar` needs "add a day" and locale names, and `Date`
  and `Intl.DateTimeFormat` do both correctly, including across DST.
- **No typed date input.** `DatePicker` opens a calendar rather than parsing
  text, because `3/4/25` is March for half the world and April for the other.
- **No virtualised table.** `DataTable` filters and sorts on the client because
  the 95% case is a page of a few hundred rows you already have. Every input is
  also controllable, so the same component works against a server when it isn't.

## Playground layout

One component, one section — `Checkbox`, `Radio`, `Select` and `Switch` each
get their own, never a shared "Selection" block. A section file renders
`<Section title="Checkbox">` and, inside it, one `<Example label="…">` (or
`<Stack>`) per prop worth seeing.

`sections/index.tsx` is the single registry: it groups the sections for the
sidebar and gives the page its render order. Anchor ids come from the section
title (`slugify`), which is what the sidebar links to.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) — it covers the workspace, the checks,
and what adding a component involves. Before proposing one, read the design
rules and the deliberate non-features above: several components are missing on
purpose.

User-facing changes need a changeset (`bun run changeset`). Releases are
published only by CI; see [RELEASING.md](RELEASING.md).

For questions, see [SUPPORT.md](SUPPORT.md). For vulnerabilities, use the
private process in [SECURITY.md](SECURITY.md).

## Licence

[MIT](LICENSE)
