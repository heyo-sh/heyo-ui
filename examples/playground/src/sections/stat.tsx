import { Meter, Stat, StatusBar, type StatusLevel } from "@heyo-sh/heyo-ui";
import { useMemo } from "react";
import { BoltIcon, ChartIcon, CubeIcon, UserIcon } from "../icons";
import { Section, Stack } from "./section";

export function StatSection() {
  const ticks = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        status: ((index * 7) % 23 === 0
          ? "degraded"
          : "operational") as StatusLevel,
      })),
    [],
  );

  return (
    <Section
      title="Stat"
      description="One number, its name, and how it moved. The value is the only large type and the only full-contrast thing in the component."
    >
      <Stack label="Stat.Group">
        <Stat.Group columns={3}>
          <Stat
            label="Requests"
            value="1.24M"
            delta={12.4}
            deltaLabel="vs last week"
            icon={ChartIcon}
          />
          <Stat
            label="p95 latency"
            value="38"
            unit="ms"
            delta={-6.1}
            deltaGood={false}
            deltaLabel="vs last week"
            icon={BoltIcon}
          />
          <Stat
            label="Error rate"
            value="0.21"
            unit="%"
            delta={3.8}
            deltaGood={false}
            deltaLabel="vs last week"
            icon={CubeIcon}
          />
        </Stat.Group>
      </Stack>

      <Stack label="deltaGood={false} — up is bad">
        <Stat.Group columns={2}>
          <Stat label="Spend" value="$412" delta={18} deltaGood={false} />
          <Stat label="Uptime" value="99.98" unit="%" delta={0} />
        </Stat.Group>
      </Stack>

      <Stack label="chart slot">
        <Stat.Group columns={2}>
          <Stat
            label="Bandwidth"
            value="612"
            unit="GB"
            delta={-2.2}
            icon={ChartIcon}
            chart={<Meter value={61} size="sm" tone="brand" />}
          />
          <Stat
            label="Availability"
            value="99.94"
            unit="%"
            icon={UserIcon}
            chart={<StatusBar size="sm" ticks={ticks} />}
          />
        </Stat.Group>
      </Stack>

      <Stack label="bordered (standalone)" className="max-w-xs">
        <Stat
          bordered
          label="Active members"
          value="24"
          delta={9.1}
          deltaLabel="since last month"
          icon={UserIcon}
        />
      </Stack>
    </Section>
  );
}
