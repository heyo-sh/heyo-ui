"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SeparatorProps extends SeparatorPrimitive.Props {
  /** Optional centred caption, e.g. "or". */
  label?: ReactNode;
}

export function Separator({
  className,
  orientation = "horizontal",
  label,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        data-slot="separator"
        className={cn("flex items-center gap-3", className)}
      >
        <SeparatorPrimitive className="h-px flex-1 bg-heyo-hairline" />
        <span className="shrink-0 text-xs text-heyo-subtle">{label}</span>
        <SeparatorPrimitive className="h-px flex-1 bg-heyo-hairline" />
      </div>
    );
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-heyo-hairline",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
