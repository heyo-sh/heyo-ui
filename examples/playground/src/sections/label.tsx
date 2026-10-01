import { Input, Kbd, Label } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function LabelSection() {
  return (
    <Section
      title="Label"
      description="Names a control. Inside a Field the htmlFor wiring is automatic; standalone you pass it yourself."
    >
      <Stack label="standalone" className="max-w-sm">
        <Label htmlFor="label-demo-token">API token</Label>
        <Input id="label-demo-token" placeholder="heyo_live_…" />
      </Stack>

      <Stack label="optional" className="max-w-sm">
        <Label htmlFor="label-demo-alias" optional>
          Alias
        </Label>
        <Input id="label-demo-alias" placeholder="acme" />
      </Stack>

      <Stack label="aside" className="max-w-sm">
        <Label
          htmlFor="label-demo-search"
          aside={
            <Kbd.Group separator="">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </Kbd.Group>
          }
        >
          Search
        </Label>
        <Input id="label-demo-search" placeholder="Filter resources…" />

        <Label
          htmlFor="label-demo-password"
          aside={
            <a
              href="#label"
              className="text-heyo-subtle underline-offset-2 hover:text-heyo-default hover:underline"
            >
              Forgot password?
            </a>
          }
        >
          Password
        </Label>
        <Input
          id="label-demo-password"
          type="password"
          placeholder="••••••••"
        />
      </Stack>
    </Section>
  );
}
