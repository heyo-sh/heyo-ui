import { Input } from "@heyo-sh/heyo-ui";
import { SearchIcon, UserIcon } from "../icons";
import { Example, Section } from "./section";

export function InputSection() {
  return (
    <Section
      title="Input"
      description="A text input. Pass label, description or error and the whole field layout comes with it."
    >
      <Example
        label="label / description / error"
        className="grid gap-4 sm:grid-cols-2"
      >
        <Input
          label="Project name"
          placeholder="my-worker"
          description="Lowercase letters, numbers and dashes."
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          defaultValue="not-an-email"
          error="Enter a valid email address."
        />
      </Example>

      <Example
        label="optional / labelAside"
        className="grid gap-4 sm:grid-cols-2"
      >
        <Input label="Alias" placeholder="acme" optional />
        <Input
          label="Search"
          icon={SearchIcon}
          placeholder="Filter resources…"
          labelAside="⌘K"
        />
      </Example>

      <Example label="icon / iconEnd" className="grid gap-4 sm:grid-cols-2">
        <Input icon={SearchIcon} placeholder="Search…" aria-label="Search" />
        <Input
          iconEnd={UserIcon}
          placeholder="Assignee"
          aria-label="Assignee"
        />
      </Example>

      <Example label="prefix / suffix" className="grid gap-4 sm:grid-cols-2">
        <Input
          prefix="https://"
          suffix=".heyo.sh"
          placeholder="acme"
          aria-label="Domain"
        />
        <Input suffix="ms" defaultValue="250" aria-label="Timeout" />
      </Example>

      <Example label="size" className="grid gap-4 sm:grid-cols-2">
        <Input size="xs" placeholder="xs" aria-label="xs" />
        <Input size="sm" placeholder="sm" aria-label="sm" />
        <Input size="base" placeholder="base" aria-label="base" />
        <Input size="lg" placeholder="lg" aria-label="lg" />
      </Example>

      <Example label="type" className="grid gap-4 sm:grid-cols-2">
        <Input type="password" defaultValue="hunter2" aria-label="Password" />
        <Input type="date" aria-label="Date" />
        <Input type="number" defaultValue="3" aria-label="Replicas" />
        <Input type="file" aria-label="Bundle" />
      </Example>

      <Example
        label="disabled / readOnly"
        className="grid gap-4 sm:grid-cols-2"
      >
        <Input label="Disabled" placeholder="Read only" disabled />
        <Input label="Read only" defaultValue="acme-api" readOnly />
      </Example>
    </Section>
  );
}
