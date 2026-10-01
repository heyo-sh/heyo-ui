## Summary

Describe the user-visible change and link the issue it resolves.

## Validation

- [ ] `bun run lint`
- [ ] `bun run typecheck`
- [ ] `bun run build`
- [ ] `bun run verify` (packs the tarball and installs it into a throwaway project)
- [ ] `bun run smoke` (server-renders the whole playground)
- [ ] I added the component or prop to the playground, in both colour modes.
- [ ] Screenshots are attached for anything visual, light and dark.

## Design rules

- [ ] Semantic tokens only — no raw Tailwind colours, no `dark:` variants.
- [ ] Control edges are rings, focus is the `heyo-focus` utility.
- [ ] The component forwards `className` through `cn()` and sets a stable `data-slot`.
- [ ] New entry points are exported from `src/index.ts` **and** added to `build:js`.

## Compatibility

- [ ] This is backwards compatible.
- [ ] This intentionally changes or removes public API, markup, or default visuals, and is described above.
- [ ] A changeset is included for user-facing changes (`bun run changeset`).
