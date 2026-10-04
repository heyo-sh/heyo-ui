import {
  cloneElement,
  createElement,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "./cn";

/**
 * Is this a component rather than something to render as-is?
 *
 * A plain function is the easy case. The one that matters in practice is the
 * other one: `forwardRef` and `memo` produce *objects* (`{ $$typeof, render }`
 * / `{ $$typeof, type }`), and every icon in `@tabler/icons-react`,
 * `lucide-react` and `react-icons` is one of them. Checking only for a
 * function sent those straight to the `return icon` branch at the bottom,
 * where React is handed a component object as a child and throws "Objects are
 * not valid as a React child".
 */
function isComponentType(icon: unknown): icon is ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}> {
  if (typeof icon === "function") return true;
  if (typeof icon !== "object" || icon === null) return false;
  // An element has `$$typeof: react.element` and `props`; a component type
  // has `$$typeof: react.forward_ref | react.memo` and no `props`.
  const tag = (icon as { $$typeof?: symbol }).$$typeof;
  if (typeof tag !== "symbol") return false;
  return (
    tag === Symbol.for("react.forward_ref") || tag === Symbol.for("react.memo")
  );
}

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

  if (isComponentType(icon)) {
    // `createElement` rather than JSX: `icon` is a component *type* here, and
    // JSX would need it assigned to a capitalised binding first anyway.
    return createElement(icon, { className, "aria-hidden": true });
  }

  if (isValidElement(icon)) {
    const element = icon as ReactElement<{ className?: string }>;
    return cloneElement(element, {
      className: cn(className, element.props.className),
    });
  }

  return icon;
}
