import { NumberField, Text } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { Example, Section, Stack } from "./section";

export function NumberFieldSection() {
  const [value, setValue] = useState<number | null>(4);

  return (
    <Section
      title="Number Field"
      description="A numeric input with a stepper: Intl formatting, clamping, ↑/↓ (×10 with Shift, ÷10 with Alt), and no accidental scroll-to-change."
    >
      <Stack label="label + min/max" className="max-w-xs">
        <NumberField
          label="Replicas"
          description="Between 1 and 16."
          defaultValue={4}
          min={1}
          max={16}
          aria-label="Replicas"
        />
      </Stack>

      <Stack label="suffix" className="max-w-xs">
        <NumberField
          label="Rate limit"
          defaultValue={1200}
          step={100}
          suffix="req/s"
        />
        <NumberField label="Memory" defaultValue={128} step={64} suffix="MB" />
      </Stack>

      <Stack label="format (Intl.NumberFormat)" className="max-w-xs">
        <NumberField
          label="Budget"
          defaultValue={250}
          step={25}
          format={{ style: "currency", currency: "USD" }}
        />
        <NumberField
          label="Sample rate"
          defaultValue={0.25}
          step={0.05}
          min={0}
          max={1}
          format={{ style: "percent" }}
        />
      </Stack>

      <Stack label="scrubbable (drag the grip)" className="max-w-xs">
        <NumberField
          label="Concurrency"
          description="Drag the handle sideways."
          scrubbable
          defaultValue={8}
          min={1}
          max={64}
        />
      </Stack>

      <Stack label="controlled" className="max-w-xs">
        <NumberField
          label="Retries"
          value={value}
          onValueChange={setValue}
          min={0}
          max={10}
        />
        <Text size="sm" tone="subtle">
          value: {String(value)}
        </Text>
      </Stack>

      <Example label="size / disabled">
        <NumberField
          size="sm"
          defaultValue={1}
          aria-label="Small"
          className="w-28"
        />
        <NumberField
          size="base"
          defaultValue={1}
          aria-label="Base"
          className="w-32"
        />
        <NumberField
          size="lg"
          defaultValue={1}
          aria-label="Large"
          className="w-36"
        />
        <NumberField
          defaultValue={1}
          disabled
          aria-label="Disabled"
          className="w-32"
        />
      </Example>
    </Section>
  );
}
