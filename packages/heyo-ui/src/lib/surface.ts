/**
 * Shared chrome for anything that floats above the page: select menus,
 * dropdowns, tooltips, dialogs. One definition keeps every overlay in the
 * system visually identical.
 */
export const popupSurface = [
  "z-50 min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-lg",
  "bg-heyo-base text-heyo-default shadow-lg ring-1 ring-heyo-line",
  "outline-none",
];

/** Enter/exit motion: a 4px rise and a hair of scale. Nothing bouncy. */
export const popupMotion = [
  "transition-[opacity,transform] duration-150 ease-heyo",
  "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
  "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
  "motion-reduce:transition-none",
];

/** A row inside a floating menu. */
export const popupItem = [
  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm",
  "text-heyo-default outline-none select-none",
  "data-[highlighted]:bg-heyo-tint data-[highlighted]:text-heyo-strong",
  "data-[disabled]:pointer-events-none data-[disabled]:text-heyo-inactive",
];
