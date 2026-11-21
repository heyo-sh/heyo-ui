import { Code, Kbd, Sidebar, Text, useSidebar } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

export function SidebarSection() {
  const { state, isMobile } = useSidebar();

  return (
    <Section
      title="Sidebar"
      description="The navigation on the left is the live demo: groups, collapsible sub-menus, badges, a rail and an icon-only collapsed state."
    >
      <Example label="Sidebar.Trigger">
        <Sidebar.Trigger />
        <Text size="sm" tone="subtle">
          Or press{" "}
          <Kbd.Group separator="">
            <Kbd>⌘</Kbd>
            <Kbd>B</Kbd>
          </Kbd.Group>
          . Dragging the hairline seam (<Code>Sidebar.Rail</Code>) works too.
        </Text>
      </Example>

      <Example label="useSidebar()">
        <Text size="sm" tone="subtle" mono>
          state: {state} · isMobile: {String(isMobile)}
        </Text>
      </Example>

      <Example label="Sidebar.Meter" className="block">
        <Text size="sm" tone="subtle">
          The card at the bottom of the sidebar: a measurement for the whole app
          (a checklist, trial days, a quota). It opens a <Code>Popover</Code>{" "}
          through <Code>render</Code>, and on the collapsed rail it turns into a
          ring.
        </Text>
        <div className="mt-3 grid max-w-xs gap-2">
          <Sidebar.Meter
            label="Getting started"
            value={3}
            max={8}
            description="Next: Invite your team"
          />
          <Sidebar.Meter
            label="Trial"
            value={4}
            max={14}
            valueLabel="10 days left"
            tone="warning"
          />
        </div>
      </Example>

      <Example label="parts" className="block">
        <Text size="sm" tone="subtle">
          <Code>Provider</Code> owns the state and publishes the layout
          variables, <Code>Header</Code> / <Code>Content</Code> /{" "}
          <Code>Footer</Code> lay it out, <Code>Group</Code> +{" "}
          <Code>GroupLabel</Code> title a block, <Code>MenuButton</Code> is one
          entry, <Code>Collapsible</Code> + <Code>MenuSub</Code> nest them, and{" "}
          <Code>Inset</Code> is the page column next to it.
        </Text>
      </Example>
    </Section>
  );
}
