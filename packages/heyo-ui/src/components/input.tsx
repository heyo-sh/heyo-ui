"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import type { ComponentProps, ReactNode, Ref } from "react";
import { cn } from "../lib/cn";
import {
  controlBase,
  controlIconSize,
  controlSizeVariants,
  type ControlSize,
} from "../lib/control";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { Field, type FieldOwnProps } from "./field";

const innerPadding: Record<ControlSize, string> = {
  xs: "px-1.5 gap-1",
  sm: "px-2 gap-1",
  base: "px-2.5 gap-1.5",
  lg: "px-3.5 gap-2",
};

export interface InputProps
  extends Omit<ComponentProps<"input">, "size" | "prefix">, FieldOwnProps {
  size?: ControlSize;
  /** Icon rendered inside the control, before the text. */
  icon?: IconLike;
  /** Icon rendered inside the control, after the text. */
  iconEnd?: IconLike;
  /** Flush addon on the left edge, e.g. `https://`. */
  prefix?: ReactNode;
  /** Flush addon on the right edge, e.g. `.heyo.sh`. */
  suffix?: ReactNode;
  /** Class for the outer field wrapper (only when a label/description/error is used). */
  fieldClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

/**
 * A text input.
 *
 * Pass `label` (or `description` / `error`) and you get the full field layout
 * with accessible wiring for free. Omit them and you get a bare control for
 * custom layouts — supply `aria-label` in that case.
 */
export function Input({
  className,
  fieldClassName,
  size = "base",
  icon,
  iconEnd,
  prefix,
  suffix,
  label,
  description,
  error,
  optional,
  labelAside,
  disabled,
  ref,
  ...props
}: InputProps) {
  const hasField =
    label !== undefined || description !== undefined || error !== undefined;
  const hasAdornment = Boolean(icon || iconEnd || prefix || suffix);
  const iconClass = controlIconSize[size];

  // Bare control: it owns the chrome itself.
  const plainClass = cn(
    controlBase,
    controlSizeVariants({ size }),
    "focus-visible:outline-none",
    className,
  );

  // Adorned control: the wrapper owns the chrome, the input is invisible glass.
  const glassClass =
    "h-full w-full min-w-0 border-0 bg-transparent p-0 text-inherit outline-none heyo-placeholder disabled:cursor-not-allowed";

  const controlClass = hasAdornment ? glassClass : plainClass;

  const control = hasField ? (
    <FieldPrimitive.Control
      data-slot="input"
      className={controlClass}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  ) : (
    <input
      data-slot="input"
      className={controlClass}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );

  const body = hasAdornment ? (
    <div
      data-slot="input-wrapper"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        controlBase,
        controlSizeVariants({ size }),
        "flex items-stretch overflow-hidden p-0",
        "focus-within:ring-[1.5px] focus-within:ring-heyo-focus/45",
        "has-[[data-invalid]]:ring-heyo-danger has-[[data-invalid]]:focus-within:ring-heyo-danger/60",
        "data-disabled:bg-heyo-recessed data-disabled:text-heyo-inactive",
        className,
      )}
    >
      {prefix ? <InputAddon side="start">{prefix}</InputAddon> : null}
      <div
        className={cn("flex min-w-0 flex-1 items-center", innerPadding[size])}
      >
        {icon ? (
          <span className={cn("shrink-0 text-heyo-subtle", iconClass)}>
            {renderIcon(icon, "size-full")}
          </span>
        ) : null}
        {control}
        {iconEnd ? (
          <span className={cn("shrink-0 text-heyo-subtle", iconClass)}>
            {renderIcon(iconEnd, "size-full")}
          </span>
        ) : null}
      </div>
      {suffix ? <InputAddon side="end">{suffix}</InputAddon> : null}
    </div>
  ) : (
    control
  );

  if (!hasField) return body;

  return (
    <Field
      className={fieldClassName}
      label={label}
      description={description}
      error={error}
      optional={optional}
      labelAside={labelAside}
      disabled={disabled}
    >
      {body}
    </Field>
  );
}

function InputAddon({
  side,
  children,
}: {
  side: "start" | "end";
  children: ReactNode;
}) {
  return (
    <span
      data-slot="input-addon"
      data-side={side}
      className={cn(
        "flex shrink-0 items-center bg-heyo-recessed px-2 text-heyo-subtle",
        side === "start"
          ? "border-r border-heyo-hairline"
          : "border-l border-heyo-hairline",
      )}
    >
      {children}
    </span>
  );
}
