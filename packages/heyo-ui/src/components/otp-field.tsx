"use client";

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn } from "../lib/cn";
import { Field, type FieldOwnProps } from "./field";

/**
 * Square, and on the same 8px rhythm as every other control: `base` is the
 * 32px control height. A taller-than-wide slot reads as a text field that has
 * been squashed; a square one reads as a keycap, which is what it is.
 */
const slotSizes = {
  sm: "size-7 text-sm",
  base: "size-8 text-base",
  lg: "size-10 text-lg",
} as const;

export interface OtpFieldProps
  extends
    Omit<OTPFieldPrimitive.Root.Props, "render" | "length">,
    FieldOwnProps {
  /** How many boxes. @default 6 */
  length?: number;
  size?: keyof typeof slotSizes;
  /**
   * Insert a dash after this many slots — `3` gives `123-456`. It's cosmetic,
   * but it makes a six-digit code readable as two chunks instead of one blur.
   */
  groupAfter?: number;
  className?: string;
  fieldClassName?: string;
}

/**
 * A one-time code field: one box per character, paste-aware, with the caret
 * moving itself.
 *
 * ```tsx
 * <OtpField length={6} groupAfter={3} onValueComplete={verify} />
 * ```
 */
export function OtpField({
  className,
  fieldClassName,
  length = 6,
  size = "base",
  groupAfter,
  label,
  description,
  error,
  optional,
  labelAside,
  disabled,
  ...props
}: OtpFieldProps) {
  const hasField =
    label !== undefined || description !== undefined || error !== undefined;

  const control = (
    <OTPFieldPrimitive.Root
      data-slot="otp-field"
      length={length}
      disabled={disabled}
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {groupAfter && index > 0 && index % groupAfter === 0 ? (
            <span
              aria-hidden
              className="mx-0.5 h-px w-2 shrink-0 bg-heyo-line"
            />
          ) : null}
          {/* No `index`: Base UI derives it from the slot's position in the
              composite list, so the boxes stay in order however you map them. */}
          <OTPFieldPrimitive.Input
            className={cn(
              "shrink-0 rounded-md p-0 text-center font-mono tabular-nums",
              "bg-heyo-control text-heyo-default",
              "ring-1 ring-heyo-line inset-shadow-field",
              "transition-[box-shadow,background-color] duration-100 ease-heyo",
              "outline-none focus:ring-[1.5px] focus:ring-heyo-focus/45",
              // The filled box is the progress indicator — there's nothing else
              // on screen to say how far in you are.
              "data-[filled]:bg-heyo-elevated data-[filled]:ring-heyo-focus/25",
              "data-[invalid]:ring-heyo-danger",
              "disabled:cursor-not-allowed disabled:bg-heyo-recessed disabled:text-heyo-inactive",
              slotSizes[size],
            )}
          />
        </div>
      ))}
    </OTPFieldPrimitive.Root>
  );

  if (!hasField) return control;

  return (
    <Field
      className={fieldClassName}
      label={label}
      description={description}
      error={error}
      optional={optional}
      labelAside={labelAside}
      disabled={disabled}
    >
      {control}
    </Field>
  );
}
