"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import type { ComponentProps, Ref } from "react";
import { cn } from "../lib/cn";
import { controlBase, type ControlSize } from "../lib/control";
import { Field, type FieldOwnProps } from "./field";

const textareaSize: Record<ControlSize, string> = {
  xs: "rounded-sm px-1.5 py-1 text-xs",
  sm: "rounded-md px-2 py-1.5 text-xs",
  base: "rounded-lg px-2.5 py-2 text-base",
  lg: "rounded-lg px-3.5 py-2.5 text-base",
};

export interface TextareaProps
  extends Omit<ComponentProps<"textarea">, "size">, FieldOwnProps {
  size?: ControlSize;
  /** Grow with the content instead of scrolling. */
  autoResize?: boolean;
  fieldClassName?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

/** Multi-line sibling of `Input` — same chrome, same field wiring. */
export function Textarea({
  className,
  fieldClassName,
  size = "base",
  rows = 4,
  autoResize = false,
  label,
  description,
  error,
  optional,
  labelAside,
  disabled,
  ref,
  ...props
}: TextareaProps) {
  const hasField =
    label !== undefined || description !== undefined || error !== undefined;

  const controlClass = cn(
    controlBase,
    textareaSize[size],
    "h-auto resize-y leading-normal",
    autoResize && "field-sizing-content resize-none",
    className,
  );

  const control = hasField ? (
    <FieldPrimitive.Control
      data-slot="textarea"
      className={controlClass}
      disabled={disabled}
      // Field.Control types itself as an <input>; the render element carries
      // the textarea-only props (rows, resize behaviour, …).
      render={<textarea rows={rows} ref={ref} {...props} />}
    />
  ) : (
    <textarea
      data-slot="textarea"
      className={controlClass}
      rows={rows}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );

  if (!hasField) return control;

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
      {control}
    </Field>
  );
}
