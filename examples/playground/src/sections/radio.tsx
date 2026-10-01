import { Radio, RadioGroup } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function RadioSection() {
  return (
    <Section
      title="Radio"
      description="One choice out of a few. Always inside a RadioGroup, which owns the value."
    >
      <Stack label="RadioGroup">
        <RadioGroup defaultValue="prod">
          <Radio value="prod" label="Production" />
          <Radio value="preview" label="Preview" />
          <Radio value="dev" label="Development" />
        </RadioGroup>
      </Stack>

      <Stack label="description">
        <RadioGroup defaultValue="prod">
          <Radio
            value="prod"
            label="Production"
            description="Custom domains, zero-downtime rollouts."
          />
          <Radio
            value="dev"
            label="Development"
            description="No custom domains, logs kept for an hour."
          />
        </RadioGroup>
      </Stack>

      <Stack label='orientation="horizontal"'>
        <RadioGroup defaultValue="24h" orientation="horizontal">
          <Radio value="1h" label="1h" />
          <Radio value="24h" label="24h" />
          <Radio value="7d" label="7d" />
        </RadioGroup>
      </Stack>

      <Stack label="disabled">
        <RadioGroup defaultValue="prod">
          <Radio value="prod" label="Production" />
          <Radio value="enterprise" label="Enterprise only" disabled />
        </RadioGroup>
      </Stack>
    </Section>
  );
}
