import { Badge, Combobox, Text, type ComboboxOption } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import {
  BoltIcon,
  MapPinIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
} from "../icons";
import { Example, Section, Stack } from "./section";

const regions: ComboboxOption[] = [
  {
    value: "fra",
    label: "Frankfurt",
    description: "eu-central",
    group: "Europe",
    icon: MapPinIcon,
  },
  {
    value: "waw",
    label: "Warsaw",
    description: "eu-central",
    group: "Europe",
    icon: MapPinIcon,
  },
  {
    value: "lhr",
    label: "London",
    description: "eu-west",
    group: "Europe",
    icon: MapPinIcon,
  },
  {
    value: "cdg",
    label: "Paris",
    description: "eu-west",
    group: "Europe",
    icon: MapPinIcon,
  },
  {
    value: "ams",
    label: "Amsterdam",
    description: "eu-west",
    group: "Europe",
    icon: MapPinIcon,
  },
  {
    value: "iad",
    label: "Ashburn",
    description: "us-east",
    group: "North America",
    icon: MapPinIcon,
  },
  {
    value: "sfo",
    label: "San Francisco",
    description: "us-west",
    group: "North America",
    icon: MapPinIcon,
  },
  {
    value: "ord",
    label: "Chicago",
    description: "us-central",
    group: "North America",
    icon: MapPinIcon,
  },
  {
    value: "nrt",
    label: "Tokyo",
    description: "ap-northeast",
    group: "Asia Pacific",
    icon: MapPinIcon,
  },
  {
    value: "sin",
    label: "Singapore",
    description: "ap-southeast",
    group: "Asia Pacific",
    icon: MapPinIcon,
  },
  {
    value: "syd",
    label: "Sydney",
    description: "ap-southeast",
    group: "Asia Pacific",
    icon: MapPinIcon,
  },
  {
    value: "bom",
    label: "Mumbai",
    description: "ap-south",
    group: "Asia Pacific",
    icon: MapPinIcon,
  },
];

const plans: ComboboxOption[] = [
  { value: "hobby", label: "Hobby", icon: UserIcon },
  { value: "pro", label: "Pro", icon: BoltIcon },
  { value: "team", label: "Team", icon: UsersIcon },
  {
    value: "enterprise",
    label: "Enterprise",
    icon: ShieldIcon,
    disabled: true,
  },
];

export function ComboboxSection() {
  return (
    <Section
      title="Combobox"
      description="A Select you can type into. Single picks one; multiple turns the choices into removable chips inside the control."
    >
      <Stack label="single" className="max-w-xs">
        <Combobox options={regions} placeholder="Pick a region" />
      </Stack>

      <Stack label="flat options (no groups)" className="max-w-xs">
        <Combobox
          options={plans}
          placeholder="Pick a plan"
          defaultValue="pro"
        />
      </Stack>

      <Stack label="multiple" className="max-w-md">
        <MultiExample />
      </Stack>

      <Stack label="multiple + maxChips" className="max-w-md">
        <Combobox
          multiple
          maxChips={3}
          options={regions}
          defaultValue={["fra", "waw", "lhr", "iad", "nrt"]}
          placeholder="Add a region"
        />
      </Stack>

      <Example label="size">
        <Combobox size="sm" options={plans} placeholder="sm" className="w-40" />
        <Combobox
          size="base"
          options={plans}
          placeholder="base"
          className="w-44"
        />
        <Combobox size="lg" options={plans} placeholder="lg" className="w-48" />
      </Example>

      <Example label="disabled / emptyMessage">
        <Combobox
          options={plans}
          defaultValue="hobby"
          disabled
          className="w-44"
        />
        <Combobox
          options={[]}
          placeholder="Nothing to pick"
          emptyMessage="No regions available on this plan."
          className="w-56"
        />
      </Example>
    </Section>
  );
}

function MultiExample() {
  const [value, setValue] = useState<string[]>(["fra", "iad"]);

  return (
    <>
      <Combobox
        multiple
        options={regions}
        value={value}
        onValueChange={setValue}
        placeholder={value.length ? "" : "Pick regions"}
      />
      <div className="flex items-center gap-2">
        <Text size="sm" tone="subtle">
          value
        </Text>
        <Badge variant="outline">[{value.join(", ")}]</Badge>
      </div>
    </>
  );
}
