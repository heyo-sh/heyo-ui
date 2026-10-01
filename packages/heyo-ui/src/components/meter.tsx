"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger";

const toneFill: Record<Tone, string> = {
  neutral: "bg-heyo-subtle",
  brand: "bg-heyo-brand",
  success: "bg-heyo-success",
  warning: "bg-heyo-warning",
  danger: "bg-heyo-danger",
};

const trackSize = {
  sm: "h-1",
  base: "h-1.5",
  lg: "h-2.5",
} as const;

export interface MeterProps extends MeterPrimitive.Root.Props {
  label?: ReactNode;
  /** Show the value on the right of the label row. */
  showValue?: boolean;
  size?: keyof typeof trackSize;
  tone?: Tone;
}

/**
 * A measurement inside a known range — quota, disk, capacity, budget.
 *
 * There is deliberately no `Progress`: a task with a percentage is still just
 * a measurement, and one bar that always means the same thing beats two that
 * look identical.
 */
export function Meter({
  className,
  label,
  showValue,
  size = "base",
  tone = "neutral",
  ...props
}: MeterProps) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
      {...props}
    >
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-2">
          {label ? (
            <MeterPrimitive.Label className="text-sm font-medium text-heyo-default">
              {label}
            </MeterPrimitive.Label>
          ) : (
            <span />
          )}
          {showValue ? (
            <MeterPrimitive.Value className="text-xs tabular-nums text-heyo-subtle" />
          ) : null}
        </div>
      ) : null}

      <MeterPrimitive.Track
        className={cn(
          "w-full overflow-hidden rounded-full bg-heyo-fill",
          trackSize[size],
        )}
      >
        <MeterPrimitive.Indicator
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-heyo",
            toneFill[tone],
          )}
        />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}
