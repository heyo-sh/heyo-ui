import { Checkbox, Text, useSelection } from "@heyo-sh/heyo-ui";
import { useMemo } from "react";
import { Example, Section, Stack } from "./section";

export function CheckboxSection() {
  return (
    <Section
      title="Checkbox"
      description="With a label it renders the whole clickable row; without one, just the box."
    >
      <Stack label="label" className="gap-2.5">
        <Checkbox label="Enable logs" defaultChecked />
        <Checkbox label="Auto-deploy" />
      </Stack>

      <Stack label="description" className="gap-2.5">
        <Checkbox
          label="Auto-deploy"
          description="Ship on every push to main."
          defaultChecked
        />
        <Checkbox
          label="Preview URLs"
          description="Every pull request gets its own hostname."
        />
      </Stack>

      <Stack label="indeterminate (the select-all box, and nothing else)">
        <SelectAll />
      </Stack>

      <Stack label="disabled" className="gap-2.5">
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled, checked" defaultChecked disabled />
      </Stack>

      <Example label="bare (aria-label)">
        <Checkbox aria-label="Select row" />
        <Checkbox aria-label="Select row" defaultChecked />
      </Example>
    </Section>
  );
}

/**
 * `indeterminate` is not a third value the user can pick — it is a *summary*.
 * The only place it belongs is a parent box standing in for a list of children,
 * where "some of them" is a real answer and neither ✓ nor ☐ is honest.
 */
function SelectAll() {
  const regions = useMemo(
    () => ["Frankfurt", "Warsaw", "Ashburn", "Tokyo"],
    [],
  );
  const selection = useSelection(regions, ["Warsaw"]);

  return (
    <div className="flex flex-col gap-2.5">
      <Checkbox
        label="All regions"
        checked={selection.allSelected}
        indeterminate={selection.someSelected}
        onCheckedChange={(checked) => selection.toggleAll(checked)}
      />
      <div className="flex flex-col gap-2.5 border-l border-heyo-hairline pl-4">
        {regions.map((region) => (
          <Checkbox
            key={region}
            label={region}
            checked={selection.isSelected(region)}
            onCheckedChange={(checked) => selection.toggle(region, checked)}
          />
        ))}
      </div>
      <Text size="sm" tone="subtle">
        {selection.count} of {regions.length} selected — the parent box shows a
        dash while that's neither none nor all.
      </Text>
    </div>
  );
}
