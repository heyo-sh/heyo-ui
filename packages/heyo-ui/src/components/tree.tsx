"use client";

import { useMemo, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { ChevronRightIcon } from "../lib/icons";

export interface TreeNode {
  id: string;
  label: ReactNode;
  icon?: IconLike;
  /** Right-aligned hint — a count, a status dot, a size. */
  meta?: ReactNode;
  disabled?: boolean;
  /**
   * Children. An empty array still renders a chevron (an empty folder); leave
   * it `undefined` for a leaf.
   */
  children?: TreeNode[];
}

export interface TreeProps extends Omit<ComponentProps<"div">, "onSelect"> {
  nodes: TreeNode[];
  /** Ids of the open branches. Uncontrolled unless you pass `onExpandedChange`. */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (expanded: string[]) => void;
  selected?: string | null;
  onSelect?: (node: TreeNode) => void;
  /** Icon for open branches, when it differs from `icon`. */
  openIcon?: IconLike;
}

/**
 * A collapsible hierarchy — file trees, resource explorers, nested config.
 *
 * Indentation is drawn as a guide line per level rather than as padding, so at
 * depth five you can still see which branch a row belongs to. Rows are real
 * buttons in a `tree` role, so arrow keys and screen readers both work.
 */
export function Tree({
  className,
  nodes,
  expanded,
  defaultExpanded = [],
  onExpandedChange,
  selected,
  onSelect,
  openIcon,
  ...props
}: TreeProps) {
  const [uncontrolled, setUncontrolled] = useState<string[]>(defaultExpanded);
  const open = expanded ?? uncontrolled;
  const openSet = useMemo(() => new Set(open), [open]);

  function toggle(id: string) {
    const next = openSet.has(id)
      ? open.filter((item) => item !== id)
      : [...open, id];
    if (expanded === undefined) setUncontrolled(next);
    onExpandedChange?.(next);
  }

  return (
    <div
      role="tree"
      data-slot="tree"
      className={cn("flex min-w-0 flex-col", className)}
      {...props}
    >
      {nodes.map((node) => (
        <TreeBranch
          key={node.id}
          node={node}
          depth={0}
          openSet={openSet}
          toggle={toggle}
          selected={selected}
          onSelect={onSelect}
          openIcon={openIcon}
        />
      ))}
    </div>
  );
}

function TreeBranch({
  node,
  depth,
  openSet,
  toggle,
  selected,
  onSelect,
  openIcon,
}: {
  node: TreeNode;
  depth: number;
  openSet: Set<string>;
  toggle: (id: string) => void;
  selected?: string | null;
  onSelect?: (node: TreeNode) => void;
  openIcon?: IconLike;
}) {
  const branch = node.children !== undefined;
  const isOpen = branch && openSet.has(node.id);
  const isSelected = selected === node.id;
  const icon = isOpen ? (openIcon ?? node.icon) : node.icon;

  return (
    <div role="none" className="min-w-0">
      <button
        type="button"
        role="treeitem"
        aria-expanded={branch ? isOpen : undefined}
        aria-selected={isSelected}
        aria-level={depth + 1}
        disabled={node.disabled}
        data-slot="tree-item"
        data-selected={isSelected ? "" : undefined}
        onClick={() => {
          if (branch) toggle(node.id);
          onSelect?.(node);
        }}
        // The indent is padding on the row, not a wrapper, so the hover and
        // selection tints run the full width instead of stopping at the text.
        style={{ paddingLeft: `${depth * 0.875 + 0.375}rem` }}
        className={cn(
          "flex h-7 w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md pr-2",
          "text-left text-sm text-heyo-default transition-colors duration-75",
          "hover:bg-heyo-tint heyo-focus",
          "data-selected:bg-heyo-brand-tint data-selected:font-medium data-selected:text-heyo-strong",
          "disabled:pointer-events-none disabled:text-heyo-inactive",
        )}
      >
        <span className="flex size-4 shrink-0 items-center justify-center">
          {branch ? (
            <ChevronRightIcon
              aria-hidden
              className={cn(
                "size-3.5 text-heyo-subtle",
                // `rotate`, not `transform`: Tailwind v4's rotate-90 sets the
                // standalone property, so transitioning `transform` does nothing.
                "transition-[rotate] duration-150 ease-heyo motion-reduce:transition-none",
                isOpen && "rotate-90",
              )}
            />
          ) : null}
        </span>

        {icon ? (
          <span className="size-3.5 shrink-0 text-heyo-subtle">
            {renderIcon(icon, "size-full")}
          </span>
        ) : null}

        <span className="min-w-0 flex-1 truncate">{node.label}</span>

        {node.meta ? (
          <span className="shrink-0 text-xs text-heyo-subtle">{node.meta}</span>
        ) : null}
      </button>

      {branch && isOpen ? (
        <div
          role="group"
          className="relative min-w-0"
          // The guide line sits under the chevron column of the parent row, so
          // it reads as "these belong to that".
          style={{ ["--tree-guide" as string]: `${depth * 0.875 + 0.8}rem` }}
        >
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-(--tree-guide) w-px bg-heyo-hairline"
          />
          {node.children!.map((child) => (
            <TreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              openSet={openSet}
              toggle={toggle}
              selected={selected}
              onSelect={onSelect}
              openIcon={openIcon}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
