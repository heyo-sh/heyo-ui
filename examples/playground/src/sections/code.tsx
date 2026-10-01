import { Code, Text } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

export function CodeSection() {
  return (
    <Section
      title="Code"
      description="Inline code. Pairs with Kbd when you're documenting shortcuts."
    >
      <Example label="inline">
        <Code>wrangler.toml</Code>
        <Code>--env production</Code>
        <Code>npx heyo init</Code>
      </Example>

      <Example label="in a sentence" className="block">
        <Text>
          Add a <Code>name</Code> field to <Code>wrangler.toml</Code>, then run{" "}
          <Code>bun run deploy</Code>.
        </Text>
      </Example>

      <Example label="in small text" className="block">
        <Text size="sm" tone="subtle">
          Defaults to <Code>base</Code> — the 32px control height.
        </Text>
      </Example>
    </Section>
  );
}
