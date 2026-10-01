"use client";

import { Field } from "@base-ui/react/field";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface LabelProps extends Field.Label.Props {
  /** Appends a muted "Optional" marker — the inverse of shouting with an asterisk. */
  optional?: boolean;
  /** Right-aligned slot for a hint, counter, or "Forgot password?" link. */
  aside?: ReactNode;
}

/**
 * Renders a `<label>`. Inside a `Field` it wires `htmlFor` automatically;
 * standalone you pass `htmlFor` yourself.
 */
export function Label({
  className,
  optional,
  aside,
  children,
  htmlFor,
  render,
  style,
  ...props
}: LabelProps) {
  const labelClassName = cn(
    "m-0 flex items-center gap-1.5 text-sm leading-5 font-medium text-heyo-default select-none",
    "data-[disabled]:text-heyo-inactive",
    className,
  );

  const content = (
    <>
      {children}
      {optional ? (
        <span className="text-xs font-normal text-heyo-subtle">Optional</span>
      ) : null}
    </>
  );

  return (
    <div className="flex items-baseline justify-between gap-2">
      {/*
        Base UI's Field.Label throws outside a Field.Root. An explicit `htmlFor`
        is exactly the case where there's no field to wire into, so that branch
        renders a plain <label> and keeps the component usable standalone.
      */}
      {htmlFor && !render ? (
        <label
          data-slot="label"
          htmlFor={htmlFor}
          className={labelClassName}
          style={typeof style === "function" ? undefined : style}
          {...props}
        >
          {content}
        </label>
      ) : (
        <Field.Label
          data-slot="label"
          htmlFor={htmlFor}
          render={render}
          className={labelClassName}
          style={style}
          {...props}
        >
          {content}
        </Field.Label>
      )}
      {aside ? <span className="text-xs text-heyo-subtle">{aside}</span> : null}
    </div>
  );
}
