"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { SpinnerIcon } from "../lib/icons";

const sizes = {
  xs: "size-3",
  sm: "size-3.5",
  base: "size-4",
  lg: "size-5",
  xl: "size-6",
} as const;

export interface SpinnerProps extends ComponentProps<"span"> {
  size?: keyof typeof sizes;
  /** Visually hidden text announced to screen readers. */
  label?: string;
}

/** An indeterminate loading indicator. */
export function Spinner({
  className,
  size = "base",
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      data-slot="spinner"
      className={cn("inline-flex text-heyo-subtle", className)}
      {...props}
    >
      <SpinnerIcon className={cn("animate-heyo-spin", sizes[size])} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
