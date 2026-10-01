import { Switch } from "@heyo-sh/heyo-ui";
import { Example, Section, Stack } from "./section";

export function SwitchSection() {
  return (
    <Section
      title="Switch"
      description="A binary toggle for settings that apply immediately — no save button in sight."
    >
      <Stack label="label" className="gap-3">
        <Switch label="Observability" defaultChecked />
        <Switch label="Smart placement" />
      </Stack>

      <Stack label="description" className="gap-3">
        <Switch
          label="Observability"
          description="Sample 10% of requests and keep logs for 3 days."
          defaultChecked
        />
      </Stack>

      <Stack label='align="end" (settings row)' className="max-w-sm gap-3">
        <Switch label="Email alerts" align="end" defaultChecked />
        <Switch
          label="Weekly digest"
          description="Every Monday, 9:00 UTC."
          align="end"
        />
      </Stack>

      <Stack label="disabled" className="gap-3">
        <Switch label="Disabled" disabled />
        <Switch label="Disabled, on" defaultChecked disabled />
      </Stack>

      <Example label="bare (aria-label)">
        <Switch aria-label="Enable" />
        <Switch aria-label="Enable" defaultChecked />
      </Example>
    </Section>
  );
}
