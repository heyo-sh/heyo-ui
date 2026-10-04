import { Select } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

/**
 * Passed to the root so the trigger renders the *label* of the selected item
 * rather than its raw value.
 */
const regionLabels = {
  fra: "Frankfurt",
  waw: "Warsaw",
  lhr: "London",
  cdg: "Paris",
  ams: "Amsterdam",
  iad: "Ashburn",
  sfo: "San Francisco",
  ord: "Chicago",
  yyz: "Toronto",
  nrt: "Tokyo",
  sin: "Singapore",
  syd: "Sydney",
  bom: "Mumbai",
};

const regionGroups = [
  {
    label: "Europe",
    items: [
      { value: "fra", label: "Frankfurt" },
      { value: "waw", label: "Warsaw" },
      { value: "lhr", label: "London" },
      { value: "cdg", label: "Paris" },
      { value: "ams", label: "Amsterdam" },
    ],
  },
  {
    label: "North America",
    items: [
      { value: "iad", label: "Ashburn" },
      { value: "sfo", label: "San Francisco" },
      { value: "ord", label: "Chicago" },
      { value: "yyz", label: "Toronto" },
    ],
  },
  {
    label: "Asia Pacific",
    items: [
      { value: "nrt", label: "Tokyo" },
      { value: "sin", label: "Singapore" },
      { value: "syd", label: "Sydney" },
      { value: "bom", label: "Mumbai" },
    ],
  },
];

const windows = { "1h": "Last hour", "24h": "Last 24 hours" };

export function SelectSection() {
  return (
    <Section
      title="Select"
      description="A single-choice dropdown. Compose the items, or hand the shape straight to Select.Content."
    >
      <Example label="composed" className="max-w-xs">
        <Select items={regionLabels} defaultValue="fra">
          <Select.Trigger placeholder="Pick a region" />
          <Select.Content>
            <Select.Group>
              <Select.GroupLabel>Europe</Select.GroupLabel>
              <Select.Item value="fra">Frankfurt</Select.Item>
              <Select.Item value="waw">Warsaw</Select.Item>
              <Select.Item value="lhr">London</Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>North America</Select.GroupLabel>
              <Select.Item value="iad">Ashburn</Select.Item>
              <Select.Item value="sfo">San Francisco</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </Example>

      <Example
        label="label / description / error"
        className="max-w-xs flex-col items-stretch gap-4"
      >
        <Select items={regionLabels} defaultValue="fra" label="Region">
          <Select.Trigger placeholder="Pick a region" />
          <Select.Content items={regionGroups} />
        </Select>
        <Select
          items={regionLabels}
          label="Region"
          description="Where the worker runs."
          error="Pick one before deploying."
        >
          <Select.Trigger placeholder="Pick a region" />
          <Select.Content items={regionGroups} />
        </Select>
      </Example>

      <Example label="items shorthand (grouped)" className="max-w-xs">
        <Select items={regionLabels}>
          <Select.Trigger placeholder="Pick a region" />
          <Select.Content items={regionGroups} />
        </Select>
      </Example>

      <Example label="size">
        <Select items={windows} defaultValue="1h">
          <Select.Trigger size="xs" className="w-32" />
          <Select.Content
            items={[
              { value: "1h", label: "Last hour" },
              { value: "24h", label: "Last 24 hours" },
            ]}
          />
        </Select>
        <Select items={windows} defaultValue="1h">
          <Select.Trigger size="sm" className="w-36" />
          <Select.Content
            items={[
              { value: "1h", label: "Last hour" },
              { value: "24h", label: "Last 24 hours" },
            ]}
          />
        </Select>
        <Select items={windows} defaultValue="1h">
          <Select.Trigger size="base" className="w-40" />
          <Select.Content
            items={[
              { value: "1h", label: "Last hour" },
              { value: "24h", label: "Last 24 hours" },
            ]}
          />
        </Select>
        <Select items={windows} defaultValue="1h">
          <Select.Trigger size="lg" className="w-44" />
          <Select.Content
            items={[
              { value: "1h", label: "Last hour" },
              { value: "24h", label: "Last 24 hours" },
            ]}
          />
        </Select>
      </Example>

      <Example label="disabled item / disabled">
        <Select
          items={{ hobby: "Hobby", pro: "Pro", enterprise: "Enterprise" }}
          defaultValue="hobby"
        >
          <Select.Trigger className="w-40" />
          <Select.Content
            items={[
              { value: "hobby", label: "Hobby" },
              { value: "pro", label: "Pro" },
              { value: "enterprise", label: "Enterprise", disabled: true },
            ]}
          />
        </Select>
        <Select items={regionLabels} defaultValue="fra" disabled>
          <Select.Trigger className="w-40" />
          <Select.Content items={regionGroups} />
        </Select>
      </Example>
    </Section>
  );
}
