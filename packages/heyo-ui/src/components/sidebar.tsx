"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { useRender } from "@base-ui/react/use-render";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { ChevronRightIcon, PanelLeftIcon } from "../lib/icons";
import { useMediaQuery } from "../lib/use-media-query";
import { Badge, type BadgeProps } from "./badge";

/* -------------------------------------------------------------------------- */
/*                                  Context                                   */
/* -------------------------------------------------------------------------- */

export type SidebarState = "expanded" | "collapsed";

export interface SidebarContextValue {
  /** Desktop open state. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Mobile drawer open state. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** Toggles whichever surface is currently in play. */
  toggle: () => void;
  /** `"expanded" | "collapsed"` — mirrors `data-state` on the `<aside>`. */
  state: SidebarState;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside <Sidebar.Provider>.");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                  Provider                                  */
/* -------------------------------------------------------------------------- */

export interface SidebarProviderProps extends ComponentProps<"div"> {
  /** Uncontrolled initial state. */
  defaultOpen?: boolean;
  /** Controlled state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Expanded width. Any CSS length. */
  width?: string;
  /** Collapsed (icon rail) width. */
  widthIcon?: string;
  /**
   * Key that toggles the sidebar together with ⌘/Ctrl.
   * Pass `false` to opt out. Defaults to `"b"`.
   */
  shortcut?: string | false;
  /** Breakpoint below which the sidebar becomes an overlay drawer. */
  mobileBreakpoint?: string;
}

/**
 * Owns the open/collapsed state and publishes the layout CSS variables.
 * Wrap both the sidebar and the page content so `Sidebar.Inset` can react to
 * the same state.
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  width = "15rem",
  widthIcon = "3.25rem",
  shortcut = "b",
  mobileBreakpoint = "(max-width: 767px)",
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useMediaQuery(mobileBreakpoint);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);

  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange, openProp],
  );

  const toggle = useCallback(() => {
    if (isMobile) setOpenMobile(!openMobile);
    else setOpen(!open);
  }, [isMobile, open, openMobile, setOpen]);

  useEffect(() => {
    if (!shortcut) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== shortcut) return;
      if (!event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      toggle();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcut, toggle]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggle,
      state: open ? "expanded" : "collapsed",
      isMobile,
    }),
    [open, setOpen, openMobile, toggle, isMobile],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-provider"
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full bg-heyo-canvas text-heyo-default",
          className,
        )}
        style={
          {
            "--heyo-sidebar-width": width,
            "--heyo-sidebar-width-icon": widthIcon,
            ...style,
          } as CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Root                                     */
/* -------------------------------------------------------------------------- */

export interface SidebarRootProps extends ComponentProps<"aside"> {
  side?: "left" | "right";
  /**
   * `icon` — shrinks to a rail of icons.
   * `offcanvas` — slides fully out of view.
   * `none` — always expanded.
   */
  collapsible?: "icon" | "offcanvas" | "none";
}

function SidebarRoot({
  side = "left",
  collapsible = "icon",
  className,
  children,
  ...props
}: SidebarRootProps) {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <>
        <div
          aria-hidden
          data-slot="sidebar-scrim"
          data-state={openMobile ? "open" : "closed"}
          onClick={() => setOpenMobile(false)}
          className={cn(
            "fixed inset-0 z-40 bg-heyo-scrim transition-opacity duration-(--heyo-sidebar-duration)",
            "data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0",
          )}
        />
        <aside
          data-slot="sidebar"
          data-mobile="true"
          data-side={side}
          data-state={openMobile ? "expanded" : "collapsed"}
          className={cn(
            "group/sidebar fixed inset-y-0 z-50 flex w-(--heyo-sidebar-width) flex-col",
            "bg-heyo-sidebar text-heyo-default shadow-lg",
            "transition-transform duration-(--heyo-sidebar-duration) ease-heyo",
            side === "left"
              ? "left-0 border-r border-heyo-hairline data-[state=collapsed]:-translate-x-full"
              : "right-0 border-l border-heyo-hairline data-[state=collapsed]:translate-x-full",
            className,
          )}
          {...props}
        >
          {children}
        </aside>
      </>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      data-side={side}
      data-collapsible={collapsible}
      className={cn(
        "group/sidebar relative flex h-svh shrink-0 flex-col overflow-hidden",
        // Same fill as the page. A lighter sidebar reads as a floating panel;
        // the hairline below is the only separation it needs.
        "sticky top-0 bg-heyo-sidebar text-heyo-default",
        "w-(--heyo-sidebar-width) transition-[width] duration-(--heyo-sidebar-duration) ease-heyo",
        "data-[collapsible=icon]:data-[state=collapsed]:w-(--heyo-sidebar-width-icon)",
        "data-[collapsible=offcanvas]:data-[state=collapsed]:w-0",
        side === "left"
          ? "border-r border-heyo-hairline"
          : "border-l border-heyo-hairline",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Structural parts                              */
/* -------------------------------------------------------------------------- */

function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex shrink-0 flex-col gap-2 p-2",
        "border-b border-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto p-2",
        // A hairline scrollbar keeps the rail from jumping when content grows.
        "heyo-scrollbar",
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 border-t border-heyo-hairline p-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-separator"
      role="separator"
      className={cn("mx-1 my-1.5 h-px shrink-0 bg-heyo-hairline", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-sidebar="group"
      data-slot="sidebar-group"
      className={cn("flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-7 shrink-0 items-center px-2.5 text-xs font-medium tracking-wide text-heyo-subtle",
        "truncate transition-[height,opacity,margin] duration-(--heyo-sidebar-duration) ease-heyo",
        // Collapsed rails have no room for words.
        "group-data-[state=collapsed]/sidebar:h-0 group-data-[state=collapsed]/sidebar:opacity-0",
        "group-data-[mobile=true]/sidebar:h-7 group-data-[mobile=true]/sidebar:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn(
        "m-0 flex w-full min-w-0 list-none flex-col gap-px p-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("relative min-w-0", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                Menu buttons                                */
/* -------------------------------------------------------------------------- */

export interface SidebarMenuButtonProps extends Omit<
  ComponentProps<"button">,
  "children"
> {
  icon?: IconLike;
  /** Marks the entry as the current page. */
  active?: boolean;
  /** Swap the `<button>` for a link or router component. */
  render?: useRender.RenderProp;
  /** Skip the automatic `<li>` wrapper (when you supply your own `MenuItem`). */
  unwrapped?: boolean;
  children?: ReactNode;
}

/**
 * A navigation entry. Wraps itself in an `<li>` automatically, so the common
 * case is just `<Sidebar.Menu><Sidebar.MenuButton …/></Sidebar.Menu>`.
 */
function SidebarMenuButton({
  className,
  icon,
  active,
  render,
  unwrapped,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const element = useRender({
    render,
    defaultTagName: "button",
    props: {
      "data-slot": "sidebar-menu-button",
      "data-active": active ? "" : undefined,
      type: render ? undefined : "button",
      className: cn(
        "group/menu-button flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2",
        // Normal weight: a nav item is content inside a group, not the name of
        // one. Only GroupLabel gets medium.
        "rounded-lg px-2.5 text-left text-sm font-normal text-heyo-default",
        "heyo-focus transition-[background-color,color] duration-100 ease-heyo",
        "hover:bg-heyo-tint focus-visible:bg-heyo-tint focus-visible:text-heyo-strong",
        "data-[active]:bg-heyo-tint data-[active]:text-heyo-strong",
        "disabled:pointer-events-none disabled:text-heyo-inactive",
        className,
      ),
      children: (
        <SidebarRow
          icon={
            icon ? (
              <span
                className={cn(
                  "size-4 shrink-0 text-heyo-subtle transition-colors",
                  "group-hover/menu-button:text-heyo-default",
                  "group-data-[active]/menu-button:text-heyo-strong",
                )}
              >
                {renderIcon(icon, "size-full")}
              </span>
            ) : null
          }
        >
          {children}
        </SidebarRow>
      ),
      ...props,
    },
  });

  if (unwrapped) return element;
  return <SidebarMenuItem>{element}</SidebarMenuItem>;
}

/**
 * Marks a component as belonging to a menu row's trailing slot rather than its
 * label. `SidebarRow` reads this to pull chevrons and badges out of the
 * truncating label span and pin them to the right edge.
 */
interface TrailingSlotComponent {
  heyoSidebarTrailing?: boolean;
}

function isTrailingSlot(node: ReactNode): boolean {
  return (
    isValidElement(node) &&
    (node.type as TrailingSlotComponent)?.heyoSidebarTrailing === true
  );
}

/**
 * Row layout shared by `MenuButton` and `MenuSubButton`.
 *
 * The label has to be its own `truncate` span, but `text-overflow` doesn't
 * apply to flex items — so a chevron passed as a sibling of the text would
 * either kill the ellipsis or, since the span is block-level, get pushed onto
 * a second line underneath the label. Splitting trailing components out keeps
 * the text truncating *and* the chevron pinned right.
 */
function SidebarRow({
  icon,
  children,
}: {
  icon?: ReactNode;
  children?: ReactNode;
}) {
  const label: ReactNode[] = [];
  const trailing: ReactNode[] = [];

  Children.forEach(children, (child) => {
    (isTrailingSlot(child) ? trailing : label).push(child);
  });

  return (
    <>
      {icon}
      <SidebarLabel>{label}</SidebarLabel>
      {trailing.length > 0 ? (
        <span className="flex shrink-0 items-center gap-1.5">{trailing}</span>
      ) : null}
    </>
  );
}

/**
 * Text that fades out as the rail collapses. Exported so custom sidebar rows
 * can participate in the same animation.
 */
function SidebarLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-label"
      className={cn(
        "min-w-0 flex-1 truncate",
        "transition-opacity duration-(--heyo-sidebar-duration) ease-heyo",
        "group-data-[state=collapsed]/sidebar:opacity-0",
        "group-data-[mobile=true]/sidebar:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

/**
 * The trailing count on a menu row. It is literally `<Badge variant="count">`
 * — same chip, documented in the Badge section — with the one rule the sidebar
 * adds: it disappears when the rail collapses.
 */
function SidebarMenuBadge({ className, ...props }: BadgeProps) {
  return (
    <Badge
      data-slot="sidebar-menu-badge"
      variant="count"
      size="sm"
      className={cn("group-data-[state=collapsed]/sidebar:hidden", className)}
      {...props}
    />
  );
}

function SidebarMenuChevron({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-chevron"
      className={cn(
        "shrink-0 text-heyo-subtle opacity-60",
        // `rotate`, not `transform`: Tailwind v4's `rotate-90` sets the
        // standalone `rotate` property, so transitioning `transform` animates
        // nothing and the chevron snaps.
        "transition-[rotate,opacity] duration-200 ease-heyo motion-reduce:transition-none",
        "group-hover/menu-button:opacity-100",
        // Points right when closed, swings down when the panel opens.
        "group-data-[panel-open]/menu-button:rotate-90",
        "group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    >
      <ChevronRightIcon className="size-3.5" />
    </span>
  );
}

function SidebarMenuSub({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        "relative m-0 mt-px ml-[1.3125rem] flex min-w-0 list-none flex-col gap-px p-0 pl-2.5",
        // The guide rail that ties sub-items back to their parent.
        "before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-heyo-hairline",
        "group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  className,
  icon,
  active,
  render,
  unwrapped,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const element = useRender({
    render,
    defaultTagName: "button",
    props: {
      "data-slot": "sidebar-menu-sub-button",
      "data-active": active ? "" : undefined,
      type: render ? undefined : "button",
      className: cn(
        "group/menu-button flex min-h-7 w-full min-w-0 cursor-pointer items-center gap-2",
        "rounded-md px-2.5 text-left text-sm text-heyo-subtle",
        "heyo-focus transition-[background-color,color] duration-100 ease-heyo",
        "hover:bg-heyo-tint hover:text-heyo-default",
        "focus-visible:bg-heyo-tint focus-visible:text-heyo-strong",
        "data-[active]:bg-heyo-tint data-[active]:text-heyo-strong",
        className,
      ),
      children: (
        <SidebarRow
          icon={
            icon ? (
              <span className="size-3.5 shrink-0">
                {renderIcon(icon, "size-full")}
              </span>
            ) : null
          }
        >
          {children}
        </SidebarRow>
      ),
      ...props,
    },
  });

  if (unwrapped) return element;
  return <SidebarMenuItem>{element}</SidebarMenuItem>;
}

// Both live in a menu row's trailing slot, not inside its label.
SidebarMenuChevron.heyoSidebarTrailing = true;
SidebarMenuBadge.heyoSidebarTrailing = true;

/* -------------------------------------------------------------------------- */
/*                                   Meter                                    */
/* -------------------------------------------------------------------------- */

type SidebarMeterTone = "neutral" | "brand" | "success" | "warning" | "danger";

const meterFill: Record<SidebarMeterTone, string> = {
  neutral: "bg-heyo-subtle",
  brand: "bg-heyo-brand",
  success: "bg-heyo-success",
  warning: "bg-heyo-warning",
  danger: "bg-heyo-danger",
};

const meterStroke: Record<SidebarMeterTone, string> = {
  neutral: "stroke-heyo-subtle",
  brand: "stroke-heyo-brand",
  success: "stroke-heyo-success",
  warning: "stroke-heyo-warning",
  danger: "stroke-heyo-danger",
};

export interface SidebarMeterProps extends Omit<
  ComponentProps<"button">,
  "children" | "value"
> {
  /** What is measured: "Getting started", "Trial", "Storage". */
  label: ReactNode;
  value: number;
  /** Defaults to `100`. */
  max?: number;
  /**
   * The value in words, next to the label: "3/8", "12 days left", "4.2 GB".
   * Defaults to `value/max`.
   */
  valueLabel?: ReactNode;
  /** One line under the bar: the next step, what runs out and when. */
  description?: ReactNode;
  tone?: SidebarMeterTone;
  /**
   * Swap the `<button>` for whatever opens the detail — a `Popover.Trigger`,
   * a router link. The meter itself never does anything on click.
   */
  render?: useRender.RenderProp;
}

/**
 * A measurement that belongs to the whole app rather than to one page — an
 * onboarding checklist, the days left in a trial, a storage quota — pinned to
 * the sidebar, usually in `Sidebar.Footer` or at the bottom of `Content`.
 *
 * Expanded it is a small card: the label and the value on one line, the bar,
 * and one line of description. On the collapsed icon rail the same number
 * becomes a ring in the space of an icon, so it never disappears with the
 * words. It is always a control: pass `render` to open a popover or follow a
 * link, so the detail is one click away from anywhere.
 *
 * ```tsx
 * <Popover>
 *   <Popover.Trigger
 *     render={
 *       <Sidebar.Meter
 *         label="Getting started"
 *         value={3}
 *         max={8}
 *         description="Next: Invite your team"
 *       />
 *     }
 *   />
 *   <Popover.Content side="right" align="end">…</Popover.Content>
 * </Popover>
 * ```
 *
 * Same one bar as `Meter` (rule 10): this is where it sits, not a second kind.
 */
function SidebarMeter({
  label,
  value,
  max = 100,
  valueLabel,
  description,
  tone = "brand",
  render,
  className,
  ...props
}: SidebarMeterProps) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const shownValue = valueLabel ?? `${value}/${max}`;

  return useRender({
    render,
    defaultTagName: "button",
    props: {
      "data-slot": "sidebar-meter",
      type: render ? undefined : "button",
      className: cn(
        "group/sidebar-meter flex w-full min-w-0 cursor-pointer flex-col gap-2 text-left",
        "rounded-lg bg-heyo-base px-3 py-2.5 ring-1 ring-heyo-hairline",
        "heyo-focus transition-[background-color] duration-100 ease-heyo",
        "hover:bg-heyo-tint data-[popup-open]:bg-heyo-tint",
        // The rail: no card, just the ring where an icon would be.
        "group-data-[state=collapsed]/sidebar:size-8 group-data-[state=collapsed]/sidebar:items-center",
        "group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:self-center",
        "group-data-[state=collapsed]/sidebar:bg-transparent group-data-[state=collapsed]/sidebar:p-0",
        "group-data-[state=collapsed]/sidebar:ring-0",
        "group-data-[state=collapsed]/sidebar:hover:bg-heyo-tint",
        "group-data-[mobile=true]/sidebar:size-auto group-data-[mobile=true]/sidebar:items-stretch",
        "group-data-[mobile=true]/sidebar:bg-heyo-base group-data-[mobile=true]/sidebar:px-3",
        "group-data-[mobile=true]/sidebar:py-2.5 group-data-[mobile=true]/sidebar:ring-1",
        className,
      ),
      children: (
        <>
          <SidebarMeterRing ratio={ratio} tone={tone} />
          {/* The rail hides the words, not the name: the control keeps one. */}
          <span
            className={cn(
              "sr-only hidden",
              "group-data-[state=collapsed]/sidebar:block",
              "group-data-[mobile=true]/sidebar:hidden",
            )}
          >
            {label} {shownValue}
          </span>
          <span
            data-slot="sidebar-meter-body"
            className={cn(
              "flex min-w-0 flex-col gap-2",
              "group-data-[state=collapsed]/sidebar:hidden",
              "group-data-[mobile=true]/sidebar:flex",
            )}
          >
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="min-w-0 flex-1 truncate text-xs font-medium text-heyo-strong">
                {label}
              </span>
              <span className="shrink-0 text-xs text-heyo-subtle tabular-nums">
                {shownValue}
              </span>
            </span>
            <span
              aria-hidden
              className="block h-1 w-full overflow-hidden rounded-full bg-heyo-fill"
            >
              <span
                className={cn(
                  "block h-full rounded-full transition-[width] duration-300 ease-heyo",
                  "motion-reduce:transition-none",
                  meterFill[tone],
                )}
                style={{ width: `${ratio * 100}%` }}
              />
            </span>
            {description ? (
              <span className="block truncate text-xs text-heyo-subtle">
                {description}
              </span>
            ) : null}
          </span>
        </>
      ),
      ...props,
    },
  });
}

/** The meter on the collapsed rail: a ring the size of an icon. */
function SidebarMeterRing({
  ratio,
  tone,
}: {
  ratio: number;
  tone: SidebarMeterTone;
}) {
  const radius = 6.5;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      data-slot="sidebar-meter-ring"
      className={cn(
        "hidden size-4 shrink-0 -rotate-90",
        "group-data-[state=collapsed]/sidebar:block",
        "group-data-[mobile=true]/sidebar:hidden",
      )}
    >
      <circle
        cx="8"
        cy="8"
        r={radius}
        fill="none"
        strokeWidth="2"
        className="stroke-heyo-fill"
      />
      <circle
        cx="8"
        cy="8"
        r={radius}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - ratio)}
        className={cn(
          "transition-[stroke-dashoffset] duration-300 ease-heyo motion-reduce:transition-none",
          // A round cap draws a dot at zero; nothing done is an empty ring.
          ratio === 0 && "opacity-0",
          meterStroke[tone],
        )}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Collapsible                                 */
/* -------------------------------------------------------------------------- */

function SidebarCollapsible({ className, ...props }: Collapsible.Root.Props) {
  return (
    <Collapsible.Root
      data-slot="sidebar-collapsible"
      className={cn("w-full min-w-0", className)}
      {...props}
    />
  );
}

function SidebarCollapsibleContent({
  className,
  ...props
}: Collapsible.Panel.Props) {
  return (
    <Collapsible.Panel
      data-slot="sidebar-collapsible-content"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden",
        "transition-[height] duration-(--heyo-sidebar-duration) ease-heyo",
        "data-starting-style:h-0 data-ending-style:h-0",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface SidebarTriggerProps extends ComponentProps<"button"> {
  icon?: IconLike;
}

function SidebarTrigger({
  className,
  icon = PanelLeftIcon,
  onClick,
  children,
  ...props
}: SidebarTriggerProps) {
  const { toggle, state } = useSidebar();

  return (
    <button
      type="button"
      data-slot="sidebar-trigger"
      aria-label={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
      aria-expanded={state === "expanded"}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md",
        "text-heyo-subtle transition-colors duration-100",
        "hover:bg-heyo-tint hover:text-heyo-default",
        "heyo-focus",
        className,
      )}
      {...props}
    >
      {children ?? renderIcon(icon, "size-4")}
    </button>
  );
}

/**
 * The hairline seam between sidebar and content, doubling as a click target.
 * A small nicety that makes the whole thing feel like a real app chrome.
 */
function SidebarRail({ className, ...props }: ComponentProps<"button">) {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      data-slot="sidebar-rail"
      onClick={toggle}
      className={cn(
        "absolute inset-y-0 right-0 z-20 hidden w-1 cursor-col-resize",
        "transition-colors duration-150 hover:bg-heyo-brand/40",
        // Matches the provider's default mobile breakpoint.
        "md:block",
        className,
      )}
      {...props}
    />
  );
}

/** Main content column that sits next to the sidebar. */
function SidebarInset({ className, ...props }: ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "flex min-h-svh min-w-0 flex-1 flex-col bg-heyo-canvas",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */

export const Sidebar = Object.assign(SidebarRoot, {
  Provider: SidebarProvider,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
  MenuBadge: SidebarMenuBadge,
  MenuChevron: SidebarMenuChevron,
  MenuSub: SidebarMenuSub,
  MenuSubItem: SidebarMenuItem,
  MenuSubButton: SidebarMenuSubButton,
  Meter: SidebarMeter,
  Collapsible: SidebarCollapsible,
  CollapsibleTrigger: Collapsible.Trigger,
  CollapsibleContent: SidebarCollapsibleContent,
  Label: SidebarLabel,
  Trigger: SidebarTrigger,
  Rail: SidebarRail,
  Inset: SidebarInset,
});
