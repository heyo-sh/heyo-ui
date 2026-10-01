"use client";

import { useMemo, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "../lib/icons";

/* -------------------------------------------------------------------------- */
/*                              Date arithmetic                               */
/* -------------------------------------------------------------------------- */

/**
 * Everything here works on *local midnight*. Storing the time component is how
 * a calendar ends up off by one for anyone east of Greenwich after 23:00.
 */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

/** The 6×7 grid for a month, padded with the neighbouring months' days. */
function monthGrid(month: Date, weekStartsOn: number): Date[][] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - offset);

  // Always six rows. A grid that is five rows in February and six in March
  // makes the whole popover jump when you page through it.
  return Array.from({ length: 6 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);
      return date;
    }),
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Calendar                                  */
/* -------------------------------------------------------------------------- */

interface CalendarBaseProps extends Omit<ComponentProps<"div">, "onSelect"> {
  /** 0 = Sunday, 1 = Monday. @default 1 */
  weekStartsOn?: 0 | 1;
  locale?: string;
  /** Nothing before this is selectable. */
  min?: Date;
  /** Nothing after this is selectable. */
  max?: Date;
  /** Extra rule on top of `min`/`max` — weekends, blackout dates. */
  disabledDate?: (date: Date) => boolean;
  /** Month shown on first render. Defaults to the selection, or today. */
  defaultMonth?: Date;
  /** How many months side by side. @default 1 */
  months?: 1 | 2;
}

export interface CalendarProps extends CalendarBaseProps {
  mode?: "single";
  value?: Date | null;
  onSelect?: (date: Date | null) => void;
}

export interface CalendarRangeProps extends CalendarBaseProps {
  mode: "range";
  value?: DateRange;
  onSelect?: (range: DateRange) => void;
}

/**
 * A month grid.
 *
 * Deliberately dependency-free: `Intl.DateTimeFormat` already knows every
 * locale's month and weekday names, and the only arithmetic a calendar needs is
 * "add a day", which `Date` does correctly across DST. Pulling in a date
 * library for this would cost more than the component.
 *
 * The grid is laid out on a fixed 2rem cell rather than stretched to its
 * container. Three things depend on it: the weekday headers line up with the
 * numbers underneath them, a selected range fills edge to edge instead of
 * leaving gaps between days, and two months side by side stay the same width as
 * the headings above them. A calendar that stretches is a calendar whose
 * columns drift.
 */
