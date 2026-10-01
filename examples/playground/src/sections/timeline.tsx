import { Badge, Code, CopyButton, Text, Timeline } from "@heyo-sh/heyo-ui";
import { BoltIcon, CubeIcon, RefreshIcon, TrashIcon, UserIcon } from "../icons";
import { Section, Stack } from "./section";

export function TimelineSection() {
  return (
    <Section
      title="Timeline"
      description="A vertical sequence of events. One continuous rail that fades out at the bottom — a feed rarely ends, it just stops being loaded."
    >
      <Stack label="full (default)">
        <Timeline>
          <Timeline.Item
            active
            title="Deploying to production"
            time="now"
            icon={CubeIcon}
            tone="brand"
          >
            <span className="flex flex-wrap items-center gap-2">
              <Code>a1b2c3d</Code>
              <CopyButton value="a1b2c3d" size="xs" />
              <Badge size="sm" variant="outline">
                build 412
              </Badge>
            </span>
          </Timeline.Item>
          <Timeline.Item
            title="Deployed to preview"
            time="2m ago"
            icon={CubeIcon}
            tone="success"
          >
            Built in 42s, live on 300+ locations.
          </Timeline.Item>
          <Timeline.Item
            title="Build failed"
            time="1h ago"
            icon={BoltIcon}
            tone="danger"
          >
            Exited with 1 — missing <Code>DATABASE_URL</Code>.
          </Timeline.Item>
          <Timeline.Item
            title="Signing key rotated"
            time="3h ago"
            icon={RefreshIcon}
            tone="warning"
          >
            By ada@acme.dev.
          </Timeline.Item>
          <Timeline.Item
            title="Project created"
            time="2 days ago"
            icon={UserIcon}
          />
        </Timeline>
      </Stack>

      <Stack label='density="compact" + Timeline.Separator (audit log)'>
        <Timeline
          density="compact"
          className="max-h-72 overflow-y-auto heyo-scrollbar"
        >
          <Timeline.Separator>Today</Timeline.Separator>
          {[
            ["Token rotated", "12:04", "success"],
            ["Member invited", "11:58", "neutral"],
            ["Route added", "11:31", "neutral"],
          ].map(([title, time, tone]) => (
            <Timeline.Item
              key={title}
              density="compact"
              title={title!}
              time={time}
              tone={tone as never}
            />
          ))}
          <Timeline.Separator>Yesterday</Timeline.Separator>
          {[
            ["Deploy reverted", "18:02", "warning"],
            ["Project deleted", "17:47", "danger"],
            ["Plan upgraded", "14:12", "neutral"],
            ["Domain verified", "09:30", "success"],
          ].map(([title, time, tone]) => (
            <Timeline.Item
              key={title}
              density="compact"
              title={title!}
              time={time}
              tone={tone as never}
            />
          ))}
        </Timeline>
      </Stack>

      <Stack label="incident">
        <Timeline>
          <Timeline.Item
            title="Incident opened"
            time="14:22"
            icon={TrashIcon}
            tone="danger"
          >
            <Text size="sm" tone="subtle">
              Elevated 5xx from the Frankfurt edge. Traffic shifted to Warsaw
              while we investigate.
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Mitigated" time="14:38" tone="warning">
            <Text size="sm" tone="subtle">
              Error rate back under 0.1%.
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Resolved" time="14:51" tone="success">
            <Text size="sm" tone="subtle">
              Root cause: a stale upstream certificate. Renewed and redeployed.
            </Text>
          </Timeline.Item>
        </Timeline>
      </Stack>
    </Section>
  );
}
