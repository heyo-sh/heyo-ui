import { Button, ButtonGroup } from "@heyo-sh/heyo-ui";
import { ChevronDownIcon, CopyIcon, RefreshIcon, TrashIcon } from "../icons";
import { Example, Section } from "./section";

export function ButtonGroupSection() {
  return (
    <Section
      title="Button Group"
      description="Welds buttons into a single control — shared edges collapse and only the outer corners stay round."
    >
      <Example label="horizontal">
        <ButtonGroup>
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </Example>

      <Example label="split action">
        <ButtonGroup>
          <Button variant="primary">Deploy</Button>
          <Button
            variant="primary"
            shape="square"
            icon={ChevronDownIcon}
            aria-label="Deploy options"
          />
        </ButtonGroup>
      </Example>

      <Example label="icon only">
        <ButtonGroup>
          <Button shape="square" icon={RefreshIcon} aria-label="Redeploy" />
          <Button shape="square" icon={CopyIcon} aria-label="Copy id" />
          <Button shape="square" icon={TrashIcon} aria-label="Delete" />
        </ButtonGroup>
      </Example>

      <Example label="size">
        <ButtonGroup>
          <Button size="sm">1h</Button>
          <Button size="sm">24h</Button>
          <Button size="sm">7d</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="xs">1h</Button>
          <Button size="xs">24h</Button>
          <Button size="xs">7d</Button>
        </ButtonGroup>
      </Example>

      <Example label='orientation="vertical"'>
        <ButtonGroup orientation="vertical">
          <Button>Restart</Button>
          <Button>Rollback</Button>
          <Button variant="destructive-secondary">Delete</Button>
        </ButtonGroup>
      </Example>
    </Section>
  );
}
