---
"@heyo-sh/heyo-ui": patch
---

`icon` props accept `forwardRef` and `memo` components again.

Every `icon` prop in the library promises three shapes: a component, an
element, or any node. `renderIcon` only recognised the first one when it was a
plain function — but `@tabler/icons-react`, `lucide-react` and `react-icons`
all produce `forwardRef` components, which are _objects_
(`{ $$typeof, render }`), not functions.

They fell through to the "render it as-is" branch, where React was handed a
component object as a child and threw `Objects are not valid as a React child
(found: object with keys {$$typeof, render})`. Since Tabler is the icon set
the documentation recommends, `<Button icon={IconPlus} />` — the first example
in the README — crashed.

`renderIcon` now treats `forwardRef` and `memo` objects as component types,
which is what they are.
