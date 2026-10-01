import type { ComponentType } from "react";
import type { IconLike } from "@heyo-sh/heyo-ui";
import {
  BellIcon,
  BoldIcon,
  BoltIcon,
  CubeIcon,
  DatabaseIcon,
  HomeIcon,
  ListIcon,
} from "../icons";
import { slugify } from "./section";
import { sectionIcons } from "./section-icons";

import { AccordionSection } from "./accordion";
import { AvatarGroupSection } from "./avatar-group";
import { AvatarSection } from "./avatar";
import { BadgeSection } from "./badge";
import { BreadcrumbSection } from "./breadcrumb";
import { ButtonGroupSection } from "./button-group";
import { ButtonSection } from "./button";
import { CalendarSection } from "./calendar";
import { CardSection } from "./card";
import { CheckboxSection } from "./checkbox";
import { CodeBlockSection } from "./code-block";
import { CodeSection } from "./code";
import { CollapsibleSection } from "./collapsible";
import { ComboboxSection } from "./combobox";
import { CommandSection } from "./command";
import { CopyButtonSection } from "./copy-button";
import { DataTableSection } from "./data-table";
import { DatePickerSection } from "./date-picker";
import { DialogSection } from "./dialog";
import { DropdownSection } from "./dropdown";
import { EmptySection } from "./empty";
import { FieldSection } from "./field";
import { FileUploadSection } from "./file-upload";
import { HeadingSection } from "./heading";
import { InputSection } from "./input";
import { KbdSection } from "./kbd";
import { LabelSection } from "./label";
import { MeterSection } from "./meter";
import { NumberFieldSection } from "./number-field";
import { OtpFieldSection } from "./otp-field";
import { PaginationSection } from "./pagination";
import { PopoverSection } from "./popover";
import { RadioSection } from "./radio";
import { ScrollAreaSection } from "./scroll-area";
import { SelectSection } from "./select";
import { SeparatorSection } from "./separator";
import { SheetSection } from "./sheet";
import { SidebarSection } from "./sidebar";
import { SkeletonSection } from "./skeleton";
import { SliderSection } from "./slider";
import { SpinnerSection } from "./spinner";
import { StatSection } from "./stat";
import { StatusBarSection } from "./status-bar";
import { SwitchSection } from "./switch";
import { TableSection } from "./table";
import { TabsSection } from "./tabs";
import { TextSection } from "./text";
import { TextareaSection } from "./textarea";
import { TimelineSection } from "./timeline";
import { ToastSection } from "./toast";
import { ToggleGroupSection } from "./toggle-group";
import { ToggleSection } from "./toggle";
import { TooltipSection } from "./tooltip";
import { TreeSection } from "./tree";

export interface SectionEntry {
  /** The component's name. Matches the `title` the section renders. */
  name: string;
  /** Anchor id, derived from the name exactly as `Section` derives it. */
  id: string;
  /** Tabler glyph for the sidebar row and the command palette. */
  icon: IconLike;
  Component: ComponentType;
}

export interface SectionGroup {
  label: string;
  icon: IconLike;
  items: SectionEntry[];
}

function entry(name: string, Component: ComponentType): SectionEntry {
  const icon = sectionIcons[name];
  // A section with no glyph would render a ragged sidebar row, so fail loudly
  // here rather than shipping one gap.
  if (!icon) throw new Error(`No icon registered for section "${name}".`);
  return { name, id: slugify(name), icon, Component };
}

/**
 * One entry per component — never two components sharing a section. The groups
 * exist only to keep the sidebar navigable.
 */
export const sectionGroups: SectionGroup[] = [
  {
    label: "Actions",
    icon: BoltIcon,
    items: [
      entry("Button", ButtonSection),
      entry("Button Group", ButtonGroupSection),
      entry("Copy Button", CopyButtonSection),
      entry("Toggle", ToggleSection),
      entry("Toggle Group", ToggleGroupSection),
    ],
  },
  {
    label: "Forms",
    icon: ListIcon,
    items: [
      entry("Field", FieldSection),
      entry("Label", LabelSection),
      entry("Input", InputSection),
      entry("Textarea", TextareaSection),
      entry("Number Field", NumberFieldSection),
      entry("OTP Field", OtpFieldSection),
      entry("Checkbox", CheckboxSection),
      entry("Radio", RadioSection),
      entry("Select", SelectSection),
      entry("Combobox", ComboboxSection),
      entry("Switch", SwitchSection),
      entry("Slider", SliderSection),
      entry("File Upload", FileUploadSection),
      entry("Calendar", CalendarSection),
      entry("Date Picker", DatePickerSection),
    ],
  },
  {
    label: "Feedback",
    icon: BellIcon,
    items: [
      entry("Badge", BadgeSection),
      entry("Meter", MeterSection),
      entry("Spinner", SpinnerSection),
      entry("Skeleton", SkeletonSection),
      entry("Toast", ToastSection),
      entry("Empty", EmptySection),
      entry("Status Bar", StatusBarSection),
    ],
  },
  {
    label: "Overlays",
    icon: CubeIcon,
    items: [
      entry("Command", CommandSection),
      entry("Dialog", DialogSection),
      entry("Sheet", SheetSection),
      entry("Dropdown", DropdownSection),
      entry("Popover", PopoverSection),
      entry("Tooltip", TooltipSection),
    ],
  },
  {
    label: "Navigation",
    icon: HomeIcon,
    items: [
      entry("Sidebar", SidebarSection),
      entry("Tabs", TabsSection),
      entry("Breadcrumb", BreadcrumbSection),
      entry("Pagination", PaginationSection),
      entry("Tree", TreeSection),
    ],
  },
  {
    label: "Data",
    icon: DatabaseIcon,
    items: [
      entry("Card", CardSection),
      entry("Stat", StatSection),
      entry("Table", TableSection),
      entry("Data Table", DataTableSection),
      entry("Timeline", TimelineSection),
      entry("Scroll Area", ScrollAreaSection),
      entry("Accordion", AccordionSection),
      entry("Collapsible", CollapsibleSection),
      entry("Avatar", AvatarSection),
      entry("Avatar Group", AvatarGroupSection),
    ],
  },
  {
    label: "Typography",
    icon: BoldIcon,
    items: [
      entry("Heading", HeadingSection),
      entry("Text", TextSection),
      entry("Code", CodeSection),
      entry("Code Block", CodeBlockSection),
      entry("Kbd", KbdSection),
      entry("Separator", SeparatorSection),
    ],
  },
];

/** Flat list, in the order the page renders them. */
export const sections: SectionEntry[] = sectionGroups.flatMap(
  (group) => group.items,
);
