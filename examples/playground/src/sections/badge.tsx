import { Badge, Text } from "@heyo-sh/heyo-ui";
import { BoltIcon } from "../icons";
import { Example, Section } from "./section";

export function BadgeSection() {
  return (
    <Section
      title="Badge"
      description="A status chip. Tints for meaning, outline for metadata, contrast when it has to win."
    >
      <Example label="variant">
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="brand">Beta</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Healthy</Badge>
        <Badge variant="warning">Degraded</Badge>
        <Badge variant="danger">Down</Badge>
        <Badge variant="outline">v2.14.0</Badge>
        <Badge variant="contrast">Pro</Badge>
        <Badge variant="count">12</Badge>
      </Example>

      <Example label='variant="count" (this is Sidebar.MenuBadge)'>
        <Badge variant="count" size="sm">
          7
        </Badge>
        <Badge variant="count">128</Badge>
        <Badge variant="count">3 selected</Badge>
        <Text size="sm" tone="subtle">
          The dashed edge marks a count that belongs to its row, not to the
          page. `Sidebar.MenuBadge` is exactly this badge.
        </Text>
      </Example>

      <Example label="dot">
        <Badge dot variant="success">
          Healthy
        </Badge>
        <Badge dot variant="warning">
          Degraded
        </Badge>
        <Badge dot variant="danger">
          Down
        </Badge>
        <Badge dot variant="neutral">
          Paused
        </Badge>
      </Example>

      <Example label="size">
        <Badge size="sm" variant="brand">
          Small
        </Badge>
        <Badge size="base" variant="brand">
          Base
        </Badge>
        <Badge size="sm" dot variant="success">
          Live
        </Badge>
      </Example>

      <Example label="icon">
        <Badge icon={BoltIcon} variant="warning">
          Rate limited
        </Badge>
        <Badge icon={BoltIcon} variant="outline" size="sm">
          Edge
        </Badge>
      </Example>
    </Section>
  );
}
