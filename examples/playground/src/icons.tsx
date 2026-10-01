import type { SVGProps } from "react";

/**
 * Tabler outline icons, inlined verbatim from `@tabler/icons` v3.46.0 — every
 * `d` below is copied from the package, so the playground looks exactly like a
 * real app that did `import { IconHome } from "@tabler/icons-react"` and passed
 * it straight to `icon={IconHome}`. Inlining only keeps the playground
 * dependency-free; in your own app, import the package.
 *
 * Grouped the way the sidebar groups components, so the icon for a component
 * sits next to the icons of its neighbours.
 */

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout & navigation                                                        */
/* -------------------------------------------------------------------------- */

/** tabler: home */
export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
  </Icon>
);

/** tabler: layout-sidebar */
export const LayoutSidebarIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M9 4l0 16" />
  </Icon>
);

/** tabler: layout-sidebar-right */
export const LayoutSidebarRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M15 4l0 16" />
  </Icon>
);

/** tabler: browser */
export const BrowserIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 8h16" />
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M8 4v4" />
  </Icon>
);

/** tabler: chevrons-right */
export const ChevronsRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 7l5 5l-5 5" />
    <path d="M13 7l5 5l-5 5" />
  </Icon>
);

/** tabler: numbers */
export const NumbersIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 10v-7l-2 2" />
    <path d="M6 16a2 2 0 1 1 4 0c0 .591 -.601 1.46 -1 2l-3 3h4" />
    <path d="M15 14a2 2 0 1 0 2 -2a2 2 0 1 0 -2 -2" />
    <path d="M6.5 10h3" />
  </Icon>
);

/** tabler: binary-tree */
export const BinaryTreeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
    <path d="M16 4a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
    <path d="M16 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
    <path d="M11 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
    <path d="M21 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
    <path d="M5.058 18.306l2.88 -4.606" />
    <path d="M10.061 10.303l2.877 -4.604" />
    <path d="M10.065 13.705l2.876 4.6" />
    <path d="M15.063 5.7l2.881 4.61" />
  </Icon>
);

/** tabler: arrows-vertical */
export const ArrowsVerticalIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 7l4 -4l4 4" />
    <path d="M8 17l4 4l4 -4" />
    <path d="M12 3l0 18" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

/** tabler: click */
export const ClickIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12l3 0" />
    <path d="M12 3l0 3" />
    <path d="M7.8 7.8l-2.2 -2.2" />
    <path d="M16.2 7.8l2.2 -2.2" />
    <path d="M7.8 16.2l-2.2 2.2" />
    <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
  </Icon>
);

/** tabler: layout-columns */
export const LayoutColumnsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M12 4l0 16" />
  </Icon>
);

/** tabler: clipboard-copy */
export const ClipboardCopyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h3m9 -9v-5a2 2 0 0 0 -2 -2h-2" />
    <path d="M13 17v-1a1 1 0 0 1 1 -1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1 -1 1h-1m-3 0h-1a1 1 0 0 1 -1 -1v-1" />
    <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
  </Icon>
);

/** tabler: toggle-left */
export const ToggleLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M2 12a6 6 0 0 1 6 -6h8a6 6 0 0 1 6 6a6 6 0 0 1 -6 6h-8a6 6 0 0 1 -6 -6" />
  </Icon>
);

/** tabler: toggle-right */
export const ToggleRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M14 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M2 12a6 6 0 0 1 6 -6h8a6 6 0 0 1 6 6a6 6 0 0 1 -6 6h-8a6 6 0 0 1 -6 -6" />
  </Icon>
);

/** tabler: layout-board-split */
export const LayoutBoardSplitIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M4 12h8" />
    <path d="M12 15h8" />
    <path d="M12 9h8" />
    <path d="M12 4v16" />
  </Icon>
);

/** tabler: plus */
export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </Icon>
);

/** tabler: copy */
export const CopyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
  </Icon>
);

/** tabler: trash */
export const TrashIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </Icon>
);

/** tabler: refresh */
export const RefreshIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
  </Icon>
);

