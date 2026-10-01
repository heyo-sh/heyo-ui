import { Badge, Text, Tree, type TreeNode } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { CubeIcon, DatabaseIcon, GridIcon, ListIcon } from "../icons";
import { Section, Stack } from "./section";

const files: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: GridIcon,
    children: [
      {
        id: "src/components",
        label: "components",
        icon: GridIcon,
        children: [
          {
            id: "src/components/button.tsx",
            label: "button.tsx",
            icon: ListIcon,
          },
          {
            id: "src/components/dialog.tsx",
            label: "dialog.tsx",
            icon: ListIcon,
          },
          {
            id: "src/components/table.tsx",
            label: "table.tsx",
            icon: ListIcon,
          },
        ],
      },
      {
        id: "src/lib",
        label: "lib",
        icon: GridIcon,
        children: [
          { id: "src/lib/cn.ts", label: "cn.ts", icon: ListIcon },
          { id: "src/lib/icons.tsx", label: "icons.tsx", icon: ListIcon },
        ],
      },
      { id: "src/index.ts", label: "index.ts", icon: ListIcon },
    ],
  },
  { id: "empty", label: "generated", icon: GridIcon, children: [] },
  { id: "package.json", label: "package.json", icon: ListIcon },
  { id: "readme", label: "README.md", icon: ListIcon, disabled: true },
];

const resources: TreeNode[] = [
  {
    id: "acme",
    label: "acme",
    icon: CubeIcon,
    meta: (
      <Badge size="sm" variant="count">
        7
      </Badge>
    ),
    children: [
      {
        id: "acme/workers",
        label: "Workers",
        icon: CubeIcon,
        meta: (
          <Badge size="sm" variant="count">
            3
          </Badge>
        ),
        children: [
          { id: "acme/workers/api", label: "acme-api", meta: "Frankfurt" },
          { id: "acme/workers/cron", label: "acme-cron", meta: "global" },
          { id: "acme/workers/img", label: "acme-images", meta: "global" },
        ],
      },
      {
        id: "acme/storage",
        label: "Storage",
        icon: DatabaseIcon,
        children: [
          { id: "acme/storage/kv", label: "sessions (KV)", meta: "12 MB" },
          { id: "acme/storage/r2", label: "uploads (R2)", meta: "1.4 TB" },
        ],
      },
    ],
  },
];

export function TreeSection() {
  return (
    <Section
      title="Tree"
      description="A collapsible hierarchy. Indentation is drawn as a guide line per level, so at depth five you can still tell which branch a row belongs to."
    >
      <Stack label="files" className="max-w-sm">
        <FileTree />
      </Stack>

      <Stack label="meta slot" className="max-w-sm">
        <Tree nodes={resources} defaultExpanded={["acme", "acme/workers"]} />
      </Stack>
    </Section>
  );
}

function FileTree() {
  const [selected, setSelected] = useState<string | null>(
    "src/components/dialog.tsx",
  );

  return (
    <>
      <Tree
        nodes={files}
        defaultExpanded={["src", "src/components"]}
        selected={selected}
        onSelect={(node) => {
          if (!node.children) setSelected(node.id);
        }}
      />
      <Text size="sm" tone="subtle">
        selected: {selected ?? "—"}
      </Text>
    </>
  );
}
