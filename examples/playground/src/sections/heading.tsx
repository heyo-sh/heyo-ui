import { Heading } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function HeadingSection() {
  return (
    <Section
      title="Heading"
      description="Six levels, all dense. Hierarchy comes from weight and colour more than size."
    >
      <Stack label="level" className="gap-1.5">
        <Heading level={1}>Heading one</Heading>
        <Heading level={2}>Heading two</Heading>
        <Heading level={3}>Heading three</Heading>
        <Heading level={4}>Heading four</Heading>
        <Heading level={5}>Heading five</Heading>
        <Heading level={6}>Heading six</Heading>
      </Stack>

      <Stack label="className (tone override)" className="gap-1.5">
        <Heading level={5} className="text-heyo-subtle">
          Section label
        </Heading>
      </Stack>
    </Section>
  );
}
