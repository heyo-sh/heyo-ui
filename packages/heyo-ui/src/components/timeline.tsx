"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";

type Tone = "neutral" | "brand" | "info" | "success" | "warning" | "danger";

/** Marker fills. Status tones carry their own hue; neutral stays out of the way. */
const markerTone: Record<Tone, string> = {
  neutral: "bg-heyo-base text-heyo-subtle ring-heyo-line",
  brand: "bg-heyo-brand text-heyo-on-brand ring-transparent",
  info: "bg-heyo-info-tint text-heyo-info ring-heyo-info/25",
  success: "bg-heyo-success-tint text-heyo-success ring-heyo-success/25",
  warning: "bg-heyo-warning-tint text-heyo-warning ring-heyo-warning/25",
  danger: "bg-heyo-danger-tint text-heyo-danger ring-heyo-danger/25",
};

const dotTone: Record<Tone, string> = {
  neutral: "bg-heyo-neutral-400",
  brand: "bg-heyo-brand",
  info: "bg-heyo-info",
  success: "bg-heyo-success",
  warning: "bg-heyo-warning",
  danger: "bg-heyo-danger",
};

export interface TimelineProps extends ComponentProps<"ol"> {
  /**
   * `full` gives every entry an icon-sized marker; `compact` uses a dot on a
   * hairline rail. Compact is right for an audit log with fifty rows.
   * @default "full"
   */
  density?: "full" | "compact";
}

/**
 * A vertical sequence of events — deploys, audit entries, an incident.
 *
 * The rail is one continuous line drawn by the list and masked at both ends,
 * not a stack of per-item segments: segments leave hairline seams between
 * entries that you can see the moment two markers have different tones. It
 * fades out at the bottom, because an event feed almost never *ends* — it just
 * stops being loaded, and a line that stops dead implies otherwise.
 */
function TimelineRoot({
  className,
  density = "full",
  children,
  ...props
}: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      data-density={density}
      className={cn(
        "relative flex min-w-0 list-none flex-col",
        // The rail. `--rail` is the marker column's centre, set per density so
        // the line runs exactly through the middle of every marker.
        density === "compact" ? "[--rail:0.1875rem]" : "[--rail:0.6875rem]",
        "before:pointer-events-none before:absolute before:top-2 before:bottom-0",
        "before:left-(--rail) before:w-px before:-translate-x-1/2",
        "before:bg-gradient-to-b before:from-heyo-line before:via-heyo-line before:to-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

export interface TimelineItemProps extends Omit<ComponentProps<"li">, "title"> {
  /** Headline of the entry. */
  title: ReactNode;
  /** Right-aligned, muted — a timestamp, a duration, an actor. */
  time?: ReactNode;
  /** Rendered inside the marker. Falls back to a dot. */
  icon?: IconLike;
  tone?: Tone;
  /** @default "full" — match the `density` you set on the list. */
  density?: "full" | "compact";
  /**
   * Draws attention to the entry that is still happening: the marker gets a
   * slow halo and the row a faint tint.
   */
  active?: boolean;
  /** Kept for symmetry with older markup. The rail no longer needs it. */
  last?: boolean;
}

function TimelineItem({
  className,
  title,
  time,
  icon,
  tone = "neutral",
  density = "full",
  active,
  last: _last,
  children,
  ...props
}: TimelineItemProps) {
  const compact = density === "compact";

  return (
    <li
      data-slot="timeline-item"
      data-tone={tone}
      data-active={active ? "" : undefined}
      className={cn(
        "group/event relative flex min-w-0 gap-3",
        compact ? "pb-3 last:pb-0" : "pb-6 last:pb-0",
        className,
      )}
      {...props}
    >
      <span
        data-slot="timeline-marker"
        className={cn(
          "relative z-1 flex shrink-0 items-center justify-center rounded-full",
          compact
            ? cn(
                "mt-[0.4375rem] size-1.5 ring-2 ring-heyo-canvas",
                dotTone[tone],
              )
            : cn(
                "mt-0.5 size-5.5 ring-1",
                // A ring in the page colour cuts the rail cleanly behind the
                // marker, so the line never shows through the gap.
                "outline-4 outline-heyo-canvas",
                markerTone[tone],
              ),
        )}
      >
        {!compact && icon ? renderIcon(icon, "size-3") : null}
        {!compact && !icon ? (
          <span className={cn("size-1.5 rounded-full", dotTone[tone])} />
        ) : null}

        {active ? (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 animate-ping rounded-full opacity-40",
              dotTone[tone],
            )}
          />
        ) : null}
      </span>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-1",
          // The whole row lifts on hover, which is what makes a long feed feel
          // like a list of things rather than a wall of text.
          "-my-1 -mr-2 rounded-lg px-2 py-1 transition-colors duration-75",
          "group-hover/event:bg-heyo-tint",
          active && "bg-heyo-tint",
        )}
      >
        <div className="flex min-w-0 items-baseline gap-2">
          <span
            className={cn(
              "min-w-0 flex-1 truncate font-medium text-heyo-strong",
              compact ? "text-sm" : "text-base",
            )}
          >
            {title}
          </span>
          {time ? (
            <span className="shrink-0 text-xs tabular-nums text-heyo-subtle">
              {time}
            </span>
          ) : null}
        </div>
        {children ? (
          <div className="min-w-0 text-sm text-heyo-subtle">{children}</div>
        ) : null}
      </div>
    </li>
  );
}

/**
 * A date heading between entries. Sticky, so scrolling a month of deploys never
 * leaves you wondering which day you're looking at.
 */
function TimelineSeparator({
  className,
  children,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot="timeline-separator"
      className={cn(
        "sticky top-0 z-2 -mx-2 mb-3 bg-heyo-canvas px-2 py-1",
        "text-[11px] font-medium tracking-wider text-heyo-subtle uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Separator: TimelineSeparator,
});
