"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { ColumnsIcon, SearchIcon, XIcon } from "../lib/icons";
import { useSelection } from "../lib/use-selection";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Dropdown } from "./dropdown";
import { Empty } from "./empty";
import { Input } from "./input";
import { Skeleton } from "./skeleton";
import { Table } from "./table";

export interface DataTableColumn<Row> {
  /** Stable key. Also what `sort` reports and what the column toggle stores. */
  id: string;
  header: ReactNode;
  /** Cell contents. Return a node — formatting lives here, not in the data. */
  cell: (row: Row) => ReactNode;
  align?: "start" | "center" | "end";
  /** Tabular figures, right-aligned. */
  numeric?: boolean;
  /** The column you scan for. Full contrast, medium weight. */
  primary?: boolean;
  /**
   * Makes the header a sort button. Return a comparable value, or sort the
   * rows yourself and pass `true` to get just the affordance.
   */
  sortBy?: ((row: Row) => string | number) | true;
  /** Keeps the column out of the toggle menu — an id column, say. */
  fixed?: boolean;
  /** Start hidden, still listed in the toggle menu. */
  hidden?: boolean;
  /** Renders in the trailing actions column instead of a normal cell. */
  actions?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<Row> {
  rows: Row[];
  columns: DataTableColumn<Row>[];
  /** Stable id per row — selection and React keys both use it. */
  getRowId: (row: Row) => string;

  /** Client-side search box. Matched against `searchFields`, or every cell. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Values to match the query against. Defaults to `JSON.stringify(row)`. */
  searchFields?: (row: Row) => (string | number | null | undefined)[];
  /** Controlled query — pair with server-side filtering. */
  query?: string;
  onQueryChange?: (query: string) => void;

  /** Checkbox column plus the bulk bar. */
  selectable?: boolean;
  /** Rendered in the bar that appears once something is selected. */
  bulkActions?: (selected: string[], clear: () => void) => ReactNode;

  /** Toolbar slot on the right — filters, a date range, a "New" button. */
  toolbar?: ReactNode;
  /** Adds the column visibility menu. @default true when any column is toggleable */
  columnToggle?: boolean;
  /** Title above the toolbar. Pair with `description`. */
  title?: ReactNode;
  description?: ReactNode;

  /** Skeleton rows instead of data. */
  loading?: boolean;
  loadingRows?: number;
  /** Shown when there are no rows at all. */
  empty?: ReactNode;
  /** Shown when the query matches nothing — different problem, different text. */
  emptyFiltered?: ReactNode;

  onRowClick?: (row: Row) => void;
  striped?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;
  className?: string;
  /** Footer strip under the table — pagination, counts. */
  footer?: ReactNode;
}

/**
 * `Table` with everything a real list needs bolted on: search, sorting, column
 * visibility, selection with a bulk-action bar, loading skeletons and two
 * different empty states.
 *
 * Two layout decisions worth knowing about:
 *
 * - **The bulk bar replaces the toolbar in place.** It does not appear *above*
 *   it: pushing the table down the moment you tick a checkbox moves the rows
 *   out from under the cursor, which is how you end up selecting the wrong one.
 * - **The whole thing is one card.** Toolbar, table and footer share a single
 *   ring and one background, because they are one control — three stacked
 *   boxes read as three unrelated widgets.
 *
 * Filtering and sorting are client-side by default: the 95% case is a page of
 * a few hundred rows you already have, and a server round trip to filter those
 * turns a snappy list into a spinner. Every input is also controllable, so the
 * same component works against a server when the list outgrows the page.
 */
export function DataTable<Row>({
  rows,
  columns,
  getRowId,
  searchable,
  searchPlaceholder = "Search…",
  searchFields,
  query: queryProp,
  onQueryChange,
  selectable,
  bulkActions,
  toolbar,
  columnToggle,
  title,
  description,
  loading,
  loadingRows = 5,
  empty,
  emptyFiltered,
  onRowClick,
  striped,
  stickyHeader,
  maxHeight,
  className,
  footer,
}: DataTableProps<Row>) {
  const [internalQuery, setInternalQuery] = useState("");
  const [hidden, setHidden] = useState<string[]>(() =>
    columns.filter((column) => column.hidden).map((column) => column.id),
  );
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>(null);

  const query = queryProp ?? internalQuery;
  const serverFiltered = Boolean(onQueryChange);

  const dataColumns = useMemo(
    () => columns.filter((column) => !column.actions),
    [columns],
  );
  const actionColumn = useMemo(
    () => columns.find((column) => column.actions),
    [columns],
  );

  const visibleColumns = useMemo(
    () => dataColumns.filter((column) => !hidden.includes(column.id)),
    [dataColumns, hidden],
  );

  const toggleableColumns = dataColumns.filter((column) => !column.fixed);
  const showColumnToggle =
    (columnToggle ?? toggleableColumns.length > 0) &&
    toggleableColumns.length > 0;

  const filtered = useMemo(() => {
    if (serverFiltered || !query.trim()) return rows;
    const needle = query.toLowerCase();
    return rows.filter((row) => {
      const haystack = searchFields
        ? searchFields(row)
            .filter((part) => part != null)
            .join(" ")
        : JSON.stringify(row);
      return haystack.toLowerCase().includes(needle);
    });
  }, [rows, query, searchFields, serverFiltered]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((item) => item.id === sort.id);
    // `sortBy: true` means "the caller sorts" — we only draw the arrow.
    if (!column || column.sortBy === true || !column.sortBy) return filtered;

    const key = column.sortBy;
    const next = [...filtered].sort((a, b) => {
      const left = key(a);
      const right = key(b);
      if (typeof left === "number" && typeof right === "number") {
        return left - right;
      }
      return String(left).localeCompare(String(right));
    });
    return sort.desc ? next.reverse() : next;
  }, [filtered, sort, columns]);

