"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import type { CSSProperties } from "react";
import { cn } from "../lib/cn";

export interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  /** Which axes get a scrollbar. @default "vertical" */
  orientation?: "vertical" | "horizontal" | "both";
  /**
   * Shorthand for a bounded viewport, e.g. `"18rem"`. Something has to cap the
   * height or there is nothing to scroll — set this, or put a height on
   * `viewportClassName`.
   */
  maxHeight?: string;
  /**
   * Fade the content out where it runs past an edge, so a cut-off list reads
   * as *more below* rather than as the end of the list. Applies to whichever
   * axes `orientation` enables.
   * @default true
   */
  fade?: boolean;
  /** Class for the inner viewport — put padding here, not on the root. */
  viewportClassName?: string;
  style?: CSSProperties;
}

/**
 * A scroll container with a real scrollbar instead of the browser's.
 *
 * The overlay thumb only appears while you hover or scroll, so a dense pane
 * doesn't carry a permanent grey gutter, and it is the same 6px everywhere
 * regardless of OS. When you just want the native scrollbar to look less like
 * 2003, use the `heyo-scrollbar` utility instead — no extra element.
 */
export function ScrollArea({
  className,
  orientation = "vertical",
  maxHeight,
  fade = true,
  viewportClassName,
  children,
  style,
  ...props
}: ScrollAreaProps) {
  const vertical = orientation === "vertical" || orientation === "both";
  const horizontal = orientation === "horizontal" || orientation === "both";

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      // `min-w-0` matters as much as `min-h-0`: Base UI gives the content
      // `min-width: fit-content`, so without it a horizontal scroll area
      // reports a huge min-content size and stretches its parent instead of
      // scrolling inside it.
      className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}
      style={style}
      {...props}
    >
      {/* The cap goes on the viewport, not the root: Base UI puts
          `overflow: scroll` here, and an element only scrolls if it's the one
          being constrained. */}
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        style={maxHeight ? { maxHeight } : undefined}
        className={cn(
          "h-full w-full overscroll-contain outline-none heyo-focus",
          // Base UI publishes which edges are overflowing; a mask keyed to them
          // means the fade is only ever present where there is more content.
          // `heyo-fade-mask` composites the two axes, so a `both` scroll area
          // gets one mask rather than the last one declared winning. It is
          // attached only once something actually overflows — no mask layer on
          // a pane whose content happens to fit.
          fade && vertical && "data-[has-overflow-y]:heyo-fade-mask",
          fade && horizontal && "data-[has-overflow-x]:heyo-fade-mask",
          fade &&
            vertical && [
              "data-[overflow-y-start]:data-[overflow-y-end]:[--heyo-fade-y:linear-gradient(to_bottom,transparent_0,#000_var(--heyo-fade),#000_calc(100%-var(--heyo-fade)),transparent_100%)]",
              "data-[overflow-y-start]:not-data-[overflow-y-end]:[--heyo-fade-y:linear-gradient(to_bottom,transparent_0,#000_var(--heyo-fade))]",
              "not-data-[overflow-y-start]:data-[overflow-y-end]:[--heyo-fade-y:linear-gradient(to_bottom,#000_calc(100%-var(--heyo-fade)),transparent_100%)]",
            ],
          fade &&
            horizontal && [
              "data-[overflow-x-start]:data-[overflow-x-end]:[--heyo-fade-x:linear-gradient(to_right,transparent_0,#000_var(--heyo-fade),#000_calc(100%-var(--heyo-fade)),transparent_100%)]",
              "data-[overflow-x-start]:not-data-[overflow-x-end]:[--heyo-fade-x:linear-gradient(to_right,transparent_0,#000_var(--heyo-fade))]",
              "not-data-[overflow-x-start]:data-[overflow-x-end]:[--heyo-fade-x:linear-gradient(to_right,#000_calc(100%-var(--heyo-fade)),transparent_100%)]",
            ],
          viewportClassName,
        )}
      >
        <ScrollAreaPrimitive.Content data-slot="scroll-area-content">
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>

      {vertical ? <ScrollAreaScrollbar orientation="vertical" /> : null}
      {horizontal ? <ScrollAreaScrollbar orientation="horizontal" /> : null}
      {vertical && horizontal ? (
        <ScrollAreaPrimitive.Corner className="bg-transparent" />
      ) : null}
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollAreaScrollbar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "z-1 flex touch-none p-0.5 select-none",
        "opacity-0 transition-opacity duration-150 ease-heyo",
        // Visible while you're using it, and while you're near it. Never a
        // permanent grey gutter.
        "data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
        "data-[hovering]:delay-0 data-[scrolling]:delay-0 delay-300",
        orientation === "vertical" ? "w-2.5" : "h-2.5 flex-col",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={cn(
          "rounded-full bg-heyo-fill-hover transition-colors duration-100",
          "hover:bg-heyo-interact active:bg-heyo-interact",
          orientation === "vertical" ? "w-1.5" : "h-1.5",
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

ScrollArea.Scrollbar = ScrollAreaScrollbar;
