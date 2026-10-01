import { Breadcrumb } from "@heyo-sh/heyo-ui";
import {
  BoltIcon,
  CubeIcon,
  HomeIcon,
  RocketIcon,
  SourceCodeIcon,
} from "../icons";
import { Section, Stack } from "./section";

export function BreadcrumbSection() {
  return (
    <Section
      title="Breadcrumb"
      description="Where you are, and the way back. The last entry renders as the current page."
    >
      <Stack label="items">
        <Breadcrumb
          items={[
            { label: "Workers", href: "#breadcrumb" },
            { label: "acme-api", href: "#breadcrumb" },
            { label: "Deployments" },
          ]}
        />
      </Stack>

      <Stack label="icon (a component, an element, or any node)">
        <Breadcrumb
          items={[
            { label: "Home", href: "#breadcrumb", icon: HomeIcon },
            { label: "Workers", href: "#breadcrumb", icon: BoltIcon },
            { label: "acme-api", href: "#breadcrumb", icon: CubeIcon },
            { label: "Deployments", icon: RocketIcon },
          ]}
        />
      </Stack>

      <Stack label="maxItems (collapses the middle)">
        <Breadcrumb
          maxItems={3}
          items={[
            { label: "Account", href: "#breadcrumb" },
            { label: "Workers", href: "#breadcrumb" },
            { label: "acme-api", href: "#breadcrumb" },
            { label: "Deployments", href: "#breadcrumb" },
            { label: "a1b2c3d" },
          ]}
        />
      </Stack>

      <Stack label="separator">
        <Breadcrumb
          separator="/"
          items={[
            { label: "acme", href: "#breadcrumb", icon: CubeIcon },
            { label: "api", href: "#breadcrumb", icon: BoltIcon },
            { label: "src", icon: SourceCodeIcon },
          ]}
        />
      </Stack>
    </Section>
  );
}
