"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";

/**
 * `line` — a rule runs the full width and the indicator sits on it. The default
 *   for page-level navigation.
 * `underline` — padded tabs that highlight on hover, with the indicator
 *   detached below a hairline.
 * `segmented` — a pill that *slides* between tabs inside a recessed track.
 */
export type TabsVariant = "line" | "underline" | "segmented";

const VariantContext = createContext<TabsVariant>("line");

export interface TabsRootProps extends TabsPrimitive.Root.Props {
  variant?: TabsVariant;
}

function TabsRoot({ className, variant = "line", ...props }: TabsRootProps) {
  return (
    <VariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex min-w-0 flex-col gap-3", className)}
        {...props}
      />
    </VariantContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    List                                    */
/* -------------------------------------------------------------------------- */

const listVariants: Record<TabsVariant, string> = {
  line: "items-center gap-4 border-b border-heyo-hairline",
  underline: "items-center gap-1 border-b border-heyo-hairline pb-1.5",
  // `items-stretch`, so the tabs — and therefore the indicator, which is sized
  // from the active tab — fill the track instead of hugging their text and
  // leaving the pill floating in the middle of it.
  segmented:
    "h-8 w-max items-stretch gap-0.5 rounded-lg bg-heyo-recessed p-0.5 ring-1 ring-heyo-hairline",
};

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: IconLike;
  disabled?: boolean;
}

export interface TabsListProps extends TabsPrimitive.List.Props {
  /** Shorthand: render the tabs from data instead of writing them out. */
  items?: TabItem[];
  /**
   * The moving highlight is rendered for you. Pass `false` only if you need to
   * place `Tabs.Indicator` somewhere unusual yourself.
   */
  indicator?: boolean;
}

function TabsList({
  className,
  items,
  indicator = true,
  children,
  ...props
}: TabsListProps) {
  const variant = useContext(VariantContext);

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex min-w-0 shrink-0",
        // Tabs scroll rather than wrap when the row runs out of room.
        "overflow-x-auto overflow-y-hidden [scrollbar-width:none]",
        listVariants[variant],
        className,
      )}
      {...props}
    >
      {items
        ? items.map((item) => (
            <TabsTab
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.icon ? renderIcon(item.icon, "size-3.5 shrink-0") : null}
              {item.label}
            </TabsTab>
          ))
        : children}
      {indicator ? <TabsIndicator /> : null}
    </TabsPrimitive.List>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Tab                                     */
/* -------------------------------------------------------------------------- */

const tabVariants: Record<TabsVariant, string> = {
  line: "-mb-px px-0.5 py-2",
  underline:
    "rounded-md px-2 py-1.5 hover:bg-heyo-tint data-[selected]:font-medium",
  // No selected background here — the sliding indicator provides it. The tab
  // fills the track's height so the pill does too.
  segmented: "justify-center rounded-md px-3",
};

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  const variant = useContext(VariantContext);
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        // z-2 keeps the label above the indicator, which slides underneath it.
        "relative z-2 flex shrink-0 cursor-pointer items-center gap-1.5",
        "text-sm font-medium whitespace-nowrap",
        "text-heyo-subtle transition-[background-color,color] duration-100 ease-heyo",
        "heyo-focus hover:text-heyo-default",
        // The selected tab is the point of the component, so it gets the
        // strongest text in the system while the rest stay subtle. Colour, not
        // weight — a heavier selected label would re-measure the tab and jog
        // every other one sideways.
        "data-[selected]:text-heyo-strong",
        "data-[disabled]:pointer-events-none data-[disabled]:text-heyo-inactive",
        tabVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Indicator                                  */
/* -------------------------------------------------------------------------- */

/**
 * The moving highlight.
 *
 * Base UI publishes the active tab's geometry as CSS variables, so this is pure
 * CSS — no measuring in React, no resize observer. For `segmented` it becomes a
 * full-size pill that slides between tabs; otherwise it's the bar underneath.
 */
function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
  const variant = useContext(VariantContext);

  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(
        "absolute left-0 w-(--active-tab-width) translate-x-(--active-tab-left)",
        "transition-all duration-200 ease-heyo motion-reduce:transition-none",
        // Base UI marks the first paint before geometry is known — fade in
        // rather than flashing the pill at the wrong position.
        "data-[rendered=false]:scale-90 data-[rendered=false]:opacity-0",
        variant === "segmented"
          ? [
              // `inset-y-0.5` rather than the height variable: the pill should
              // sit inside the track's padding, whatever the tab measures.
              "inset-y-0.5 z-1",
              "rounded-md bg-heyo-base shadow-sm ring-1 ring-heyo-line",
            ]
          : "bottom-0 z-1 h-0.5 rounded-full bg-heyo-contrast",
        className,
      )}
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn("min-w-0 heyo-focus", className)}
      {...props}
    />
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
});
