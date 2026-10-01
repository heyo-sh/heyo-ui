import {
  cloneElement,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "./cn";

/**
 * Anything icon-shaped: a component (`icon={GearIcon}`), an element
 * (`icon={<GearIcon />}`), or arbitrary markup. Keeping all three legal means
 * heyo-ui never forces an icon library on you.
 */
export type IconLike =
  ReactNode | ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export function renderIcon(icon: IconLike, className?: string): ReactNode {
  if (icon === undefined || icon === null || icon === false || icon === true) {
    return null;
  }

  if (typeof icon === "function") {
    const IconComponent = icon as ComponentType<{
      className?: string;
      "aria-hidden"?: boolean;
    }>;
    return <IconComponent className={className} aria-hidden />;
  }

  if (isValidElement(icon)) {
    const element = icon as ReactElement<{ className?: string }>;
    return cloneElement(element, {
      className: cn(className, element.props.className),
    });
  }

  return icon;
}
