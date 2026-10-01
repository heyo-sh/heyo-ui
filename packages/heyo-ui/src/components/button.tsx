"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { SpinnerIcon } from "../lib/icons";

/**
 * Borders are rings, not borders: a ring never shifts layout, so buttons keep
 * their exact box size across variants and can sit flush inside groups.
 */
export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 select-none items-center justify-center",
    // Normal weight: a button label is content, not the name of a surface.
    "font-normal whitespace-nowrap",
    "cursor-pointer transition-[background-color,box-shadow,color,opacity] duration-100 ease-heyo",
    "heyo-focus",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "data-[loading]:cursor-progress",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // The inverse of the page: black on light, white on dark.
        primary:
          "bg-heyo-brand text-heyo-on-brand shadow-xs hover:bg-heyo-brand-hover",
        secondary:
          "bg-heyo-control text-heyo-default shadow-xs ring-1 ring-heyo-line hover:bg-heyo-control-hover",
        outline:
          "bg-transparent text-heyo-default ring-1 ring-heyo-line hover:bg-heyo-tint",
        ghost: "bg-transparent text-heyo-default hover:bg-heyo-tint",
        // Uses the -solid pair, not the indicator red: the bright dark-mode red
        // that reads well as a status dot is too light to carry white text.
        destructive:
          "bg-heyo-danger-solid text-white shadow-xs ring-1 ring-inset ring-black/10 hover:bg-heyo-danger-solid-hover",
        // Red appears only after intent, so the row-level trigger that opens a
        // confirm stays quiet until it matters.
        "destructive-secondary":
          "bg-heyo-control text-heyo-danger shadow-xs ring-1 ring-heyo-line hover:bg-heyo-danger-tint",
        link: "bg-transparent text-heyo-link underline-offset-2 hover:underline",
      },
      size: {
        xs: "h-5 gap-1 rounded-sm px-1.5 text-xs [&_svg]:size-3",
        sm: "h-6.5 gap-1 rounded-md px-2 text-xs [&_svg]:size-3.5",
        base: "h-8 gap-1.5 rounded-lg px-2.5 text-base [&_svg]:size-4",
        lg: "h-10 gap-2 rounded-lg px-4 text-base [&_svg]:size-4",
      },
      shape: {
        default: "w-max",
        square: "p-0",
        block: "w-full",
      },
    },
    compoundVariants: [
      { shape: "square", size: "xs", class: "size-5" },
      { shape: "square", size: "sm", class: "size-6.5" },
      { shape: "square", size: "base", class: "size-8" },
      { shape: "square", size: "lg", class: "size-10" },
      { variant: "link", size: "xs", class: "h-auto px-0" },
      { variant: "link", size: "sm", class: "h-auto px-0" },
      { variant: "link", size: "base", class: "h-auto px-0" },
      { variant: "link", size: "lg", class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "base",
      shape: "default",
    },
  },
);

export interface ButtonProps
  extends
    Omit<ButtonPrimitive.Props, "children">,
    VariantProps<typeof buttonVariants> {
  /** Icon rendered before the label (or as the only content for `shape="square"`). */
  icon?: IconLike;
  /** Icon rendered after the label. */
  iconEnd?: IconLike;
  /** Swaps the leading icon for a spinner and blocks interaction. */
  loading?: boolean;
  children?: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  shape,
  icon,
  iconEnd,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const leading = loading ? (
    <SpinnerIcon className="animate-heyo-spin" />
  ) : (
    renderIcon(icon)
  );

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant ?? "secondary"}
      data-loading={loading ? "" : undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    >
      {leading}
      {children}
      {renderIcon(iconEnd)}
    </ButtonPrimitive>
  );
}

/* -------------------------------------------------------------------------- */
/*                                ButtonGroup                                 */
/* -------------------------------------------------------------------------- */

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  /** Stack vertically instead of side by side. */
  orientation?: "horizontal" | "vertical";
}

/**
 * Welds buttons into a single control: shared edges collapse, only the outer
 * corners stay rounded, and the hovered/focused button floats above its
 * neighbours so its ring is never clipped.
 */
export function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "isolate inline-flex",
        orientation === "horizontal"
          ? [
              "flex-row",
              "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
              "[&>*:not(:first-child)]:-ml-px",
            ]
          : [
              "flex-col",
              "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
              "[&>*:not(:first-child)]:-mt-px",
            ],
        "[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10",
        className,
      )}
      {...props}
    />
  );
}
