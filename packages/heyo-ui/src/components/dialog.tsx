"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { XIcon } from "../lib/icons";
import { zOverlay } from "../lib/surface";

const widths = {
  sm: "max-w-sm",
  base: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
} as const;

export interface DialogProps extends DialogPrimitive.Root.Props {
  /**
   * Whether clicking the backdrop or pressing Escape closes the dialog.
   *
   * `false` is the old "alert dialog": the user has to answer. Use it only
   * when dismissing would lose work or leave something half-done — everything
   * else should be dismissible.
   *
   * @default true
   */
  dismissible?: boolean;
}

/**
 * A modal task.
 *
 * One dialog, not three. `dismissible={false}` covers what used to be
 * `AlertDialog`, and a confirm prompt is just a dialog with two buttons in the
 * footer — there is nothing left for a `ConfirmDialog` to add.
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Trigger render={<Button>Invite</Button>} />
 *   <Dialog.Content>
 *     <Dialog.Header>
 *       <Dialog.Title>Invite a teammate</Dialog.Title>
 *     </Dialog.Header>
 *     <Dialog.Body>…</Dialog.Body>
 *     <Dialog.Footer>
 *       <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
 *       <Button variant="primary">Send</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog>
 * ```
 */
function DialogRoot({
  dismissible = true,
  onOpenChange,
  ...props
}: DialogProps) {
  return (
    <DialogPrimitive.Root
      disablePointerDismissal={!dismissible}
      onOpenChange={(open, eventDetails) => {
        // `disablePointerDismissal` covers the backdrop; Escape needs saying so
        // separately, or a non-dismissible dialog still has an escape hatch.
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

export interface DialogContentProps extends DialogPrimitive.Popup.Props {
  size?: keyof typeof widths;
  /** Hide the built-in close button. Only sensible when the footer has one. */
  hideClose?: boolean;
}

function DialogContent({
  className,
  size = "base",
  hideClose,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-backdrop"
        className={cn(
          "fixed inset-0 bg-heyo-scrim backdrop-blur-[1px]",
          zOverlay,
          "transition-opacity duration-150 ease-heyo",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
        )}
      />
      <DialogPrimitive.Popup
        data-slot="dialog"
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          zOverlay,
          "flex max-h-[85svh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl",
          "bg-heyo-base text-heyo-default shadow-lg ring-1 ring-heyo-line outline-none",
          "transition-[opacity,transform] duration-150 ease-heyo",
          "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
          "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
          widths[size],
          className,
        )}
        {...props}
      >
        {hideClose ? null : <DialogCloseButton />}
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

/**
 * The corner dismiss. Rendered first so it wins the stacking order against a
 * long body, and `z-1` so a scrolled body can't slide over it.
 */
function DialogCloseButton({
  className,
  ...props
}: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      aria-label="Close"
      data-slot="dialog-close"
      className={cn(
        "absolute top-3 right-3 z-1 inline-flex size-6 cursor-pointer items-center justify-center rounded-md",
        "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
        "heyo-focus",
        className,
      )}
      {...props}
    >
      <XIcon className="size-3.5" />
    </DialogPrimitive.Close>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex shrink-0 flex-col gap-1 px-5 pt-4 pr-12 pb-3",
        "not-last:border-b not-last:border-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn("m-0 text-base font-medium text-heyo-strong", className)}
      {...props}
    />
  );
}

function DialogDescription({
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

function DialogBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto px-5 py-4 heyo-scrollbar",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex shrink-0 items-center justify-end gap-2 px-5 py-3",
        "border-t border-heyo-hairline bg-heyo-elevated",
        className,
      )}
      {...props}
    />
  );
}

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogPrimitive.Trigger,
  Close: DialogPrimitive.Close,
  CloseButton: DialogCloseButton,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
});
