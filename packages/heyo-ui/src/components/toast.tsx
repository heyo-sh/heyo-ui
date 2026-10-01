"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  DangerIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  XIcon,
} from "../lib/icons";

/**
 * A module-level manager, so toasts can be fired from anywhere — event
 * handlers, route loaders, plain async functions — without a hook or a context
 * in sight. `<Toaster />` renders whatever it holds.
 */
const manager = ToastPrimitive.createToastManager();

type ToastTone = "neutral" | "success" | "warning" | "danger" | "info";

export interface ToastOptions {
  description?: ReactNode;
  /** Milliseconds before auto-dismiss. `0` keeps it until closed. */
  timeout?: number;
  actionProps?: Record<string, unknown>;
}

function show(title: ReactNode, tone: ToastTone, options?: ToastOptions) {
  return manager.add({ title, type: tone, ...options });
}

/**
 * Fire a toast.
 *
 * ```tsx
 * toast("Saved");
 * toast.success("Deployed", { description: "acme-api is live" });
 * toast.error("Deploy failed", { timeout: 0 });
 * await toast.promise(deploy(), {
 *   loading: "Deploying…",
 *   success: "Deployed",
 *   error: "Deploy failed",
 * });
 * ```
 */
export const toast = Object.assign(
  (title: ReactNode, options?: ToastOptions) => show(title, "neutral", options),
  {
    success: (title: ReactNode, options?: ToastOptions) =>
      show(title, "success", options),
    error: (title: ReactNode, options?: ToastOptions) =>
      show(title, "danger", options),
    warning: (title: ReactNode, options?: ToastOptions) =>
      show(title, "warning", options),
    info: (title: ReactNode, options?: ToastOptions) =>
      show(title, "info", options),
    promise: manager.promise,
    close: manager.close,
    update: manager.update,
    /** The raw Base UI manager, for anything the shorthands don't cover. */
    manager,
  },
);

const toneIcon = {
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  info: InfoIcon,
} as const;

const toneColor: Record<string, string> = {
  success: "text-heyo-success",
  warning: "text-heyo-warning",
  danger: "text-heyo-danger",
  info: "text-heyo-info",
};

function ToastList({ fromTop }: { fromTop: boolean }) {
  const { toasts } = ToastPrimitive.useToastManager();
  /** +1 stacks downward (top corners), -1 upward (bottom corners). */
  const dir = fromTop ? "1" : "-1";

  return toasts.map((item) => {
    const Icon = toneIcon[item.type as keyof typeof toneIcon];

    return (
      <ToastPrimitive.Root
        key={item.id}
        toast={item}
        data-slot="toast"
        style={{ "--toast-dir": dir } as CSSProperties}
        className={cn(
          "absolute right-0 left-0 flex items-start gap-2.5 select-none",
          fromTop ? "top-0" : "bottom-0",
          "rounded-xl bg-heyo-base p-3 shadow-lg ring-1 ring-heyo-line",
          "[transition:transform_350ms_var(--ease-heyo),opacity_250ms_var(--ease-heyo)]",
          "motion-reduce:transition-none",

          // The deck.
          //
          // Each toast behind the front one slides 10px out of the corner and
          // loses 4% of its width, so the stack reads as three cards. What made
          // the old version a pyramid was that *every* queued toast kept full
          // opacity and kept climbing; here the depth is capped — anything past
          // the third is fully transparent, so the deck is always exactly three
          // cards deep however many are waiting.
          "[--toast-lift:10px] [--toast-shrink:0.04]",
          "[transform:translateY(calc(var(--toast-index)*var(--toast-lift)*var(--toast-dir)))_scale(calc(1-var(--toast-index)*var(--toast-shrink)))]",
          "[opacity:calc(1-max(0,var(--toast-index)-2))]",

          // Hover or focus the stack and it fans out into a real list, using
          // the heights Base UI measured, plus an 8px gap per card.
          "data-[expanded]:[transform:translateY(calc((var(--toast-offset-y)+var(--toast-index)*8px)*var(--toast-dir)))_scale(1)]",
          "data-[expanded]:opacity-100",

          "data-starting-style:scale-95 data-starting-style:opacity-0",
          fromTop
            ? "data-starting-style:-translate-y-4 data-ending-style:-translate-y-2"
            : "data-starting-style:translate-y-4 data-ending-style:translate-y-2",
          "data-ending-style:opacity-0",
          // Past `limit` Base UI keeps the toast mounted but inert; it must not
          // add a fourth card to the deck.
          "data-[limited]:opacity-0",
        )}
      >
        {Icon ? (
          <Icon
            className={cn("mt-0.5 size-4 shrink-0", toneColor[item.type!])}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ToastPrimitive.Title className="m-0 text-sm font-medium text-heyo-strong" />
          <ToastPrimitive.Description className="m-0 text-xs text-heyo-subtle" />
        </div>

        <ToastPrimitive.Close
          aria-label="Dismiss"
          className={cn(
            "-mt-0.5 -mr-0.5 shrink-0 cursor-pointer rounded-sm p-1",
            "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
            "heyo-focus",
          )}
        >
          <XIcon className="size-3.5" />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  });
}

export interface ToasterProps {
  /** Corner the stack lives in. */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** How many stay visible before the oldest is dropped. */
  limit?: number;
  /** Default auto-dismiss, in ms. */
  timeout?: number;
}

const positions = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
} as const;

/**
 * Mount once, near the root. Everything else goes through `toast()`.
 *
 * ```tsx
 * <Toaster />
 * ```
 */
export function Toaster({
  position = "bottom-right",
  limit = 3,
  timeout = 5000,
}: ToasterProps) {
  return (
    <ToastPrimitive.Provider
      toastManager={manager}
      limit={limit}
      timeout={timeout}
    >
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          data-slot="toaster"
          data-position={position}
          className={cn(
            "fixed z-50 w-80 max-w-[calc(100vw-2rem)] outline-none",
            positions[position],
          )}
        >
          <ToastList fromTop={position.startsWith("top")} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}
