import { Textarea } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

export function TextareaSection() {
  return (
    <Section
      title="Textarea"
      description="Multi-line sibling of Input — same chrome, same field wiring, optionally auto-resizing."
    >
      <Example
        label="label / description"
        className="grid gap-4 sm:grid-cols-2"
      >
        <Textarea
          label="Notes"
          placeholder="Anything worth remembering…"
          description="Markdown is supported."
          rows={3}
        />
        <Textarea
          label="Build command"
          defaultValue="bun run build"
          error="Command exited with code 1."
          rows={3}
        />
      </Example>

      <Example label="autoResize" className="grid gap-4 sm:grid-cols-2">
        <Textarea
          label="Commit message"
          autoResize
          rows={2}
          defaultValue={"fix(api): retry on 429\n\nThe limiter now backs off."}
        />
        <Textarea
          label="Optional"
          optional
          labelAside="0 / 280"
          placeholder="Say something…"
          rows={2}
        />
      </Example>

      <Example label="size" className="grid gap-4 sm:grid-cols-2">
        <Textarea size="sm" rows={2} placeholder="sm" aria-label="sm" />
        <Textarea size="base" rows={2} placeholder="base" aria-label="base" />
      </Example>

      <Example label="disabled" className="grid gap-4 sm:grid-cols-2">
        <Textarea
          label="Disabled"
          rows={2}
          placeholder="Nothing to see"
          disabled
        />
      </Example>
    </Section>
  );
}
