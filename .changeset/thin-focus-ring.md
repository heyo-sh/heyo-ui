---
"@heyo-sh/heyo-ui": patch
---

Thin the focus ring. `heyo-focus` was a 2px outline at a 1px offset, which read
as a heavier border rather than as focus — every other edge in the system is a
hairline. It is now a 1px outline at a 2px offset: the contrast still carries it
(the ring colour is the inverse of the page) and the gap keeps it clear of the
control's own ring instead of thickening it. `Table`'s sort headers and
`FileUpload`'s drop zone, which drew their outlines inline, match again.
