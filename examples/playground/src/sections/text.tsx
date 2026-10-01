import { Text } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function TextSection() {
  return (
    <Section
      title="Text"
      description="The typographic workhorse: every size, tone and weight in the system, one prop each."
    >
      <Stack label="size" className="gap-1">
        <Text size="xs">Extra small — 12px</Text>
        <Text size="sm">Small — 13px</Text>
        <Text size="base">Base — 14px</Text>
        <Text size="lg">Large — 16px</Text>
        <Text size="xl">Extra large — 18px</Text>
        <Text size="2xl">2xl</Text>
        <Text size="3xl">3xl</Text>
      </Stack>

      <Stack label="tone" className="gap-1">
        <Text tone="strong">Strong</Text>
        <Text tone="default">Default</Text>
        <Text tone="subtle">Subtle</Text>
        <Text tone="inactive">Inactive</Text>
        <Text tone="brand">Brand</Text>
        <Text tone="success">Success</Text>
        <Text tone="warning">Warning</Text>
        <Text tone="danger">Danger</Text>
      </Stack>

      <Stack label="weight" className="gap-1">
        <Text weight="normal">Normal — lives inside a surface</Text>
        <Text weight="medium">Medium — names a surface or group</Text>
        <Text weight="semibold">Semibold</Text>
      </Stack>

      <Stack label="mono" className="gap-1">
        <Text mono size="sm" tone="subtle">
          wrangler deploy --env production
        </Text>
      </Stack>

      <Stack label="truncate" className="max-w-xs">
        <Text truncate>
          A very long single line that has to end somewhere, and does so with an
          ellipsis rather than a wrap.
        </Text>
      </Stack>

      <Stack label='as="span"'>
        <Text as="span" size="sm" tone="subtle">
          Rendered as a span, inline with its neighbours.
        </Text>
      </Stack>
    </Section>
  );
}
