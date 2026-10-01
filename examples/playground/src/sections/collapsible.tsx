import { Button, Code, Collapsible, Text } from "@heyo-sh/heyo-ui";
import { ChevronDownIcon } from "../icons";
import { Section, Stack } from "./section";

export function CollapsibleSection() {
  return (
    <Section
      title="Collapsible"
      description="A single show/hide section. Accordion is for several of them; this is for one."
    >
      <Stack label="trigger + content" className="max-w-md">
        <Collapsible>
          <Collapsible.Trigger
            render={
              <Button variant="ghost" size="sm" iconEnd={ChevronDownIcon}>
                Build logs
              </Button>
            }
          />
          <Collapsible.Content>
            <div className="flex flex-col gap-1 pt-2">
              <Text size="sm" mono tone="subtle">
                $ bun install
              </Text>
              <Text size="sm" mono tone="subtle">
                $ bun run build
              </Text>
              <Text size="sm" mono tone="subtle">
                ✓ built in 1.24s
              </Text>
            </div>
          </Collapsible.Content>
        </Collapsible>
      </Stack>

      <Stack label="defaultOpen" className="max-w-md">
        <Collapsible defaultOpen>
          <Collapsible.Trigger
            render={
              <Button variant="ghost" size="sm" iconEnd={ChevronDownIcon}>
                Environment variables
              </Button>
            }
          />
          <Collapsible.Content>
            <div className="flex flex-col gap-1 pt-2">
              <Text size="sm" tone="subtle">
                <Code>NODE_ENV</Code> = production
              </Text>
              <Text size="sm" tone="subtle">
                <Code>LOG_LEVEL</Code> = info
              </Text>
            </div>
          </Collapsible.Content>
        </Collapsible>
      </Stack>
    </Section>
  );
}
