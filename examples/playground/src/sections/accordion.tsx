import { Accordion, Badge, Text } from "@heyo-sh/heyo-ui";
import {
  GaugeIcon,
  HelpCircleIcon,
  MapPinIcon,
  ShieldIcon,
  TrendingUpIcon,
} from "../icons";
import { Section, Stack } from "./section";

export function AccordionSection() {
  return (
    <Section
      title="Accordion"
      description="Stacked collapsible sections. Build it from data, or compose it when a row needs its own markup."
    >
      <Stack label="items shorthand">
        <Accordion
          items={[
            {
              title: "What counts as a request?",
              icon: HelpCircleIcon,
              children:
                "Every HTTP request that reaches your Worker, including redirects.",
            },
            {
              title: "How are limits enforced?",
              icon: GaugeIcon,
              children: "Per account, per minute, with a burst allowance.",
            },
            {
              title: "Can I raise them?",
              icon: TrendingUpIcon,
              children: "Yes — from the plan page, or by contacting support.",
            },
            {
              title: "Enterprise only",
              icon: ShieldIcon,
              children: "Nothing to see here.",
              disabled: true,
            },
          ]}
        />
      </Stack>

      <Stack label="composed + multiple">
        <Accordion multiple defaultValue={["limits"]}>
          <Accordion.Item value="limits">
            <Accordion.Trigger icon={GaugeIcon}>
              <span className="flex items-center gap-2">
                Limits
                <Badge size="sm" variant="outline">
                  100 req/s
                </Badge>
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              <Text size="sm" tone="subtle">
                Bursts up to 1000 req/s are absorbed for 10 seconds.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="regions">
            <Accordion.Trigger icon={MapPinIcon}>Regions</Accordion.Trigger>
            <Accordion.Content>
              <Text size="sm" tone="subtle">
                300+ locations, picked automatically unless you pin one.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Section>
  );
}
