"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";

export type StatusLevel =
  "operational" | "degraded" | "partial" | "down" | "maintenance" | "unknown";

export interface StatusTick {
  /** What happened in this slice of time. */
  status: StatusLevel;
  /** Shown in the native tooltip: a date, an incident title, a percentage. */
  label?: string;
}

const levelColor: Record<StatusLevel, string> = {
  operational: "bg-heyo-success",
  degraded: "bg-heyo-warning",
  partial: "bg-heyo-warning",
  down: "bg-heyo-danger",
  maintenance: "bg-heyo-info",
  unknown: "bg-heyo-fill-hover",
};

const levelText: Record<StatusLevel, string> = {
  operational: "text-heyo-success",
  degraded: "text-heyo-warning",
  partial: "text-heyo-warning",
  down: "text-heyo-danger",
  maintenance: "text-heyo-info",
  unknown: "text-heyo-subtle",
};

export interface StatusBarProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  /** Oldest first, newest last — the same direction as the time axis. */
  ticks: StatusTick[];
  /** Row above the bar. */
  label?: ReactNode;
  /** Right of the label — usually an uptime percentage. */
  value?: ReactNode;
  /** Captions under the two ends, e.g. “90 days ago” / “Today”. */
  legend?: [ReactNode, ReactNode];
  size?: "sm" | "base" | "lg";
}

const tickHeight = {
  sm: "h-4",
  base: "h-7",
  lg: "h-10",
} as const;

/**
 * The uptime bar: one thin column per slice of time, coloured by what happened.
 *
 * Columns *flex* rather than sitting at a fixed width, so ninety days fit a
 * sidebar and a phone without a horizontal scrollbar or a media query. The
 * gaps stay 2px, which is what keeps it readable as ninety things and not one
 * smear.
 */
export function StatusBar({
  className,
  ticks,
  label,
  value,
  legend,
  size = "base",
  ...props
}: StatusBarProps) {
  return (
    <div
      data-slot="status-bar"
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    >
      {label || value ? (
        <div className="flex items-baseline justify-between gap-2">
          {label ? (
            <span className="truncate text-sm font-medium text-heyo-default">
              {label}
            </span>
          ) : (
            <span />
          )}
          {value ? (
            <span className="shrink-0 text-xs tabular-nums text-heyo-subtle">
              {value}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn("flex w-full items-stretch gap-0.5", tickHeight[size])}
      >
        {ticks.map((tick, index) => (
          <span
            key={index}
            title={tick.label}
            data-status={tick.status}
            className={cn(
              "min-w-0 flex-1 rounded-xs transition-opacity duration-100",
              "hover:opacity-70",
              levelColor[tick.status],
            )}
          />
        ))}
      </div>

      {legend ? (
        <div className="flex items-center justify-between gap-2 text-xs text-heyo-subtle">
          <span>{legend[0]}</span>
          <span>{legend[1]}</span>
        </div>
      ) : null}
    </div>
  );
}

export interface StatusDotProps extends ComponentProps<"span"> {
  status: StatusLevel;
  /** Adds a slow halo. Only for the *current* state, never for history. */
  pulse?: boolean;
  label?: ReactNode;
}

/** The live indicator: a coloured dot and, optionally, what it means. */
export function StatusDot({
  className,
  status,
  pulse,
  label,
  ...props
}: StatusDotProps) {
  const dot = (
    <span
      aria-hidden
      className={cn("relative flex size-2 shrink-0", !label && className)}
    >
      {pulse ? (
        <span
          className={cn(
            "absolute inset-0 animate-ping rounded-full opacity-60",
            levelColor[status],
          )}
        />
      ) : null}
      <span
        className={cn("relative size-2 rounded-full", levelColor[status])}
      />
    </span>
  );

  if (!label) {
    return (
      <span data-slot="status-dot" data-status={status} {...props}>
        {dot}
      </span>
    );
  }

  return (
    <span
      data-slot="status-dot"
      data-status={status}
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      {dot}
      <span className={cn("text-sm font-medium", levelText[status])}>
        {label}
      </span>
    </span>
  );
}

StatusBar.Dot = StatusDot;
