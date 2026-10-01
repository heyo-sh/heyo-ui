import { Badge, Button, Tooltip } from "@heyo-sh/heyo-ui";
import { RefreshIcon } from "../icons";
import { Example, Section } from "./section";

export function TooltipSection() {
  return (
    <Section
      title="Tooltip"
      description="A hover or focus hint. Opens instantly, needs no provider, and never holds anything interactive."
    >
      <Example label="side">
        <Tooltip content="Opens instantly" side="top">
          <Button variant="secondary">Top</Button>
        </Tooltip>
        <Tooltip content="Anchored right" side="right">
          <Button variant="secondary">Right</Button>
        </Tooltip>
        <Tooltip content="Anchored bottom" side="bottom">
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip content="Anchored left" side="left">
          <Button variant="secondary">Left</Button>
        </Tooltip>
      </Example>

      <Example label="align">
        <Tooltip content="Aligned to the start" align="start">
          <Button variant="outline">start</Button>
        </Tooltip>
        <Tooltip content="Centred" align="center">
          <Button variant="outline">center</Button>
        </Tooltip>
        <Tooltip content="Aligned to the end" align="end">
          <Button variant="outline">end</Button>
        </Tooltip>
      </Example>

      <Example label="arrow / delay">
        <Tooltip content="Pointer on by default">
          <Button variant="outline">arrow</Button>
        </Tooltip>
        <Tooltip content="No pointer" arrow={false}>
          <Button variant="outline">arrow=false</Button>
        </Tooltip>
        <Tooltip content="Waited 500ms" delay={500}>
          <Button variant="outline">delay=500</Button>
        </Tooltip>
      </Example>

      <Example label="on anything">
        <Tooltip content="Redeploy" side="right">
          <Button shape="square" icon={RefreshIcon} aria-label="Redeploy" />
        </Tooltip>
        <Tooltip content="Last checked 30s ago">
          <Badge dot variant="success">
            Healthy
          </Badge>
        </Tooltip>
      </Example>
    </Section>
  );
}
