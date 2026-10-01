"use client";

import { useCallback, useMemo, useState } from "react";

export interface Selection<Id> {
  /** The selected ids, in no particular order. */
  selected: Id[];
  isSelected: (id: Id) => boolean;
  toggle: (id: Id, next?: boolean) => void;
  /** Select every id, or clear them all. Omit `next` to flip. */
  toggleAll: (next?: boolean) => void;
  clear: () => void;
  /** Every row is selected — the header checkbox is `checked`. */
  allSelected: boolean;
  /** Some but not all — the header checkbox is `indeterminate`. */
  someSelected: boolean;
  count: number;
}

/**
 * Row selection for a table, which is the only reason `Checkbox`'s
 * `indeterminate` state exists.
 *
 * ```tsx
 * const rows = useSelection(deployments.map((d) => d.sha));
 *
 * <Table.SelectHeader>
 *   <Checkbox
 *     aria-label="Select all"
 *     checked={rows.allSelected}
 *     indeterminate={rows.someSelected}
 *     onCheckedChange={(next) => rows.toggleAll(next)}
 *   />
 * </Table.SelectHeader>
 * ```
 *
 * `ids` is the *current* page of rows: `toggleAll` only ever touches what the
 * user can actually see, which is what every table that got this right does.
 */
export function useSelection<Id>(
  ids: readonly Id[],
  initial: readonly Id[] = [],
): Selection<Id> {
  const [selected, setSelected] = useState<Set<Id>>(() => new Set(initial));

  const isSelected = useCallback((id: Id) => selected.has(id), [selected]);

  const toggle = useCallback((id: Id, next?: boolean) => {
    setSelected((current) => {
      const copy = new Set(current);
      const on = next ?? !copy.has(id);
      if (on) copy.add(id);
      else copy.delete(id);
      return copy;
    });
  }, []);

  const toggleAll = useCallback(
    (next?: boolean) => {
      setSelected((current) => {
        const on = next ?? !ids.every((id) => current.has(id));
        if (!on) return new Set();
        return new Set(ids);
      });
    },
    [ids],
  );

  const clear = useCallback(() => setSelected(new Set()), []);

  return useMemo(() => {
    const count = ids.reduce((sum, id) => sum + (selected.has(id) ? 1 : 0), 0);
    return {
      selected: [...selected],
      isSelected,
      toggle,
      toggleAll,
      clear,
      allSelected: ids.length > 0 && count === ids.length,
      someSelected: count > 0 && count < ids.length,
      count,
    };
  }, [ids, selected, isSelected, toggle, toggleAll, clear]);
}
