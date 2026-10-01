"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  label?: ReactNode;
  description?: ReactNode;
  /** Put the control after the text — handy in settings rows. */
  align?: "start" | "end";
  wrapperClassName?: string;
}

/** A binary toggle. Use it for settings that apply immediately. */
export function Switch({
  className,
  wrapperClassName,
  label,
  description,
  align = "start",
  disabled,
  ...props
}: SwitchProps) {
  const toggle = (
    <SwitchPrimitive.Root
      data-slot="switch"
      disabled={disabled}
      className={cn(
        // Squared off rather than a pill: the same restrained radius the rest of
        // the system uses, so a switch in a settings row lines up with the
        // checkboxes and inputs around it instead of reading as a toy.
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-sm p-0.5",
        "bg-heyo-fill ring-1 ring-inset ring-heyo-line",
        "transition-colors duration-150 ease-heyo",
        "heyo-focus",
        "data-[checked]:bg-heyo-brand data-[checked]:ring-transparent",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "size-4 rounded-xs bg-heyo-on-brand shadow-xs",
          "transition-transform duration-150 ease-heyo",
          "data-[checked]:translate-x-4",
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (!label && !description) return toggle;

  return (
    <label
      data-slot="switch-field"
      className={cn(
        "flex cursor-pointer items-start gap-2.5 select-none",
        align === "end" && "w-full justify-between",
        disabled && "cursor-not-allowed opacity-60",
        wrapperClassName,
      )}
    >
      {align === "start" ? (
        <span className="flex h-5 items-center">{toggle}</span>
      ) : null}
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
      {align === "end" ? (
        <span className="flex h-5 items-center">{toggle}</span>
      ) : null}
    </label>
  );
}
