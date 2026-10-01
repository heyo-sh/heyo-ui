import type { IconLike } from "@heyo-sh/heyo-ui";
import {
  ActivityIcon,
  AdjustmentsIcon,
  AppWindowIcon,
  ArrowsVerticalIcon,
  BadgeIcon,
  BinaryTreeIcon,
  BrowserIcon,
  CalendarEventIcon,
  CalendarMonthIcon,
  CheckboxIcon,
  ChevronsRightIcon,
  CircleDotIcon,
  ClickIcon,
  ClipboardCopyIcon,
  CloudUploadIcon,
  CodeIcon,
  CommandIcon,
  CursorTextIcon,
  FoldDownIcon,
  FormsIcon,
  GaugeIcon,
  HeadingIcon,
  KeyboardIcon,
  LayoutBoardSplitIcon,
  LayoutCardsIcon,
  LayoutColumnsIcon,
  LayoutRowsIcon,
  LayoutSidebarIcon,
  LayoutSidebarRightIcon,
  ListSearchIcon,
  LoaderIcon,
  MenuIcon,
  MessageIcon,
  MoodEmptyIcon,
  NotificationIcon,
  NumberIcon,
  NumbersIcon,
  PasswordIcon,
  SelectIcon,
  SeparatorIcon,
  SourceCodeIcon,
  SquareDashedIcon,
  TableIcon,
  TableOptionsIcon,
  TagIcon,
  TextWrapIcon,
  TimelineIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  TooltipIcon,
  TrendingUpIcon,
  TypographyIcon,
  UserCircleIcon,
  UsersIcon,
} from "../icons";

/**
 * One Tabler glyph per component, keyed by the section title.
 *
 * Single source of truth: the sidebar row, the command palette entry and the
 * section heading all read it, so a component is the same icon everywhere.
 * `sections/index.tsx` throws if a section has no entry here.
 */
export const sectionIcons: Record<string, IconLike> = {
  // Actions
  Button: ClickIcon,
  "Button Group": LayoutColumnsIcon,
  "Copy Button": ClipboardCopyIcon,
  Toggle: ToggleLeftIcon,
  "Toggle Group": LayoutBoardSplitIcon,

  // Forms
  Field: FormsIcon,
  Label: TagIcon,
  Input: CursorTextIcon,
  Textarea: TextWrapIcon,
  "Number Field": NumberIcon,
  "OTP Field": PasswordIcon,
  Checkbox: CheckboxIcon,
  Radio: CircleDotIcon,
  Select: SelectIcon,
  Combobox: ListSearchIcon,
  Switch: ToggleRightIcon,
  Slider: AdjustmentsIcon,
  "File Upload": CloudUploadIcon,
  Calendar: CalendarMonthIcon,
  "Date Picker": CalendarEventIcon,

  // Feedback
  Badge: BadgeIcon,
  Meter: GaugeIcon,
  Spinner: LoaderIcon,
  Skeleton: SquareDashedIcon,
  Toast: NotificationIcon,
  Empty: MoodEmptyIcon,
  "Status Bar": ActivityIcon,

  // Overlays
  Command: CommandIcon,
  Dialog: AppWindowIcon,
  Sheet: LayoutSidebarRightIcon,
  Dropdown: MenuIcon,
  Popover: MessageIcon,
  Tooltip: TooltipIcon,

  // Navigation
  Sidebar: LayoutSidebarIcon,
  Tabs: BrowserIcon,
  Breadcrumb: ChevronsRightIcon,
  Pagination: NumbersIcon,
  Tree: BinaryTreeIcon,

  // Data
  Card: LayoutCardsIcon,
  Stat: TrendingUpIcon,
  Table: TableIcon,
  "Data Table": TableOptionsIcon,
  Timeline: TimelineIcon,
  "Scroll Area": ArrowsVerticalIcon,
  Accordion: LayoutRowsIcon,
  Collapsible: FoldDownIcon,
  Avatar: UserCircleIcon,
  "Avatar Group": UsersIcon,

  // Typography
  Heading: HeadingIcon,
  Text: TypographyIcon,
  Code: CodeIcon,
  "Code Block": SourceCodeIcon,
  Kbd: KeyboardIcon,
  Separator: SeparatorIcon,
};
