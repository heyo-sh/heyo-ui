import {
  Avatar,
  Badge,
  Button,
  Code,
  CopyButton,
  DataTable,
  Dropdown,
  Pagination,
  Text,
  toast,
  type DataTableColumn,
} from "@heyo-sh/heyo-ui";
import { useState } from "react";
import {
  ChevronDownIcon,
  CopyIcon,
  GearIcon,
  RefreshIcon,
  TrashIcon,
} from "../icons";
import { Section, Stack } from "./section";

interface Deployment {
  id: string;
  sha: string;
  branch: string;
  author: string;
  status: "success" | "failed" | "building";
  duration: number;
  requests: number;
  createdAt: string;
}

const deployments: Deployment[] = [
  {
    id: "1",
    sha: "a1b2c3d",
    branch: "main",
    author: "Ada Lovelace",
    status: "building",
    duration: 12,
    requests: 0,
    createdAt: "just now",
  },
  {
    id: "2",
    sha: "9f8e7d6",
    branch: "main",
    author: "Alan Turing",
    status: "success",
    duration: 38,
    requests: 1_204_000,
    createdAt: "18m ago",
  },
  {
    id: "3",
    sha: "4c5b6a7",
    branch: "fix/cors",
    author: "Grace Hopper",
    status: "failed",
    duration: 12,
    requests: 0,
    createdAt: "1h ago",
  },
  {
    id: "4",
    sha: "e2d3c4b",
    branch: "feat/kv",
    author: "Ken Thompson",
    status: "success",
    duration: 55,
    requests: 318_400,
    createdAt: "2h ago",
  },
  {
    id: "5",
    sha: "7a8b9c0",
    branch: "main",
    author: "Barbara Liskov",
    status: "success",
    duration: 47,
    requests: 902_100,
    createdAt: "3h ago",
  },
  {
    id: "6",
    sha: "1f2e3d4",
    branch: "chore/deps",
    author: "Ada Lovelace",
    status: "success",
    duration: 33,
    requests: 44_200,
    createdAt: "5h ago",
  },
];

const statusVariant = {
  success: "success",
  failed: "danger",
  building: "warning",
} as const;

const columns: DataTableColumn<Deployment>[] = [
  {
    id: "sha",
    header: "Commit",
    fixed: true,
    primary: true,
    sortBy: (row) => row.sha,
    cell: (row) => (
      <span className="flex items-center gap-1.5">
        <Code>{row.sha}</Code>
        <CopyButton value={row.sha} size="xs" />
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    sortBy: (row) => row.status,
    cell: (row) => (
      <Badge dot size="sm" variant={statusVariant[row.status]}>
        {row.status}
      </Badge>
    ),
  },
  {
    id: "branch",
    header: "Branch",
    sortBy: (row) => row.branch,
    cell: (row) => (
      <span className="font-mono text-xs text-heyo-subtle">{row.branch}</span>
    ),
  },
  {
    id: "author",
    header: "Author",
    sortBy: (row) => row.author,
    cell: (row) => (
      <span className="flex items-center gap-2">
        <Avatar size="xs" name={row.author} />
        <span className="truncate">{row.author}</span>
      </span>
    ),
  },
  {
    id: "requests",
    header: "Requests",
    numeric: true,
    sortBy: (row) => row.requests,
    cell: (row) => (row.requests ? row.requests.toLocaleString("en-US") : "—"),
  },
  {
    id: "duration",
    header: "Duration",
    numeric: true,
    sortBy: (row) => row.duration,
    cell: (row) => `${row.duration}s`,
  },
  {
    id: "createdAt",
    header: "When",
    align: "end",
    hidden: true,
    cell: (row) => <span className="text-heyo-subtle">{row.createdAt}</span>,
  },
  {
    id: "actions",
    header: "",
    actions: true,
    cell: (row) => (
      <>
        <CopyButton value={row.sha} size="xs" variant="ghost" />
        <Dropdown>
          <Dropdown.Trigger
            render={
              <Button
                size="xs"
                variant="ghost"
                shape="square"
                icon={GearIcon}
                aria-label={`Actions for ${row.sha}`}
              />
            }
          />
          <Dropdown.Content align="end">
            <Dropdown.Item icon={RefreshIcon}>Redeploy</Dropdown.Item>
            <Dropdown.Item icon={CopyIcon}>Copy deployment id</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item icon={TrashIcon} destructive>
              Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </>
    ),
  },
];

export function DataTableSection() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <Section
      title="Data Table"
      description="One card: toolbar, rows and footer share a ring. Selecting swaps the toolbar in place rather than pushing the rows down under your cursor."
    >
      <Stack label="everything on">
        <DataTable
          title="Deployments"
          description="The last 100 builds for acme-api."
          rows={deployments}
          columns={columns}
          getRowId={(row) => row.id}
          searchable
          searchPlaceholder="Search commits, branches…"
          searchFields={(row) => [row.sha, row.branch, row.author, row.status]}
          selectable
          onRowClick={(row) => toast(`Opened ${row.sha}`)}
          bulkActions={(selected, clear) => (
            <>
              <Button
                size="sm"
                variant="outline"
                icon={RefreshIcon}
                onClick={() => {
                  toast.success(`Redeploying ${selected.length}`);
                  clear();
                }}
              >
                Redeploy
              </Button>
              <Button
                size="sm"
                variant="destructive-secondary"
                icon={TrashIcon}
                onClick={() => {
                  toast.error(`Deleted ${selected.length}`);
                  clear();
                }}
              >
                Delete
              </Button>
            </>
          )}
          toolbar={
            <Dropdown>
              <Dropdown.Trigger
                render={
                  <Button size="sm" variant="outline" iconEnd={ChevronDownIcon}>
                    All branches
                  </Button>
                }
              />
              <Dropdown.Content align="end">
                <Dropdown.Item>All branches</Dropdown.Item>
                <Dropdown.Item>main</Dropdown.Item>
                <Dropdown.Item>fix/cors</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          }
          footer={
            <>
              <Text size="xs" tone="subtle">
                {deployments.length} of 100
              </Text>
              <Pagination
                compact
                page={page}
                pageCount={17}
                onPageChange={setPage}
              />
            </>
          }
        />
      </Stack>

      <Stack label="loading">
        <Button
          size="sm"
          variant="outline"
          className="w-max"
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1600);
          }}
        >
          Simulate a fetch
        </Button>
        <DataTable
          rows={loading ? [] : deployments.slice(0, 3)}
          columns={columns.slice(0, 5)}
          getRowId={(row) => row.id}
          loading={loading}
          searchable
        />
      </Stack>

      <Stack label="empty">
        <DataTable
          rows={[]}
          columns={columns.slice(0, 5)}
          getRowId={(row) => row.id}
          searchable
        />
      </Stack>

      <Stack label="stickyHeader + maxHeight">
        <DataTable
          rows={[...deployments, ...deployments, ...deployments].map(
            (row, index) => ({ ...row, id: String(index) }),
          )}
          columns={columns.slice(0, 5)}
          getRowId={(row) => row.id}
          stickyHeader
          maxHeight="16rem"
          selectable
        />
      </Stack>
    </Section>
  );
}
