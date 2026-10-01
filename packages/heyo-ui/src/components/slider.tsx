"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SliderProps extends SliderPrimitive.Root.Props {
  label?: ReactNode;
  /** Show the current value on the right of the label row. */
  showValue?: boolean;
  /** Muted helper text under the control. */
  description?: ReactNode;
}

/**
 * A value picker. Pass an array to `value`/`defaultValue` for a range — the
 * extra thumbs are rendered for you.
 *
 * ```tsx
 * <Slider label="Memory" defaultValue={128} min={64} max={512} step={64} showValue />
 * <Slider label="Price" defaultValue={[20, 80]} showValue />
 * ```
 */
export function Slider({
  className,
  label,
  showValue,
  description,
  defaultValue,
  value,
  ...props
}: SliderProps) {
  const current = value ?? defaultValue;
  const thumbCount = Array.isArray(current) ? current.length : 1;

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      className={cn("flex w-full min-w-0 flex-col gap-2", className)}
      {...props}
    >
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-2">
          {label ? (
            <SliderPrimitive.Label className="text-sm font-medium text-heyo-default">
              {label}
            </SliderPrimitive.Label>
          ) : (
            <span />
          )}
          {showValue ? (
            <SliderPrimitive.Value className="text-xs tabular-nums text-heyo-subtle" />
          ) : null}
        </div>
      ) : null}

      <SliderPrimitive.Control className="flex h-4 w-full touch-none items-center select-none">
        <SliderPrimitive.Track className="h-1.5 w-full rounded-full bg-heyo-fill">
          <SliderPrimitive.Indicator className="h-full rounded-full bg-heyo-brand" />
          {Array.from({ length: thumbCount }, (_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className={cn(
                "size-4 rounded-full bg-heyo-control shadow-sm ring-1 ring-heyo-line",
                "cursor-grab transition-[box-shadow] active:cursor-grabbing",
                "heyo-focus",
                "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
              )}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>

      {description ? (
        <p className="m-0 text-xs text-heyo-subtle">{description}</p>
      ) : null}
    </SliderPrimitive.Root>
  );
}