  const ids = useMemo(() => sorted.map(getRowId), [sorted, getRowId]);
  const selection = useSelection(ids);
  const { clear } = selection;

  // A filter that hides selected rows must not leave them selected: the bulk
  // bar would act on records the user can no longer see.
  useEffect(() => {
    clear();
  }, [query, clear]);

  const columnCount =
    visibleColumns.length + (selectable ? 1 : 0) + (actionColumn ? 1 : 0);
  const hasHeader = Boolean(
    title || description || searchable || toolbar || showColumnToggle,
  );
  const isEmpty = !loading && sorted.length === 0;
  const bulk = selectable && selection.count > 0;

  function toggleSort(id: string) {
    setSort((current) =>
      current?.id === id
        ? current.desc
          ? null
          : { id, desc: true }
        : { id, desc: false },
    );
  }

  return (
    <div
      data-slot="data-table"
      className={cn(
        // One card: the chrome, the rows and the footer are one control.
        "flex min-w-0 flex-col overflow-hidden rounded-xl bg-heyo-base ring-1 ring-heyo-line",
        className,
      )}
    >
      {title || description ? (
        <div className="flex flex-col gap-0.5 border-b border-heyo-hairline px-4 pt-3.5 pb-3">
          {title ? (
            <span className="text-sm font-medium text-heyo-strong">
              {title}
            </span>
          ) : null}
          {description ? (
            <span className="text-xs text-heyo-subtle">{description}</span>
          ) : null}
        </div>
      ) : null}

      {hasHeader ? (
        <div
          data-slot="data-table-toolbar"
          data-bulk={bulk ? "" : undefined}
          className={cn(
            "relative flex h-13 shrink-0 items-center gap-2 border-b border-heyo-hairline px-3",
            "transition-colors duration-100 ease-heyo",
            bulk && "bg-heyo-brand-tint",
          )}
        >
          {bulk ? (
            /* In place, not stacked above: the rows must not move the instant
               you tick a box. */
            <>
              <Badge variant="contrast" size="base">
                {selection.count}
              </Badge>
              <span className="text-sm font-medium text-heyo-strong">
                selected
              </span>
              <Button
                size="sm"
                variant="ghost"
                icon={XIcon}
                aria-label="Clear selection"
                shape="square"
                onClick={selection.clear}
              />
              <div className="ml-auto flex flex-wrap items-center gap-2">
                {bulkActions?.(selection.selected, selection.clear)}
              </div>
            </>
          ) : (
            <>
              {searchable ? (
                <Input
                  size="sm"
                  icon={SearchIcon}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  value={query}
                  onChange={(event) => {
                    if (queryProp === undefined) {
                      setInternalQuery(event.target.value);
                    }
                    onQueryChange?.(event.target.value);
                  }}
                  className="w-56"
                />
              ) : null}

              {query.trim() && !loading ? (
                <span className="text-xs tabular-nums text-heyo-subtle">
                  {sorted.length} of {rows.length}
                </span>
              ) : null}

              <div className="ml-auto flex flex-wrap items-center gap-2">
                {toolbar}
                {showColumnToggle ? (
                  <Dropdown>
                    <Dropdown.Trigger
                      render={
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={ColumnsIcon}
                          aria-label="Columns"
                          shape="square"
                        />
                      }
                    />
                    <Dropdown.Content align="end">
                      <Dropdown.Label>Columns</Dropdown.Label>
                      {toggleableColumns.map((column) => (
                        <Dropdown.CheckboxItem
                          key={column.id}
                          checked={!hidden.includes(column.id)}
                          closeOnClick={false}
                          onCheckedChange={(checked) =>
                            setHidden((current) =>
                              checked
                                ? current.filter((id) => id !== column.id)
                                : [...current, column.id],
                            )
                          }
                        >
                          {column.header}
                        </Dropdown.CheckboxItem>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                ) : null}
              </div>
            </>
          )}
        </div>
      ) : null}

      <Table
        striped={striped}
        interactive={Boolean(onRowClick)}
        stickyHeader={stickyHeader}
        maxHeight={maxHeight}
      >
        <Table.Head>
          <Table.Row>
            {selectable ? (
              <Table.SelectHeader>
                <Checkbox
                  aria-label="Select all"
                  checked={selection.allSelected}
                  indeterminate={selection.someSelected}
                  onCheckedChange={(checked) => selection.toggleAll(checked)}
                />
              </Table.SelectHeader>
            ) : null}

            {visibleColumns.map((column) => (
              <Table.Header
                key={column.id}
                align={column.align ?? (column.numeric ? "end" : "start")}
                className={column.headerClassName}
                sort={
                  column.sortBy
                    ? sort?.id === column.id
                      ? sort.desc
                        ? "desc"
                        : "asc"
                      : false
                    : undefined
                }
                onSort={column.sortBy ? () => toggleSort(column.id) : undefined}
              >
                {column.header}
              </Table.Header>
            ))}

            {actionColumn ? (
              <Table.Header className="w-0 pl-0">
                <span className="sr-only">Actions</span>
              </Table.Header>
            ) : null}
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {loading
            ? Array.from({ length: loadingRows }, (_, index) => (
                <Table.Row key={index}>
                  {Array.from({ length: columnCount }, (_, cell) => (
                    <Table.Cell key={cell}>
                      <Skeleton
                        className="h-3.5"
                        // One wave down the table, not forty bars in lockstep.
                        delay={`${index * 110}ms`}
                        // Ragged widths, seeded off the position: identical bars
                        // in every row read as a loading *graphic*, not as text
                        // that is about to arrive.
                        style={{
                          width: `${45 + ((index * 7 + cell * 23) % 45)}%`,
                        }}
                      />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            : sorted.map((row) => {
                const id = getRowId(row);
                return (
                  <Table.Row
                    key={id}
                    selected={selectable && selection.isSelected(id)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {selectable ? (
                      <Table.SelectCell
                        // Or clicking the checkbox also opens the row.
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Checkbox
                          aria-label={`Select ${id}`}
                          checked={selection.isSelected(id)}
                          onCheckedChange={(checked) =>
                            selection.toggle(id, checked)
                          }
                        />
                      </Table.SelectCell>
                    ) : null}

                    {visibleColumns.map((column) => (
                      <Table.Cell
                        key={column.id}
                        align={column.align}
                        numeric={column.numeric}
                        primary={column.primary}
                        className={column.className}
                      >
                        {column.cell(row)}
                      </Table.Cell>
                    ))}

                    {actionColumn ? (
                      <Table.ActionCell
                        onClick={(event) => event.stopPropagation()}
                        className={actionColumn.className}
                      >
                        {actionColumn.cell(row)}
                      </Table.ActionCell>
                    ) : null}
                  </Table.Row>
                );
              })}

          {isEmpty ? (
            /* Not a row of data, so it gets none of a row's affordances: no
               hover tint, no leading marker, no pointer. */
            <Table.Row placeholder>
              <Table.Cell colSpan={columnCount} className="h-auto p-0">
                {query.trim()
                  ? (emptyFiltered ?? (
                      <Empty
                        align="center"
                        title="No matches"
                        description={`Nothing matches “${query}”.`}
                        className="py-12"
                        action={
                          queryProp === undefined ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setInternalQuery("")}
                            >
                              Clear search
                            </Button>
                          ) : undefined
                        }
                      />
                    ))
                  : (empty ?? (
                      <Empty
                        align="center"
                        title="Nothing here yet"
                        className="py-12"
                      />
                    ))}
              </Table.Cell>
            </Table.Row>
          ) : null}
        </Table.Body>
      </Table>

      {footer ? (
        <div
          data-slot="data-table-footer"
          className="flex shrink-0 items-center justify-between gap-2 border-t border-heyo-hairline bg-heyo-elevated px-3 py-2"
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}
