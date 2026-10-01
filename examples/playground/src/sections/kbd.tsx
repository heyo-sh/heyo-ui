import { Kbd, Text } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

export function KbdSection() {
  return (
    <Section
      title="Kbd"
      description="A keycap. The single place heyo-ui leans on mono type, because keys read better that way."
    >
      <Example label="single">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>K</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
      </Example>

      <Example label="Kbd.Group">
        <Kbd.Group>
          <Kbd>⌘</Kbd>
          <Kbd>B</Kbd>
        </Kbd.Group>
        <Kbd.Group>
          <Kbd>Ctrl</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </Kbd.Group>
      </Example>

      <Example label='separator=""'>
        <Kbd.Group separator="">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </Kbd.Group>
        <Kbd.Group separator="then">
          <Kbd>G</Kbd>
          <Kbd>D</Kbd>
        </Kbd.Group>
      </Example>

      <Example label="in a sentence" className="block">
        <Text size="sm" tone="subtle">
          Press{" "}
          <Kbd.Group separator="">
            <Kbd>⌘</Kbd>
            <Kbd>B</Kbd>
          </Kbd.Group>{" "}
          to toggle the sidebar.
        </Text>
      </Example>
    </Section>
  );
}
