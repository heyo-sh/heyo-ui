"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";

export interface EmptyProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: IconLike;
  title: ReactNode;
  description?: ReactNode;
  /** Usually a single `<Button>`, sometimes a primary plus a ghost. */
  action?: ReactNode;
  /** Draw a well around it — for empty panes and drop targets. */
  bordered?: boolean;
  /**
   * `stack` is the default: a left-aligned block with a rule down its side, the
   * same shape as a form field. `center` is for a whole empty page or pane.
   */
  align?: "stack" | "center";
  /** Muted footnote under the action — a doc link, a shortcut, a limit. */
  hint?: ReactNode;
}

/**
 * The nothing-here state.
 *
 * Deliberately not a centred icon-in-a-circle over centred text: that layout
 * reads as an *error* — it's the same composition as a 404 — and it puts the
 * least useful element (a generic icon) at the optical centre. Here the icon is
 * a small mark on the same baseline as the title, the copy is left-aligned like
 * every other paragraph in the product, and a rule runs down the side so the
 * block sits in the layout instead of floating in a hole.
 *
 * `align="center"` exists for the one case where centring is right: an entire
 * empty page, with nothing else on screen to align to.
 */
export function Empty({
  className,
  icon,
  title,
  description,
  action,
  bordered,
  align = "stack",
  hint,
  children,
  ...props
}: EmptyProps) {
  const centered = align === "center";

  return (
    <div
      data-slot="empty"
      data-align={align}
      className={cn(
        "flex w-full min-w-0 gap-3",
        centered
          ? "flex-col items-center px-6 py-12 text-center"
          : // The rule is the whole trick: it anchors the block to the grid
            // instead of leaving it adrift in the middle of a pane.
            "flex-col items-start border-l-2 border-heyo-line py-1 pl-4",
        bordered &&
          (centered
            ? "rounded-xl bg-heyo-elevated ring-1 ring-heyo-hairline"
            : "rounded-r-xl border-l-2 bg-heyo-elevated py-4 pr-4 ring-1 ring-heyo-hairline ring-inset"),
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex min-w-0 gap-2.5",
          centered ? "flex-col items-center" : "flex-col items-start",
        )}
      >
        {icon ? (
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-lg",
              // A tinted square, not a grey circle — it matches `Avatar` and
              // the sidebar mark rather than inventing a third shape.
              "bg-heyo-fill text-heyo-subtle",
            )}
          >
            {renderIcon(icon, "size-4")}
          </span>
        ) : null}

        <div className="flex min-w-0 flex-col gap-1">
          <p className="m-0 text-sm font-medium text-heyo-strong">{title}</p>
          {description ? (
            <p
              className={cn(
                "m-0 text-sm text-heyo-subtle",
                centered ? "max-w-sm" : "max-w-md",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {children}

      {action ? (
        <div
          className={cn(
            "flex flex-wrap items-center gap-2",
            !centered && "mt-1",
          )}
        >
          {action}
        </div>
      ) : null}

      {hint ? <p className="m-0 text-xs text-heyo-inactive">{hint}</p> : null}
    </div>
  );
}
