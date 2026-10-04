import {
  Button,
  Checkbox,
  Dialog,
  Dropdown,
  Input,
  Select,
  Text,
  Tooltip,
  toast,
} from "@heyo-sh/heyo-ui";
import { useState } from "react";
import {
  DeviceFloppyIcon,
  KeyIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "../icons";
import { Example, Section } from "./section";

export function DialogSection() {
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Dialog"
      description="One dialog for every modal task. Header, body and footer are separate slots, so the body is the only thing that scrolls."
    >
      <Example label="trigger">
        <Dialog>
          <Dialog.Trigger render={<Button>Open dialog</Button>} />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Invite a teammate</Dialog.Title>
              <Dialog.Description>
                They'll get access to every project in this account.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <Input label="Email" placeholder="you@example.com" />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
              <Button variant="primary" icon={UserPlusIcon}>
                Send invite
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
        <Text size="sm" tone="subtle">
          Escape, the backdrop and the ✕ all close it.
        </Text>
      </Example>

      {/* The regression this example exists for: a popup opened inside a
          dialog is portalled into the dialog's own portal node, so without a
          layer on the positioner it opens *underneath* the dialog. */}
      <Example label="popups inside it">
        <Dialog>
          <Dialog.Trigger
            render={<Button variant="outline">Invite an editor</Button>}
          />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Invite an editor</Dialog.Title>
              <Dialog.Description>
                The select, the menu and the tooltip all open over the dialog,
                not behind it.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body className="flex flex-col gap-4">
              <Input label="Email" placeholder="you@example.com" />
              <Select defaultValue="editor" label="Role">
                <Select.Trigger />
                <Select.Content
                  items={[
                    { value: "admin", label: "Admin" },
                    { value: "editor", label: "Editor" },
                    { value: "viewer", label: "Viewer" },
                  ]}
                />
              </Select>
              <div className="flex items-center gap-2">
                <Dropdown>
                  <Dropdown.Trigger
                    render={<Button variant="outline">Permissions</Button>}
                  />
                  <Dropdown.Content
                    items={[{ label: "Publish" }, { label: "Delete" }]}
                  />
                </Dropdown>
                <Tooltip content="Nothing covers a tooltip.">
                  <Button variant="ghost">Hover me</Button>
                </Tooltip>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
              <Button variant="primary" icon={UserPlusIcon}>
                Send invite
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Example>

      <Example label="confirm (it's just a dialog with two buttons)">
        <Dialog>
          <Dialog.Trigger
            render={
              <Button variant="destructive-secondary" icon={TrashIcon}>
                Delete
              </Button>
            }
          />
          <Dialog.Content size="sm">
            <Dialog.Header>
              <Dialog.Title>Delete acme-api?</Dialog.Title>
              <Dialog.Description>
                This removes the worker, its routes and all secrets. It cannot
                be undone.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
              <Dialog.Close
                render={
                  <Button
                    variant="destructive"
                    icon={TrashIcon}
                    onClick={() => toast.success("Deleted acme-api")}
                  >
                    Delete forever
                  </Button>
                }
              />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Example>

      <Example label="dismissible={false}">
        <Dialog dismissible={false}>
          <Dialog.Trigger
            render={
              <Button variant="outline" icon={KeyIcon}>
                Revoke token
              </Button>
            }
          />
          <Dialog.Content size="sm" hideClose>
            <Dialog.Header>
              <Dialog.Title>Revoke this token?</Dialog.Title>
              <Dialog.Description>
                Anything using it stops working immediately. Escape and the
                backdrop are disabled — you have to answer.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <Checkbox label="Also rotate the signing key" />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="ghost">Keep it</Button>} />
              <Dialog.Close
                render={<Button variant="destructive">Revoke</Button>}
              />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Example>

      <Example label="controlled">
        <Button
          variant="secondary"
          icon={PencilIcon}
          onClick={() => setOpen(true)}
        >
          Rename project
        </Button>
        <Text size="sm" tone="subtle">
          open: {String(open)}
        </Text>
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Rename acme-api</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input label="Project name" defaultValue="acme-api" />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
              <Button
                variant="primary"
                icon={DeviceFloppyIcon}
                onClick={() => setOpen(false)}
              >
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Example>

      <Example label="size">
        {(["sm", "base", "lg", "xl"] as const).map((size) => (
          <Dialog key={size}>
            <Dialog.Trigger
              render={<Button variant="outline">{size}</Button>}
            />
            <Dialog.Content size={size}>
              <Dialog.Header>
                <Dialog.Title>size=&quot;{size}&quot;</Dialog.Title>
                <Dialog.Description>
                  Widths cap out at the size; the height follows the content.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="ghost">Close</Button>} />
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        ))}
      </Example>

      <Example label="scrolling body">
        <Dialog>
          <Dialog.Trigger
            render={<Button variant="outline">Long body</Button>}
          />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Release notes</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="flex flex-col gap-2">
              {Array.from({ length: 24 }, (_, i) => (
                <Text key={i} size="sm" tone="subtle">
                  {i + 1}. Fixed a rounding error in the request counter.
                </Text>
              ))}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close
                render={<Button variant="primary">Got it</Button>}
              />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Example>
    </Section>
  );
}
