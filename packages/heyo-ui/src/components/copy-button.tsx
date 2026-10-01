"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { CheckIcon, CopyIcon } from "../lib/icons";
import { Button, type ButtonProps } from "./button";

export interface CopyButtonProps extends Omit<
  ButtonProps,
  "icon" | "onClick" | "children" | "onCopy"
> {
  /** The text to put on the clipboard. */
  value: string;
  /** Label next to the icon. Omit for an icon-only button. */
  children?: React.ReactNode;
  /** How long the ✓ stays, in ms. @default 1600 */
  timeout?: number;
  onCopy?: (value: string) => void;
  /** Accessible name when there's no visible label. @default "Copy" */
  label?: string;
}

/**
 * Copy to clipboard, with the one piece of feedback that matters: the icon
 * becomes a tick and stays that way long enough to be believed.
 *
 * ```tsx
 * <CopyButton value={deployment.id} variant="ghost" shape="square" />
 * ```
 */
export function CopyButton({
  value,
  children,
  timeout = 1600,
  onCopy,
  label = "Copy",
  className,
  variant = "ghost",
  size = "sm",
  shape,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear on unmount, or a copy right before a route change leaves a timer
  // calling setState on nothing.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Insecure context or a denied permission: fall back to the old trick
      // rather than silently doing nothing.
      const area = document.createElement("textarea");
      area.value = value;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }

    onCopy?.(value);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeout);
  }

  return (
    <Button
      data-slot="copy-button"
      data-copied={copied ? "" : undefined}
      aria-label={children ? undefined : copied ? "Copied" : label}
      variant={variant}
      size={size}
      shape={shape ?? (children ? undefined : "square")}
      icon={copied ? CheckIcon : CopyIcon}
      onClick={copy}
      className={cn(copied && "text-heyo-success", className)}
      {...props}
    >
      {children ? (copied ? "Copied" : children) : null}
    </Button>
  );
}
