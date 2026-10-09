"use client";

import { useRender } from "@base-ui/react/use-render";
import { Fragment, type ComponentProps, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { ChevronRightIcon } from "../lib/icons";

export interface Crumb {
  label: ReactNode;
  href?: string;
  /** Leading glyph — a component, an element, or any node. */
  icon?: IconLike;
  /** Swap the `<a>` for a router link: `render={<Link to="/x" />}`. */
  render?: useRender.RenderProp;
}

export interface BreadcrumbProps extends Omit<
  ComponentProps<"nav">,
  "children"
> {
  /** The trail. The last entry is rendered as the current page. */
  items: Crumb[];
  /** Collapse the middle into an ellipsis past this many entries. */
  maxItems?: number;
  separator?: ReactNode;
}

/**
 * Where you are, and the way back.
 *
 * ```tsx
 * <Breadcrumb items={[
 *   { label: "Workers", href: "/workers" },
 *   { label: "acme-api" },
 * ]} />
 * ```
 */
export function Breadcrumb({
  className,
  items,
  maxItems,
  separator,
  ...props
}: BreadcrumbProps) {
  // Keep the first and last two; the middle collapses to an ellipsis.
  const collapsed =
    maxItems && items.length > maxItems
      ? [items[0]!, null, ...items.slice(-2)]
      : items;

  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn("min-w-0 text-sm", className)}
      {...props}
    >
      <ol className="m-0 flex min-w-0 list-none items-center gap-1.5 p-0">
        {collapsed.map((item, index) => {
          const isLast = index === collapsed.length - 1;

          return (
            <Fragment key={index}>
              {index > 0 ? (
                <li
                  aria-hidden
                  className="flex shrink-0 items-center text-heyo-inactive"
                >
                  {separator ?? <ChevronRightIcon className="size-3.5" />}
                </li>
              ) : null}

              <li className="flex min-w-0 items-center">
                {item === null ? (
                  <span className="px-0.5 text-heyo-subtle select-none">…</span>
                ) : isLast ? (
                  <span
                    aria-current="page"
                    className="flex min-w-0 items-center gap-1.5 font-medium text-heyo-strong"
                  >
                    {renderIcon(item.icon, "size-3.5 shrink-0")}
                    <span className="min-w-0 truncate">{item.label}</span>
                  </span>
                ) : (
                  <CrumbLink item={item} />
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

function CrumbLink({ item }: { item: Crumb }) {
  return useRender({
    render: item.render,
    defaultTagName: "a",
    props: {
      href: item.href,
      className: cn(
        "flex min-w-0 cursor-pointer items-center gap-1.5 rounded-xs text-heyo-subtle no-underline",
        "transition-colors hover:text-heyo-default heyo-focus",
      ),
      children: (
        <>
          {renderIcon(item.icon, "size-3.5 shrink-0")}
          <span className="min-w-0 truncate">{item.label}</span>
        </>
      ),
    },
  });
}
