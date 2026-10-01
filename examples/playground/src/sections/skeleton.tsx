import { Card, CardBody, Skeleton } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function SkeletonSection() {
  return (
    <Section
      title="Skeleton"
      description="A loading placeholder. One faint sweep travels through it rather than the whole block pulsing — a page of pulsing rectangles all breathe at once, which is the distracting part."
    >
      <Stack label="lines" className="max-w-md">
        <Skeleton lines={3} />
      </Stack>

      <Stack label="custom shapes" className="max-w-md">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3 w-32" delay="110ms" />
            <Skeleton className="h-3 w-20" delay="220ms" />
          </div>
        </div>
      </Stack>

      <Stack label="inside a card" className="max-w-md">
        <Card variant="raised">
          <CardBody className="flex flex-col gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton lines={2} />
            <Skeleton className="h-20 w-full rounded-lg" />
          </CardBody>
        </Card>
      </Stack>
    </Section>
  );
}
