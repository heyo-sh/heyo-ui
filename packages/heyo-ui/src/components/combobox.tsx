"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  controlIconSize,
  controlSizeVariants,
  controlTriggerBase,
  type ControlSize,
} from "../lib/control";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { CheckIcon, ChevronUpDownIcon, XIcon } from "../lib/icons";
import { popupItem, popupMotion, popupSurface } from "../lib/surface";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: ReactNode;
  /** Leading glyph — a component, an element, or any node. */
  icon?: IconLike;
  disabled?: boolean;
  /** Section heading. Rows sharing one are grouped, in first-seen order. */
  group?: string;
}

interface ComboboxSharedProps {
  options: ComboboxOption[];
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  /** Text when the filter matches nothing. */
  emptyMessage?: ReactNode;
  /** Cap on the list height. @default "18rem" */
  maxHeight?: string;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

export interface ComboboxProps extends ComboboxSharedProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Show a ✕ that clears the selection. @default true */
  clearable?: boolean;
}

export interface MultiComboboxProps extends ComboboxSharedProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Beyond this many chips, the rest collapse into `+N`. */
  maxChips?: number;
}

function groupOptions(options: ComboboxOption[]) {
  const byGroup = new Map<string, ComboboxOption[]>();
  for (const option of options) {
    const key = option.group ?? "";
    const bucket = byGroup.get(key);
    if (bucket) bucket.push(option);
    else byGroup.set(key, [option]);
  }
  return [...byGroup.entries()];
}

