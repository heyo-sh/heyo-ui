import { cn } from "./cn";

/**
 * The three layers everything that floats belongs to.
 *
 * A popup opened from inside a dialog is portalled into the *dialog's* portal
 * node, and its positioner is `transform`ed into place — which makes the
 * positioner a stacking context, so a `z-50` on the popup inside it is scoped
 * to that context and loses to the dialog's own `z-50`. That is why a select
 * used to open underneath the dialog that owns it.
 *
 * So the z-index goes on the **positioner**, and the layers are ordered by
 * how transient the thing is:
 *
 * - `zOverlay` — dialogs, sheets, the command palette, toasts. The surfaces
 *   you interact with.
 * - `zPopup` — menus anchored to a trigger: select, dropdown, popover,
 *   combobox. Always over the surface that opened them.
 * - `zTooltip` — a hint about whatever is on top. Nothing covers it.
 */
export const zOverlay = "z-50";
export const zPopup = "z-[60]";
export const zTooltip = "z-[70]";

/**
 * Puts a layer on a Base UI positioner without throwing away the `className`
 * the caller passed it — which may be a function of the positioner's state.
 */
export function withLayer<State>(
  layer: string,
  className: string | ((state: State) => string | undefined) | undefined,
): string | ((state: State) => string) {
  if (typeof className === "function") {
    return (state: State) => cn(layer, className(state));
  }
  return cn(layer, className);
}

/**
 * Shared chrome for anything that floats above the page: select menus,
 * dropdowns, tooltips, dialogs. One definition keeps every overlay in the
 * system visually identical.
 *
 * The layer lives on the positioner (`zPopup`), not here: see above.
 */
export const popupSurface = [
  "min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-lg",
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
