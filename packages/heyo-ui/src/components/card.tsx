"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export const cardVariants = cva("flex min-w-0 flex-col rounded-xl", {
  variants: {
    variant: {
      /** Flat panel separated by a hairline — the default in dense UIs. */
      flat: "bg-heyo-base ring-1 ring-heyo-hairline",
      /** Lifted off the canvas with a real edge and a whisper of shadow. */
      raised: "bg-heyo-base shadow-sm ring-1 ring-heyo-line",
      /** Sunken well, useful for logs, diffs and empty states. */
      recessed: "bg-heyo-recessed ring-1 ring-heyo-hairline",
      /** No chrome at all — just the layout. */
      plain: "bg-transparent",
    },
  },
  defaultVariants: { variant: "flat" },
});

export interface CardProps
  extends ComponentProps<"div">, VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 px-4 py-3",
        // Only draw the seam when something follows the header.
        "not-last:border-b not-last:border-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "m-0 text-sm leading-5 font-medium text-heyo-strong",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("m-0 text-xs leading-4 text-heyo-subtle", className)}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-body"
      className={cn("min-w-0 flex-1 px-4 py-3.5", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex shrink-0 items-center justify-end gap-2 rounded-b-xl bg-heyo-elevated px-4 py-2.5",
        "border-t border-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}
