import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Code,
  Table,
  Text,
} from "@heyo-sh/heyo-ui";
import {
  ExternalLinkIcon,
  GitBranchIcon,
  RocketIcon,
  TrendingUpIcon,
} from "../icons";
import { Section, Stack } from "./section";

export function CardSection() {
  return (
    <Section
      title="Card"
      description="A surface with four elevations, plus header, body and footer slots that keep their own padding."
    >
      <Stack label="variant" className="grid gap-4 sm:grid-cols-2">
        {(["plain", "flat", "raised", "recessed"] as const).map((variant) => (
          <Card key={variant} variant={variant}>
            <CardHeader>
              <div className="flex flex-col gap-0.5">
                <CardTitle>variant=&quot;{variant}&quot;</CardTitle>
                <CardDescription>
                  Same padding, different elevation.
                </CardDescription>
              </div>
              <Badge variant="outline" size="sm">
                {variant}
              </Badge>
            </CardHeader>
            <CardBody>
              <Text size="sm" tone="subtle">
                Hierarchy comes from the surface, not from a border.
              </Text>
            </CardBody>
          </Card>
        ))}
      </Stack>

      <Stack label="header / body / footer">
        <Card variant="raised">
          <CardHeader>
            <div className="flex flex-col gap-0.5">
              <CardTitle>Deployments</CardTitle>
              <CardDescription>Last 3 builds of acme-api</CardDescription>
            </div>
            <Button size="sm" variant="ghost" icon={ExternalLinkIcon}>
              View all
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <Table interactive>
              <Table.Head>
                <Table.Row>
                  <Table.Header>Commit</Table.Header>
                  <Table.Header>Branch</Table.Header>
                  <Table.Header className="text-right">Duration</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {[
                  ["a1b2c3d", "main", "42s"],
                  ["9f8e7d6", "main", "38s"],
                  ["4c5b6a7", "fix/cors", "12s"],
                ].map(([sha, branch, time]) => (
                  <Table.Row key={sha}>
                    <Table.Cell>
                      <Code>{sha}</Code>
                    </Table.Cell>
                    <Table.Cell className="text-heyo-subtle">
                      <span className="flex items-center gap-1.5">
                        <GitBranchIcon className="size-3.5 shrink-0" />
                        {branch}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="text-right tabular-nums text-heyo-subtle">
                      {time}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
            <Button size="sm" variant="primary" icon={RocketIcon}>
              Redeploy
            </Button>
          </CardFooter>
        </Card>
      </Stack>

      <Stack label="body only" className="max-w-sm">
        <Card variant="flat">
          <CardBody className="flex items-baseline justify-between">
            <Text size="sm" tone="subtle" className="flex items-center gap-1.5">
              <TrendingUpIcon className="size-4 shrink-0" />
              Requests today
            </Text>
            <Text size="xl" weight="medium" className="tabular-nums">
              1.24M
            </Text>
          </CardBody>
        </Card>
      </Stack>
    </Section>
  );
}
