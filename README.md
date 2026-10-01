<div align="center">
  <!-- Hero: drop the image in at ./public/heyo-ui-hero.webp and uncomment.
  <img src="./public/heyo-ui-hero.webp" alt="heyo-ui"/>
  -->

  <p>
    <a href="https://npmjs.com/package/@heyo-sh/heyo-ui"><img src="https://img.shields.io/npm/dm/%40heyo-sh%2Fheyo-ui?style=flat&amp;colorA=000000&amp;colorB=000000" alt="npm downloads"/></a>
    <a href="https://www.npmjs.com/package/@heyo-sh/heyo-ui"><img src="https://img.shields.io/npm/v/%40heyo-sh%2Fheyo-ui.svg?style=flat&amp;colorA=000000&amp;colorB=000000" alt="npm version"/></a>
    <a href="https://github.com/heyo-sh/heyo-ui/stargazers"><img src="https://img.shields.io/github/stars/heyo-sh/heyo-ui?style=flat&amp;colorA=000000&amp;colorB=000000" alt="GitHub stars"/></a>
    <img src="https://img.shields.io/badge/55%2B%20components-000000?style=flat&amp;colorA=000000&amp;colorB=000000" alt="55+ components"/>
    <img src="https://img.shields.io/badge/Base%20UI%20%2B%20Tailwind%20v4-000000?style=flat&amp;colorA=000000&amp;colorB=000000" alt="Base UI + Tailwind v4"/>
  </p>

  <p style="margin-top: 0.375rem;">
    <a href="./packages/heyo-ui/README.md">Documentation</a>
    ·
    <a href="./examples/playground">Playground</a>
    ·
    <a href="./CONTRIBUTING.md">Contributing</a>
  </p>
</div>

## heyo-ui

A flat, dense, developer-first React component library for dashboards and
internal tools. Built on [Base UI](https://base-ui.com) and Tailwind CSS v4,
with semantic tokens, hairline rings, and no `dark:` variants anywhere.

## Get started

Install the package with whichever package manager the project already uses.
There is no init step, no config file to generate, and nothing to paste into
your repository.

```bash
# pnpm
pnpm add @heyo-sh/heyo-ui

# npm
npm install @heyo-sh/heyo-ui

# Yarn
yarn add @heyo-sh/heyo-ui

# Bun
bun add @heyo-sh/heyo-ui
```

The library ships compiled JS, types and CSS, and works with any bundler that
understands `exports` — Vite, Next.js, Rspack, Parcel. It needs React 19 and
Tailwind CSS 4.1+.

## Minimum configuration

One line in your CSS is the whole setup. It pulls in Tailwind, registers the
heyo tokens, and declares the compiled components as a Tailwind source:

```css
@import "@heyo-sh/heyo-ui";
```

```tsx
import { Button, DataTable } from "@heyo-sh/heyo-ui";

<Button variant="primary">Deploy</Button>;
```

No `tailwind.config.js`, no `@source`, no provider, no `cn()` helper to copy.
If the application already imports Tailwind itself, take the tokens only:

```css
@import "tailwindcss";
@import "@heyo-sh/heyo-ui/theme.css";
```

Colour mode is one attribute, because every token resolves both modes through
`light-dark()`:

```html
<html data-mode="dark"></html>
```

Read the [package README](./packages/heyo-ui/README.md) for the complete
reference: every component, every prop worth knowing about, the token list, and
the granular entry points.

## Design rules

1. **Semantic tokens only.** Never a raw Tailwind colour inside a component:
   `bg-heyo-base`, not `bg-white dark:bg-neutral-900`.
2. **No `dark:` variants.** Tokens resolve both modes with `light-dark()`;
   `data-mode` on any ancestor switches them.
3. **Rings, not borders,** for control edges — a border would change the box.
   Edge colours are translucent so one value is correct on every surface.
4. **One focus ring:** the `heyo-focus` utility. Never hand-roll it.
5. **Dense first.** Default control height is 32px, default body text 14px.
   Hierarchy comes from weight and colour, not size.
6. **The sidebar is not a panel.** It shares the page background; a single
   hairline separates it. Same rule for any pane chrome.
7. **Every component forwards `className`** through `cn()` and sets a stable
   `data-slot`.
8. **No icon dependency.** Icon props accept a component, an element, or a node.
9. **Nothing locks the page unless it's a modal task.** `Dropdown` and `Select`
   default to `modal={false}`; only `Dialog` and `Sheet` lock scroll.
10. **One component per job.** One `Dialog`, one bar, one avatar radius. A
    second component that differs by a prop is a prop.

## Scrolling

Two tools, and they are not interchangeable. **`ScrollArea`** replaces the
browser's scrollbar with real elements — a 6px overlay thumb that appears while
you hover or scroll, plus an optional mask that fades content at whichever edge
still has more behind it. Use it for designed surfaces: panes, cards, log
views. **`heyo-scrollbar`** is a plain utility that styles the _native_
scrollbar instead: thin, translucent, no track, no buttons. No extra DOM, no JS,
and it survives a `<table>` wrapper, a dialog body, or the sidebar.

## Deliberate non-features

Several components are missing on purpose, and the reasoning is written down —
read this before proposing one:

- **No grammars.** `CodeBlock` highlights with one regex per language, which
  covers the snippets that appear in a UI for about a kilobyte. Pass Shiki's
  markup as `children` and the block renders it untouched.
- **No right-click menu, no bottom sheet, no split pane.** A context menu can
  never be the only route to an action; a drawer is a phone pattern; a resizable
  pane belongs to the application's layout, not to its widget library.
- **No date library.** `Calendar` needs "add a day" and locale names, and `Date`
  and `Intl.DateTimeFormat` do both correctly, including across DST.
- **No typed date input.** `DatePicker` opens a calendar rather than parsing
  text, because `3/4/25` is March for half the world and April for the other.
- **No virtualised table.** `DataTable` filters and sorts on the client because
  the 95% case is a page of a few hundred rows you already have. Every input is
  also controllable, so the same component works against a server.

## Repository

```
packages/heyo-ui          the published library
examples/playground       every component on one page, light + dark
```

```bash
bun install
bun run dev        # playground on http://localhost:5173
bun run quality    # lint + typecheck + build + verify + smoke
```

`bun run verify` packs the real tarball and installs it into a throwaway
project, asserting that the one-line setup still works. `bun run smoke`
server-renders the whole playground. Neither is a normal unit test, and both
catch the failures that break every consumer at once.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development and contribution
guidelines. User-facing changes need a changeset (`bun run changeset`);
releases are published only by CI, see [RELEASING.md](RELEASING.md).

For questions, see [SUPPORT.md](SUPPORT.md). For vulnerabilities, use the
private process in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
