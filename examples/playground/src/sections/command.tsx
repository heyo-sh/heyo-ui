import {
  Badge,
  Button,
  Command,
  Kbd,
  Text,
  toast,
  type CommandItem,
} from "@heyo-sh/heyo-ui";
import { useMemo, useState } from "react";
import {
  BoltIcon,
  ChartIcon,
  CubeIcon,
  DatabaseIcon,
  GearIcon,
  HomeIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
  UserIcon,
} from "../icons";
import { Example, Section } from "./section";

const items: CommandItem[] = [
  {
    value: "new-project",
    label: "Create project",
    group: "Actions",
    icon: PlusIcon,
    shortcut: (
      <Kbd.Group>
        <Kbd>⌘</Kbd>
        <Kbd>N</Kbd>
      </Kbd.Group>
    ),
    keywords: ["add", "new"],
  },
  {
    value: "redeploy",
    label: "Redeploy acme-api",
    description: "Rebuild from the latest commit on main",
    group: "Actions",
    icon: RefreshIcon,
    keywords: ["ship", "build"],
  },
  {
    value: "rotate-key",
    label: "Rotate signing key",
    group: "Actions",
    icon: BoltIcon,
    keywords: ["security", "token"],
  },
  {
    value: "delete",
    label: "Delete project…",
    group: "Actions",
    icon: TrashIcon,
    keywords: ["remove", "destroy"],
  },
  {
    value: "acme-api",
    label: "acme-api",
    description: "Worker · Frankfurt",
    group: "Projects",
    icon: CubeIcon,
    keywords: ["backend"],
  },
  {
    value: "acme-web",
    label: "acme-web",
    description: "Pages · global",
    group: "Projects",
    icon: CubeIcon,
    keywords: ["frontend", "site"],
  },
  {
    value: "acme-images",
    label: "acme-images",
    description: "R2 bucket · 1.4 TB",
    group: "Projects",
    icon: DatabaseIcon,
    keywords: ["storage"],
  },
  {
    value: "overview",
    label: "Overview",
    group: "Go to",
    icon: HomeIcon,
  },
  { value: "analytics", label: "Analytics", group: "Go to", icon: ChartIcon },
  { value: "settings", label: "Settings", group: "Go to", icon: GearIcon },
  { value: "members", label: "Members", group: "Go to", icon: UserIcon },
  {
    value: "billing",
    label: "Billing",
    group: "Go to",
    icon: GearIcon,
    disabled: true,
  },
];

export function CommandSection() {
  return (
    <Section
      title="Command"
      description="The ⌘K palette: one overlay in the middle of the screen that searches everything. Mount it once near the root and it binds the shortcut itself."
    >
      <Example label="shortcut (press ⌘K anywhere)">
        <Palette />
      </Example>

      <Example label="trigger">
        <Command
          items={items}
          shortcut={false}
          onSelect={(item) => toast(`Ran “${item.label}”`)}
          trigger={
            <Button variant="outline" icon={BoltIcon}>
              Open palette
            </Button>
          }
        />
        <Text size="sm" tone="subtle">
          shortcut={"{false}"} — this one only opens from its trigger.
        </Text>
      </Example>

      <Example label="onQueryChange (async)">
        <AsyncPalette />
      </Example>

      <Example label="Command.Shortcut">
        <Text size="sm" tone="subtle">
          The hint you put in a header, spelled for this platform:
        </Text>
        <Command.Shortcut keys="mod+k" />
        <Command.Shortcut keys="mod+shift+p" />
      </Example>
    </Section>
  );
}

function Palette() {
  const [last, setLast] = useState<string | null>(null);

  return (
    <>
      <Command
        items={items}
        onSelect={(item) => setLast(item.label)}
        footer={undefined}
      />
      <Command.Shortcut keys="mod+k" />
      {last ? (
        <Badge variant="outline">last: {last}</Badge>
      ) : (
        <Text size="sm" tone="subtle">
          Nothing run yet.
        </Text>
      )}
    </>
  );
}

/** What a debounced API call looks like: you filter, the palette renders. */
function AsyncPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const results = useMemo(() => {
    if (!query) return items.slice(0, 4);
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <Command
      open={open}
      onOpenChange={setOpen}
      shortcut={false}
      items={results}
      query={query}
      loading={loading}
      placeholder="Search the server…"
      onQueryChange={(next) => {
        setQuery(next);
        setLoading(true);
        setTimeout(() => setLoading(false), 350);
      }}
      trigger={<Button variant="secondary">Server-side search</Button>}
    />
  );
}
