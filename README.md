<div align="center">
  <!-- Hero image: add ./public/heyo-ui-hero.webp and uncomment.
  <img src="./public/heyo-ui-hero.webp" alt="heyo-ui Logo"/>
  -->

  <p>
    <a href="https://npmjs.com/package/@heyo-sh/heyo-ui"><img src="https://img.shields.io/npm/dm/%40heyo-sh%2Fheyo-ui?style=flat&amp;colorA=000000&amp;colorB=000000" alt="npm downloads"/></a>
    <a href="https://www.npmjs.com/package/@heyo-sh/heyo-ui"><img src="https://img.shields.io/npm/v/%40heyo-sh%2Fheyo-ui.svg?style=flat&amp;colorA=000000&amp;colorB=000000" alt="npm version"/></a>
    <a href="https://github.com/heyo-sh/heyo-ui/stargazers"><img src="https://img.shields.io/github/stars/heyo-sh/heyo-ui?style=flat&amp;colorA=000000&amp;colorB=000000" alt="GitHub stars"/></a>
    <img src="https://img.shields.io/badge/54%2B%20components-000000?style=flat&amp;colorA=000000&amp;colorB=000000" alt="54+ components"/>
    <img src="https://img.shields.io/badge/Zero--config-000000?style=flat&amp;colorA=000000&amp;colorB=000000" alt="Zero-config"/>
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
internal tools. Built on Base UI and Tailwind CSS v4, with semantic tokens,
hairline rings, both colour modes from one set of classes, and no icon
dependency.

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

The package ships compiled JS, types and CSS, and works with pnpm, npm, Yarn and
Bun. It needs React 19 and Tailwind CSS 4.1+, and any bundler that understands
`exports` — Vite, Next.js, Rspack, Parcel.

For the component reference, the token list and the granular entry points, see
the [package README](./packages/heyo-ui/README.md).

## Minimum Configuration

One line in your CSS is the entire setup. It pulls in Tailwind, registers the
heyo tokens, and declares the compiled components as a Tailwind source:

```css
@import "@heyo-sh/heyo-ui";
```

```tsx
import { Button, DataTable } from "@heyo-sh/heyo-ui";

<Button variant="primary">Deploy</Button>;
```

No `tailwind.config.js`, no `@source`, no provider to wrap the app in, and no
`cn()` helper to copy. If the application already imports Tailwind itself, take
the tokens only — same result, without the duplicate Tailwind import:

```css
@import "tailwindcss";
@import "@heyo-sh/heyo-ui/theme.css";
```

Every component forwards `className` through `cn()` (clsx + tailwind-merge) and
sets a stable `data-slot`, so anything can be restyled or targeted from the
outside without a variant API.

## Light and dark

Colour mode is one attribute, anywhere in the tree. Every token resolves both
modes through `light-dark()`, so no component in the library carries a `dark:`
variant and nothing has to be re-themed twice:

```html
<html data-mode="dark"></html>
```

```ts
document.documentElement.setAttribute("data-mode", "dark");
```

Leave the attribute off and the tree follows the operating system. Set it on any
ancestor — a preview pane, a single card — and only that subtree flips.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development and contribution guidelines.

## License

[MIT](LICENSE)
