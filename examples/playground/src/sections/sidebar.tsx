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
