import { Calendar, Text, type DateRange } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { Section, Stack } from "./section";

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function CalendarSection() {
  return (
    <Section
      title="Calendar"
      description="A month grid, dependency-free — Intl already knows every locale's names, and Date already adds days correctly across DST."
    >
      <Stack label="single" className="max-w-xs">
        <SingleCalendar />
      </Stack>

      <Stack label='mode="range" + months={2}' className="max-w-xl">
        <RangeCalendar />
      </Stack>

      <Stack label="min / max / disabledDate" className="max-w-xs">
        <Calendar
          min={daysFromNow(-7)}
          max={daysFromNow(21)}
          disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
        />
        <Text size="sm" tone="subtle">
          Weekends off, and a three-week window.
        </Text>
      </Stack>

      <Stack label="locale / weekStartsOn" className="max-w-xs">
        <Calendar locale="pl-PL" weekStartsOn={1} />
      </Stack>
    </Section>
  );
}

function SingleCalendar() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <>
      <Calendar value={value} onSelect={setValue} />
      <Text size="sm" tone="subtle">
        {value
          ? value.toDateString()
          : "Nothing selected — click the same day to clear."}
      </Text>
    </>
  );
}

function RangeCalendar() {
  const [range, setRange] = useState<DateRange>({
    from: daysFromNow(-4),
    to: daysFromNow(3),
  });

  return (
    <>
      <Calendar mode="range" months={2} value={range} onSelect={setRange} />
      <Text size="sm" tone="subtle">
        {range.from?.toDateString() ?? "—"} → {range.to?.toDateString() ?? "…"}
      </Text>
    </>
  );
}
