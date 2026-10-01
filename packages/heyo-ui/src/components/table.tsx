"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export interface TableProps extends ComponentProps<"table"> {
  /** Tint every other row. Helps when scanning wide, numeric tables. */
  striped?: boolean;
  /** Highlight rows on hover — only useful when rows are clickable. */
  interactive?: boolean;
  /** Pin the header while the body scrolls. Needs a bounded `maxHeight`. */
  stickyHeader?: boolean;
  /** Caps the scroll container, e.g. `"24rem"`. Implies a vertical scrollbar. */
  maxHeight?: string;
  /** Class for the scroll container around the table. */
  wrapperClassName?: string;
}

/**
 * A data table.
 *
 * Three decisions do most of the work here:
 *
 * 1. **Rows are separated by a hairline, not by a fill.** Zebra striping is
 *    opt-in (`striped`) and deliberately weak, because on a dense table it
 *    fights every other tint the system uses for meaning.
 * 2. **The header is not a toolbar.** It sits on the page background with
 *    uppercase micro-type, so the eye reads it as a label row and then stops
 *    coming back to it.
 * 3. **The hover state is a full-bleed tint plus a left marker.** On a table
 *    1200px wide, a tint alone is invisible under the cursor at the far right;
 *    the marker tells you which row you're actually on.
 */
