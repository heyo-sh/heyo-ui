import { Toggle } from "@heyo-sh/heyo-ui";
import { BoldIcon, ItalicIcon, ShieldIcon, UnderlineIcon } from "../icons";
import { Example, Section } from "./section";

export function ToggleSection() {
  return (
    <Section
      title="Toggle"
      description="A button that stays pressed — bold in an editor, a filter chip, a view mode."
    >
      <Example label="variant">
        <Toggle variant="ghost">Ghost</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle variant="outline" defaultPressed>
          Pressed
        </Toggle>
      </Example>

      <Example label="size">
        <Toggle size="xs" variant="outline">
          Extra small
        </Toggle>
        <Toggle size="sm" variant="outline">
          Small
        </Toggle>
        <Toggle size="base" variant="outline">
          Base
        </Toggle>
      </Example>

      <Example label="icon (square by default)">
        <Toggle icon={BoldIcon} aria-label="Bold" defaultPressed />
        <Toggle icon={ItalicIcon} aria-label="Italic" />
        <Toggle icon={UnderlineIcon} aria-label="Underline" />
        <Toggle variant="outline" icon={ShieldIcon} aria-label="Protect" />
      </Example>

      <Example label="icon + label">
        <Toggle variant="outline" icon={ShieldIcon}>
          Protection
        </Toggle>
        <Toggle variant="outline" icon={ShieldIcon} disabled>
          Disabled
        </Toggle>
      </Example>
    </Section>
  );
}
