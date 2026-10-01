import { cva } from "class-variance-authority";

/** The four control heights every form element in heyo-ui shares. */
export type ControlSize = "xs" | "sm" | "base" | "lg";

/**
 * Shared chrome for form controls, minus the focus treatment.
 *
 * The resting border is a 1px ring; focus thickens it to 1.5px and swaps the
 * colour instead of adding a second halo. One ring, two states — no layout
 * shift, no glow.
 */
export const controlChrome = [
  "w-full min-w-0 appearance-none border-0 bg-heyo-control text-heyo-default",
  // The inset shadow presses the field into the surface — the cue that it
  // accepts input, without needing a heavier border to say so.
  "ring-1 ring-heyo-line inset-shadow-field heyo-placeholder",
  "transition-[box-shadow,background-color,color] duration-100 ease-heyo",
  "outline-none focus:outline-none",
  "disabled:cursor-not-allowed disabled:bg-heyo-recessed disabled:text-heyo-inactive",
  "data-[invalid]:ring-heyo-danger",
];

/**
 * Focus ring for controls you *type* into. `:focus` is correct here — the
 * caret is in the field whether you arrived by click or by keyboard, and the
 * ring should say so either way.
 */
export const controlFocusRing = [
  "focus:ring-[1.5px] focus:ring-heyo-focus/45",
  "data-[invalid]:focus:ring-heyo-danger/60",
];

/**
 * Focus ring for controls you *press* — select triggers, combobox buttons.
 *
 * `:focus-visible`, not `:focus`. A trigger keeps DOM focus after its popup
 * closes, so a plain `:focus` ring leaves every select looking permanently
 * active once it has been used.
 */
export const controlFocusVisibleRing = [
  "focus-visible:ring-[1.5px] focus-visible:ring-heyo-focus/45",
  "data-[invalid]:focus-visible:ring-heyo-danger/60",
];

/** Chrome + typing focus. The default for Input and Textarea. */
export const controlBase = [...controlChrome, ...controlFocusRing];

/** Chrome + press focus. The default for Select-style triggers. */
export const controlTriggerBase = [
  ...controlChrome,
  ...controlFocusVisibleRing,
];

export const controlSizeVariants = cva("", {
  variants: {
    size: {
      xs: "h-5 gap-1 rounded-sm px-1.5 text-xs",
      sm: "h-6.5 gap-1 rounded-md px-2 text-xs",
      base: "h-8 gap-1.5 rounded-lg px-2.5 text-base",
      lg: "h-10 gap-2 rounded-lg px-3.5 text-base",
    },
  },
  defaultVariants: { size: "base" },
});

/** Icon sizing that keeps adornments optically balanced at every height. */
export const controlIconSize: Record<ControlSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  base: "size-4",
  lg: "size-4",
};
