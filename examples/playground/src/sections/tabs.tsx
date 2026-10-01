import { Tabs, Text } from "@heyo-sh/heyo-ui";
import { ChartIcon, CubeIcon, GearIcon } from "../icons";
import { Section, Stack } from "./section";

export function TabsSection() {
  return (
    <Section
      title="Tabs"
      description="Three variants: line for page navigation, underline for panes, segmented for switching a single value."
    >
      <Stack label='variant="line" (default)'>
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="logs">Logs</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <Text tone="subtle">Traffic over the last 24 hours.</Text>
          </Tabs.Panel>
          <Tabs.Panel value="logs">
            <Text tone="subtle">Live tail is idle.</Text>
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <Text tone="subtle">Nothing to configure yet.</Text>
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Stack label='variant="underline"'>
        <Tabs defaultValue="workers" variant="underline">
          <Tabs.List>
            <Tabs.Tab value="workers">Workers</Tabs.Tab>
            <Tabs.Tab value="pages">Pages</Tabs.Tab>
            <Tabs.Tab value="r2">R2</Tabs.Tab>
            <Tabs.Tab value="d1">D1</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Stack>

      <Stack label='variant="segmented"'>
        <Tabs defaultValue="24h" variant="segmented">
          <Tabs.List>
            <Tabs.Tab value="1h">1h</Tabs.Tab>
            <Tabs.Tab value="24h">24h</Tabs.Tab>
            <Tabs.Tab value="7d">7d</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Stack>

      <Stack label="items shorthand + icons">
        <Tabs defaultValue="compute">
          <Tabs.List
            items={[
              { value: "compute", label: "Compute", icon: CubeIcon },
              { value: "analytics", label: "Analytics", icon: ChartIcon },
              { value: "settings", label: "Settings", icon: GearIcon },
              { value: "billing", label: "Billing", disabled: true },
            ]}
          />
        </Tabs>
      </Stack>
    </Section>
  );
}
