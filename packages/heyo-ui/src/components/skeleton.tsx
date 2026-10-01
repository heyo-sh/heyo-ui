"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export interface SkeletonProps extends ComponentProps<"div"> {
  /** Render N stacked lines with a shortened last one, like real text. */
  lines?: number;
}

/**
 * A loading placeholder. Pulses rather than shimmers — cheaper to render and
 * far less distracting in a dense dashboard.
 */
export function Skeleton({ className, lines, ...props }: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div
        data-slot="skeleton-group"
        className="flex w-full flex-col gap-2"
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            data-slot="skeleton"
            className={cn(
              "h-3.5 animate-pulse rounded-sm bg-heyo-fill",
              index === lines - 1 ? "w-3/5" : "w-full",
              className,
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "h-3.5 w-full animate-pulse rounded-sm bg-heyo-fill",
        className,
      )}
      {...props}
    />
  );
}