function TableRoot({
  className,
  striped,
  interactive,
  stickyHeader,
  maxHeight,
  wrapperClassName,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-wrapper"
      className={cn(
        "w-full overflow-auto overscroll-x-contain heyo-scrollbar",
        wrapperClassName,
      )}
      style={maxHeight ? { maxHeight } : undefined}
    >
      <table
        data-slot="table"
        data-striped={striped ? "" : undefined}
        data-interactive={interactive ? "" : undefined}
        className={cn(
          "w-full border-collapse text-left text-sm",
          // `border-separate` would break `position: sticky` on the header.
          stickyHeader && [
            "[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-2",
            "[&_thead]:bg-heyo-base",
            // A shadow rather than a border: a border on a sticky `<thead>`
            // scrolls away with the cell it's drawn on in Safari.
            "[&_thead]:shadow-[0_1px_0_var(--color-heyo-hairline)]",
          ],
          // `:not([data-placeholder])` on both: an empty state or a "load
          // more" strip is not a record, so it is neither striped nor clickable.
          "[&[data-striped]_tbody_tr:nth-child(even):not([data-placeholder])]:bg-heyo-elevated",
          "[&[data-interactive]_tbody_tr:not([data-placeholder])]:cursor-pointer",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHead({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-head"
      className={cn("border-b border-heyo-hairline", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-heyo-hairline",
        className,
      )}
      {...props}
    />
  );
}

export interface TableRowProps extends ComponentProps<"tr"> {
  /**
   * Tints the row and exposes `data-selected`, so the whole row reflects its
   * checkbox instead of leaving a lone tick to carry the state.
   */
  selected?: boolean;
  /**
   * This row is not a record — an empty state, a "load more" strip, a group
   * heading. Drops every affordance a real row has: no hover tint, no leading
   * marker, no pointer. Highlighting a "Nothing here yet" panel as you pass
   * over it promises something to click that isn't there.
   */
  placeholder?: boolean;
}

function TableRow({
  className,
  selected,
  placeholder,
  ...props
}: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-selected={selected ? "" : undefined}
      data-placeholder={placeholder ? "" : undefined}
      aria-selected={selected}
      className={cn(
        "group/row relative transition-colors duration-75",
        // Hover is a scanning aid, not an affordance — it's on for every body
        // row, clickable or not. The leading marker lives on the first cell
        // (see `TableCell`), because a pseudo-element on a `<tr>` cannot be
        // positioned reliably across browsers.
        "[tbody_&]:not-data-placeholder:hover:bg-heyo-tint",
        "data-selected:bg-heyo-brand-tint data-selected:hover:bg-heyo-brand-tint",
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeaderProps extends Omit<ComponentProps<"th">, "align"> {
  /**
   * Right-align for numbers, centre for icon columns. Shadows the deprecated
   * HTML `align` attribute on purpose — logical values, not `left`/`right`.
   */
  align?: "start" | "center" | "end";
  /** Makes the header a sort button. Pair with `sort`. */
  onSort?: () => void;
  /** Current sort for this column. `false` means "sortable, not sorted". */
  sort?: "asc" | "desc" | false;
}

const alignClass = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
} as const;

const justifyClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
} as const;

/**
 * The sort glyph: two stacked chevrons, one per direction, with the active one
 * at full strength. A single rotating arrow is smaller and prettier and tells
 * you nothing until you've already clicked — this says "sortable" while it's
 * idle and "sorted, this way" once it isn't.
 */
function SortGlyph({ sort }: { sort: "asc" | "desc" | false }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 flex-col items-center justify-center gap-px",
        "transition-opacity duration-100",
        sort ? "opacity-100" : "opacity-0 group-hover/sort:opacity-45",
      )}
    >
      <svg viewBox="0 0 8 4" className="h-[3px] w-2 fill-current">
        <path
          d="M4 0 8 4H0z"
          className={sort === "asc" ? "opacity-100" : "opacity-30"}
        />
      </svg>
      <svg viewBox="0 0 8 4" className="h-[3px] w-2 fill-current">
        <path
          d="M4 4 0 0h8z"
          className={sort === "desc" ? "opacity-100" : "opacity-30"}
        />
      </svg>
    </span>
  );
}

function TableHeader({
  className,
  align = "start",
  onSort,
  sort,
  children,
  ...props
}: TableHeaderProps) {
  const sortable = Boolean(onSort) || sort !== undefined;

  return (
    <th
      data-slot="table-header"
      scope="col"
      aria-sort={
        sort === "asc"
          ? "ascending"
          : sort === "desc"
            ? "descending"
            : sortable
              ? "none"
              : undefined
      }
      className={cn(
        "h-9 px-3 align-middle whitespace-nowrap",
        // Micro-caps: small, spaced and muted, so the header row registers as a
        // label and then gets out of the way of the data.
        "text-[11px] font-medium tracking-wider text-heyo-subtle uppercase",
        "first:pl-4 last:pr-4",
        alignClass[align],
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          data-slot="table-sort"
          data-sorted={sort ? "" : undefined}
          className={cn(
            "group/sort -mx-1.5 inline-flex h-6 max-w-full cursor-pointer items-center gap-1.5",
            "rounded-md bg-transparent px-1.5 text-inherit",
            // Sorting is a double-click away from selecting the header text,
            // which leaves a highlight sitting over the label.
            "select-none",
            "transition-colors duration-75",
            "hover:bg-heyo-tint hover:text-heyo-default",
            "data-sorted:text-heyo-strong",
            // `:focus-visible` only. Clicking to sort is the single most
            // repeated action on a table; a ring after every click is noise.
            "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-heyo-focus",
            justifyClass[align],
            align === "end" && "flex-row-reverse",
          )}
        >
          <span className="min-w-0 truncate">{children}</span>
          <SortGlyph sort={sort ?? false} />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export interface TableCellProps extends Omit<ComponentProps<"td">, "align"> {
  align?: "start" | "center" | "end";
  /** Tabular figures + right alignment, for anything counted or measured. */
  numeric?: boolean;
  /**
   * The row's headline — the id, the name, the thing you scan for. Gets full
   * contrast and medium weight; everything else stays quiet around it.
   */
  primary?: boolean;
}

function TableCell({
  className,
  align,
  numeric,
  primary,
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "relative h-10 px-3 align-middle text-heyo-default",
        "first:pl-4 last:pr-4",
        // The hover/selection marker: a 2px bar on the row's leading edge, so
        // you can tell which row you're on from the far side of a wide table.
        "first:before:absolute first:before:inset-y-0 first:before:left-0 first:before:w-0.5",
        "first:before:origin-center first:before:scale-y-0 first:before:bg-heyo-brand",
        "first:before:transition-transform first:before:duration-100 first:before:ease-heyo",
        "group-hover/row:first:before:scale-y-100",
        "group-data-[selected]/row:first:before:scale-y-100",
        // A placeholder row has no marker at all — see `TableRow`.
        "group-data-[placeholder]/row:first:before:hidden",
        alignClass[align ?? (numeric ? "end" : "start")],
        numeric && "tabular-nums",
        primary && "font-medium text-heyo-strong",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("px-4 py-2 text-left text-xs text-heyo-subtle", className)}
      {...props}
    />
  );
}

/** The narrow first column that holds a row's checkbox. */
function TableSelectCell({ className, ...props }: TableCellProps) {
  return (
    <TableCell
      data-slot="table-select-cell"
      className={cn("w-0 pr-0", className)}
      {...props}
    />
  );
}

function TableSelectHeader({ className, ...props }: TableHeaderProps) {
  return (
    <TableHeader
      data-slot="table-select-header"
      className={cn("w-0 pr-0", className)}
      {...props}
    />
  );
}

/**
 * The trailing column for row actions. Fades its contents in on hover, so a
 * list of fifty rows isn't fifty ⋯ buttons competing with the data — but keeps
 * them visible whenever the keyboard is inside the cell.
 */
function TableActionCell({ className, children, ...props }: TableCellProps) {
  return (
    <TableCell
      data-slot="table-action-cell"
      align="end"
      className={cn("w-0 pl-0", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-end gap-1",
          "opacity-0 transition-opacity duration-100",
          "group-hover/row:opacity-100 group-data-[selected]/row:opacity-100",
          "focus-within:opacity-100",
        )}
      >
        {children}
      </div>
    </TableCell>
  );
}

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Header: TableHeader,
  Cell: TableCell,
  Caption: TableCaption,
  SelectHeader: TableSelectHeader,
  SelectCell: TableSelectCell,
  ActionCell: TableActionCell,
});