/** tabler: upload */
export const UploadIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
    <path d="M7 9l5 -5l5 5" />
    <path d="M12 4l0 12" />
  </Icon>
);

/** tabler: external-link */
export const ExternalLinkIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
    <path d="M11 13l9 -9" />
    <path d="M15 4h5v5" />
  </Icon>
);

/** tabler: pencil */
export const PencilIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
    <path d="M13.5 6.5l4 4" />
  </Icon>
);

/** tabler: user-plus */
export const UserPlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M16 19h6" />
    <path d="M19 16v6" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
  </Icon>
);

/** tabler: device-floppy */
export const DeviceFloppyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
    <path d="M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M14 4l0 4l-6 0l0 -4" />
  </Icon>
);

/** tabler: rocket */
export const RocketIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
    <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
    <path d="M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Forms                                                                      */
/* -------------------------------------------------------------------------- */

/** tabler: forms */
export const FormsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
    <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
    <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
    <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
    <path d="M17 12h.01" />
    <path d="M13 12h.01" />
  </Icon>
);

/** tabler: tag */
export const TagIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" />
  </Icon>
);

/** tabler: cursor-text */
export const CursorTextIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M10 12h4" />
    <path d="M9 4a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3" />
    <path d="M15 4a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3" />
  </Icon>
);

/** tabler: text-wrap */
export const TextWrapIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6l16 0" />
    <path d="M4 18l5 0" />
    <path d="M4 12h13a3 3 0 0 1 0 6h-4l2 -2m0 4l-2 -2" />
  </Icon>
);

/** tabler: number */
export const NumberIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 17v-10l7 10v-10" />
    <path d="M15 17h5" />
    <path d="M15 10a2.5 3 0 1 0 5 0a2.5 3 0 1 0 -5 0" />
  </Icon>
);

/** tabler: password */
export const PasswordIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 10v4" />
    <path d="M10 13l4 -2" />
    <path d="M10 11l4 2" />
    <path d="M5 10v4" />
    <path d="M3 13l4 -2" />
    <path d="M3 11l4 2" />
    <path d="M19 10v4" />
    <path d="M17 13l4 -2" />
    <path d="M17 11l4 2" />
  </Icon>
);

/** tabler: checkbox */
export const CheckboxIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M9 11l3 3l8 -8" />
    <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
  </Icon>
);

/** tabler: circle-dot */
export const CircleDotIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  </Icon>
);

/** tabler: select */
export const SelectIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
    <path d="M9 11l3 3l3 -3" />
  </Icon>
);

/** tabler: list-search */
export const ListSearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M11 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M18.5 18.5l2.5 2.5" />
    <path d="M4 6h16" />
    <path d="M4 12h4" />
    <path d="M4 18h4" />
  </Icon>
);

/** tabler: adjustments-horizontal */
export const AdjustmentsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 6l8 0" />
    <path d="M16 6l4 0" />
    <path d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 12l2 0" />
    <path d="M10 12l10 0" />
    <path d="M15 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 18l11 0" />
    <path d="M19 18l1 0" />
  </Icon>
);

/** tabler: cloud-upload */
export const CloudUploadIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
    <path d="M9 15l3 -3l3 3" />
    <path d="M12 12l0 9" />
  </Icon>
);

/** tabler: calendar-month */
export const CalendarMonthIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M4 11h16" />
    <path d="M8 14v4" />
    <path d="M12 14v4" />
    <path d="M16 14v4" />
  </Icon>
);

/** tabler: calendar-event */
export const CalendarEventIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M16 3l0 4" />
    <path d="M8 3l0 4" />
    <path d="M4 11l16 0" />
    <path d="M8 15h2v2h-2l0 -2" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Feedback                                                                   */
/* -------------------------------------------------------------------------- */

/** tabler: bell */
export const BellIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </Icon>
);

/** tabler: badge */
export const BadgeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M17 17v-13l-5 3l-5 -3v13l5 3l5 -3" />
  </Icon>
);

