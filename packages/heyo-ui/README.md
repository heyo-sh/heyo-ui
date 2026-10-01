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
| Overlays   | `Dialog`, `AlertDialog`, `ConfirmDialog`, `Popover`, `Tooltip`                                                    |
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

### The rest, briefly

```tsx
<Badge dot variant="success">Healthy</Badge>
<Banner variant="warning" title="Quota almost reached" onDismiss={fn}>…</Banner>

<Select defaultValue="fra">
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

`Tabs` takes three variants:

| `variant`        | Shape                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `line` (default) | Full-width rule, indicator sitting on it                                                    |
| `underline`      | Padded tabs that highlight on hover, indicator below a hairline                             |
| `segmented`      | Pill inside a recessed track — the selected pill _is_ the indicator, so no `Tabs.Indicator` |

`Tooltip` opens instantly and takes `side` (`top` / `right` / `bottom` / `left`),
`align` and `arrow`. No provider needed — add `Tooltip.Provider` only if you
want a shared delay.

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

```tsx
<ConfirmDialog
  destructive
  title="Delete acme-api?"
  description="This cannot be undone."
  confirmLabel="Delete forever"
  onResolve={async (ok) => ok && (await remove())}
  trigger={<Button variant="destructive-secondary">Delete</Button>}
/>
```

`onResolve` may return a promise — the confirm button spins and the dialog
stays up until it settles, so a slow delete never looks like a no-op.

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

Three utilities you may want directly: `heyo-focus` (the standard focus ring),
`heyo-placeholder`, and `inset-shadow-field` (the pressed-in fill on inputs).

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

## Licence

MIT
