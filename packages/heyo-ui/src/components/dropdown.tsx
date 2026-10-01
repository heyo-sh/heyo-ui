"use client";

import { Menu } from "@base-ui/react/menu";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { CheckIcon, ChevronRightIcon } from "../lib/icons";
import { popupItem, popupMotion, popupSurface } from "../lib/surface";

export interface DropdownProps extends Menu.Root.Props {
  /**
   * Whether the menu locks the page while it is open.
   *
   * Defaults to `false`, which is not Base UI's default. A modal menu locks
   * document scroll, and a menu is not a modal task — it's a list of actions
   * you might not take. Locking the page for it makes the whole app feel
   * frozen, and any bug in the unlock leaves it frozen for real.
   *
   * @default false
   */
  modal?: boolean;
}

function DropdownRoot({ modal = false, ...props }: DropdownProps) {
  return <Menu.Root modal={modal} {...props} />;
}

/** A row, a separator, or a titled section. */
export type DropdownEntry =
  | "separator"
  | {
      label: React.ReactNode;
      icon?: IconLike;
      shortcut?: React.ReactNode;
      destructive?: boolean;
      disabled?: boolean;
      onClick?: () => void;
    }
  | { label: React.ReactNode; items: DropdownEntry[] };

export interface DropdownContentProps extends Menu.Popup.Props {
  side?: Menu.Positioner.Props["side"];
  align?: Menu.Positioner.Props["align"];
  sideOffset?: number;
  /** Shorthand: build the menu from data. */
  items?: DropdownEntry[];
  positioner?: Menu.Positioner.Props;
}

function renderEntries(entries: DropdownEntry[]): React.ReactNode {
  return entries.map((entry, index) => {
    if (entry === "separator") {
      return <DropdownSeparator key={index} />;
    }
    if ("items" in entry) {
      return (
        <Menu.Group key={index}>
          <DropdownLabel>{entry.label}</DropdownLabel>
          {renderEntries(entry.items)}
        </Menu.Group>
      );
    }
    return (
      <DropdownItem
        key={index}
        icon={entry.icon}
        shortcut={entry.shortcut}
        destructive={entry.destructive}
        disabled={entry.disabled}
        onClick={entry.onClick}
      >
        {entry.label}
      </DropdownItem>
    );
  });
}

function DropdownContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  items,
  positioner,
  children,
  ...props
}: DropdownContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        {...positioner}
      >
        <Menu.Popup
          data-slot="dropdown"
          className={cn(
            popupSurface,
            popupMotion,
            "max-h-(--available-height) min-w-40 overflow-y-auto p-1 heyo-scrollbar",
            className,
          )}
          {...props}
        >
          {items ? renderEntries(items) : children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export interface DropdownItemProps extends Menu.Item.Props {
  icon?: IconLike;
  /** Right-aligned hint — usually a `Kbd`. */
  shortcut?: React.ReactNode;
  /** Red styling for irreversible actions. */
  destructive?: boolean;
}

function DropdownItem({
  className,
  icon,
  shortcut,
  destructive,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <Menu.Item
      data-slot="dropdown-item"
      className={cn(
        popupItem,
        destructive &&
          "text-heyo-danger data-[highlighted]:bg-heyo-danger-tint data-[highlighted]:text-heyo-danger",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="size-3.5 shrink-0 opacity-70">
          {renderIcon(icon, "size-full")}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut ? <span className="ml-3 shrink-0">{shortcut}</span> : null}
    </Menu.Item>
  );
}

function DropdownCheckboxItem({
  className,
  children,
  ...props
}: Menu.CheckboxItem.Props) {
  return (
    <Menu.CheckboxItem
      data-slot="dropdown-checkbox-item"
      className={cn(popupItem, "relative pr-2 pl-7", className)}
      {...props}
    >
      <Menu.CheckboxItemIndicator className="absolute left-2 flex items-center text-heyo-strong">
        <CheckIcon className="size-3.5" strokeWidth={2.25} />
      </Menu.CheckboxItemIndicator>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </Menu.CheckboxItem>
  );
}

function DropdownRadioGroup({ className, ...props }: Menu.RadioGroup.Props) {
  return (
    <Menu.RadioGroup
      data-slot="dropdown-radio-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

/**
 * A single-choice row. Base UI ships it unstyled, and an unstyled radio item
 * is indistinguishable from a plain one — you cannot see which option is
 * selected, which is the only thing a radio group is for. The dot is drawn
 * here, on the same 20px gutter the checkbox item uses, so mixed menus line up.
 */
function DropdownRadioItem({
  className,
  children,
  ...props
}: Menu.RadioItem.Props) {
  return (
    <Menu.RadioItem
      data-slot="dropdown-radio-item"
      className={cn(
        popupItem,
        "group/radio relative pr-2 pl-7",
        "data-[checked]:text-heyo-strong",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-2 flex size-3.5 items-center justify-center rounded-full",
          "ring-1 ring-heyo-line transition-colors duration-100 ease-heyo",
          "group-data-[checked]/radio:bg-heyo-brand group-data-[checked]/radio:ring-transparent",
        )}
      >
        <Menu.RadioItemIndicator className="size-1.5 rounded-full bg-heyo-on-brand" />
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </Menu.RadioItem>
  );
}

function DropdownLabel({ className, ...props }: Menu.GroupLabel.Props) {
  return (
    <Menu.GroupLabel
      className={cn(
        "px-2 pt-2 pb-1 text-xs font-medium text-heyo-subtle",
        className,
      )}
      {...props}
    />
  );
}

function DropdownSeparator({ className, ...props }: Menu.Separator.Props) {
  return (
    <Menu.Separator
      className={cn("-mx-1 my-1 h-px bg-heyo-hairline", className)}
      {...props}
    />
  );
}

function DropdownSubTrigger({
  className,
  icon,
  children,
  ...props
}: Menu.SubmenuTrigger.Props & { icon?: IconLike }) {
  return (
    <Menu.SubmenuTrigger
      className={cn(popupItem, "data-[popup-open]:bg-heyo-tint", className)}
      {...props}
    >
      {icon ? (
        <span className="size-3.5 shrink-0 opacity-70">
          {renderIcon(icon, "size-full")}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ChevronRightIcon className="ml-3 size-3.5 shrink-0 opacity-60" />
    </Menu.SubmenuTrigger>
  );
}

/**
 * An action menu.
 *
 * ```tsx
 * <Dropdown>
 *   <Dropdown.Trigger render={<Button iconEnd={ChevronDownIcon}>Actions</Button>} />
 *   <Dropdown.Content>
 *     <Dropdown.Item>Rename</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item destructive>Delete</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown>
 * ```
 */
export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: Menu.Trigger,
  Content: DropdownContent,
  Item: DropdownItem,
  CheckboxItem: DropdownCheckboxItem,
  RadioGroup: DropdownRadioGroup,
  RadioItem: DropdownRadioItem,
  Group: Menu.Group,
  Label: DropdownLabel,
  Separator: DropdownSeparator,
  Sub: Menu.SubmenuRoot,
  SubTrigger: DropdownSubTrigger,
  SubContent: DropdownContent,
});
