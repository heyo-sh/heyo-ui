---
"@heyo-sh/heyo-ui": patch
---

Fix `Label` outside a `Field`. Base UI's `Field.Label` throws when there's no
`Field.Root` above it, so a standalone `<Label htmlFor="…">` — the case the
docstring promised — crashed. It now renders a plain `<label>` whenever an
explicit `htmlFor` is given, and keeps the field wiring otherwise.
