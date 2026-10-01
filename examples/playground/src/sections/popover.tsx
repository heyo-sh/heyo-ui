import { Button, Checkbox, Input, Popover, Text } from "@heyo-sh/heyo-ui";
import {
  DeviceFloppyIcon,
  FilterIcon,
  InfoCircleIcon,
  PencilIcon,
} from "../icons";
import { Example, Section } from "./section";

export function PopoverSection() {
  return (
    <Section
      title="Popover"
      description="Rich content anchored to a trigger. Tooltip for a label, Dropdown for actions, this for its own layout."
    >
      <Example label="title + description">
        <Popover>
          <Popover.Trigger
            render={<Button icon={FilterIcon}>Filters</Button>}
          />
          <Popover.Content
            title="Filters"
            description="Narrow the deployment list."
          >
            <div className="flex flex-col gap-2.5">
              <Checkbox label="Only failures" />
              <Checkbox label="Last 24 hours" defaultChecked />
              <Checkbox label="Preview branches" />
            </div>
          </Popover.Content>
        </Popover>
      </Example>

      <Example label="form + Popover.Close">
        <Popover>
          <Popover.Trigger
            render={
              <Button variant="outline" icon={PencilIcon}>
                Rename
              </Button>
            }
          />
          <Popover.Content title="Rename project">
            <div className="flex flex-col gap-3">
              <Input defaultValue="acme-api" aria-label="Project name" />
              <div className="flex justify-end gap-2">
                <Popover.Close
                  render={
                    <Button size="sm" variant="ghost">
                      Cancel
                    </Button>
                  }
                />
                <Popover.Close
                  render={
                    <Button size="sm" variant="primary" icon={DeviceFloppyIcon}>
                      Save
                    </Button>
                  }
                />
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </Example>

      <Example label="side / align">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Popover key={side}>
            <Popover.Trigger
              render={<Button variant="secondary">{side}</Button>}
            />
            <Popover.Content side={side} align="center" className="max-w-56">
              <Text size="sm" tone="subtle">
                Anchored {side}, flipping when there's no room.
              </Text>
            </Popover.Content>
          </Popover>
        ))}
      </Example>

      <Example label="bare (no title)">
        <Popover>
          <Popover.Trigger
            render={
              <Button variant="ghost" icon={InfoCircleIcon}>
                Details
              </Button>
            }
          />
          <Popover.Content className="max-w-64">
            <Text size="sm">
              Built from <code>a1b2c3d</code> 4 minutes ago, 42s of CPU time.
            </Text>
          </Popover.Content>
        </Popover>
      </Example>
    </Section>
  );
}
