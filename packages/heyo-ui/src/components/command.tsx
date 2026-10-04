"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { EnterIcon, SearchIcon, SpinnerIcon } from "../lib/icons";
import { popupItem, zOverlay } from "../lib/surface";
import { Kbd } from "./kbd";

export interface CommandItem {
  /** Stable id, handed back to `onSelect`. */
  value: string;
  /** The row's headline. Matched against the query. */
  label: string;
  /** Second line — a path, an id, what the action does. Also matched. */
  description?: ReactNode;
  icon?: IconLike;
  /** Right-aligned hint, usually a `Kbd.Group`. */
  shortcut?: ReactNode;
  /** Section heading this row lives under. */
  group?: string;
  /** Extra terms to match on without showing them. */
  keywords?: string[];
  disabled?: boolean;
  /** Runs when the row is chosen, before the palette closes. */
  onSelect?: () => void;
}

export interface CommandProps {
  /** Everything the palette can find. */
  items: CommandItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Global shortcut that opens the palette. `"mod+k"` is ⌘K on macOS and Ctrl K
   * everywhere else. Pass `false` to bind it yourself.
   * @default "mod+k"
   */
  shortcut?: string | false;
  placeholder?: string;
  /** Fires for every chosen row, after the item's own `onSelect`. */
  onSelect?: (item: CommandItem) => void;
  /**
   * Take over filtering — debounce it, hit an API, rank it yourself. When set,
   * `items` is rendered exactly as given.
   */
  onQueryChange?: (query: string) => void;
  /** Controlled query. Only needed alongside `onQueryChange`. */
  query?: string;
  /** Swaps the leading icon for a spinner while results are in flight. */
  loading?: boolean;
  emptyMessage?: ReactNode;
  /** Replaces the default ↑↓/↵/esc legend. Pass `false` to drop the bar. */
  footer?: ReactNode | false;
  /** Anything that opens the palette, e.g. a button in the header. */
  trigger?: ReactNode;
  className?: string;
}

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
}

/** `"mod+k"` → `["⌘", "K"]`, or `["Ctrl", "K"]` off a Mac. */
export function formatShortcut(shortcut: string, mac = isMac()): string[] {
  return shortcut.split("+").map((part) => {
    const key = part.trim().toLowerCase();
    if (key === "mod") return mac ? "⌘" : "Ctrl";
    if (key === "shift") return mac ? "⇧" : "Shift";
    if (key === "alt") return mac ? "⌥" : "Alt";
    if (key === "ctrl") return mac ? "⌃" : "Ctrl";
    return key.length === 1 ? key.toUpperCase() : key;
  });
}

