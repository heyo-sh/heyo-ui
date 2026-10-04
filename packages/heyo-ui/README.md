# @heyo-sh/heyo-ui

Flat, dense, developer-first React components. Built on [Base UI](https://base-ui.com)
and Tailwind CSS v4.

Design notes, so you know what you're getting:

- **Rings, not borders.** Edges are drawn with `ring-1`, so a variant change
  never shifts layout by a pixel.
- **Semantic tokens only.** `bg-heyo-base`, `text-heyo-subtle`,
  `ring-heyo-line`. Named by role, never by hue.
- **No `dark:` variants.** Every token resolves both modes via `light-dark()`.
  You flip one attribute and the whole tree follows.
- **Dense type scale.** 12 / 13 / 14 / 16px. Controls are 20 / 26 / 32 / 40px tall.
- **Shadows are almost invisible.** Depth comes from rings and surface
  hierarchy, not blur.

## Install

```sh
bun add @heyo-sh/heyo-ui       # npm / pnpm / yarn all fine
```

One line in your CSS. That's the whole setup:

```css
@import "@heyo-sh/heyo-ui";
```

```tsx
import { Button } from "@heyo-sh/heyo-ui";

<Button variant="primary">Deploy</Button>;
```

No `tailwind.config.js`. No `@source`. No provider to wrap your app in. No
`cn()` helper to copy. Nothing to paste into your repo.

The import above pulls in Tailwind for you. If your app already imports
Tailwind itself, take the tokens only:

```css
@import "tailwindcss";
@import "@heyo-sh/heyo-ui/theme.css";
```

Both entry points register the compiled components as a Tailwind source
internally — which matters because Tailwind skips `node_modules` when it
auto-detects content, and without it every heyo-ui class would be tree-shaken
away.

### Requirements

|              |                                                               |
| ------------ | ------------------------------------------------------------- |
| React        | 19                                                            |
| Tailwind CSS | 4.1+                                                          |
| Bundler      | anything with `exports` support (Vite, Next, Rspack, Parcel…) |

Base UI, `clsx`, `cva` and `tailwind-merge` are bundled as regular
dependencies — you never install or configure them.

Every module ships with a `"use client"` banner, so the components drop into
Next.js App Router / RSC without wrappers.

### Importing

```tsx
// Barrel — simplest, and tree-shakes fine in any modern bundler.
import { Button, Input, Sidebar } from "@heyo-sh/heyo-ui";

// Granular, if you'd rather be explicit.
import { Button } from "@heyo-sh/heyo-ui/components/button";
```

## Light and dark

Set `data-mode` anywhere — usually on `<html>`. Omit it to follow the OS.

```html
<html data-mode="dark"></html>
```

```tsx
document.documentElement.setAttribute("data-mode", "dark");
```

That's the entire theming API. Components never branch on mode.

## Components

|            |                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| Layout     | `Sidebar`, `Card`, `Separator`, `Table`, `Accordion`, `Collapsible`                                               |
| Forms      | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Toggle`, `ToggleGroup`, `Field`, `Label` |
| Actions    | `Button`, `ButtonGroup`, `Link`, `Dropdown`                                                                       |
| Feedback   | `Banner`, `Badge`, `Spinner`, `Skeleton`, `Progress`, `Meter`, `Empty`, `Toaster` + `toast()`                     |
| Overlays   | `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Command`                                                                |
| Navigation | `Tabs`, `Breadcrumb`, `Pagination`                                                                                |
| Content    | `Text`, `Heading`, `Code`, `Kbd`, `Avatar`                                                                        |

### Button

```tsx
import { Button } from "@heyo-sh/heyo-ui";

<Button variant="primary" icon={PlusIcon}>Create</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="ghost" shape="square" icon={GearIcon} aria-label="Settings" />
<Button variant="destructive" loading>Deleting</Button>
```

`variant`: `primary` · `secondary` (default) · `outline` · `ghost` ·
`destructive` · `destructive-secondary` · `link`

`primary` is the inverse of the page — black on light, white on dark. There is
no coloured accent anywhere in the system, which leaves hue free to mean exactly
one thing: status.
`size`: `xs` · `sm` · `base` (default) · `lg`
`shape`: `default` · `square` · `block`

`icon` / `iconEnd` accept a component (`icon={PlusIcon}`), an element
(`icon={<PlusIcon />}`), or any node — heyo-ui ships no icon dependency.

Use `render` to turn a button into a link while keeping the styling:

```tsx
<Button render={<a href="/docs" />}>Read the docs</Button>
```

### Input

Pass `label` and you get the whole accessible field — label, description,
error, `aria-describedby`, the lot:

```tsx
<Input
  label="Project name"
  placeholder="my-worker"
  description="Lowercase letters, numbers and dashes."
/>

<Input label="Email" error="Enter a valid email address." />

<Input
  label="Password"
  type="password"
  minLength={8}
  error={{ message: "At least 8 characters", match: "tooShort" }}
/>
```

Omit `label` for a bare control in a custom layout (supply `aria-label`):

```tsx
<Input icon={SearchIcon} placeholder="Search…" aria-label="Search" />
<Input prefix="https://" suffix=".heyo.sh" placeholder="acme" />
```

`Textarea` takes the same props plus `autoResize`.

### Sidebar

Composable, collapsible, keyboard-toggleable (`⌘B` / `Ctrl+B`), and it turns
into an overlay drawer below `768px` automatically.

```tsx
import { Sidebar } from "@heyo-sh/heyo-ui";

<Sidebar.Provider defaultOpen>
  <Sidebar>
    <Sidebar.Header>
      <Sidebar.Trigger />
    </Sidebar.Header>

    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={HomeIcon} active>
            Home
          </Sidebar.MenuButton>

          <Sidebar.MenuItem>
            <Sidebar.Collapsible defaultOpen>
              <Sidebar.CollapsibleTrigger
                render={
                  <Sidebar.MenuButton unwrapped icon={CubeIcon}>
                    Compute
                    <Sidebar.MenuChevron />
                  </Sidebar.MenuButton>
                }
              />
              <Sidebar.CollapsibleContent>
                <Sidebar.MenuSub>
                  <Sidebar.MenuSubButton>Workers</Sidebar.MenuSubButton>
                  <Sidebar.MenuSubButton>Pages</Sidebar.MenuSubButton>
                </Sidebar.MenuSub>
              </Sidebar.CollapsibleContent>
            </Sidebar.Collapsible>
          </Sidebar.MenuItem>

          <Sidebar.MenuButton icon={DatabaseIcon}>
            Storage
            <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge>
          </Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>

    <Sidebar.Rail />
  </Sidebar>

  <Sidebar.Inset>{children}</Sidebar.Inset>
</Sidebar.Provider>;
```

`MenuButton` and `MenuSubButton` wrap themselves in an `<li>`. Pass `unwrapped`
when you supply your own `Sidebar.MenuItem` (needed around `Collapsible`).

Router links work through `render`:

```tsx
<Sidebar.MenuButton icon={HomeIcon} render={<NavLink to="/" />}>
  Home
</Sidebar.MenuButton>
```

Read or drive the state from anywhere below the provider:

```tsx
const { open, setOpen, toggle, state, isMobile } = useSidebar();
```

Provider knobs: `defaultOpen`, `open` / `onOpenChange`, `width`, `widthIcon`,
`shortcut` (`"b"` by default, `false` to disable), `mobileBreakpoint`.
Sidebar knobs: `side` (`left` / `right`), `collapsible`
(`icon` / `offcanvas` / `none`).

### Sheet

A panel that slides in from an edge. Two shapes, because "a side quest to the
page" turns out to be two different jobs:

```tsx
// The wall: flush with the edge, scrim behind it, page locked.
<Sheet>
  <Sheet.Trigger render={<Button>Filters</Button>} />
  <Sheet.Content side="right" size="lg">
    <Sheet.Header>
      <Sheet.Title>Filters</Sheet.Title>
    </Sheet.Header>
    <Sheet.Body>…</Sheet.Body>
    <Sheet.Footer>
      <Sheet.Close render={<Button variant="ghost">Cancel</Button>} />
      <Button variant="primary">Apply</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet>

// The detail pane: floats off every edge, nothing dimmed, page still live.
<Sheet open={!!selected} onOpenChange={close} modal={false}>
  <Sheet.Content variant="inset" size="sm">
    <Sheet.Header actions={<Button variant="ghost" size="xs" icon={DotsIcon} />}>
      <Sheet.Title>{selected.filename}</Sheet.Title>
      <Sheet.Description>1200×800 · 26 KB</Sheet.Description>
    </Sheet.Header>
    <Sheet.Body>…</Sheet.Body>
  </Sheet.Content>
</Sheet>
```

`variant="inset"` drops the scrim by default and pairs with `modal={false}`:
the list behind stays clickable, so picking the next record is one press
rather than close-then-pick. That pairing is the whole reason library screens
kept hand-rolling a `Card` pinned to the right instead of reaching for this
component. `backdrop` overrides the default either way.

`Sheet.Header` takes an `actions` slot for controls that belong to the panel
rather than to its content — a status chip, an overflow menu — laid out on the
title's row, before the close button.

### The rest, briefly

```tsx
<Badge dot variant="success">Healthy</Badge>
<Banner variant="warning" title="Quota almost reached" onDismiss={fn}>…</Banner>

<Select defaultValue="fra" label="Region" description="Where the worker runs.">
  <Select.Trigger placeholder="Pick a region" />
  <Select.Content>
    <Select.Group>
      <Select.GroupLabel>Europe</Select.GroupLabel>
      <Select.Item value="fra">Frankfurt</Select.Item>
      <Select.Item value="waw">Warsaw</Select.Item>
    </Select.Group>
    <Select.Group>
      <Select.GroupLabel>North America</Select.GroupLabel>
      <Select.Item value="iad">Ashburn</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>

<Dropdown>
  <Dropdown.Trigger render={<Button iconEnd={ChevronDownIcon}>Actions</Button>} />
  <Dropdown.Content>
    <Dropdown.Item shortcut={<Kbd>R</Kbd>}>Rename</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item destructive>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>

<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="overview">…</Tabs.Panel>
</Tabs>
```

Groups rule themselves off and their labels stick while you scroll. The popup
caps at `18rem` (override with `maxHeight`) or the available space, whichever
is smaller, and scrolls past that.

`Select` takes the same field props as `Input` — `label`, `description`,
`error`, `optional`, `labelAside` — so a labelled select is one prop rather
than a hand-built `<label>` over a trigger, and the gap under the label is the
same 6px every other control uses. Omit them for the bare control.

`Tabs` takes three variants:

| `variant`        | Shape                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `line` (default) | Full-width rule, indicator sitting on it                                                    |
| `underline`      | Padded tabs that highlight on hover, indicator below a hairline                             |
| `segmented`      | Pill inside a recessed track — the selected pill _is_ the indicator, so no `Tabs.Indicator` |

`Tooltip` opens instantly and takes `side` (`top` / `right` / `bottom` / `left`),
`align` and `arrow`. No provider needed — add `Tooltip.Provider` only if you
want a shared delay.

### What floats over what

Three layers, and they are not negotiable per component:

| Layer    | Who                                                    |
| -------- | ------------------------------------------------------ |
| `z-50`   | `Dialog`, `Sheet`, `Command`                           |
| `z-[60]` | `Select`, `Dropdown`, `Popover`, `Combobox`, `Toaster` |
| `z-[70]` | `Tooltip`                                              |

The index sits on the **positioner**, not on the popup. A menu opened inside a
dialog is portalled into the dialog's own portal node and positioned with a
`transform`, which makes the positioner a stacking context — a `z-50` on the
popup inside it is then scoped to that context and loses to the dialog. That
is why a select used to open _underneath_ the dialog that owned it, and why a
tooltip could end up behind a menu. A toast clears the dialog it reports on,
and nothing covers a tooltip.

## Shorthands

Every list-shaped component takes an `items` prop, so the common case is one
line instead of a tree of subcomponents. Composition still works whenever you
need per-row markup — the two are interchangeable.

```tsx
<Tabs.List items={[{ value: "a", label: "Overview" }]} />

<Select.Content items={[
  { label: "Europe", items: [{ value: "fra", label: "Frankfurt" }] },
  { value: "iad", label: "Ashburn" },
]} />

<Dropdown.Content items={[
  { label: "Rename", onClick: rename },
  "separator",
  { label: "Delete", destructive: true, onClick: remove },
]} />

<Accordion items={[{ title: "Limits", children: "100 req/s" }]} />

<Breadcrumb items={[{ label: "Workers", href: "/workers" }, { label: "acme-api" }]} />
```

`Tabs.List` also renders its own moving indicator — you never place
`Tabs.Indicator` yourself unless you want it somewhere unusual.

## Toasts

Mount `<Toaster />` once. Everything else is a plain function call from
anywhere — no hook, no context, no provider in your component tree.

```tsx
toast.success("Deployed", { description: "acme-api is live" });
toast.error("Deploy failed", { timeout: 0 });

await toast.promise(deploy(), {
  loading: "Deploying…",
  success: "Deployed",
  error: "Deploy failed",
});
```

## Confirmations

There is no `ConfirmDialog`, because there is nothing for one to add: a
confirmation is a `Dialog` with two buttons in its footer, and the thing that
makes it feel solid is spelling out what will happen rather than importing a
different component.

```tsx
<Dialog open={open} onOpenChange={setOpen} dismissible={!busy}>
  <Dialog.Content size="sm">
    <Dialog.Header>
      <Dialog.Title>Delete acme-api?</Dialog.Title>
      <Dialog.Description>
        Three deployments and their logs go with it. This cannot be undone.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
      <Button variant="destructive" loading={busy} onClick={remove}>
        Delete forever
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

Keep the confirm button `loading` until the request settles and the dialog
open behind it — a slow delete that closes immediately looks like a no-op, and
the error has nowhere to land.

## Tokens

The dark ramp is flat on purpose and anchored on `#111` as the secondary
surface. **Page and sidebar share one value** — a sidebar lighter than the page
reads as a floating panel, which is exactly the busyness this design avoids.
Separation comes from a single hairline, never from a fill.

| Token                                                           | Light       | Dark        | Use                                               |
| --------------------------------------------------------------- | ----------- | ----------- | ------------------------------------------------- |
| `bg-heyo-canvas`                                                | `#fafafa`   | `#0a0a0a`   | Page background                                   |
| `bg-heyo-sidebar`                                               | —           | —           | Aliases `canvas`; override to detach the sidebar  |
| `bg-heyo-base`                                                  | `#ffffff`   | `#111111`   | Secondary surface — cards, dialogs, menus, tables |
| `bg-heyo-elevated`                                              | `#fafafa`   | `#161616`   | Card footers, table stripes                       |
| `bg-heyo-recessed`                                              | `#f4f4f5`   | `#0d0d0d`   | Wells, code blocks, segmented tracks              |
| `bg-heyo-tint`                                                  | translucent | translucent | Hover — correct over any surface                  |
| `bg-heyo-control` / `-hover`                                    | `#ffffff`   | `#161616`   | Filled controls                                   |
| `bg-heyo-contrast`                                              | `#18181b`   | `#fafafa`   | Inverted surfaces                                 |
| `ring-heyo-hairline`                                            | 8% black    | 7% white    | Flat seam between surfaces                        |
| `ring-heyo-line`                                                | 13% black   | 11% white   | Edge of something raised                          |
| `text-heyo-strong` / `-default` / `-subtle` / `-inactive`       |             |             | Text hierarchy                                    |
| `bg-heyo-brand` / `-hover` / `-tint`                            |             |             | Brand — one filled CTA per screen                 |
| `*-heyo-info` / `-success` / `-warning` / `-danger` (+ `-tint`) |             |             | Status                                            |

Edges are **translucent**, not solid grey. A solid line has to be re-picked for
every surface it might land on; a translucent one is correct on all of them.

Anything filled with `brand` must use `heyo-on-brand` on top, never a
hard-coded white — the accent is near-white in dark mode, so white-on-brand
disappears.

Status red comes in two flavours: `heyo-danger` is the bright indicator (dots,
icons, rings) and `heyo-danger-solid` is the fill that carries white text. The
bright dark-mode red that reads well as a status dot is too light for a button.

Detaching the sidebar, if you want the panel look after all:

```css
[data-mode="dark"] {
  --color-heyo-sidebar: #0d0d0d;
}
```

Utilities you may want directly:

| Utility              | What it does                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `heyo-focus`         | The standard focus ring. Never hand-roll it.                                                  |
| `heyo-placeholder`   | Placeholder colour on a field.                                                                |
| `inset-shadow-field` | The pressed-in fill on inputs.                                                                |
| `heyo-scrollbar`     | The native scrollbar, restyled — thin, translucent, no track. No extra DOM, no JS.            |
| `heyo-skeleton`      | The loading fill and its sweep. `--heyo-skeleton-delay` offsets it for a group.               |
| `heyo-fade-mask`     | Edge fades on both axes at once, via `--heyo-fade-x` / `--heyo-fade-y`. Used by `ScrollArea`. |

## Icons

heyo-ui ships **no icon dependency**. The two dozen glyphs the components need
internally — chevrons, check marks, the spinner — are inlined verbatim from
[Tabler Icons](https://tabler.io/icons) (24×24 grid, 2px stroke, round caps and
joins), so they sit flush with `@tabler/icons-react` if you use it for the rest:

```tsx
import { IconHome, IconPlus } from "@tabler/icons-react";

<Sidebar.MenuButton icon={IconHome}>Home</Sidebar.MenuButton>
<Button icon={IconPlus}>Create</Button>
```

Any icon library works — `icon` props accept a component, an element, or any
node. Everything that renders a row takes one: `Button`, `Badge`, `Input`,
`Toggle`, `Tabs`, `Dropdown`, `Command`, `Tree`, `Timeline`, `Stat`, `Empty`,
`CodeBlock`, `FileUpload`, `Sidebar.MenuButton` / `MenuSubButton`,
`Accordion.Trigger`, `Breadcrumb` crumbs and `Combobox` options.

## Weight and hierarchy

Hierarchy is carried by weight and colour, not size. Almost everything is 14px.

- **Medium** names a surface or a group: field labels, section labels, card
  titles, table headers.
- **Normal** is everything living inside one: button labels, nav items, table
  cells, body copy.

`text-heyo-default` is the thing being acted on. `text-heyo-subtle` is context —
hints, descriptions, idle nav items, placeholders.

## Overriding styles

Every component merges your `className` through `tailwind-merge`, so conflicts
resolve the way you expect:

```tsx
<Button className="rounded-full px-6">Pill</Button>
```

Components also expose stable `data-slot` attributes (`button`, `input`,
`sidebar-menu-button`, …) for global overrides and end-to-end tests.

## Scrolling

Two tools, and they are not interchangeable.

- **`ScrollArea`** replaces the browser's scrollbar with real elements: a 6px
  overlay thumb that appears while you hover or scroll and fades out after, plus
  an optional mask that fades content at whichever edge still has more behind
  it. Use it for designed surfaces — panes, cards, log views.
- **`heyo-scrollbar`**, a plain utility, styles the _native_ scrollbar instead:
  thin, translucent, no track, no buttons. No extra DOM, no JS, and it survives
  anything (a `<table>` wrapper, a dialog body, the sidebar). Every scrollable
  surface inside the library uses it.

## Design rules

These are the rules every component in the library follows. They are also what a
pull request is reviewed against.

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
   with `@tabler/icons-react`.
9. **Nothing locks the page unless it's a modal task.** `Dropdown` and `Select`
   default to `modal={false}` — unlike Base UI — because a menu is a list of
   things you might not do, and freezing the page behind one feels broken.
   `Dialog` and a flush `Sheet` lock scroll, because they demand an answer; an
   inset `Sheet` is a detail pane and does not.
10. **One component per job.** There is one `Dialog` (not dialog + alert dialog
    - confirm dialog), one bar (`Meter`, not meter + progress), one avatar
      radius. A second component that differs by a prop is a prop.
11. **An affordance is a promise.** A row only lights up on hover if there is
    something to click: `Table.Row` drops the tint, the leading marker and the
    pointer for `placeholder` rows _and_ for any row whose cell spans the
    table, which is what an empty state or a "load more" strip looks like.
    Conversely, a row with `onClick` is focusable and answers Enter — the
    whole row is the target, not the link somebody remembered to put in the
    first cell.

## Deliberate non-features

Several components are missing on purpose. Read this before proposing one —
three of them were built first and then removed.

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

## Licence

MIT
