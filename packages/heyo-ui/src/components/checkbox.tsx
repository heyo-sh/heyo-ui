"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { CheckIcon, MinusIcon } from "../lib/icons";

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  /** Inline label rendered next to the box. */
  label?: ReactNode;
  /** Muted helper text under the label. */
  description?: ReactNode;
  /** Class for the outer `<label>` when a `label` or `description` is given. */
  wrapperClassName?: string;
}

/**
 * A checkbox. With a `label` it renders the whole clickable row; without one it
 * renders just the box (remember `aria-label`).
 */
export function Checkbox({
  className,
  wrapperClassName,
  label,
  description,
  disabled,
  ...props
}: CheckboxProps) {
  const box = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      disabled={disabled}
      className={cn(
        "peer flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm",
        "bg-heyo-control ring-1 ring-heyo-line",
        "transition-[background-color,box-shadow] duration-100 ease-heyo",
        "heyo-focus",
        "hover:not-data-[checked]:bg-heyo-tint",
        // text-heyo-inverse, not white: the accent is near-white in dark mode,
        // so a white tick would vanish.
        "data-[checked]:bg-heyo-brand data-[checked]:text-heyo-on-brand data-[checked]:ring-transparent",
        "data-[indeterminate]:bg-heyo-brand data-[indeterminate]:text-heyo-on-brand data-[indeterminate]:ring-transparent",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center data-[unchecked]:hidden"
        render={(indicatorProps, state) => (
          <span {...indicatorProps}>
            {state.indeterminate ? (
              <MinusIcon className="size-3" strokeWidth={2.25} />
            ) : (
              <CheckIcon className="size-3" strokeWidth={2.25} />
            )}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) return box;

  return (
    <label
      data-slot="checkbox-field"
      className={cn(
        "flex cursor-pointer items-start gap-2.5 select-none",
        disabled && "cursor-not-allowed opacity-60",
        wrapperClassName,
      )}
    >
      <span className="flex h-5 items-center">{box}</span>
      <span className="flex min-w-0 flex-col gap-0.5">
        {label ? (
          <span className="text-sm leading-5 font-medium text-heyo-default">
            {label}
          </span>
        ) : null}
        {description ? (
          <span className="text-xs leading-4 text-heyo-subtle">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
