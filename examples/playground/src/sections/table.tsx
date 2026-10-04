import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Code,
  CopyButton,
  Empty,
  Table,
  Text,
  toast,
  useSelection,
} from "@heyo-sh/heyo-ui";
import { useMemo, useState } from "react";
import { CubeIcon, TrashIcon } from "../icons";
import { Section, Stack } from "./section";

const deployments = [
  {
    sha: "a1b2c3d",
    branch: "main",
    author: "Ada Lovelace",
    status: "success",
    time: "42s",
  },
  {
    sha: "9f8e7d6",
    branch: "main",
    author: "Alan Turing",
    status: "success",
    time: "38s",
  },
  {
    sha: "4c5b6a7",
    branch: "fix/cors",
    author: "Grace Hopper",
    status: "failed",
    time: "12s",
  },
  {
    sha: "e2d3c4b",
    branch: "feat/kv",
    author: "Ken Thompson",
    status: "success",
    time: "55s",
  },
];

const regions = [
  { region: "Frankfurt", requests: 1_200_000, p95: 38 },
  { region: "Warsaw", requests: 840_000, p95: 31 },
  { region: "Ashburn", requests: 612_000, p95: 44 },
  { region: "Tokyo", requests: 290_000, p95: 62 },
];

export function TableSection() {
  return (
    <Section
      title="Table"
      description="Hairline rows, micro-caps headers, and a leading marker on hover so you can tell which row you're on from the far side of a wide table."
    >
      <Stack label="plain">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header>Commit</Table.Header>
              <Table.Header>Author</Table.Header>
              <Table.Header>Status</Table.Header>
              <Table.Header align="end">Duration</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {deployments.map(({ sha, author, status, time }) => (
              <Table.Row key={sha}>
                <Table.Cell primary>
                  <span className="flex items-center gap-1.5">
                    <Code>{sha}</Code>
                    <CopyButton value={sha} size="xs" />
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="flex items-center gap-2">
                    <Avatar size="xs" name={author} />
                    {author}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    dot
                    size="sm"
                    variant={status === "success" ? "success" : "danger"}
                  >
                    {status}
                  </Badge>
                </Table.Cell>
                <Table.Cell numeric className="text-heyo-subtle">
                  {time}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Stack>

      <Stack label="clickable rows + an empty state that isn't one">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header>Commit</Table.Header>
              <Table.Header>Branch</Table.Header>
              <Table.Header align="end">Duration</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {deployments.slice(0, 2).map(({ sha, branch, time }) => (
              <Table.Row
                key={sha}
                onClick={() => toast(`Opened ${sha}`)}
                aria-label={`Open ${sha}`}
              >
                <Table.Cell primary>
                  <Code>{sha}</Code>
                </Table.Cell>
                <Table.Cell className="font-mono text-xs text-heyo-subtle">
                  {branch}
                </Table.Cell>
                <Table.Cell numeric className="text-heyo-subtle">
                  {time}
                </Table.Cell>
              </Table.Row>
            ))}
            {/* No `placeholder` on purpose: a cell spanning the table is
                enough for the row to lose the tint, the marker and the
                pointer, because forgetting the flag is how empty states keep
                ending up looking clickable. */}
            <Table.Row>
              <Table.Cell colSpan={3} className="h-auto p-0">
                <Empty
                  icon={CubeIcon}
                  title="No more deployments"
                  description="Push to main and the next one shows up here."
                  className="m-4"
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Text size="sm" tone="subtle">
          The two real rows answer Enter as well as a click — the row is the
          target, not a link inside it.
        </Text>
      </Stack>

      <Stack label="sortable + numeric">
        <SortableTable />
      </Stack>

      <Stack label="selection (useSelection) + ActionCell">
        <SelectableTable />
      </Stack>

      <Stack label="stickyHeader + maxHeight + striped">
        <div className="overflow-hidden rounded-xl ring-1 ring-heyo-line">
          <Table stickyHeader maxHeight="13rem" striped>
            <Table.Head>
              <Table.Row>
                <Table.Header>Commit</Table.Header>
                <Table.Header>Branch</Table.Header>
                <Table.Header align="end">Duration</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {Array.from({ length: 16 }, (_, index) => {
                const item = deployments[index % deployments.length]!;
                return (
                  <Table.Row key={index}>
                    <Table.Cell primary>
                      <Code>{item.sha}</Code>
                    </Table.Cell>
                    <Table.Cell className="font-mono text-xs text-heyo-subtle">
                      {item.branch}
                    </Table.Cell>
                    <Table.Cell numeric className="text-heyo-subtle">
                      {item.time}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Stack>
    </Section>
  );
}

/** `onSort` + `sort` turn a header into a button; the ordering stays yours. */
function SortableTable() {
  const [sort, setSort] = useState<{
    key: "requests" | "p95";
    direction: "asc" | "desc";
  }>({ key: "requests", direction: "desc" });

  const rows = useMemo(() => {
    const sorted = [...regions].sort((a, b) => a[sort.key] - b[sort.key]);
    return sort.direction === "desc" ? sorted.reverse() : sorted;
  }, [sort]);

  function toggle(key: "requests" | "p95") {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "desc" },
    );
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Region</Table.Header>
          <Table.Header
            align="end"
            sort={sort.key === "requests" ? sort.direction : false}
            onSort={() => toggle("requests")}
          >
            Requests
          </Table.Header>
          <Table.Header
            align="end"
            sort={sort.key === "p95" ? sort.direction : false}
            onSort={() => toggle("p95")}
          >
            p95
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map(({ region, requests, p95 }) => (
          <Table.Row key={region}>
            <Table.Cell primary>{region}</Table.Cell>
            <Table.Cell numeric>{requests.toLocaleString("en-US")}</Table.Cell>
            <Table.Cell numeric>{p95}ms</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

/**
 * The header checkbox actually selects every row — that's the whole point of
 * `useSelection`, and of `Checkbox`'s `indeterminate` state.
 */
function SelectableTable() {
  const ids = useMemo(() => deployments.map((item) => item.sha), []);
  const rows = useSelection(ids);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-8 items-center gap-2">
        <Text size="sm" tone="subtle">
          {rows.count === 0
            ? "Nothing selected"
            : `${rows.count} of ${ids.length} selected`}
        </Text>
        {rows.count > 0 ? (
          <Button size="sm" variant="ghost" onClick={rows.clear}>
            Clear
          </Button>
        ) : null}
      </div>

      <Table interactive>
        <Table.Head>
          <Table.Row>
            <Table.SelectHeader>
              <Checkbox
                aria-label="Select all"
                checked={rows.allSelected}
                indeterminate={rows.someSelected}
                onCheckedChange={(checked) => rows.toggleAll(checked)}
              />
            </Table.SelectHeader>
            <Table.Header>Commit</Table.Header>
            <Table.Header>Branch</Table.Header>
            <Table.Header align="end">Duration</Table.Header>
            <Table.Header className="w-0" />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {deployments.map(({ sha, branch, time }) => (
            <Table.Row key={sha} selected={rows.isSelected(sha)}>
              <Table.SelectCell onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  aria-label={`Select ${sha}`}
                  checked={rows.isSelected(sha)}
                  onCheckedChange={(checked) => rows.toggle(sha, checked)}
                />
              </Table.SelectCell>
              <Table.Cell primary>
                <Code>{sha}</Code>
              </Table.Cell>
              <Table.Cell className="font-mono text-xs text-heyo-subtle">
                {branch}
              </Table.Cell>
              <Table.Cell numeric className="text-heyo-subtle">
                {time}
              </Table.Cell>
              <Table.ActionCell>
                <CopyButton value={sha} size="xs" />
                <Button
                  size="xs"
                  variant="ghost"
                  shape="square"
                  icon={TrashIcon}
                  aria-label={`Delete ${sha}`}
                />
              </Table.ActionCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
