"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { XIcon } from "../lib/icons";
import { popupMotion, popupSurface, withLayer, zPopup } from "../lib/surface";

export interface PopoverContentProps extends Omit<
  PopoverPrimitive.Popup.Props,
  "title"
> {
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: number;
  /** Optional heading rendered above the content, with a close button. */
  title?: ReactNode;
  description?: ReactNode;
  showClose?: boolean;
  positioner?: PopoverPrimitive.Positioner.Props;
}

function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 6,
  title,
  description,
  showClose,
  positioner,
  children,
  ...props
}: PopoverContentProps) {
  const hasHeader = Boolean(title || description);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        {...positioner}
        className={withLayer(zPopup, positioner?.className)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover"
          className={cn(
            popupSurface,
            popupMotion,
            "w-72 max-w-[calc(100vw-2rem)] p-3",
            className,
          )}
          {...props}
        >
          {hasHeader ? (
            <div className="mb-2 flex flex-col gap-0.5 pr-5">
              {title ? (
                <PopoverPrimitive.Title className="m-0 text-sm font-medium text-heyo-strong">
                  {title}
                </PopoverPrimitive.Title>
              ) : null}
              {description ? (
                <PopoverPrimitive.Description className="m-0 text-xs text-heyo-subtle">
                  {description}
                </PopoverPrimitive.Description>
              ) : null}
            </div>
          ) : null}

          {children}

          {(showClose ?? hasHeader) ? (
            <PopoverPrimitive.Close
              aria-label="Close"
              className={cn(
                "absolute top-2 right-2 inline-flex size-5 cursor-pointer items-center justify-center rounded-sm",
                "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
                "heyo-focus",
              )}
            >
              <XIcon className="size-3.5" />
            </PopoverPrimitive.Close>
          ) : null}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

/**
 * Rich content anchored to a trigger.
 *
 * ```tsx
 * <Popover>
 *   <Popover.Trigger render={<Button>Filters</Button>} />
 *   <Popover.Content title="Filters">…</Popover.Content>
 * </Popover>
 * ```
 *
 * Reach for `Tooltip` for a label, `Dropdown` for a list of actions, and this
 * for anything with its own layout.
 */
export const Popover = Object.assign(PopoverPrimitive.Root, {
  Trigger: PopoverPrimitive.Trigger,
  Content: PopoverContent,
  Close: PopoverPrimitive.Close,
  Title: PopoverPrimitive.Title,
  Description: PopoverPrimitive.Description,
});
