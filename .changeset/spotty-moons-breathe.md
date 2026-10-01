---
"@heyo-sh/heyo-ui": minor
---

Calendar, Skeleton, ScrollArea and Table fixes.

- **`Calendar` is laid out on a fixed 2rem cell** instead of stretching to its
  container. Weekday headers now line up with the numbers under them, a selected
  range fills edge to edge rather than leaving a gap between every day, and with
  `months={2}` each heading sits over its own grid. Today's dot is centred
  explicitly, weekday abbreviations drop the locale's trailing punctuation
  (`pon.` → `po`), and the month grid is computed once per render instead of
  once per week row.
- **`Skeleton` sweeps instead of pulsing.** A page of pulsing rectangles all
  breathe at once; a single faint highlight travelling through one block reads
  as "filling in" and is far quieter. New `delay` prop (and the
  `--heyo-skeleton-delay` custom property) staggers a group — `lines` and
  `DataTable`'s loading rows do it for you. Respects
  `prefers-reduced-motion`.
- **`ScrollArea` no longer stretches its parent** when `orientation` includes
  the horizontal axis, and `fade` now works on that axis too. The two edge masks
  are composited, so `orientation="both"` fades all four edges instead of only
  the last axis declared.
- **`Table.Row` gained `placeholder`.** A row that is not a record — an empty
  state, a "load more" strip — gets no hover tint, no leading marker, no zebra
  stripe and no pointer. `DataTable` uses it for both empty states, which
  previously highlighted "Nothing here yet" as though it were clickable.
