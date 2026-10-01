"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { ChevronRightIcon } from "../lib/icons";
import { Button } from "./button";

export interface PaginationProps extends Omit<
  ComponentProps<"nav">,
  "onChange"
> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many page buttons to show around the current one. */
  siblings?: number;
  /** Drop the numbers and keep just prev/next plus a counter. */
  compact?: boolean;
}

/**
 * Builds the visible page list: always the first and last page, a window
 * around the current one, and `null` wherever a run was skipped.
 */
function buildRange(
  page: number,
  pageCount: number,
  siblings: number,
): (number | null)[] {
  const total = siblings * 2 + 5;
  if (pageCount <= total) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, pageCount);
  const showLeftGap = left > 2;
  const showRightGap = right < pageCount - 1;

  const range: (number | null)[] = [1];
  if (showLeftGap) range.push(null);
  for (let i = Math.max(left, 2); i <= Math.min(right, pageCount - 1); i += 1) {
    range.push(i);
  }
  if (showRightGap) range.push(null);
  range.push(pageCount);
  return range;
}

/**
 * ```tsx
 * <Pagination page={page} pageCount={12} onPageChange={setPage} />
 * ```
 */
export function Pagination({
  className,
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  compact,
  ...props
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <Button
        size="sm"
        variant="ghost"
        shape="square"
        aria-label="Previous page"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronRightIcon className="rotate-180" />
      </Button>

      {compact ? (
        <span className="px-2 text-sm tabular-nums text-heyo-subtle">
          {page} / {pageCount}
        </span>
      ) : (
        buildRange(page, pageCount, siblings).map((entry, index) =>
          entry === null ? (
            <span
              key={`gap-${index}`}
              aria-hidden
              className="px-1 text-sm text-heyo-inactive select-none"
            >
              …
            </span>
          ) : (
            <Button
              key={entry}
              size="sm"
              shape="square"
              variant={entry === page ? "secondary" : "ghost"}
              aria-label={`Page ${entry}`}
              aria-current={entry === page ? "page" : undefined}
              className="tabular-nums"
              onClick={() => onPageChange(entry)}
            >
              {entry}
            </Button>
          ),
        )
      )}

      <Button
        size="sm"
        variant="ghost"
        shape="square"
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRightIcon />
      </Button>
    </nav>
  );
}
