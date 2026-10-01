"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  controlChrome,
  controlSizeVariants,
  type ControlSize,
} from "../lib/control";
import { ChevronDownIcon, ChevronUpIcon, GripVerticalIcon } from "../lib/icons";
import { Field, type FieldOwnProps } from "./field";

export interface NumberFieldProps
  extends Omit<NumberFieldPrimitive.Root.Props, "render">, FieldOwnProps {
  size?: ControlSize;
  placeholder?: string;
  /** Flush addon on the right edge — `req/s`, `GB`, `%`. */
  suffix?: ReactNode;
  /**
   * Adds a grip on the left edge that you drag sideways to sweep the value.
   * The only comfortable way to dial a number in while watching something else
   * update, and it costs one 20px handle.
   * @default false
   */
  scrubbable?: boolean;
  className?: string;
  fieldClassName?: string;
  "aria-label"?: string;
}

/**
 * A numeric input with a stepper.
 *
 * Use it wherever a `<input type="number">` would go and you care about the
 * result: it formats with `Intl.NumberFormat`, clamps to `min`/`max`, steps
 * with ↑/↓ (×10 with Shift, ÷10 with Alt) and never lets a stray scroll
 * silently change the value unless you ask for `allowWheelScrub`.
 */
export function NumberField({
  className,
  fieldClassName,
  size = "base",
  placeholder,
  suffix,
  scrubbable,
  label,
  description,
  error,
  optional,
  labelAside,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: NumberFieldProps) {
  const hasField =
    label !== undefined || description !== undefined || error !== undefined;

  const control = (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      disabled={disabled}
      {...props}
    >
      <NumberFieldPrimitive.Group
        className={cn(
          controlChrome,
          controlSizeVariants({ size }),
          "flex items-stretch overflow-hidden p-0",
          "focus-within:ring-[1.5px] focus-within:ring-heyo-focus/45",
          "data-disabled:bg-heyo-recessed data-disabled:text-heyo-inactive",
          className,
        )}
      >
        {scrubbable ? (
          <NumberFieldPrimitive.ScrubArea
            className={cn(
              "flex shrink-0 cursor-ew-resize items-center border-r border-heyo-hairline",
              "bg-heyo-recessed px-1 text-heyo-subtle select-none",
              "transition-colors hover:text-heyo-default",
            )}
          >
            <GripVerticalIcon aria-hidden className="size-3.5" />
            <NumberFieldPrimitive.ScrubAreaCursor />
          </NumberFieldPrimitive.ScrubArea>
        ) : null}

        <NumberFieldPrimitive.Input
          aria-label={ariaLabel}
          placeholder={placeholder}
          className={cn(
            "h-full w-full min-w-0 border-0 bg-transparent px-2.5 text-inherit tabular-nums",
            "outline-none heyo-placeholder disabled:cursor-not-allowed",
          )}
        />

        {suffix ? (
          <span className="flex shrink-0 items-center border-l border-heyo-hairline bg-heyo-recessed px-2 text-xs text-heyo-subtle">
            {suffix}
          </span>
        ) : null}

        {/* Stacked, not side by side: two 16px halves of one control keep the
            field the same height as every other control in the system. */}
        <div className="flex shrink-0 flex-col border-l border-heyo-hairline">
          <NumberFieldPrimitive.Increment
            aria-label="Increase"
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center px-1.5",
              "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
              "border-b border-heyo-hairline",
              "data-disabled:cursor-not-allowed data-disabled:text-heyo-inactive data-disabled:hover:bg-transparent",
            )}
          >
            <ChevronUpIcon className="size-3" />
          </NumberFieldPrimitive.Increment>
          <NumberFieldPrimitive.Decrement
            aria-label="Decrease"
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center px-1.5",
              "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
              "data-disabled:cursor-not-allowed data-disabled:text-heyo-inactive data-disabled:hover:bg-transparent",
            )}
          >
            <ChevronDownIcon className="size-3" />
          </NumberFieldPrimitive.Decrement>
        </div>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
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