export function Calendar(props: CalendarProps | CalendarRangeProps) {
  // One internal shape, because a discriminated union can't be destructured
  // without TypeScript collapsing the shared members to `never`.
  const {
    className,
    weekStartsOn = 1,
    locale,
    min,
    max,
    disabledDate,
    defaultMonth,
    months = 1,
    mode = "single",
    value,
    onSelect,
    ...rest
  } = props as CalendarBaseProps & {
    mode?: "single" | "range";
    value?: Date | DateRange | null;
    onSelect?: (next: never) => void;
  };

  const single = mode === "single";
  const selectedDate = single ? ((value as Date | null) ?? null) : null;
  const range = single ? null : ((value as DateRange | undefined) ?? null);
  const emitDate = onSelect as unknown as
    ((next: Date | null) => void) | undefined;
  const emitRange = onSelect as unknown as
    ((next: DateRange) => void) | undefined;

  const today = useMemo(() => startOfDay(new Date()), []);
  const [month, setMonth] = useState(() => {
    const anchor = defaultMonth ?? selectedDate ?? range?.from ?? new Date();
    return new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  });
  /** The date under the pointer, used to preview a half-finished range. */
  const [hovered, setHovered] = useState<Date | null>(null);

  const weekdays = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
    return Array.from({ length: 7 }, (_, index) => {
      // 2024-01-07 was a Sunday, so this walks a real week in order.
      const day = new Date(2024, 0, 7 + ((index + weekStartsOn) % 7));
      // Two letters, and letters only: `short` is "Mon" in English but "pon."
      // in Polish, and a trailing full stop in a 32px column reads as dirt.
      return format
        .format(day)
        .replace(/[^\p{L}]/gu, "")
        .slice(0, 2);
    });
  }, [locale, weekStartsOn]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale],
  );

  /** Every visible month, and its grid, computed once per render. */
  const panels = useMemo(
    () =>
      Array.from({ length: months }, (_, index) => {
        const panelMonth = addMonths(month, index);
        return {
          month: panelMonth,
          label: monthLabel.format(panelMonth),
          weeks: monthGrid(panelMonth, weekStartsOn),
        };
      }),
    [month, months, monthLabel, weekStartsOn],
  );

  function isDisabled(date: Date) {
    if (min && date < startOfDay(min)) return true;
    if (max && date > startOfDay(max)) return true;
    return disabledDate?.(date) ?? false;
  }

  function choose(date: Date) {
    if (isDisabled(date)) return;

    if (single) {
      emitDate?.(selectedDate && isSameDay(selectedDate, date) ? null : date);
      return;
    }

    const from = range?.from ?? null;
    const to = range?.to ?? null;

    // Third click starts over. Anything cleverer (extend the nearest edge?)
    // is a guess the user can't see you making.
    if (!from || to) {
      emitRange?.({ from: date, to: null });
    } else if (date < from) {
      emitRange?.({ from: date, to: from });
    } else {
      emitRange?.({ from, to: date });
    }
  }

  /** The end of the range as it currently reads, real or previewed. */
  const rangeEnd = range?.to ?? (range?.from && hovered ? hovered : null);
  const rangeStartDate =
    range?.from && rangeEnd
      ? range.from < rangeEnd
        ? range.from
        : rangeEnd
      : (range?.from ?? null);
  const rangeEndDate =
    range?.from && rangeEnd
      ? range.from < rangeEnd
        ? rangeEnd
        : range.from
      : null;

  return (
    <div
      data-slot="calendar"
      className={cn("flex w-fit max-w-full flex-col", className)}
      onPointerLeave={() => setHovered(null)}
      {...rest}
    >
      <div className="flex gap-6">
        {panels.map((panel, index) => (
          <div
            key={index}
            data-slot="calendar-month"
            className="flex flex-col gap-2"
          >
            {/* The heading sits inside the month column, not across the whole
                component: with two months, a single centred title has nothing
                to line up with. */}
            <div className="flex h-7 items-center gap-1">
              {index === 0 ? (
                <CalendarNav
                  label="Previous month"
                  onClick={() => setMonth(addMonths(month, -1))}
                >
                  <ChevronLeftIcon className="size-3.5" />
                </CalendarNav>
              ) : (
                <span className="size-7 shrink-0" aria-hidden />
              )}

              <span
                aria-live={index === 0 ? "polite" : undefined}
                className="min-w-0 flex-1 truncate text-center text-sm font-medium text-heyo-strong first-letter:uppercase"
              >
                {panel.label}
              </span>

              {index === panels.length - 1 ? (
                <CalendarNav
                  label="Next month"
                  onClick={() => setMonth(addMonths(month, 1))}
                >
                  <ChevronRightIcon className="size-3.5" />
                </CalendarNav>
              ) : (
                <span className="size-7 shrink-0" aria-hidden />
              )}
            </div>

            <table
              role="grid"
              // `border-collapse` + fixed cells: the range fill has to meet its
              // neighbours with nothing between them.
              className="border-collapse select-none"
            >
              <thead>
                <tr>
                  {weekdays.map((day) => (
                    <th
                      key={day}
                      scope="col"
                      abbr={day}
                      className="size-8 pb-1 text-center align-middle text-[11px] font-normal text-heyo-subtle"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {panel.weeks.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((date) => {
                      const outside =
                        date.getMonth() !== panel.month.getMonth();
                      const disabled = isDisabled(date);

                      const isStart = Boolean(
                        rangeStartDate && isSameDay(date, rangeStartDate),
                      );
                      const isEnd = Boolean(
                        rangeEndDate && isSameDay(date, rangeEndDate),
                      );
                      const inRange = Boolean(
                        rangeStartDate &&
                        rangeEndDate &&
                        date > rangeStartDate &&
                        date < rangeEndDate,
                      );
                      const selected =
                        (selectedDate && isSameDay(date, selectedDate)) ||
                        isStart ||
                        isEnd;

                      // The continuous band lives on the cell, so it runs the
                      // full column width and meets its neighbours with nothing
                      // in between; the pill stays on the button. The two ends
                      // get half a cell of band, pointing inwards — a hard stop
                      // under the pill rather than a gap beside it.
                      const bounded = Boolean(rangeStartDate && rangeEndDate);
                      const band = inRange
                        ? "bg-heyo-brand-tint"
                        : !bounded || (isStart && isEnd)
                          ? null
                          : isStart
                            ? "bg-linear-to-r from-transparent from-50% to-heyo-brand-tint to-50%"
                            : isEnd
                              ? "bg-linear-to-l from-transparent from-50% to-heyo-brand-tint to-50%"
                              : null;

                      return (
                        <td
                          key={date.getTime()}
                          className={cn("size-8 p-0 align-middle", band)}
                        >
                          <button
                            type="button"
                            disabled={disabled}
                            tabIndex={outside ? -1 : 0}
                            aria-pressed={selected || undefined}
                            aria-current={
                              isSameDay(date, today) ? "date" : undefined
                            }
                            onClick={() => choose(date)}
                            onPointerEnter={() => setHovered(date)}
                            data-outside={outside ? "" : undefined}
                            data-selected={selected ? "" : undefined}
                            data-in-range={inRange ? "" : undefined}
                            data-today={isSameDay(date, today) ? "" : undefined}
                            className={cn(
                              "relative flex size-8 cursor-pointer items-center justify-center rounded-md",
                              "text-sm tabular-nums text-heyo-default heyo-focus",
                              "transition-colors duration-75",
                              "hover:bg-heyo-tint",
                              "data-outside:text-heyo-inactive",
                              "data-selected:bg-heyo-brand data-selected:font-medium data-selected:text-heyo-on-brand",
                              "data-selected:hover:bg-heyo-brand-hover",
                              // Today is a dot under the number, centred by
                              // hand rather than by the flex static position,
                              // which browsers disagree about.
                              "data-today:not-data-selected:font-semibold data-today:not-data-selected:text-heyo-strong",
                              "data-today:not-data-selected:after:absolute data-today:not-data-selected:after:bottom-1",
                              "data-today:not-data-selected:after:left-1/2 data-today:not-data-selected:after:-translate-x-1/2",
                              "data-today:not-data-selected:after:size-1 data-today:not-data-selected:after:rounded-full",
                              "data-today:not-data-selected:after:bg-heyo-brand",
                              "disabled:pointer-events-none disabled:text-heyo-inactive disabled:line-through",
                            )}
                          >
                            {date.getDate()}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarNav({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md",
        "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
        "heyo-focus",
      )}
    >
      {children}
    </button>
  );
}
