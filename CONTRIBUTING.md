# Contributing to heyo-ui

Thanks for helping improve heyo-ui. Contributions can cover the component
library, the playground, documentation, or the build and release tooling.

## Before opening an issue

Search existing issues and discussions first. Use an issue for a reproducible
bug or a scoped proposal; use GitHub Discussions for questions and early ideas.
Security vulnerabilities must be reported privately as described in
[SECURITY.md](SECURITY.md).

Before proposing a component, read the design rules and the **deliberate
non-features** in the [README](README.md). Several components are missing on
purpose, and the reasoning is written down — a context menu, a bottom sheet and
a split pane were all removed after being built.

## Local setup

heyo-ui is a Bun workspace. Use the version declared in `package.json`.

```bash
bun install --frozen-lockfile
bun run dev        # playground on http://localhost:5173, against the library source
```

The workspace contains:

- `packages/heyo-ui` — the published library.
- `examples/playground` — every component on one page, in both colour modes.

## Checks

```bash
bun run lint
bun run typecheck
bun run build
bun run verify     # packs the tarball and installs it into a throwaway project
bun run smoke      # server-renders the whole playground
bun run quality    # all of the above, in order
```

Two of those are not ordinary unit tests and are worth understanding:

- **`verify`** packs exactly what npm would publish, installs it into a project
  outside this repository, and asserts that `@import "@heyo-sh/heyo-ui";` alone
  emits the component classes and that the `exports` map resolves for both
  barrel and granular imports. A broken `exports` map or a missing `@source` is
  invisible to a unit test and breaks every consumer.
- **`smoke`** renders the playground through `react-dom/server`, which catches
  broken Base UI composition without a browser, and asserts that every entry in
  the section registry rendered its anchor.

Both run in CI on every pull request.

## Adding or changing a component

1. Create `packages/heyo-ui/src/components/<name>.tsx`, starting with
   `"use client"`.
2. Reach for Base UI when there is behaviour or accessibility involved; plain
   elements when there is not.
3. Pull shared chrome from `lib/control.ts` (form controls) or `lib/surface.ts`
   (anything floating), so every overlay and every field stay identical.
4. Export it from `src/index.ts` **and** add the entry point to `build:js` in
   `packages/heyo-ui/package.json`, or it is not granularly importable.
5. Add a section to the playground — `examples/playground/src/sections/<name>.tsx`
   exporting `<Name>Section`, registered in `sections/index.tsx` — with one
   example per prop worth seeing.

Follow the design rules in the README. The short version: semantic tokens only,
no `dark:` variants, rings rather than borders, one focus ring, dense by
default, `className` forwarded through `cn()`, a stable `data-slot`, and no icon
dependency.

## Pull requests

1. Start from an up-to-date `main` branch and keep the pull request focused.
2. Explain the user-facing effect, link the related issue, and attach
   screenshots in both colour modes for anything visual.
3. Run every check above. CI runs the same ones and must pass.
4. Update the README when a design rule, a non-feature, or the component list
   changes.

For a user-facing change, run `bun run changeset`, pick the smallest correct
semver bump, and commit the generated file from `.changeset/`. Do not add a
changeset for documentation, CI, or tooling-only changes.

Markup, class names and `data-slot` values are part of the public surface:
applications style against them. Treat a change to them as a breaking change and
say so in the pull request.

Avoid committing `dist`, build output, dependency directories, secrets, or local
environment files. The package build recreates every published asset.

## Contribution license

By submitting a contribution, you confirm that you have the right to submit it
and license your contribution under this repository's [MIT License](LICENSE).
