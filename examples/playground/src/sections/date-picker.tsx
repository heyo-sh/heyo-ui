import {
  DatePicker,
  DateRangePicker,
  Text,
  type DateRange,
} from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { Example, Section, Stack } from "./section";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return startOfDay(date);
}

const presets = [
  {
    label: "Last 7 days",
    range: () => ({ from: daysAgo(6), to: startOfDay(new Date()) }),
  },
  {
    label: "Last 30 days",
    range: () => ({ from: daysAgo(29), to: startOfDay(new Date()) }),
  },
  {
    label: "Last 90 days",
    range: () => ({ from: daysAgo(89), to: startOfDay(new Date()) }),
  },
  {
    label: "This month",
    range: () => {
      const now = new Date();
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: startOfDay(now),
      };
    },
  },
];

export function DatePickerSection() {
  const [date, setDate] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({ from: null, to: null });

  return (
    <Section
      title="Date Picker"
      description="A control that reads back the date and a Calendar in a popover. No text parsing — “3/4/25” is March for half the world and April for the other half."
    >
      <Stack label="single" className="max-w-xs">
        <DatePicker value={date} onValueChange={setDate} />
        <Text size="sm" tone="subtle">
          {date ? date.toISOString().slice(0, 10) : "null"}
        </Text>
      </Stack>

      <Stack label="range + presets" className="max-w-md">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          presets={presets}
          className="w-72"
        />
        <Text size="sm" tone="subtle">
          {range.from?.toISOString().slice(0, 10) ?? "—"} →{" "}
          {range.to?.toISOString().slice(0, 10) ?? "—"}
        </Text>
      </Stack>

      <Example label="size">
        <DatePicker size="sm" className="w-40" placeholder="sm" />
        <DatePicker size="base" className="w-44" placeholder="base" />
        <DatePicker size="lg" className="w-48" placeholder="lg" />
      </Example>

      <Example label="min / max / disabled">
        <DatePicker
          className="w-48"
          min={daysAgo(14)}
          max={new Date()}
          placeholder="Last two weeks"
        />
        <DatePicker className="w-44" disabled placeholder="Disabled" />
      </Example>

      <Stack label="single month range" className="max-w-xs">
        <DateRangePicker twoMonths={false} className="w-64" />
      </Stack>
    </Section>
  );
}
