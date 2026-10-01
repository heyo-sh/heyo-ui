import {
  Badge,
  Button,
  Field,
  Input,
  Sheet,
  Switch,
  Text,
  Textarea,
} from "@heyo-sh/heyo-ui";
import { DeviceFloppyIcon, ListIcon, MapPinIcon, PencilIcon } from "../icons";
import { Example, Section } from "./section";

export function SheetSection() {
  return (
    <Section
      title="Sheet"
      description="A panel that slides in from an edge — usually the right. For a side quest to the page, where a centred dialog would hide the thing you're working on."
    >
      <Example label="side (default: right)">
        {(["right", "left", "top", "bottom"] as const).map((side) => (
          <Sheet key={side}>
            <Sheet.Trigger render={<Button variant="outline">{side}</Button>} />
            <Sheet.Content side={side}>
              <Sheet.Header>
                <Sheet.Title>side=&quot;{side}&quot;</Sheet.Title>
                <Sheet.Description>
                  Flush with the edge it came from, with no radius against it.
                </Sheet.Description>
              </Sheet.Header>
              <Sheet.Body>
                <Text size="sm" tone="subtle">
                  Escape, the backdrop and the ✕ all close it.
                </Text>
              </Sheet.Body>
            </Sheet.Content>
          </Sheet>
        ))}
      </Example>

      <Example label="detail pane">
        <Sheet>
          <Sheet.Trigger
            render={<Button icon={PencilIcon}>Edit project</Button>}
          />
          <Sheet.Content size="lg">
            <Sheet.Header>
              <Sheet.Title>acme-api</Sheet.Title>
              <Sheet.Description>
                Changes apply on the next deploy.
              </Sheet.Description>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col gap-4">
              <Input label="Name" defaultValue="acme-api" />
              <Textarea
                label="Description"
                rows={3}
                defaultValue="Public API for the acme dashboard."
              />
              <Switch
                defaultChecked
                label="Auto-deploy"
                description="Ship on every push to main."
              />
              <Field label="Region" description="Where the worker runs first.">
                <Badge variant="outline" icon={MapPinIcon}>
                  Frankfurt
                </Badge>
              </Field>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close render={<Button variant="ghost">Cancel</Button>} />
              <Button variant="primary" icon={DeviceFloppyIcon}>
                Save changes
              </Button>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>
      </Example>

      <Example label="size">
        {(["sm", "base", "lg", "xl"] as const).map((size) => (
          <Sheet key={size}>
            <Sheet.Trigger
              render={<Button variant="secondary">{size}</Button>}
            />
            <Sheet.Content size={size}>
              <Sheet.Header>
                <Sheet.Title>size=&quot;{size}&quot;</Sheet.Title>
              </Sheet.Header>
              <Sheet.Body>
                <Text size="sm" tone="subtle">
                  On a narrow screen every size is full width but for a 48px
                  gutter — a panel you can't read past isn't a panel.
                </Text>
              </Sheet.Body>
            </Sheet.Content>
          </Sheet>
        ))}
      </Example>

      <Example label="long body">
        <Sheet>
          <Sheet.Trigger
            render={
              <Button variant="outline" icon={ListIcon}>
                Audit log
              </Button>
            }
          />
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>Audit log</Sheet.Title>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col gap-2">
              {Array.from({ length: 30 }, (_, i) => (
                <Text key={i} size="sm" tone="subtle">
                  {String(i + 1).padStart(2, "0")} — token rotated by
                  ada@acme.dev
                </Text>
              ))}
            </Sheet.Body>
          </Sheet.Content>
        </Sheet>
      </Example>
    </Section>
  );
}
