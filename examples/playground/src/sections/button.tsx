import { Button } from "@heyo-sh/heyo-ui";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "../icons";
import { Example, Section } from "./section";

export function ButtonSection() {
  return (
    <Section
      title="Button"
      description="The one control everything else is measured against: 32px tall, rings instead of borders, seven variants."
    >
      <Example label="variant">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive-secondary">Delete</Button>
        <Button variant="link">Link</Button>
      </Example>

      <Example label="size">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="base">Base</Button>
        <Button size="lg">Large</Button>
      </Example>

      <Example label="icon / iconEnd">
        <Button variant="primary" icon={PlusIcon}>
          Create worker
        </Button>
        <Button iconEnd={ChevronDownIcon}>Environment</Button>
        <Button variant="destructive-secondary" icon={TrashIcon}>
          Delete
        </Button>
      </Example>

      <Example label="shape">
        <Button shape="square" icon={PlusIcon} aria-label="Add" />
        <Button shape="square" size="sm" icon={PlusIcon} aria-label="Add" />
        <Button shape="square" size="xs" icon={PlusIcon} aria-label="Add" />
        <div className="w-56">
          <Button shape="block" variant="primary">
            Block
          </Button>
        </div>
      </Example>

      <Example label="loading / disabled">
        <Button loading>Deploying</Button>
        <Button variant="primary" loading>
          Deploying
        </Button>
        <Button disabled>Disabled</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </Example>
    </Section>
  );
}
