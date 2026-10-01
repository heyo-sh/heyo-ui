import { StatusBar, Text, type StatusLevel } from "@heyo-sh/heyo-ui";
import { useMemo } from "react";
import { Example, Section, Stack } from "./section";

/** Deterministic, so the playground renders the same thing every time. */
function history(seed: number, length = 90) {
  return Array.from({ length }, (_, index) => {
    const noise = (index * seed) % 37;
    const status: StatusLevel =
      noise === 0
        ? "down"
        : noise < 4
          ? "degraded"
          : noise === 11
            ? "maintenance"
            : "operational";
    return {
      status,
      label: `${length - index} days ago — ${status}`,
    };
  });
}

export function StatusBarSection() {
  const api = useMemo(() => history(7), []);
  const edge = useMemo(() => history(13), []);
  const db = useMemo(() => history(29), []);

  return (
    <Section
      title="Status Bar"
      description="The uptime bar: one column per slice of time, coloured by what happened. Columns flex, so ninety days fit a sidebar and a phone alike."
    >
      <Stack label="label + value + legend">
        <StatusBar
          label="API"
          value="99.98% uptime"
          ticks={api}
          legend={["90 days ago", "Today"]}
        />
      </Stack>

      <Stack label="a service list" className="gap-4">
        <StatusBar label="Edge network" value="100%" ticks={edge} />
        <StatusBar label="Database" value="99.81%" ticks={db} />
      </Stack>

      <Example label="size">
        <div className="flex w-full flex-col gap-3">
          <StatusBar size="sm" ticks={api.slice(0, 30)} />
          <StatusBar size="base" ticks={api.slice(0, 30)} />
          <StatusBar size="lg" ticks={api.slice(0, 30)} />
        </div>
      </Example>

      <Example label="StatusBar.Dot">
        <StatusBar.Dot status="operational" label="All systems operational" />
        <StatusBar.Dot status="degraded" label="Degraded performance" />
        <StatusBar.Dot status="down" label="Major outage" pulse />
        <StatusBar.Dot status="maintenance" label="Under maintenance" />
        <StatusBar.Dot status="unknown" label="No data" />
      </Example>

      <Example label="bare dot">
        <StatusBar.Dot status="operational" />
        <StatusBar.Dot status="down" pulse />
        <Text size="sm" tone="subtle">
          Without a label it's just the indicator.
        </Text>
      </Example>
    </Section>
  );
}
