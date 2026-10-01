"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";

export const toggleVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5",
    "font-normal whitespace-nowrap select-none",
    "text-heyo-subtle transition-[background-color,color,box-shadow] duration-100 ease-heyo",
    "heyo-focus hover:text-heyo-default",
    "data-[pressed]:text-heyo-strong",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Transparent until pressed. For toolbars. */
        ghost: "bg-transparent hover:bg-heyo-tint data-[pressed]:bg-heyo-tint",
        /** Always outlined, fills when pressed. */
        outline: [
          "bg-transparent ring-1 ring-heyo-line hover:bg-heyo-tint",
          "data-[pressed]:bg-heyo-contrast data-[pressed]:text-heyo-inverse data-[pressed]:ring-transparent",
        ],
      },
      size: {
        xs: "h-5 rounded-sm px-1.5 text-xs [&_svg]:size-3",
        sm: "h-6.5 rounded-md px-2 text-xs [&_svg]:size-3.5",
        base: "h-8 rounded-lg px-2.5 text-base [&_svg]:size-4",
      },
      square: { true: "px-0", false: "" },
    },
    compoundVariants: [
      { square: true, size: "xs", class: "size-5" },
      { square: true, size: "sm", class: "size-6.5" },
      { square: true, size: "base", class: "size-8" },
    ],
    defaultVariants: { variant: "ghost", size: "base", square: false },
  },
);

export interface ToggleProps
  extends
    Omit<TogglePrimitive.Props, "children">,
    VariantProps<typeof toggleVariants> {
  icon?: IconLike;
  children?: ReactNode;
}

/** A button that stays pressed. Bold in an editor, a filter chip, a view mode. */
export function Toggle({
  className,
  variant,
  size,
  square,
  icon,
  children,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(
        toggleVariants({ variant, size, square: square ?? !children }),
        className,
      )}
      {...props}
    >
      {renderIcon(icon)}
      {children}
    </TogglePrimitive>
  );
}

export interface ToggleGroupProps extends ToggleGroupPrimitive.Props {
  /** Weld the buttons into one control, like `ButtonGroup`. */
  attached?: boolean;
  /**
   * Give every toggle the width of the widest one. On by default for
   * `vertical`, where ragged right edges look like a mistake rather than a
   * choice; off for `horizontal`, where labels of different lengths are normal.
   */
  equal?: boolean;
}

/**
 * A set of toggles. Single-choice by default; pass `multiple` for checkboxes.
 *
 * ```tsx
 * <ToggleGroup defaultValue={["grid"]} attached>
 *   <Toggle value="grid" variant="outline" icon={IconGrid} aria-label="Grid" />
 *   <Toggle value="list" variant="outline" icon={IconList} aria-label="List" />
 * </ToggleGroup>
 * ```
 */
export function ToggleGroup({
  className,
  attached,
  equal,
  orientation = "horizontal",
  ...props
}: ToggleGroupProps) {
  const vertical = orientation === "vertical";
  const stretch = equal ?? vertical;

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-orientation={orientation}
      className={cn(
        "isolate inline-flex",
        vertical ? "flex-col" : "flex-row",
        // The frame belongs to the *group*, not to each toggle.
        //
        // Rings are box-shadows drawn outside the border box, so two adjacent
        // ringed buttons pulled together by -1px don't collapse into one line —
        // they leave a 2px seam with a sliver of background trapped inside it.
        // One ring around the whole control plus hairline dividers is both
        // correct and a rule less to get wrong.
        attached
          ? [
              "overflow-hidden rounded-lg ring-1 ring-heyo-line",
              "[&>*]:rounded-none [&>*]:ring-0",
              vertical
                ? "[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-heyo-line"
                : "[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-heyo-line",
              // The focus ring has to sit above the neighbour that would clip it.
              "[&>*]:relative [&>*:focus-visible]:z-10",
            ]
          : "gap-1",
        // Vertically the cross axis *is* the width, so `items-stretch` does it
        // — and it leaves a square icon toggle alone, because an explicit size
        // wins over stretch. Horizontally the cross axis is height (already
        // equal), so matching widths needs `flex-1`.
        stretch && (vertical ? "items-stretch" : "[&>*]:flex-1"),
        className,
      )}
      {...props}
    />
  );
}

Toggle.Group = ToggleGroup;
