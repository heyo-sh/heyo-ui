import { Separator, Text } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function SeparatorSection() {
  return (
    <Section
      title="Separator"
      description="A hairline rule, optionally with a caption cut into it."
    >
      <Stack label="horizontal" className="max-w-md">
        <Text size="sm" tone="subtle">
          Above
        </Text>
        <Separator className="my-2" />
        <Text size="sm" tone="subtle">
          Below
        </Text>
      </Stack>

      <Stack label="label" className="max-w-md">
        <Separator label="or" className="my-2" />
        <Separator label="Danger zone" className="my-2" />
      </Stack>

      <Stack label='orientation="vertical"'>
        <div className="flex h-8 items-center gap-3">
          <Text size="sm" tone="subtle">
            Logs
          </Text>
          <Separator orientation="vertical" />
          <Text size="sm" tone="subtle">
            Metrics
          </Text>
          <Separator orientation="vertical" />
          <Text size="sm" tone="subtle">
            Traces
          </Text>
        </div>
      </Stack>
    </Section>
  );
}
