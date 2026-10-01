import { Code, CopyButton, Input, Text } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

export function CopyButtonSection() {
  return (
    <Section
      title="Copy Button"
      description="Copy to clipboard, with the one piece of feedback that matters: the icon becomes a tick and stays long enough to be believed."
    >
      <Example label="icon only (default)">
        <CopyButton value="a1b2c3d4e5f6" />
        <CopyButton value="a1b2c3d4e5f6" variant="outline" />
        <CopyButton value="a1b2c3d4e5f6" variant="secondary" />
      </Example>

      <Example label="with a label">
        <CopyButton value="npm i @heyo-sh/heyo-ui" variant="outline">
          Copy
        </CopyButton>
        <CopyButton value="whatever" variant="secondary">
          Copy token
        </CopyButton>
      </Example>

      <Example label="in context">
        <div className="flex items-center gap-1.5 rounded-lg bg-heyo-recessed px-2 py-1">
          <Code>a1b2c3d</Code>
          <CopyButton value="a1b2c3d" size="xs" />
        </div>
        <Input
          readOnly
          defaultValue="sk_live_51H8xQ2eZvKYlo2C"
          aria-label="API key"
          className="w-64 font-mono"
        />
        <CopyButton value="sk_live_51H8xQ2eZvKYlo2C" variant="outline" />
      </Example>

      <Example label="timeout">
        <CopyButton value="slow" timeout={4000} variant="outline">
          Four seconds
        </CopyButton>
        <Text size="sm" tone="subtle">
          How long the ✓ stays.
        </Text>
      </Example>
    </Section>
  );
}
