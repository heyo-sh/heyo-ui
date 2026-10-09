---
"@heyo-sh/heyo-ui": patch
---

`Select.Content` opens pinned to the trigger's start edge instead of centred on
it, and takes an `align` prop for the other two.

Base UI centres a select popup by default, which ties its position to its
width — and a popup's width is not fixed. An option longer than the trigger
widens it, and so does the scrollbar on a list long enough to scroll, because
the gutter counts towards the shrink-to-fit width. Centred, each of those slid
the whole list sideways by half the change: the list jumped a few pixels the
moment it became scrollable. `Dropdown` already aligned to `start` and
`Combobox` takes the anchor's width outright, so this also makes the three
popups agree.
