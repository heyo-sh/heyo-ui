"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  controlSizeVariants,
  controlTriggerBase,
  type ControlSize,
} from "../lib/control";
import { CheckIcon, ChevronUpDownIcon } from "../lib/icons";
import {
  popupItem,
  popupMotion,
  popupSurface,
  withLayer,
  zPopup,
} from "../lib/surface";
import { Field, type FieldOwnProps } from "./field";

export interface SelectProps<Value, Multiple extends boolean | undefined>
  extends SelectPrimitive.Root.Props<Value, Multiple>, FieldOwnProps {
  /**
   * Whether the open list locks the page.
   *
   * Defaults to `false`, unlike Base UI. A `true` modal locks document scroll,
   * and picking a value from a list is not a modal task — freezing the page
   * behind it is both surprising and, if the unlock ever misses, permanent.
   *
   * @default false
   */
  modal?: boolean;
  /** Class for the outer field wrapper (only when a label/description/error is used). */
  fieldClassName?: string;
}

/**
 * Pass `label` (or `description` / `error`) and the select gets the same field
 * layout `Input` does — same 6px gap under the label, same error type, same
 * wiring. Without them it is the bare control, and the caller lays it out.
 *
 * It is on the root rather than on the trigger because the label belongs to
 * the *value*, and the trigger is only how you change it.
 */
function SelectRoot<Value, Multiple extends boolean | undefined = false>({
  modal = false,
  label,
  description,
  error,
  optional,
  labelAside,
  fieldClassName,
  ...props
}: SelectProps<Value, Multiple>) {
  const select = <SelectPrimitive.Root modal={modal} {...props} />;

  const hasField =
    label !== undefined || description !== undefined || error !== undefined;
  if (!hasField) return select;

  return (
    <Field
      className={fieldClassName}
      label={label}
      description={description}
      error={error}
      optional={optional}
      labelAside={labelAside}
      disabled={props.disabled}
    >
      {select}
    </Field>
  );
}

export interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  size?: ControlSize;
  /** Text shown when nothing is selected. */
  placeholder?: string;
}

function SelectTrigger({
  className,
  size = "base",
  placeholder,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        // Press focus, not typing focus: the trigger keeps DOM focus after the
        // popup closes, so a `:focus` ring would leave it looking active
        // forever once you'd picked something.
        controlTriggerBase,
        controlSizeVariants({ size }),
        "flex cursor-pointer items-center justify-between text-left",
        "hover:bg-heyo-control-hover",
        "data-[popup-open]:ring-[1.5px] data-[popup-open]:ring-heyo-focus/45",
        className,
      )}
      {...props}
    >
      {children ?? (
        <SelectPrimitive.Value
          placeholder={placeholder}
          className="min-w-0 truncate data-[placeholder]:text-heyo-placeholder"
        />
      )}
      <SelectPrimitive.Icon className="ml-1.5 shrink-0 text-heyo-subtle">
        <ChevronUpDownIcon className="size-3.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/** A flat option, or a titled section of them. */
export type SelectOption =
  | { value: string; label: ReactNode; disabled?: boolean }
  | {
      label: ReactNode;
      items: { value: string; label: ReactNode; disabled?: boolean }[];
    };

export interface SelectContentProps extends SelectPrimitive.Popup.Props {
  sideOffset?: number;
  /** Cap on the popup height. Anything taller scrolls. */
  maxHeight?: string;
  /** Shorthand: build the list (and its groups) from data. */
  items?: SelectOption[];
  /** Positioner overrides, if you need a different placement. */
  positioner?: SelectPrimitive.Positioner.Props;
}

function SelectContent({
  className,
  sideOffset = 4,
  maxHeight = "18rem",
  items,
  positioner,
  children,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={false}
        {...positioner}
        // The layer belongs on the positioner: it is the transformed element,
        // so it is the stacking context a popup inside a dialog competes in.
        className={withLayer(zPopup, positioner?.className)}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            popupSurface,
            popupMotion,
            "overflow-y-auto overscroll-contain p-1 heyo-scrollbar",
            // Keeps a sticky group label from covering the item you land on
            // when arrowing through a long list.
            "scroll-pt-7 scroll-pb-1",
            className,
          )}
          style={{
            // Never taller than the space actually available, and never taller
            // than the cap — whichever is smaller.
            maxHeight: `min(${maxHeight}, var(--available-height))`,
          }}
          {...props}
        >
          {items
            ? items.map((option, index) =>
                "items" in option ? (
                  <SelectGroup key={index}>
                    <SelectGroupLabel>{option.label}</SelectGroupLabel>
                    {option.items.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ) : (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ),
              )
            : children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(popupItem, "relative pr-1.5 pl-6", className)}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-1.5 flex items-center text-heyo-strong">
        <CheckIcon className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="min-w-0 truncate">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * A titled section inside the list. Adds its own top rule so consecutive
 * groups separate themselves — no manual `<Select.Separator />` between them.
 */
function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(
        "not-first:mt-1 not-first:border-t not-first:border-heyo-hairline not-first:pt-1",
        className,
      )}
      {...props}
    />
  );
}

function SelectGroupLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn(
        // Sticky so you always know which section you're scrolling through.
        "sticky top-0 z-1 bg-heyo-base px-2 py-1 text-xs font-medium text-heyo-subtle",
        // The popup's own padding is inside the scrollport, so items scrolling
        // past would show in the 4px strip above a plain sticky label. This
        // pseudo-element carries the label's background up over it — and over
        // the group's top rule, which has no business being visible mid-scroll.
        "relative before:pointer-events-none before:absolute before:inset-x-0",
        "before:bottom-full before:h-2 before:bg-heyo-base",
        className,
      )}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-heyo-hairline", className)}
      {...props}
    />
  );
}

/**
 * A single-choice dropdown.
 *
 * ```tsx
 * <Select defaultValue="fra">
 *   <Select.Trigger placeholder="Pick a region" />
 *   <Select.Content>
 *     <Select.Group>
 *       <Select.GroupLabel>Europe</Select.GroupLabel>
 *       <Select.Item value="fra">Frankfurt</Select.Item>
 *     </Select.Group>
 *     <Select.Group>
 *       <Select.GroupLabel>North America</Select.GroupLabel>
 *       <Select.Item value="iad">Ashburn</Select.Item>
 *     </Select.Group>
 *   </Select.Content>
 * </Select>
 * ```
 */
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
  Value: SelectPrimitive.Value,
});
