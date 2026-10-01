import { Button, Spinner, Text } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

export function SpinnerSection() {
  return (
    <Section
      title="Spinner"
      description="An indeterminate loading indicator, for when there's no percentage to show. Eight spokes on a stepped rotation — it ticks rather than sweeps."
    >
      <Example label="size">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="base" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </Example>

      <Example label="label (screen readers only)">
        <Spinner label="Loading deployments" />
      </Example>

      <Example label="in context">
        <div className="flex items-center gap-2">
          <Spinner size="sm" />
          <Text size="sm" tone="subtle">
            Tailing logs…
          </Text>
        </div>
        <Button loading>Deploying</Button>
      </Example>
    </Section>
  );
}
