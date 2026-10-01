import { Button, Dropdown, Kbd } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import {
  ChevronDownIcon,
  CopyIcon,
  GearIcon,
  RefreshIcon,
  TrashIcon,
} from "../icons";
import { Example, Section } from "./section";

export function DropdownSection() {
  const [density, setDensity] = useState("comfortable");
  const [columns, setColumns] = useState(["status"]);

  return (
    <Section
      title="Dropdown"
      description="An action menu. Compose the rows, or pass a data array to Dropdown.Content. Non-modal by default — the page keeps scrolling behind it."
    >
      <Example label="composed">
        <Dropdown>
          <Dropdown.Trigger
            render={<Button iconEnd={ChevronDownIcon}>Actions</Button>}
          />
          <Dropdown.Content>
            <Dropdown.Item icon={RefreshIcon} shortcut={<Kbd>R</Kbd>}>
              Redeploy
            </Dropdown.Item>
            <Dropdown.Item icon={CopyIcon}>Copy deployment id</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item icon={TrashIcon} destructive>
              Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Example>

      <Example label="items shorthand">
        <Dropdown>
          <Dropdown.Trigger
            render={
              <Button variant="outline" iconEnd={ChevronDownIcon}>
                Manage
              </Button>
            }
          />
          <Dropdown.Content
            items={[
              { label: "Rename", onClick: () => {} },
              { label: "Duplicate", onClick: () => {} },
              "separator",
              {
                label: "Move to",
                items: [
                  { label: "Production", onClick: () => {} },
                  { label: "Staging", onClick: () => {} },
                ],
              },
              "separator",
              { label: "Delete", destructive: true, onClick: () => {} },
              { label: "Transfer", disabled: true },
            ]}
          />
        </Dropdown>
      </Example>

      <Example label="groups + labels">
        <Dropdown>
          <Dropdown.Trigger
            render={
              <Button variant="ghost" icon={GearIcon} aria-label="Settings" />
            }
          />
          <Dropdown.Content align="start">
            <Dropdown.Group>
              <Dropdown.Label>Account</Dropdown.Label>
              <Dropdown.Item shortcut={<Kbd>P</Kbd>}>Profile</Dropdown.Item>
              <Dropdown.Item>Billing</Dropdown.Item>
            </Dropdown.Group>
            <Dropdown.Separator />
            <Dropdown.Group>
              <Dropdown.Label>Workspace</Dropdown.Label>
              <Dropdown.Item>Members</Dropdown.Item>
              <Dropdown.Item>Audit log</Dropdown.Item>
            </Dropdown.Group>
          </Dropdown.Content>
        </Dropdown>
      </Example>

      <Example label="CheckboxItem">
        <Dropdown>
          <Dropdown.Trigger
            render={
              <Button variant="outline" iconEnd={ChevronDownIcon}>
                Columns ({columns.length})
              </Button>
            }
          />
          <Dropdown.Content>
            {["status", "branch", "duration", "author"].map((column) => (
              <Dropdown.CheckboxItem
                key={column}
                checked={columns.includes(column)}
                onCheckedChange={(checked) =>
                  setColumns((current) =>
                    checked
                      ? [...current, column]
                      : current.filter((c) => c !== column),
                  )
                }
                closeOnClick={false}
              >
                {column}
              </Dropdown.CheckboxItem>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </Example>

      <Example label="RadioGroup">
        <Dropdown>
          <Dropdown.Trigger
            render={
              <Button variant="outline" iconEnd={ChevronDownIcon}>
                {density}
              </Button>
            }
          />
          <Dropdown.Content>
            <Dropdown.RadioGroup
              value={density}
              onValueChange={(value) => setDensity(String(value))}
            >
              <Dropdown.Label>Density</Dropdown.Label>
              <Dropdown.RadioItem value="compact">Compact</Dropdown.RadioItem>
              <Dropdown.RadioItem value="comfortable">
                Comfortable
              </Dropdown.RadioItem>
              <Dropdown.RadioItem value="spacious">Spacious</Dropdown.RadioItem>
            </Dropdown.RadioGroup>
          </Dropdown.Content>
        </Dropdown>
      </Example>

      <Example label="submenu">
        <Dropdown>
          <Dropdown.Trigger
            render={<Button iconEnd={ChevronDownIcon}>Share</Button>}
          />
          <Dropdown.Content>
            <Dropdown.Item>Copy link</Dropdown.Item>
            <Dropdown.Sub>
              <Dropdown.SubTrigger>Invite by role</Dropdown.SubTrigger>
              <Dropdown.SubContent>
                <Dropdown.Item>Viewer</Dropdown.Item>
                <Dropdown.Item>Developer</Dropdown.Item>
                <Dropdown.Item>Admin</Dropdown.Item>
              </Dropdown.SubContent>
            </Dropdown.Sub>
          </Dropdown.Content>
        </Dropdown>
      </Example>
    </Section>
  );
}
