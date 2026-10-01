import { Meter } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function MeterSection() {
  return (
    <Section
      title="Meter"
      description="A measurement inside a known range — quota, disk, capacity, how far a build got. The only bar in the system, on purpose."
    >
      <Stack label="label + showValue" className="max-w-sm">
        <Meter label="Storage" value={78} showValue tone="warning" />
      </Stack>

      <Stack label="tone" className="max-w-sm gap-3">
        <Meter label="Requests" value={22} showValue tone="brand" />
        <Meter label="Bandwidth" value={61} showValue tone="success" />
        <Meter label="KV reads" value={88} showValue tone="warning" />
        <Meter label="Durable objects" value={97} showValue tone="danger" />
      </Stack>

      <Stack label="min / max" className="max-w-sm">
        <Meter
          label="Replicas"
          value={6}
          min={0}
          max={10}
          showValue
          tone="neutral"
        />
      </Stack>

      <Stack label="size" className="max-w-sm gap-3">
        <Meter label="sm" value={30} size="sm" />
        <Meter label="base" value={50} size="base" />
        <Meter label="lg" value={70} size="lg" />
      </Stack>
    </Section>
  );
}
