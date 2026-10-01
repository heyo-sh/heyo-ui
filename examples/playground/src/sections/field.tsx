import { Field, Select, Slider } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function FieldSection() {
  return (
    <Section
      title="Field"
      description="The layout and accessibility shell every control composes. Reach for it directly when wrapping something that isn't an Input."
    >
      <Stack label="label + description" className="max-w-sm">
        <Field
          label="Region"
          description="Where the worker runs by default."
          optional
        >
          <Select defaultValue="fra">
            <Select.Trigger placeholder="Pick a region" />
            <Select.Content
              items={[
                { value: "fra", label: "Frankfurt" },
                { value: "waw", label: "Warsaw" },
                { value: "iad", label: "Ashburn" },
              ]}
            />
          </Select>
        </Field>
      </Stack>

      <Stack label="error" className="max-w-sm">
        <Field label="Region" error="Pick a region before deploying.">
          <Select>
            <Select.Trigger placeholder="Pick a region" />
            <Select.Content
              items={[
                { value: "fra", label: "Frankfurt" },
                { value: "waw", label: "Warsaw" },
              ]}
            />
          </Select>
        </Field>
      </Stack>

      <Stack label="labelAside" className="max-w-sm">
        <Field
          label="Concurrency"
          labelAside={
            <a
              href="#field"
              className="text-heyo-subtle underline-offset-2 hover:text-heyo-default hover:underline"
            >
              What's this?
            </a>
          }
        >
          <Slider defaultValue={4} min={1} max={16} step={1} showValue />
        </Field>
      </Stack>
    </Section>
  );
}
