import { CodeBlock } from "@heyo-sh/heyo-ui";
import { CubeIcon } from "../icons";
import { Section, Stack } from "./section";

const install = `# install, then import the stylesheet once
bun add @heyo-sh/heyo-ui
echo '@import "@heyo-sh/heyo-ui";' >> src/app.css`;

const usage = `import { Button, Dialog } from "@heyo-sh/heyo-ui";
import "@heyo-sh/heyo-ui/styles.css";

/** Opens on click, closes on Escape, the backdrop, or the ✕. */
export function Invite({ count = 0 }) {
  const label = count > 0 ? \`Invite (\${count})\` : "Invite";

  return (
    <Dialog>
      <Dialog.Trigger render={<Button>{label}</Button>} />
      <Dialog.Content size="sm">
        <Dialog.Header>
          <Dialog.Title>Invite a teammate</Dialog.Title>
        </Dialog.Header>
      </Dialog.Content>
    </Dialog>
  );
}`;

const config = `{
  "name": "acme-api",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",
  "vars": { "LOG_LEVEL": "info", "RETRIES": 3 },
  "routes": [
    { "pattern": "api.acme.dev", "custom_domain": true }
  ]
}`;

const sql = `SELECT branch, count(*) AS builds, avg(duration_ms) AS p50
FROM deployments
WHERE created_at > now() - interval '7 days'
GROUP BY branch
ORDER BY builds DESC
LIMIT 10;`;

const css = `/* One ring, two states — no layout shift. */
.heyo-field {
  background: var(--color-heyo-control);
  box-shadow: 0 0 0 1px var(--color-heyo-line);
  transition: box-shadow 100ms ease;
}`;

export function CodeBlockSection() {
  return (
    <Section
      title="Code Block"
      description="Highlighted in monochrome, always dark in both colour modes — a code block is a quotation from a terminal, not another piece of UI. Tokens separate by lightness, italics and weight; the ramp lives in --code-* variables."
    >
      <Stack label="language + title + copy">
        <CodeBlock title="Terminal" language="sh">
          {install}
        </CodeBlock>
      </Stack>

      <Stack label="lineNumbers + highlight">
        <CodeBlock
          title="src/invite.tsx"
          icon={CubeIcon}
          language="tsx"
          lineNumbers
          highlight={[6, 7]}
        >
          {usage}
        </CodeBlock>
      </Stack>

      <Stack label="json + maxHeight">
        <CodeBlock
          title="wrangler.json"
          language="json"
          maxHeight="9rem"
          lineNumbers
        >
          {config}
        </CodeBlock>
      </Stack>

      <Stack label="sql / css">
        <CodeBlock language="sql">{sql}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </Stack>

      <Stack label="bare (no bar, no language)">
        <CodeBlock copy={false}>{`bun add @heyo-sh/heyo-ui`}</CodeBlock>
      </Stack>

      <Stack label="wrap">
        <CodeBlock wrap language="sh" title="One very long line">
          {`curl -X POST https://api.acme.dev/v1/deployments -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"branch":"main","message":"redeploy from CI"}'`}
        </CodeBlock>
      </Stack>
    </Section>
  );
}
