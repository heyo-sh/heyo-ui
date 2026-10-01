"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";

export const badgeVariants = cva(
  "inline-flex w-max shrink-0 items-center gap-1 font-medium whitespace-nowrap select-none [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "bg-heyo-tint text-heyo-default",
        outline: "bg-transparent text-heyo-subtle ring-1 ring-heyo-line",
        brand: "bg-heyo-brand-tint text-heyo-brand",
        info: "bg-heyo-info-tint text-heyo-info",
        success: "bg-heyo-success-tint text-heyo-success",
        warning: "bg-heyo-warning-tint text-heyo-warning",
        danger: "bg-heyo-danger-tint text-heyo-danger",
        contrast: "bg-heyo-contrast text-heyo-inverse",
        /**
         * A count that belongs to the row it sits in rather than to the page:
         * sidebar item totals, tab counts, “3 selected”. The dashed edge says
         * “this is metadata” loudly enough that it never competes with a real
         * status chip two lines below.
         */
        // A border rather than a ring — the one place in the system where that
        // is right, because a ring is a box-shadow and a box-shadow cannot be
        // dashed. The heights are fixed and the box is border-box, so nothing
        // moves.
        count:
          "bg-transparent text-heyo-subtle border border-dashed border-heyo-line tabular-nums",
      },
      size: {
        sm: "h-4.5 rounded-sm px-1.5 text-[11px]",
        base: "h-5.5 rounded-md px-2 text-xs",
      },
      /** A leading dot turns the badge into a status pill. */
      dot: { true: "", false: "" },
    },
    defaultVariants: { variant: "neutral", size: "base", dot: false },
  },
);

export interface BadgeProps
  extends
    Omit<ComponentProps<"span">, "prefix">,
    VariantProps<typeof badgeVariants> {
  icon?: IconLike;
}

const dotColor: Record<string, string> = {
  neutral: "bg-heyo-neutral-400",
  outline: "bg-heyo-neutral-400",
  count: "bg-heyo-neutral-400",
  brand: "bg-heyo-brand",
  info: "bg-heyo-info",
  success: "bg-heyo-success",
  warning: "bg-heyo-warning",
  danger: "bg-heyo-danger",
  contrast: "bg-heyo-inverse",
};

export function Badge({
  className,
  variant,
  size,
  dot,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            dotColor[variant ?? "neutral"],
          )}
        />
      ) : null}
      {renderIcon(icon)}
      {children}
    </span>
  );
}