/** tabler: gauge */
export const GaugeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M13.41 10.59l2.59 -2.59" />
    <path d="M7 12a5 5 0 0 1 5 -5" />
  </Icon>
);

/** tabler: loader-2 */
export const LoaderIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </Icon>
);

/** tabler: square-dashed */
export const SquareDashedIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -14" />
  </Icon>
);

/** tabler: notification */
export const NotificationIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
    <path d="M14 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  </Icon>
);

/** tabler: mood-empty */
export const MoodEmptyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 10l.01 0" />
    <path d="M15 10l.01 0" />
    <path d="M9 15l6 0" />
  </Icon>
);

/** tabler: activity-heartbeat */
export const ActivityIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12h4.5l1.5 -6l4 12l2 -9l1.5 3h4.5" />
  </Icon>
);

/** tabler: inbox */
export const InboxIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M4 13h3l3 3h4l3 -3h3" />
  </Icon>
);

/** tabler: circle-check */
export const CircleCheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </Icon>
);

/** tabler: info-circle */
export const InfoCircleIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M12 9h.01" />
    <path d="M11 12h1v4h1" />
  </Icon>
);

/** tabler: alert-triangle */
export const AlertTriangleIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 9v4" />
    <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0" />
    <path d="M12 16h.01" />
  </Icon>
);

/** tabler: circle-x */
export const CircleXIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M10 10l4 4m0 -4l-4 4" />
  </Icon>
);

/** tabler: help-circle */
export const HelpCircleIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M12 16v.01" />
    <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Overlays                                                                   */
/* -------------------------------------------------------------------------- */

/** tabler: box */
export const CubeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12l0 9" />
    <path d="M12 12l-8 -4.5" />
  </Icon>
);

/** tabler: command */
export const CommandIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" />
  </Icon>
);

/** tabler: app-window */
export const AppWindowIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
    <path d="M6 8h.01" />
    <path d="M9 8h.01" />
  </Icon>
);

/** tabler: menu-2 */
export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6l16 0" />
    <path d="M4 12l16 0" />
    <path d="M4 18l16 0" />
  </Icon>
);

/** tabler: message-2 */
export const MessageIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 9h8" />
    <path d="M8 13h6" />
    <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3" />
  </Icon>
);

/** tabler: tooltip */
export const TooltipIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M10 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M12 13l-1.707 -1.707a1 1 0 0 0 -.707 -.293h-2.586a2 2 0 0 1 -2 -2v-3a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2.586a1 1 0 0 0 -.707 .293l-1.707 1.707" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

/** tabler: database */
export const DatabaseIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" />
    <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
    <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
  </Icon>
);

/** tabler: layout-cards */
export const LayoutCardsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M14 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -6" />
  </Icon>
);

/** tabler: trending-up */
export const TrendingUpIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 17l6 -6l4 4l8 -8" />
    <path d="M14 7l7 0l0 7" />
  </Icon>
);

/** tabler: table */
export const TableIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
    <path d="M3 10h18" />
    <path d="M10 3v18" />
  </Icon>
);

/** tabler: table-options */
export const TableOptionsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7" />
    <path d="M3 10h18" />
    <path d="M10 3v18" />
    <path d="M17.001 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M19.001 15.5v1.5" />
    <path d="M19.001 21v1.5" />
    <path d="M22.032 17.25l-1.299 .75" />
    <path d="M17.27 20l-1.3 .75" />
    <path d="M15.97 17.25l1.3 .75" />
    <path d="M20.733 20l1.3 .75" />
  </Icon>
);

/** tabler: timeline */
export const TimelineIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 16l6 -7l5 5l5 -6" />
    <path d="M14 14a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M9 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M3 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M19 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </Icon>
);

/** tabler: layout-rows */
export const LayoutRowsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M4 12l16 0" />
  </Icon>
);

/** tabler: fold-down */
export const FoldDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 11v8l3 -3m-6 0l3 3" />
    <path d="M9 7l1 0" />
    <path d="M14 7l1 0" />
    <path d="M19 7l1 0" />
    <path d="M4 7l1 0" />
  </Icon>
);

