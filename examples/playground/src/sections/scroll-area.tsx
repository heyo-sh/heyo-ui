import { Badge, Code, ScrollArea, Text } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

const lines = Array.from(
  { length: 40 },
  (_, i) =>
    `${String(i).padStart(2, "0")}:12:04  GET /v1/deployments  200  ${12 + (i % 40)}ms`,
);

const regions = [
  "Frankfurt",
  "Warsaw",
  "London",
  "Paris",
  "Amsterdam",
  "Ashburn",
  "San Francisco",
  "Chicago",
  "Toronto",
  "Tokyo",
  "Singapore",
  "Sydney",
  "Mumbai",
];

export function ScrollAreaSection() {
  return (
    <Section
      title="Scroll Area"
      description="A scroll container with a real scrollbar instead of the browser's: 6px everywhere, overlaid, and only visible while you're using it."
    >
      <Stack label="vertical (default)">
        <ScrollArea
          maxHeight="12rem"
          className="rounded-lg bg-heyo-base ring-1 ring-heyo-line"
          viewportClassName="p-3"
        >
          <div className="flex flex-col gap-1">
            {lines.map((line) => (
              <Code key={line} className="whitespace-pre">
                {line}
              </Code>
            ))}
          </div>
        </ScrollArea>
      </Stack>

      <Stack label="fade={false}">
        <ScrollArea
          maxHeight="12rem"
          fade={false}
          className="rounded-lg bg-heyo-base ring-1 ring-heyo-line"
          viewportClassName="p-3"
        >
          <div className="flex flex-col gap-2">
            {regions.map((region) => (
              <div key={region} className="flex items-center gap-2">
                <Badge dot size="sm" variant="success">
                  live
                </Badge>
                <Text size="sm">{region}</Text>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Stack>

      <Stack label='orientation="horizontal"'>
        <ScrollArea
          orientation="horizontal"
          className="rounded-lg bg-heyo-base ring-1 ring-heyo-line"
          viewportClassName="p-3"
        >
          <div className="flex w-max gap-2">
            {regions.map((region) => (
              <div
                key={region}
                className="flex h-20 w-40 shrink-0 flex-col justify-end rounded-md bg-heyo-elevated p-3 ring-1 ring-heyo-hairline"
              >
                <Text size="sm" className="font-medium">
                  {region}
                </Text>
                <Text size="xs" tone="subtle">
                  {(Math.random() * 900 + 100).toFixed(0)}k requests
                </Text>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Stack>

      <Stack label="heyo-scrollbar (native, no extra element)">
        <Text size="sm" tone="subtle">
          When you don't need an overlay scrollbar — tables, dialog bodies, the
          sidebar — the utility styles the browser's own.
        </Text>
        <div className="max-h-40 overflow-y-auto rounded-lg bg-heyo-base p-3 ring-1 ring-heyo-line heyo-scrollbar">
          <div className="flex flex-col gap-1">
            {lines.slice(0, 20).map((line) => (
              <Code key={line} className="whitespace-pre">
                {line}
              </Code>
            ))}
          </div>
        </div>
      </Stack>
    </Section>
  );
}
