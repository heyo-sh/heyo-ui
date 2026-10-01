"use client";

import { useMemo, useState, type ComponentProps } from "react";
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
function monthGrid(month: Date, weekStartsOn: number): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - offset);

  // Always six rows. A grid that is five rows in February and six in March
  // makes the whole popover jump when you page through it.
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
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
      return format.format(day).slice(0, 2);
    });
  }, [locale, weekStartsOn]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale],
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

  return (
    <div
      data-slot="calendar"
      className={cn("flex min-w-0 flex-col gap-3", className)}
      onPointerLeave={() => setHovered(null)}
      {...rest}
    >
      <div className="flex items-center justify-between gap-2">
        <CalendarNav
          label="Previous month"
          onClick={() => setMonth(addMonths(month, -1))}
        >
          <ChevronLeftIcon className="size-3.5" />
        </CalendarNav>

        <div className="flex flex-1 justify-around gap-2">
          {Array.from({ length: months }, (_, index) => (
            <span
              key={index}
              className="text-sm font-medium text-heyo-strong first-letter:uppercase"
            >
              {monthLabel.format(addMonths(month, index))}
            </span>
          ))}
        </div>

        <CalendarNav
          label="Next month"
          onClick={() => setMonth(addMonths(month, 1))}
        >
          <ChevronRightIcon className="size-3.5" />
        </CalendarNav>
      </div>

      <div className="flex gap-5">
        {Array.from({ length: months }, (_, offset) => (
          <table
            key={offset}
            role="grid"
            className="w-full border-collapse select-none"
          >
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th
                    key={day}
                    scope="col"
                    abbr={day}
                    className="pb-1 text-center text-[11px] font-medium text-heyo-subtle"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }, (_, week) => (
                <tr key={week}>
                  {monthGrid(addMonths(month, offset), weekStartsOn)
                    .slice(week * 7, week * 7 + 7)
                    .map((date) => {
                      const shownMonth = addMonths(month, offset).getMonth();
                      const outside = date.getMonth() !== shownMonth;
                      const disabled = isDisabled(date);

                      const isStart = Boolean(
                        range?.from && isSameDay(date, range.from),
                      );
                      const isEnd = Boolean(
                        rangeEnd && isSameDay(date, rangeEnd),
                      );
                      const inRange = Boolean(
                        range?.from &&
                        rangeEnd &&
                        date >
                          (range.from < rangeEnd ? range.from : rangeEnd) &&
                        date < (range.from < rangeEnd ? rangeEnd : range.from),
                      );
                      const selected =
                        (selectedDate && isSameDay(date, selectedDate)) ||
                        isStart ||
                        isEnd;

                      return (
                        <td key={date.toISOString()} className="p-0">
                          <button
                            type="button"
                            disabled={disabled}
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
                              "relative flex size-8 cursor-pointer items-center justify-center",
                              "text-sm tabular-nums text-heyo-default heyo-focus",
                              "transition-colors duration-75",
                              // Square-ish, not round: the in-range fill has to
                              // meet its neighbours edge to edge, and circles
                              // leave gaps you can see from across the room.
                              "rounded-md hover:bg-heyo-tint",
                              "data-outside:text-heyo-inactive",
                              "data-in-range:rounded-none data-in-range:bg-heyo-brand-tint",
                              "data-selected:bg-heyo-brand data-selected:font-medium data-selected:text-heyo-on-brand",
                              "data-selected:hover:bg-heyo-brand-hover",
                              "data-today:not-data-selected:font-semibold data-today:not-data-selected:text-heyo-strong",
                              "data-today:not-data-selected:after:absolute data-today:not-data-selected:after:bottom-1",
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
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md",
        "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
        "heyo-focus",
      )}
    >
      {children}
    </button>
  );
}