function ComboboxList({
  options,
  emptyMessage,
  maxHeight,
}: {
  options: ComboboxOption[];
  emptyMessage: ReactNode;
  maxHeight: string;
}) {
  const groups = groupOptions(options);
  const grouped = groups.length > 1 || Boolean(groups[0]?.[0]);

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner sideOffset={4}>
        <ComboboxPrimitive.Popup
          data-slot="combobox-popup"
          className={cn(popupSurface, popupMotion, "w-(--anchor-width)")}
        >
          <ComboboxPrimitive.Empty
            className={cn(
              "px-3 py-6 text-center text-sm text-heyo-subtle",
              "empty:h-0 empty:overflow-hidden empty:p-0",
            )}
          >
            {emptyMessage}
          </ComboboxPrimitive.Empty>

          <ComboboxPrimitive.List
            className="overflow-y-auto overscroll-contain p-1 heyo-scrollbar"
            style={{ maxHeight: `min(${maxHeight}, var(--available-height))` }}
          >
            {grouped
              ? groups.map(([group, entries]) => (
                  <ComboboxPrimitive.Group key={group || "_"} items={entries}>
                    {group ? (
                      <ComboboxPrimitive.GroupLabel
                        className={cn(
                          "sticky top-0 z-1 bg-heyo-base px-2 py-1 text-xs font-medium text-heyo-subtle",
                          "relative before:pointer-events-none before:absolute before:inset-x-0",
                          "before:bottom-full before:h-2 before:bg-heyo-base",
                        )}
                      >
                        {group}
                      </ComboboxPrimitive.GroupLabel>
                    ) : null}
                    {entries.map((option) => (
                      <ComboboxItem key={option.value} option={option} />
                    ))}
                  </ComboboxPrimitive.Group>
                ))
              : options.map((option) => (
                  <ComboboxItem key={option.value} option={option} />
                ))}
          </ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxItem({ option }: { option: ComboboxOption }) {
  return (
    <ComboboxPrimitive.Item
      value={option.value}
      disabled={option.disabled}
      className={cn(popupItem, "relative items-start py-1.5 pr-2 pl-7")}
    >
      <ComboboxPrimitive.ItemIndicator className="absolute top-2 left-2 flex text-heyo-strong">
        <CheckIcon className="size-3.5" strokeWidth={2.25} />
      </ComboboxPrimitive.ItemIndicator>
      {option.icon ? (
        <span className="mt-0.5 flex size-3.5 shrink-0 text-heyo-subtle">
          {renderIcon(option.icon, "size-full")}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{option.label}</span>
        {option.description ? (
          <span className="truncate text-xs text-heyo-subtle">
            {option.description}
          </span>
        ) : null}
      </span>
    </ComboboxPrimitive.Item>
  );
}

/**
 * A `Select` you can type into.
 *
 * ```tsx
 * <Combobox options={regions} placeholder="Pick a region" />
 * <Combobox multiple options={regions} placeholder="Pick regions" />
 * ```
 *
 * Single: an input that filters as you type, with a chevron to browse.
 * `multiple`: the chosen values become removable chips inside the control and
 * the input keeps its place at the end of them, which is the only layout that
 * survives ten selections without turning into a second row of chrome.
 */
export function Combobox(props: ComboboxProps | MultiComboboxProps) {
  return props.multiple ? (
    <MultiCombobox {...props} />
  ) : (
    <SingleCombobox {...props} />
  );
}

function SingleCombobox({
  options,
  placeholder,
  size = "base",
  disabled,
  emptyMessage = "No matches",
  maxHeight = "18rem",
  value,
  defaultValue,
  onValueChange,
  clearable = true,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: ComboboxProps) {
  const iconClass = controlIconSize[size];

  return (
    <ComboboxPrimitive.Root
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as string | null)}
      disabled={disabled}
      name={name}
    >
      <ComboboxPrimitive.InputGroup
        data-slot="combobox"
        className={cn(
          controlTriggerBase,
          controlSizeVariants({ size }),
          "flex items-center gap-0 overflow-hidden p-0",
          "focus-within:ring-[1.5px] focus-within:ring-heyo-focus/45",
          className,
        )}
      >
        <ComboboxPrimitive.Input
          id={id}
          aria-label={ariaLabel}
          placeholder={placeholder}
          data-slot="combobox-input"
          className={cn(
            "h-full w-full min-w-0 border-0 bg-transparent px-2.5 text-inherit",
            "outline-none heyo-placeholder disabled:cursor-not-allowed",
          )}
        />
        {clearable ? (
          <ComboboxPrimitive.Clear
            aria-label="Clear"
            className={cn(
              "mr-0.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm",
              "text-heyo-subtle transition-colors hover:bg-heyo-tint hover:text-heyo-default",
              "heyo-focus",
            )}
          >
            <XIcon className="size-3" />
          </ComboboxPrimitive.Clear>
        ) : null}
        <ComboboxPrimitive.Trigger
          aria-label="Open"
          className={cn(
            "mr-2 inline-flex shrink-0 cursor-pointer items-center text-heyo-subtle",
            "transition-colors hover:text-heyo-default heyo-focus",
            iconClass,
          )}
        >
          <ChevronUpDownIcon className="size-3.5" />
        </ComboboxPrimitive.Trigger>
      </ComboboxPrimitive.InputGroup>

      <ComboboxList
        options={options}
        emptyMessage={emptyMessage}
        maxHeight={maxHeight}
      />
    </ComboboxPrimitive.Root>
  );
}

function MultiCombobox({
  options,
  placeholder,
  size = "base",
  disabled,
  emptyMessage = "No matches",
  maxHeight = "18rem",
  value,
  defaultValue,
  onValueChange,
  maxChips,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: MultiComboboxProps) {
  return (
    <ComboboxPrimitive.Root
      multiple
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as string[])}
      disabled={disabled}
      name={name}
    >
      {/* InputGroup on the outside, Chips inside it.

          Base UI anchors the popup to the input group, falling back to the bare
          `<input>`. With only `Chips` in the tree the fallback wins, and that
          input *shrinks* as chips take its place — so the list narrowed every
          time you picked something. The group is the whole control, and its
          width doesn't move. */}
      <ComboboxPrimitive.InputGroup
        data-slot="combobox"
        className={cn(
          controlTriggerBase,
          // Height is `min-h`, not `h`: chips wrap, and a fixed height would
          // either clip them or reserve empty space for the ones you haven't
          // picked yet.
          controlSizeVariants({ size }),
          "h-auto min-h-8 p-0",
          "cursor-text focus-within:ring-[1.5px] focus-within:ring-heyo-focus/45",
          className,
        )}
      >
        <ComboboxPrimitive.Chips className="flex w-full flex-wrap items-center gap-1 px-1.5 py-1">
          <ComboboxPrimitive.Value>
            {(selected: string[]) => {
              const shown = maxChips ? selected.slice(0, maxChips) : selected;
              const overflow = selected.length - shown.length;

              return (
                <>
                  {shown.map((item) => (
                    <ComboboxPrimitive.Chip
                      key={item}
                      className={cn(
                        "inline-flex h-5.5 max-w-full shrink-0 items-center gap-1 rounded-md pr-0.5 pl-2",
                        "bg-heyo-tint text-xs font-medium text-heyo-default select-none",
                        "data-[highlighted]:bg-heyo-fill",
                      )}
                    >
                      <span className="min-w-0 truncate">
                        {options.find((option) => option.value === item)
                          ?.label ?? item}
                      </span>
                      <ComboboxPrimitive.ChipRemove
                        aria-label={`Remove ${item}`}
                        className={cn(
                          "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm",
                          "text-heyo-subtle transition-colors hover:bg-heyo-fill-hover hover:text-heyo-default",
                        )}
                      >
                        <XIcon className="size-2.5" strokeWidth={2.5} />
                      </ComboboxPrimitive.ChipRemove>
                    </ComboboxPrimitive.Chip>
                  ))}
                  {overflow > 0 ? (
                    <span className="shrink-0 px-1 text-xs text-heyo-subtle select-none">
                      +{overflow}
                    </span>
                  ) : null}
                </>
              );
            }}
          </ComboboxPrimitive.Value>

          <ComboboxPrimitive.Input
            id={id}
            aria-label={ariaLabel}
            placeholder={placeholder}
            data-slot="combobox-input"
            className={cn(
              "h-6 min-w-24 flex-1 border-0 bg-transparent px-1 text-inherit",
              "outline-none heyo-placeholder disabled:cursor-not-allowed",
            )}
          />
        </ComboboxPrimitive.Chips>
      </ComboboxPrimitive.InputGroup>

      <ComboboxList
        options={options}
        emptyMessage={emptyMessage}
        maxHeight={maxHeight}
      />
    </ComboboxPrimitive.Root>
  );
}
