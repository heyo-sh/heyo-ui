"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";

const sizes = {
  xs: "size-5 text-[10px]",
  sm: "size-6 text-[11px]",
  base: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-base",
} as const;

export interface AvatarProps extends AvatarPrimitive.Root.Props {
  size?: keyof typeof sizes;
  src?: string;
  alt?: string;
  /** Shown while the image loads or if it fails. Defaults to initials of `name`. */
  fallback?: ReactNode;
  /** Used to derive initials when no explicit `fallback` is given. */
  name?: string;
}

/** Derives at most two initials, skipping the noise words in between. */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function Avatar({
  className,
  size = "base",
  src,
  alt,
  fallback,
  name,
  ...props
}: AvatarProps) {
  const resolvedFallback = fallback ?? (name ? initialsOf(name) : null);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden select-none",
        "bg-heyo-fill font-medium text-heyo-subtle",
        "ring-1 ring-heyo-hairline",
        // One radius, always. A circle reads as “social profile”; this system
        // is a console, where an avatar is just another dense identifier.
        "rounded-xs",
        sizes[size],
        className,
      )}
      {...props}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? name ?? ""}
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
        {resolvedFallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export interface AvatarGroupProps extends ComponentProps<"div"> {
  /** Beyond this many, the rest collapse into a `+N` chip. */
  max?: number;
}

/** Overlapping stack of avatars, newest first. */
export function AvatarGroup({
  className,
  max,
  children,
  ...props
}: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - visible.length : 0;

  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex items-center",
        // Ring in the page colour cuts a clean gap between overlapping avatars.
        "[&>*]:-ml-1.5 [&>*]:ring-2 [&>*]:ring-heyo-canvas [&>*:first-child]:ml-0",
        className,
      )}
      {...props}
    >
      {visible}
      {overflow > 0 ? (
        <span
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-xs",
            "bg-heyo-fill text-xs font-medium text-heyo-subtle select-none",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

Avatar.Group = AvatarGroup;
