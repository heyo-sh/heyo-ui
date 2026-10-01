"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";

export interface StatProps extends Omit<ComponentProps<"div">, "title"> {
  label: ReactNode;
  value: ReactNode;
  /** Unit or qualifier printed after the value, smaller and muted. */
  unit?: ReactNode;
  /**
   * Change against the previous period, as a *number*: `-4.2` renders
   * “−4.2%”. Sign decides the colour.
   */
  delta?: number;
  /**
   * Whether a rise is good. `false` flips the colours — for latency, error
   * rate, spend, where up is exactly what you don't want.
   * @default true
   */
  deltaGood?: boolean;
  /** Suffix on the delta. @default "%" */
  deltaUnit?: string;
  /** What the delta is measured against, e.g. “vs last week”. */
  deltaLabel?: ReactNode;
  icon?: IconLike;
  /** Slot under the numbers — a sparkline, a `Meter`, a `StatusBar`. */
  chart?: ReactNode;
  /** Hairline + surface. Off by default so it can live inside a `Card`. */
  bordered?: boolean;
}

/**
 * One number, its name, and how it moved.
 *
 * The value is the only large type in the component and the only thing at full
 * contrast — a stat where the label competes with the number is a stat nobody
 * reads at a glance.
 */
export function Stat({
  className,
  label,
  value,
  unit,
  delta,
  deltaGood = true,
  deltaUnit = "%",
  deltaLabel,
  icon,
  chart,
  bordered,
  ...props
}: StatProps) {
  const rising = delta !== undefined && delta > 0;
  const flat = delta !== undefined && delta === 0;
  const good = rising === deltaGood;

  return (
    <div
      data-slot="stat"
      className={cn(
        "flex min-w-0 flex-col gap-1.5",
        bordered && "rounded-lg bg-heyo-base p-4 ring-1 ring-heyo-line",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        {icon ? (
          <span className="size-3.5 shrink-0 text-heyo-subtle">
            {renderIcon(icon, "size-full")}
          </span>
        ) : null}
        <span className="truncate text-xs font-medium text-heyo-subtle">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl leading-none font-semibold tabular-nums text-heyo-strong">
          {value}
        </span>
        {unit ? <span className="text-sm text-heyo-subtle">{unit}</span> : null}

        {delta !== undefined ? (
          <span
            data-slot="stat-delta"
            className={cn(
              "ml-auto flex shrink-0 items-center gap-0.5 text-xs font-medium tabular-nums",
              flat
                ? "text-heyo-subtle"
                : good
                  ? "text-heyo-success"
                  : "text-heyo-danger",
            )}
          >
            {/* A triangle, not an arrow: at 12px an arrowhead turns to mush,
                and the sign is already carrying the meaning. */}
            <span aria-hidden>{flat ? "–" : rising ? "▲" : "▼"}</span>
            {Math.abs(delta)}
            {deltaUnit}
          </span>
        ) : null}
      </div>

      {chart ? <div className="pt-1">{chart}</div> : null}

      {deltaLabel ? (
        <span className="text-xs text-heyo-subtle">{deltaLabel}</span>
      ) : null}
    </div>
  );
}

export interface StatGroupProps extends ComponentProps<"div"> {
  /** Columns on a wide screen. @default 3 */
  columns?: 2 | 3 | 4;
}

const columnClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * A row of stats separated by hairlines rather than gaps — the dashboard
 * header pattern. Uses dividers instead of cards so it reads as one band.
 */
export function StatGroup({
  className,
  columns = 3,
  ...props
}: StatGroupProps) {
  return (
    <div
      data-slot="stat-group"
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-heyo-hairline ring-1 ring-heyo-line",
        "[&>*]:bg-heyo-base [&>*]:p-4",
        columnClass[columns],
        className,
      )}
      {...props}
    />
  );
}

Stat.Group = StatGroup;