/** tabler: user-circle */
export const UserCircleIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
  </Icon>
);

/** tabler: users */
export const UsersIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
  </Icon>
);

/** tabler: chart-bar */
export const ChartIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
    <path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
    <path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
    <path d="M4 20h14" />
  </Icon>
);

/** tabler: layout-grid */
export const GridIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    <path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    <path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    <path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
  </Icon>
);

/** tabler: list */
export const ListIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M9 6l11 0" />
    <path d="M9 12l11 0" />
    <path d="M9 18l11 0" />
    <path d="M5 6l0 .01" />
    <path d="M5 12l0 .01" />
    <path d="M5 18l0 .01" />
  </Icon>
);

/** tabler: columns-3 */
export const ColumnsIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 4a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-16" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
  </Icon>
);

/** tabler: filter */
export const FilterIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227" />
  </Icon>
);

/** tabler: map-pin */
export const MapPinIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
  </Icon>
);

/** tabler: world */
export const WorldIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </Icon>
);

/** tabler: git-branch */
export const GitBranchIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M7 8l0 8" />
    <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
    <path d="M14 14l3 -3l3 3" />
  </Icon>
);

/** tabler: key */
export const KeyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0" />
    <path d="M15 9h.01" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Typography                                                                 */
/* -------------------------------------------------------------------------- */

/** tabler: heading */
export const HeadingIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 12h10" />
    <path d="M7 5v14" />
    <path d="M17 5v14" />
    <path d="M15 19h4" />
    <path d="M15 5h4" />
    <path d="M5 19h4" />
    <path d="M5 5h4" />
  </Icon>
);

/** tabler: typography */
export const TypographyIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 20l3 0" />
    <path d="M14 20l7 0" />
    <path d="M6.9 15l6.9 0" />
    <path d="M10.2 6.3l5.8 13.7" />
    <path d="M5 20l6 -16l2 0l7 16" />
  </Icon>
);

/** tabler: code */
export const CodeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l4 4l-4 4" />
    <path d="M14 4l-4 16" />
  </Icon>
);

/** tabler: source-code */
export const SourceCodeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M14.5 4h2.5a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-5" />
    <path d="M6 5l-2 2l2 2" />
    <path d="M10 9l2 -2l-2 -2" />
  </Icon>
);

/** tabler: keyboard */
export const KeyboardIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8" />
    <path d="M6 10l0 .01" />
    <path d="M10 10l0 .01" />
    <path d="M14 10l0 .01" />
    <path d="M18 10l0 .01" />
    <path d="M6 14l0 .01" />
    <path d="M18 14l0 .01" />
    <path d="M10 14l4 .01" />
  </Icon>
);

/** tabler: separator-horizontal */
export const SeparatorIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 12l16 0" />
    <path d="M8 8l4 -4l4 4" />
    <path d="M16 16l-4 4l-4 -4" />
  </Icon>
);

/** tabler: bold */
export const BoldIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6l0 -7" />
    <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
  </Icon>
);

/** tabler: italic */
export const ItalicIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M11 5l6 0" />
    <path d="M7 19l6 0" />
    <path d="M14 5l-4 14" />
  </Icon>
);

/** tabler: underline */
export const UnderlineIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M7 5v5a5 5 0 0 0 10 0v-5" />
    <path d="M5 19h14" />
  </Icon>
);

/* -------------------------------------------------------------------------- */
/* Chrome                                                                     */
/* -------------------------------------------------------------------------- */

/** tabler: search */
export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </Icon>
);

/** tabler: settings */
export const GearIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />
    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  </Icon>
);

/** tabler: moon */
export const MoonIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
  </Icon>
);

/** tabler: sun */
export const SunIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </Icon>
);

/** tabler: bolt */
export const BoltIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
  </Icon>
);

/** tabler: shield */
export const ShieldIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
  </Icon>
);

/** tabler: user */
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </Icon>
);

/** tabler: chevron-down */
export const ChevronDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M6 9l6 6l6 -6" />
  </Icon>
);
