import { cn, Heading, renderIcon, Text } from "@heyo-sh/heyo-ui";
import type { ReactNode } from "react";
import { sectionIcons } from "./section-icons";

/** `"Button Group"` → `"button-group"`. Section titles double as anchor ids. */
export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface SectionProps {
  /** The component's name, e.g. `"Checkbox"`. Also becomes the anchor id. */
  title: string;
  /** One line on what the component is for. */
  description?: ReactNode;
  children: ReactNode;
}

/**
 * One component, one section. The sidebar links to `#${slugify(title)}`, so
 * the title is the only place the name is written by hand.
 */
export function Section({ title, description, children }: SectionProps) {
  return (
    <section
      id={slugify(title)}
      data-slot="playground-section"
      className="flex scroll-mt-16 flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            {/* The glyph the sidebar and the palette use for this component. */}
            <span className="flex size-4 shrink-0 text-heyo-subtle">
              {renderIcon(sectionIcons[title], "size-full")}
            </span>
            <Heading level={4}>{title}</Heading>
          </span>
          <div className="h-px flex-1 bg-heyo-hairline" />
        </div>
        {description ? (
          <Text size="sm" tone="subtle">
            {description}
          </Text>
        ) : null}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export interface ExampleProps {
  /** The prop or state on show, e.g. `variant` or `loading`. */
  label: string;
  /** Layout override for the demo area (it's a flex row by default). */
  className?: string;
  children: ReactNode;
}

/** A labelled row inside a section: one prop, every value it takes. */
export function Example({ label, className, children }: ExampleProps) {
  return (
    <div className="flex flex-col gap-2">
      <Text as="span" size="xs" tone="subtle" mono>
        {label}
      </Text>
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {children}
      </div>
    </div>
  );
}

/** Demo area that stacks instead of flowing — for fields and settings rows. */
export function Stack({ label, className, children }: ExampleProps) {
  return (
    <Example
      label={label}
      // `flex-nowrap` is load-bearing: a *wrapping* column flex container sizes
      // its line from the content, so one wide child (a horizontal ScrollArea,
      // a table) would stretch the column past the page instead of being
      // clipped by it.
      className={cn("min-w-0 flex-col flex-nowrap items-stretch", className)}
    >
      {children}
    </Example>
  );
}
