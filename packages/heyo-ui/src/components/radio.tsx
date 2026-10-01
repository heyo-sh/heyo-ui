"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface RadioGroupProps extends RadioGroupPrimitive.Props {
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
        className,
      )}
      {...props}
    />
  );
}

export interface RadioProps extends RadioPrimitive.Root.Props {
  label?: ReactNode;
  description?: ReactNode;
  wrapperClassName?: string;
}

export function Radio({
  className,
  wrapperClassName,
  label,
  description,
  disabled,
  ...props
}: RadioProps) {
  const dot = (
    <RadioPrimitive.Root
      data-slot="radio"
      disabled={disabled}
      className={cn(
        "flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full",
        "bg-heyo-control ring-1 ring-heyo-line",
        "transition-[background-color,box-shadow] duration-100 ease-heyo",
        "heyo-focus",
        "hover:not-data-[checked]:bg-heyo-tint",
        "data-[checked]:bg-heyo-brand data-[checked]:ring-transparent",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="size-1.5 rounded-full bg-heyo-on-brand data-[unchecked]:hidden" />
    </RadioPrimitive.Root>
  );

  if (!label && !description) return dot;

  return (
    <label
      data-slot="radio-field"
      className={cn(
        "flex cursor-pointer items-start gap-2.5 select-none",
        disabled && "cursor-not-allowed opacity-60",
        wrapperClassName,
      )}
    >
      <span className="flex h-5 items-center">{dot}</span>
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