function matches(item: CommandItem, needle: string) {
  if (!needle) return true;
  const haystack = [
    item.label,
    typeof item.description === "string" ? item.description : "",
    item.group,
    ...(item.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Every whitespace-separated term has to appear somewhere, in any order, so
  // "log fra" finds "Logs — Frankfurt" without the user guessing the wording.
  return needle
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/**
 * The command palette — the ⌘K overlay that lands in the middle of the screen
 * and searches everything at once.
 *
 * It is *not* a dialog you happen to put an input in: it sits high rather than
 * centred (so the results grow downward into space you were already looking
 * at), it opens on a global shortcut, and Escape is the only button it needs.
 *
 * ```tsx
 * <Command
 *   items={commands}
 *   onSelect={(item) => run(item.value)}
 * />
 * ```
 *
 * Mount it once near the root and it binds ⌘K itself. For an inline field with
 * a dropdown of matches, reach for `Combobox` instead.
 */
export function Command({
  items,
  open,
  defaultOpen,
  onOpenChange,
  shortcut = "mod+k",
  placeholder = "Type a command or search…",
  onSelect,
  onQueryChange,
  query: queryProp,
  loading,
  emptyMessage = "No results",
  footer,
  trigger,
  className,
}: CommandProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    defaultOpen ?? false,
  );
  const [internalQuery, setInternalQuery] = useState("");
  const [mac, setMac] = useState(false);
  /** Whatever had focus when the palette opened, so we can put it back. */
  const opener = useRef<HTMLElement | null>(null);

  const isOpen = open ?? uncontrolledOpen;
  const query = queryProp ?? internalQuery;
  const controlledFilter = Boolean(onQueryChange);

  // Platform after mount: there is no `navigator` on the server, and rendering
  // ⌘ for a Linux user is worse than rendering nothing for one frame.
  useEffect(() => setMac(isMac()), []);

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
      // A palette that reopens with last week's query is a palette you have to
      // clear before you can use it.
      if (!next && queryProp === undefined) setInternalQuery("");
    },
    [open, onOpenChange, queryProp],
  );

  useEffect(() => {
    if (!shortcut) return;
    const keys = shortcut.split("+").map((part) => part.trim().toLowerCase());
    const needsMod = keys.includes("mod");
    const key = keys[keys.length - 1]!;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== key) return;
      if (needsMod && !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (!isOpen) {
        opener.current = document.activeElement as HTMLElement | null;
      }
      setOpen(!isOpen);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shortcut, isOpen, setOpen]);

  /** Groups in first-seen order — the data decides the section order. */
  const groups = useMemo(() => {
    const visible = controlledFilter
      ? items
      : items.filter((item) => matches(item, query));

    const byGroup = new Map<string, CommandItem[]>();
    for (const item of visible) {
      const key = item.group ?? "";
      const bucket = byGroup.get(key);
      if (bucket) bucket.push(item);
      else byGroup.set(key, [item]);
    }
    return [...byGroup.entries()];
  }, [items, query, controlledFilter]);

  const flat = useMemo(
    () => groups.flatMap(([, entries]) => entries),
    [groups],
  );

  function choose(item: CommandItem) {
    if (item.disabled) return;
    item.onSelect?.();
    onSelect?.(item);
    setOpen(false);
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      {trigger ? <DialogPrimitive.Trigger render={trigger as never} /> : null}

      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="command-backdrop"
          className={cn(
            "fixed inset-0 bg-heyo-scrim backdrop-blur-[1px]",
            zOverlay,
            "transition-opacity duration-150 ease-heyo",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <DialogPrimitive.Popup
          data-slot="command"
          // Base UI hands focus back to the trigger by default. Opened with the
          // keyboard that also re-arms `:focus-visible`, so closing the palette
          // left a black focus ring parked on a button the user never touched.
          // Put focus back where it actually came from — and nowhere at all if
          // it came from the page itself.
          finalFocus={() => {
            const previous = opener.current;
            opener.current = null;
            if (!previous || previous === document.body) return false;
            return previous;
          }}
          // Not `top-1/2`: a palette anchored at the optical centre jumps
          // around as results come and go. Pinned near the top it grows
          // downward, into space the eye is already resting on.
          className={cn(
            "fixed top-[12vh] left-1/2 -translate-x-1/2",
            zOverlay,
            "flex max-h-[min(30rem,70svh)] w-[calc(100vw-2rem)] max-w-xl flex-col overflow-hidden",
            "rounded-2xl bg-heyo-base text-heyo-default shadow-lg ring-1 ring-heyo-line outline-none",
            "transition-[opacity,transform] duration-150 ease-heyo",
            "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
            className,
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Command palette
          </DialogPrimitive.Title>

          {/* `inline open`: the list is part of this panel, not a popup of its
              own — Base UI still owns the roving highlight and Enter. */}
          <Autocomplete.Root
            inline
            open
            items={flat}
            mode="none"
            value={query}
            onValueChange={(next) => {
              if (queryProp === undefined) setInternalQuery(next);
              onQueryChange?.(next);
            }}
          >
            <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-heyo-hairline px-4">
              <span className="size-4 shrink-0 text-heyo-subtle">
                {loading ? (
                  <SpinnerIcon className="size-full animate-heyo-spin" />
                ) : (
                  <SearchIcon className="size-full" />
                )}
              </span>
              <Autocomplete.Input
                autoFocus
                placeholder={placeholder}
                data-slot="command-input"
                className={cn(
                  "h-full w-full min-w-0 border-0 bg-transparent p-0",
                  "text-base text-heyo-default outline-none heyo-placeholder",
                )}
              />
              <Kbd className="shrink-0">esc</Kbd>
            </div>

            {/* Base UI keeps this mounted for screen readers and only swaps its
                children, so it collapses rather than unmounting. */}
            <Autocomplete.Empty
              className={cn(
                "px-4 py-10 text-center text-sm text-heyo-subtle",
                "empty:h-0 empty:overflow-hidden empty:p-0",
              )}
            >
              {emptyMessage}
            </Autocomplete.Empty>

            <Autocomplete.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5 heyo-scrollbar">
              {groups.map(([group, entries]) => (
                <Autocomplete.Group key={group || "_"} items={entries}>
                  {group ? (
                    <Autocomplete.GroupLabel className="px-2 pt-2 pb-1 text-xs font-medium text-heyo-subtle">
                      {group}
                    </Autocomplete.GroupLabel>
                  ) : null}
                  {entries.map((item) => (
                    <Autocomplete.Item
                      key={item.value}
                      value={item}
                      disabled={item.disabled}
                      onClick={() => choose(item)}
                      className={cn(
                        popupItem,
                        "group/item items-center gap-2.5 py-2",
                      )}
                    >
                      {item.icon ? (
                        <span className="size-4 shrink-0 text-heyo-subtle">
                          {renderIcon(item.icon, "size-full")}
                        </span>
                      ) : null}
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate">{item.label}</span>
                        {item.description ? (
                          <span className="truncate text-xs text-heyo-subtle">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                      {item.shortcut ? (
                        <span className="shrink-0">{item.shortcut}</span>
                      ) : null}
                      {/* Only on the highlighted row: a full column of return
                          arrows is noise, one is an affordance. */}
                      <EnterIcon
                        aria-hidden
                        className="size-3.5 shrink-0 text-heyo-subtle opacity-0 group-data-[highlighted]/item:opacity-100"
                      />
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Group>
              ))}
            </Autocomplete.List>
          </Autocomplete.Root>

          {footer === false ? null : (
            <div
              data-slot="command-footer"
              className={cn(
                "flex shrink-0 items-center gap-3 border-t border-heyo-hairline",
                "bg-heyo-elevated px-4 py-2 text-xs text-heyo-subtle",
              )}
            >
              {footer ?? (
                <>
                  <span className="flex items-center gap-1.5">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Kbd>↵</Kbd>
                    select
                  </span>
                  <span className="ml-auto flex items-center gap-1.5">
                    {shortcut ? (
                      <Kbd.Group>
                        {formatShortcut(shortcut, mac).map((key) => (
                          <Kbd key={key}>{key}</Kbd>
                        ))}
                      </Kbd.Group>
                    ) : null}
                    to toggle
                  </span>
                </>
              )}
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface CommandShortcutProps {
  /** e.g. `"mod+k"`. Rendered as `Kbd` keys for the current platform. */
  keys: string;
  className?: string;
}

/** The `⌘K` hint you put in a header or a button, spelled for this platform. */
export function CommandShortcut({ keys, className }: CommandShortcutProps) {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(isMac()), []);

  return (
    <Kbd.Group className={className}>
      {formatShortcut(keys, mac).map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
    </Kbd.Group>
  );
}

Command.Shortcut = CommandShortcut;
