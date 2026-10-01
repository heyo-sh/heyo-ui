"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  controlSizeVariants,
  controlTriggerBase,
  type ControlSize,
} from "../lib/control";
import { CalendarIcon } from "../lib/icons";
import { Calendar, isSameDay, type DateRange } from "./calendar";
import { Popover } from "./popover";

interface DatePickerBaseProps {
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  min?: Date;
  max?: Date;
  disabledDate?: (date: Date) => boolean;
  locale?: string;
  weekStartsOn?: 0 | 1;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export interface DatePickerProps extends DatePickerBaseProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
}

export interface DateRangePickerProps extends DatePickerBaseProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  /** Shortcut rows down the left: “Last 7 days”, “This month”, … */
  presets?: { label: ReactNode; range: () => DateRange }[];
  /** Two months side by side. @default true */
  twoMonths?: boolean;
}

function useFormatter(locale?: string) {
  return useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );
}

function TriggerShell({
  size = "base",
  disabled,
  className,
  children,
  placeholder,
  empty,
  id,
  ariaLabel,
}: {
  size?: ControlSize;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  placeholder?: ReactNode;
  empty: boolean;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <Popover.Trigger
      id={id}
      aria-label={ariaLabel}
      disabled={disabled}
      data-slot="date-picker"
      className={cn(
        controlTriggerBase,
        controlSizeVariants({ size }),
        "flex cursor-pointer items-center gap-2 text-left",
        "hover:bg-heyo-control-hover",
        "data-[popup-open]:ring-[1.5px] data-[popup-open]:ring-heyo-focus/45",
        className,
      )}
    >
      <CalendarIcon className="size-3.5 shrink-0 text-heyo-subtle" />
      <span
        className={cn(
          "min-w-0 flex-1 truncate tabular-nums",
          empty && "text-heyo-placeholder",
        )}
      >
        {empty ? placeholder : children}
      </span>
    </Popover.Trigger>
  );
}

/**
 * A date field: a control that reads back the date, and a `Calendar` in a
 * popover.
 *
 * No text parsing. A field that accepts "3/4/25" has to decide whether that's
 * March or April, and it will be wrong for half the world — if you need typed
 * input, use three `NumberField`s or a native `<input type="date">`.
 */
export function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  placeholder = "Pick a date",
  size,
  disabled,
  min,
  max,
  disabledDate,
  locale,
  weekStartsOn,
  className,
  id,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState<Date | null>(defaultValue);
  const format = useFormatter(locale);

  const current = value !== undefined ? value : uncontrolled;

  function select(next: Date | null) {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
    // One date, one click — leaving the popover open after a complete answer
    // just makes you find the ✕.
    if (next) setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TriggerShell
        id={id}
        ariaLabel={ariaLabel}
        size={size}
        disabled={disabled}
        className={className}
        placeholder={placeholder}
        empty={!current}
      >
        {current ? format.format(current) : null}
      </TriggerShell>

      <Popover.Content align="start" className="w-auto p-3">
        <Calendar
          value={current}
          onSelect={select}
          min={min}
          max={max}
          disabledDate={disabledDate}
          locale={locale}
          weekStartsOn={weekStartsOn}
        />
      </Popover.Content>
    </Popover>
  );
}

/**
 * Two dates, one control. Closes itself once the range is complete.
 *
 * `presets` earn their keep here: nine times out of ten the answer is "last 7
 * days", and clicking twice in a grid to say so is a small tax on every visit.
 */
export function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a range",
  size,
  disabled,
  min,
  max,
  disabledDate,
  locale,
  weekStartsOn,
  presets,
  twoMonths = true,
  className,
  id,
  "aria-label": ariaLabel,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState<DateRange>(
    defaultValue ?? { from: null, to: null },
  );
  const format = useFormatter(locale);

  const current = value ?? uncontrolled;

  function select(next: DateRange) {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
    if (next.from && next.to) setOpen(false);
  }

  const label =
    current.from && current.to
      ? isSameDay(current.from, current.to)
        ? format.format(current.from)
        : `${format.format(current.from)} – ${format.format(current.to)}`
      : current.from
        ? `${format.format(current.from)} – …`
        : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TriggerShell
        id={id}
        ariaLabel={ariaLabel}
        size={size}
        disabled={disabled}
        className={className}
        placeholder={placeholder}
        empty={!label}
      >
        {label}
      </TriggerShell>

      <Popover.Content align="start" className="flex w-auto gap-3 p-3">
        {presets?.length ? (
          <div className="flex w-32 shrink-0 flex-col gap-0.5 border-r border-heyo-hairline pr-3">
            {presets.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => select(preset.range())}
                className={cn(
                  "cursor-pointer rounded-md px-2 py-1 text-left text-sm",
                  "text-heyo-default transition-colors hover:bg-heyo-tint heyo-focus",
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        ) : null}

        <Calendar
          mode="range"
          value={current}
          onSelect={select}
          months={twoMonths ? 2 : 1}
          min={min}
          max={max}
          disabledDate={disabledDate}
          locale={locale}
          weekStartsOn={weekStartsOn}
        />
      </Popover.Content>
    </Popover>
  );
}

DatePicker.Range = DateRangePicker;
