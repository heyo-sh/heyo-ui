"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";
import { XIcon } from "../lib/icons";

/**
 * A panel that slides in from an edge — almost always the right one.
 *
 * It is a `Dialog` with a different geometry, and it exists as its own
 * component for one reason: the edge it comes from decides the size axis, the
 * animation and the border, and none of that is a sensible prop on a centred
 * dialog. Reach for it when the content is a *side quest* to the page (detail
 * pane, filters, a record's full record) rather than a task that has to end
 * before the page continues.
 *
 * Two shapes, because "a side quest" turns out to be two different jobs:
 *
 * - **`flush`** (default) is the wall: it meets the viewport edges, locks the
 *   page behind a scrim and demands to be dealt with. Filters, a create form,
 *   anything with a Save button.
 * - **`inset`** floats a little off every edge with a radius and a shadow,
 *   and pairs with `modal={false}` to leave the page live underneath. That is
 *   the *detail pane*: pick a row, read it, pick the next row without closing
 *   anything. A full-height wall for that job makes choosing the next item a
 *   two-step action, which is why library screens kept hand-rolling a card
 *   instead of reaching for this component.
 */
export interface SheetProps extends DialogPrimitive.Root.Props {
  /** @default true */
  dismissible?: boolean;
}

function SheetRoot({ dismissible = true, onOpenChange, ...props }: SheetProps) {
  return (
    <DialogPrimitive.Root
      disablePointerDismissal={!dismissible}
      onOpenChange={(open, eventDetails) => {
        if (!dismissible && !open && eventDetails.reason === "escape-key") {
          eventDetails.cancel();
          return;
        }
        onOpenChange?.(open, eventDetails);
      }}
      {...props}
    />
  );
}

type Side = "right" | "left" | "top" | "bottom";
type Variant = "flush" | "inset";

/** Where it sits, and which way it leaves. */
const sideChrome: Record<Variant, Record<Side, string>> = {
  flush: {
    right:
      "inset-y-0 right-0 h-full w-[calc(100vw-3rem)] border-l data-starting-style:translate-x-full data-ending-style:translate-x-full",
    left: "inset-y-0 left-0 h-full w-[calc(100vw-3rem)] border-r data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
    top: "inset-x-0 top-0 w-full border-b data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
    bottom:
      "inset-x-0 bottom-0 w-full border-t data-starting-style:translate-y-full data-ending-style:translate-y-full",
  },
  // The inset panel never travels its own width on the way out: it is already
  // framed, so a short slide plus a fade reads as "set aside" rather than
  // "thrown off screen", and it keeps the shadow from sweeping the page.
  inset: {
    right:
      "inset-y-3 right-3 w-[calc(100vw-1.5rem)] data-starting-style:translate-x-6 data-ending-style:translate-x-6",
    left: "inset-y-3 left-3 w-[calc(100vw-1.5rem)] data-starting-style:-translate-x-6 data-ending-style:-translate-x-6",
    top: "inset-x-3 top-3 w-auto data-starting-style:-translate-y-6 data-ending-style:-translate-y-6",
    bottom:
      "inset-x-3 bottom-3 w-auto data-starting-style:translate-y-6 data-ending-style:translate-y-6",
  },
};

/** Caps the size on the axis the sheet grows along. */
const sizeChrome: Record<Side, Record<"sm" | "base" | "lg" | "xl", string>> = {
  right: {
    sm: "sm:max-w-sm",
    base: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-2xl",
  },
  left: {
    sm: "sm:max-w-sm",
    base: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-2xl",
  },
  top: {
    sm: "max-h-[30svh]",
    base: "max-h-[45svh]",
    lg: "max-h-[60svh]",
    xl: "max-h-[80svh]",
  },
  bottom: {
    sm: "max-h-[30svh]",
    base: "max-h-[45svh]",
    lg: "max-h-[60svh]",
    xl: "max-h-[80svh]",
  },
};

export interface SheetContentProps extends DialogPrimitive.Popup.Props {
  /** @default "right" */
  side?: Side;
  size?: "sm" | "base" | "lg" | "xl";
  /**
   * `flush` meets the viewport edge; `inset` floats off it with a radius.
   *
   * @default "flush"
   */
  variant?: Variant;
  /**
   * The scrim behind the panel.
   *
   * Defaults to `true` for `flush` and `false` for `inset`, which is the
   * pairing that matches what each shape is for. Set it explicitly to get an
   * inset panel that still dims the page.
   */
  backdrop?: boolean;
  hideClose?: boolean;
}

function SheetContent({
  className,
  side = "right",
  size = "base",
  variant = "flush",
  backdrop,
  hideClose,
  children,
  ...props
}: SheetContentProps) {
  const showBackdrop = backdrop ?? variant === "flush";

  return (
    <DialogPrimitive.Portal>
      {showBackdrop ? (
        <DialogPrimitive.Backdrop
          data-slot="sheet-backdrop"
          className={cn(
            "fixed inset-0 z-50 bg-heyo-scrim backdrop-blur-[1px]",
            "transition-opacity duration-200 ease-heyo",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
      ) : null}
      <DialogPrimitive.Popup
        data-slot="sheet"
        data-side={side}
        data-variant={variant}
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden",
          "bg-heyo-base text-heyo-default outline-none",
          "transition-[opacity,transform] duration-250 ease-heyo motion-reduce:transition-none",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
          variant === "flush"
            ? // No radius: it is flush with the viewport edge, and a rounded
              // corner against a screen edge always looks like a mistake.
              "border-heyo-line shadow-lg"
            : // Raised, because nothing behind it is dimmed: without the ring
              // and the shadow an inset panel reads as part of the page.
              "rounded-2xl shadow-lg ring-1 ring-heyo-line",
          sideChrome[variant][side],
          sizeChrome[side][size],
          className,
        )}
        {...props}
      >
        {hideClose ? null : (
          <DialogPrimitive.Close
            aria-label="Close"
            data-slot="sheet-close"
            className={cn(
              "absolute top-3 right-3 z-1 inline-flex size-6 cursor-pointer items-center justify-center rounded-md",
              "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
              "heyo-focus",
            )}
          >
            <XIcon className="size-3.5" />
          </DialogPrimitive.Close>
        )}
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export interface SheetHeaderProps extends ComponentProps<"div"> {
  /**
   * Controls that belong to the panel rather than to its content — a status
   * chip, an overflow menu. Laid out before the close button, on the title's
   * row, so the header stays one line deep.
   */
  actions?: ReactNode;
}

function SheetHeader({
  className,
  actions,
  children,
  ...props
}: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex shrink-0 items-start gap-2 px-5 pt-4 pr-12 pb-3",
        "not-last:border-b not-last:border-heyo-hairline",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-1">{actions}</div>
      ) : null}
    </div>
  );
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "m-0 truncate text-base font-medium text-heyo-strong",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      className={cn("m-0 text-sm text-heyo-subtle", className)}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto px-5 py-4 heyo-scrollbar",
        className,
      )}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex shrink-0 items-center justify-end gap-2 px-5 py-3",
        "border-t border-heyo-hairline bg-heyo-elevated",
        className,
      )}
      {...props}
    />
  );
}

export const Sheet = Object.assign(SheetRoot, {
  Trigger: DialogPrimitive.Trigger,
  Close: DialogPrimitive.Close,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Body: SheetBody,
  Footer: SheetFooter,
});
