---
"@heyo-sh/heyo-ui": patch
---

`DataTable` no longer draws an empty toolbar strip.

The strip appeared whenever `title` or `description` was set, even though
both render their own block above it — a captioned table with no search, no
`toolbar` and no column toggle got a 3.25rem bar with a hairline under it and
nothing inside. The strip is now brought into existence by the controls that
live in it: `searchable`, `toolbar`, the column toggle, and `selectable` with
`bulkActions` (the selection bar replaces the strip's contents, so a
selectable table still needs one).
