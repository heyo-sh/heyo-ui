import type { SVGProps } from "react";

/**
 * The handful of glyphs the components themselves need — chevrons, check
 * marks, the spinner. Every `d` below is copied verbatim from `@tabler/icons`
 * v3.46.0 (24×24 grid, 2px stroke, round caps and joins), so they sit flush
 * with `@tabler/icons-react` if you use it for everything else. The `tabler:`
 * comment on each one names the icon it came from — keep them in sync when
 * you touch a path.
 *
 * These are inlined rather than imported: `@tabler/icons-react` is 60+ MB of
 * 5000+ icons with no `exports` map, which would make it a barrel import and
 * a slow one. Twelve paths cost nothing and keep heyo-ui dependency-free on
 * the icon front. Every component that renders an icon accepts any component,
 * element or node — pass real Tabler icons wherever you like.
 */

export type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** tabler: chevron-right */
export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 6l6 6l-6 6" />
    </Icon>
  );
}

/** tabler: chevron-down */
export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6l6 -6" />
    </Icon>
  );
}

/** tabler: chevron-left */
export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 6l-6 6l6 6" />
    </Icon>
  );
}

/** tabler: chevron-up */
export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 15l6 -6l6 6" />
    </Icon>
  );
}

/** tabler: plus */
export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </Icon>
  );
}

/** tabler: copy */
export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    </Icon>
  );
}

/** tabler: upload */
export function UploadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 9l5 -5l5 5" />
      <path d="M12 4l0 12" />
    </Icon>
  );
}

/** tabler: file */
export function FileIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
    </Icon>
  );
}

/** tabler: folder */
export function FolderIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
    </Icon>
  );
}

/** tabler: calendar */
export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M11 15h1" />
      <path d="M12 15v3" />
    </Icon>
  );
}

/** tabler: grip-vertical */
export function GripVerticalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M8 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M8 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M14 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M14 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M14 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </Icon>
  );
}

/** tabler: dots */
export function DotsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </Icon>
  );
}

/** tabler: adjustments-horizontal — the “filters” glyph */
export function FilterIcon(props: IconProps) {
  return (
    <Icon {...props}>
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
}

/** tabler: columns-3 */
export function ColumnsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-16" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </Icon>
  );
}

/** tabler: selector */
export function ChevronUpDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </Icon>
  );
}

/** tabler: check */
export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12l5 5l10 -10" />
    </Icon>
  );
}

/** tabler: minus */
export function MinusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12l14 0" />
    </Icon>
  );
}

/** tabler: x */
export function XIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </Icon>
  );
}

/** tabler: layout-sidebar */
export function PanelLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
      <path d="M9 4l0 16" />
    </Icon>
  );
}

/**
 * tabler: loader — eight spokes around a hub, graded from bright to faint.
 *
 * Paired with `animate-heyo-spin` (a *stepped* rotation, not a smooth one) it
 * reads as the classic ticking system spinner rather than a spinning arc: the
 * bright spoke jumps one position every step, so the glyph never blurs.
 */
export function SpinnerIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2.5" {...props}>
      <path d="M12 6l0 -3" opacity="1" />
      <path d="M16.25 7.75l2.15 -2.15" opacity="0.16" />
      <path d="M18 12l3 0" opacity="0.26" />
      <path d="M16.25 16.25l2.15 2.15" opacity="0.36" />
      <path d="M12 18l0 3" opacity="0.46" />
      <path d="M7.75 16.25l-2.15 2.15" opacity="0.58" />
      <path d="M6 12l-3 0" opacity="0.72" />
      <path d="M7.75 7.75l-2.15 -2.15" opacity="0.86" />
    </Icon>
  );
}

/** tabler: search */
export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </Icon>
  );
}

/** tabler: corner-down-left */
export function EnterIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
    </Icon>
  );
}

/** tabler: info-circle */
export function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 9h.01" />
      <path d="M11 12h1v4h1" />
    </Icon>
  );
}

/** tabler: alert-triangle */
export function WarningIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 9v4" />
      <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0" />
      <path d="M12 16h.01" />
    </Icon>
  );
}

/** tabler: circle-x */
export function DangerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </Icon>
  );
}

/** tabler: circle-check */
export function SuccessIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </Icon>
  );
}
