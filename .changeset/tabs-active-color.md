---
"@heyo-sh/heyo-ui": patch
---

Fix `Tabs` active-tab styling. Base UI publishes the active tab as
`data-active`, not `data-selected`, so the selector never matched and the
active label stayed muted. The active tab now lifts to the same "primary" text
(`text-heyo-default`) you get on hover — across `line`, `underline` and
`segmented` — and the `underline` weight bump fires again.
