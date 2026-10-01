import { Button, Empty, Kbd } from "@heyo-sh/heyo-ui";
import { CubeIcon, InboxIcon, PlusIcon, SearchIcon } from "../icons";
import { Section, Stack } from "./section";

export function EmptySection() {
  return (
    <Section
      title="Empty"
      description="The nothing-here state. Left-aligned against a rule by default — a centred icon over centred text reads as an error page, not as a list that hasn't started."
    >
      <Stack label="stack (default)">
        <Empty
          icon={CubeIcon}
          title="No deployments yet"
          description="Push to main, or deploy from your machine, and the last 100 builds will show up here."
          action={
            <>
              <Button variant="primary" icon={PlusIcon}>
                New deployment
              </Button>
              <Button variant="ghost">Read the guide</Button>
            </>
          }
          hint="Deployments are kept for 30 days on the Hobby plan."
        />
      </Stack>

      <Stack label="bordered">
        <Empty
          bordered
          icon={InboxIcon}
          title="No open incidents"
          description="Everything has been green for 14 days."
        />
      </Stack>

      <Stack label='align="center" (a whole empty pane)'>
        <Empty
          bordered
          align="center"
          icon={SearchIcon}
          title="No results for “acme-legacy”"
          description="Check the spelling, or search across every project instead."
          action={<Button variant="outline">Clear filters</Button>}
          hint={
            <span className="inline-flex items-center gap-1.5">
              Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search everything
            </span>
          }
        />
      </Stack>

      <Stack label="title only">
        <Empty title="Inbox zero" />
      </Stack>
    </Section>
  );
}
