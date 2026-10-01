"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { popupMotion } from "../lib/surface";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

/**
 * Base UI keeps hover delays on the provider, not the tooltip. Mirroring that
 * value in our own context lets a bare `<Tooltip>` open instantly with no setup
 * while still honouring an app-level `<Tooltip.Provider delay={…}>`.
 */
const DelayContext = createContext<{ delay: number; closeDelay: number }>({
  delay: 0,
  closeDelay: 0,
});

export interface TooltipProviderProps extends TooltipPrimitive.Provider.Props {}

/** Optional. Sets shared open/close delays for every tooltip beneath it. */
function TooltipProvider({
  delay = 0,
  closeDelay = 0,
  children,
  ...props
}: TooltipProviderProps) {
  return (
    <DelayContext.Provider value={{ delay, closeDelay }}>
      <TooltipPrimitive.Provider
        delay={delay}
        closeDelay={closeDelay}
        {...props}
      >
        {children}
      </TooltipPrimitive.Provider>
    </DelayContext.Provider>
  );
}

export interface TooltipProps extends TooltipPrimitive.Root.Props {
  /** The tooltip text. Keep it to one line where you can. */
  content: ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  alignOffset?: number;
  /** Open delay in ms. Instant by default. */
  delay?: number;
  closeDelay?: number;
  /** Little pointer aimed at the trigger. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A hover/focus hint. Opens immediately — no provider required.
 *
 * ```tsx
 * <Tooltip content="Redeploy" side="right">
 *   <Button icon={IconRefresh} shape="square" aria-label="Redeploy" />
 * </Tooltip>
 * ```
 */
function TooltipRoot({
  content,
  side = "top",
  align = "center",
  sideOffset = 6,
  alignOffset,
  delay,
  closeDelay,
  arrow = true,
  className,
  children,
  ...props
}: TooltipProps) {
  const inherited = useContext(DelayContext);

  return (
    <TooltipPrimitive.Provider
      delay={delay ?? inherited.delay}
      closeDelay={closeDelay ?? inherited.closeDelay}
    >
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger render={children as never} />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
          >
            <TooltipPrimitive.Popup
              data-slot="tooltip"
              className={cn(
                "z-50 max-w-64 origin-(--transform-origin) rounded-md px-2 py-1",
                "bg-heyo-contrast text-xs leading-4 text-heyo-inverse",
                "shadow-md select-none",
                popupMotion,
                className,
              )}
            >
              {arrow ? (
                <TooltipPrimitive.Arrow className="data-[side=bottom]:-top-[7px] data-[side=bottom]:rotate-180 data-[side=left]:-right-[11px] data-[side=left]:-rotate-90 data-[side=right]:-left-[11px] data-[side=right]:rotate-90 data-[side=top]:-bottom-[7px]">
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    aria-hidden
                    className="fill-heyo-contrast"
                  >
                    <path d="M5 8 0 0h10L5 8Z" />
                  </svg>
                </TooltipPrimitive.Arrow>
              ) : null}
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
});
