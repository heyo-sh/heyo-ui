"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";
import { cn } from "../lib/cn";

export const textVariants = cva("m-0", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    tone: {
      default: "text-heyo-default",
      strong: "text-heyo-strong",
      subtle: "text-heyo-subtle",
      inactive: "text-heyo-inactive",
      inverse: "text-heyo-inverse",
      brand: "text-heyo-brand",
      success: "text-heyo-success",
      warning: "text-heyo-warning",
      danger: "text-heyo-danger",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    mono: { true: "font-mono", false: "" },
    truncate: { true: "min-w-0 truncate", false: "" },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
    weight: "normal",
    mono: false,
    truncate: false,
  },
});

export interface TextProps
  extends
    Omit<ComponentProps<"p">, "color">,
    VariantProps<typeof textVariants> {
  /** Render as a different element: `as="span"`, `as="label"`, … */
  as?: ElementType;
}

/** The typographic workhorse. Every size/tone pair in the system, one prop each. */
export function Text({
  as: Component = "p",
  className,
  size,
  tone,
  weight,
  mono,
  truncate,
  ...props
}: TextProps) {
  return (
    <Component
      data-slot="text"
      className={cn(
        textVariants({ size, tone, weight, mono, truncate }),
        className,
      )}
      {...props}
    />
  );
}

const headingSizes = {
  1: "text-2xl font-semibold tracking-tight",
  2: "text-xl font-semibold tracking-tight",
  3: "text-lg font-medium",
  4: "text-base font-medium",
  5: "text-sm font-medium",
  6: "text-xs font-medium tracking-wide uppercase",
} as const;

export interface HeadingProps extends ComponentProps<"h2"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Component = `h${level}` as ElementType;
  return (
    <Component
      data-slot="heading"
      className={cn("m-0 text-heyo-strong", headingSizes[level], className)}
      {...props}
    />
  );
}

/** Inline code. Pairs with `Kbd` for shortcut documentation. */
export function Code({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      data-slot="code"
      className={cn(
        "rounded-sm bg-heyo-recessed px-1 py-0.5 font-mono text-[0.9em] text-heyo-default",
        "ring-1 ring-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}
