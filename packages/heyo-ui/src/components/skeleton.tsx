"use client";

import type { ComponentProps, CSSProperties } from "react";
import { cn } from "../lib/cn";

export interface SkeletonProps extends ComponentProps<"div"> {
  /** Render N stacked lines with a shortened last one, like real text. */
  lines?: number;
  /**
   * Offsets the sweep, so a group of placeholders reads as one wave passing
   * through them rather than as bars moving in lockstep. `lines` does this for
   * you; set it by hand when you lay the blocks out yourself.
   */
  delay?: string;
}

/**
 * A loading placeholder.
 *
 * It sweeps rather than pulses. A pulse changes the opacity of the whole block,
 * so every placeholder on the page breathes in unison — on a dense dashboard
 * that is a dozen rectangles flashing at you at once. A single faint highlight
 * travelling across the block reads as "filling in", stays quiet in the corner
 * of your eye, and is composited on the GPU (`transform`), so a forty-row table
 * of them costs nothing. See the `heyo-skeleton` utility.
 */
export function Skeleton({
  className,
  lines,
  delay,
  style,
  ...props
}: SkeletonProps) {
  // A custom property, not `animationDelay`: the sweep lives on a pseudo-element
  // and `animation-delay` does not inherit, while custom properties do.
  const offset = (value: string): CSSProperties =>
    ({ "--heyo-skeleton-delay": value }) as CSSProperties;

  if (lines && lines > 1) {
    return (
      <div
        data-slot="skeleton-group"
        className="flex w-full flex-col gap-2"
        style={style}
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            data-slot="skeleton"
            className={cn(
              "h-3.5 rounded-sm heyo-skeleton",
              index === lines - 1 ? "w-3/5" : "w-full",
              className,
            )}
            style={offset(delay ?? `${index * 110}ms`)}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="skeleton"
      className={cn("h-3.5 w-full rounded-sm heyo-skeleton", className)}
      style={delay ? { ...offset(delay), ...style } : style}
      {...props}
    />
  );
}
