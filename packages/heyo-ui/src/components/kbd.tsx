"use client";

import { Children, type ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * A keyboard key. Monospaced and hairlined — the single place where heyo-ui
 * leans on mono type, because keycaps read better that way.
 */
export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-sm px-1",
        "bg-heyo-recessed font-mono text-[11px] leading-none text-heyo-subtle",
        "ring-1 ring-heyo-hairline select-none",
        className,
      )}
      {...props}
    />
  );
}

export interface KbdGroupProps extends ComponentProps<"span"> {
  /** Character rendered between keys. Use `""` for a tight `⌘K`. */
  separator?: string;
}

/** Chains keys together: `<Kbd.Group><Kbd>⌘</Kbd><Kbd>K</Kbd></Kbd.Group>`. */
export function KbdGroup({
  className,
  separator = "",
  children,
  ...props
}: KbdGroupProps) {
  const items = Children.toArray(children);
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {items.map((child, index) => (
        <span key={index} className="inline-flex items-center gap-1">
          {index > 0 && separator ? (
            <span className="text-[11px] text-heyo-inactive">{separator}</span>
          ) : null}
          {child}
        </span>
      ))}
    </span>
  );
}

Kbd.Group = KbdGroup;
