"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { ChevronDownIcon } from "../lib/icons";

/* -------------------------------------------------------------------------- */
/*                                 Accordion                                  */
/* -------------------------------------------------------------------------- */

export interface AccordionItemData {
  value?: string;
  title: ReactNode;
  /** Leading glyph on the trigger row. */
  icon?: IconLike;
  children: ReactNode;
  disabled?: boolean;
}

export interface AccordionRootProps extends AccordionPrimitive.Root.Props {
  /** Shorthand: build the whole accordion from data. */
  items?: AccordionItemData[];
}

/**
 * Stacked, collapsible sections.
 *
 * ```tsx
 * <Accordion items={[{ title: "Limits", children: "100 req/s" }]} />
 * ```
 *
 * Or compose it when you need per-section markup:
 *
 * ```tsx
 * <Accordion multiple>
 *   <Accordion.Item value="limits">
 *     <Accordion.Trigger>Limits</Accordion.Trigger>
 *     <Accordion.Content>100 req/s</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
function AccordionRoot({
  className,
  items,
  children,
  ...props
}: AccordionRootProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full min-w-0 flex-col",
        "border-y border-heyo-hairline",
        className,
      )}
      {...props}
    >
      {items
        ? items.map((item, index) => (
            <AccordionItem
              key={item.value ?? index}
              value={item.value ?? index}
              disabled={item.disabled}
            >
              <AccordionTrigger icon={item.icon}>{item.title}</AccordionTrigger>
              <AccordionContent>{item.children}</AccordionContent>
            </AccordionItem>
          ))
        : children}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "min-w-0 not-last:border-b not-last:border-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}

export interface AccordionTriggerProps
  extends AccordionPrimitive.Trigger.Props {
  /** Hide the chevron if the row carries its own affordance. */
  chevron?: boolean;
  /** Leading glyph — a component, an element, or any node. */
  icon?: IconLike;
}

function AccordionTrigger({
  className,
  chevron = true,
  icon,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex w-full min-w-0 cursor-pointer items-center gap-3",
          "py-3 text-left text-sm font-medium text-heyo-default",
          "heyo-focus transition-colors duration-100 hover:text-heyo-strong",
          "data-[disabled]:pointer-events-none data-[disabled]:text-heyo-inactive",
          className,
        )}
        {...props}
      >
        {icon ? (
          <span className="flex size-4 shrink-0 text-heyo-subtle transition-colors group-hover/accordion-trigger:text-heyo-default">
            {renderIcon(icon, "size-full")}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">{children}</span>
        {chevron ? (
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 text-heyo-subtle",
              // `rotate`, not `transform`: Tailwind v4's rotate utilities set
              // the standalone `rotate` property.
              "transition-[rotate] duration-200 ease-heyo motion-reduce:transition-none",
              "group-data-[panel-open]/accordion-trigger:rotate-180",
            )}
          />
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden",
        "transition-[height] duration-200 ease-heyo motion-reduce:transition-none",
        "data-starting-style:h-0 data-ending-style:h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-3 text-sm text-heyo-subtle">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

/* -------------------------------------------------------------------------- */
/*                                Collapsible                                 */
/* -------------------------------------------------------------------------- */

export interface CollapsibleProps extends CollapsiblePrimitive.Root.Props {}

/** A single show/hide section. `Accordion` for several, this for one. */
function CollapsibleRoot({ className, ...props }: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("w-full min-w-0", className)}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden",
        "transition-[height] duration-200 ease-heyo motion-reduce:transition-none",
        "data-starting-style:h-0 data-ending-style:h-0",
        className,
      )}
      {...props}
    />
  );
}

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsiblePrimitive.Trigger,
  Content: CollapsibleContent,
});

export type CollapsibleTriggerProps = ComponentProps<
  typeof CollapsiblePrimitive.Trigger
>;
