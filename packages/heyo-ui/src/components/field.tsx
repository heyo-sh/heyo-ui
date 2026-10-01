"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Label } from "./label";

/**
 * Either a ready-made message (`error="Email is taken"`) or a rule tied to the
 * browser's own ValidityState (`error={{ message: "Too short", match: "tooShort" }}`).
 */
export type FieldError =
  ReactNode | { message: ReactNode; match: boolean | keyof ValidityState };

function isMatchError(
  error: FieldError,
): error is { message: ReactNode; match: boolean | keyof ValidityState } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "match" in error
  );
}

export interface FieldOwnProps {
  /** Renders a `<label>` above the control and wires `htmlFor`/`id` for you. */
  label?: ReactNode;
  /** Muted helper text below the control. Hidden once an error takes over. */
  description?: ReactNode;
  /** Error message. Truthy values also flip the control into its invalid state. */
  error?: FieldError;
  /** Adds a muted "Optional" marker next to the label. */
  optional?: boolean;
  /** Right-aligned slot on the label row (hints, counters, links). */
  labelAside?: ReactNode;
}

export interface FieldProps
  extends Omit<FieldPrimitive.Root.Props, "children">, FieldOwnProps {
  children?: ReactNode;
  /** Class applied to the wrapper, not the control. */
  className?: string;
}

/**
 * Layout + accessibility shell for a single form control. Every input-like
 * component in heyo-ui composes this, so labels, descriptions and errors look
 * and behave identically everywhere.
 */
export function Field({
  label,
  description,
  error,
  optional,
  labelAside,
  className,
  children,
  invalid,
  ...props
}: FieldProps) {
  const hasError = isMatchError(error)
    ? Boolean(error.message)
    : Boolean(error);

  return (
    <FieldPrimitive.Root
      data-slot="field"
      invalid={invalid ?? (isMatchError(error) ? undefined : hasError)}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {label !== undefined && label !== null ? (
        <Label optional={optional} aside={labelAside}>
          {label}
        </Label>
      ) : null}

      {children}

      {description && !hasError ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}

      {hasError ? (
        isMatchError(error) ? (
          <FieldErrorMessage match={error.match}>
            {error.message}
          </FieldErrorMessage>
        ) : (
          <FieldErrorMessage match>{error}</FieldErrorMessage>
        )
      ) : null}
    </FieldPrimitive.Root>
  );
}

export function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("text-xs leading-4 text-heyo-subtle", className)}
      {...props}
    />
  );
}

export function FieldErrorMessage({
  className,
  ...props
}: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn("text-xs leading-4 text-heyo-danger", className)}
      {...props}
    />
  );
}

/** Escape hatch: the raw Base UI primitives, for bespoke layouts. */
export { FieldPrimitive };
