/**
 * Renders the whole playground to a string. Catches runtime mistakes
 * (bad Base UI composition, missing providers, hook misuse) without a browser.
 *
 *   bun run src/smoke.tsx
 */
import { renderToString } from "react-dom/server";
import { App } from "./app";
import { sections } from "./sections";
import { sectionIcons } from "./sections/section-icons";

const html = renderToString(<App />);

const checks: Array<[string, boolean]> = [
  ["sidebar rendered", html.includes('data-slot="sidebar"')],
  ["menu button rendered", html.includes('data-slot="sidebar-menu-button"')],
  ["button rendered", html.includes('data-slot="button"')],
  ["input rendered", html.includes('data-slot="input"')],
  ["field label rendered", html.includes('data-slot="label"')],
  ["table rendered", html.includes('data-slot="table"')],
  ["badge rendered", html.includes('data-slot="badge"')],
  ["no NaN leaked", !html.includes("NaN")],
  // One section per component, and the sidebar link has something to jump to.
  ...sections.map(({ name, id }): [string, boolean] => [
    `section "${name}" has anchor #${id}`,
    html.includes(`id="${id}"`),
  ]),
  // Every component carries a Tabler glyph — sidebar row, palette entry and
  // section heading all read the same registry.
  ...sections.map(({ name }): [string, boolean] => [
    `section "${name}" has an icon`,
    Boolean(sectionIcons[name]),
  ]),
  [
    "no icon registered for a section that no longer exists",
    Object.keys(sectionIcons).every((name) =>
      sections.some((section) => section.name === name),
    ),
  ],
];

let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? "ok  " : "FAIL"}  ${name}`);
  if (!ok) failed = true;
}
console.log(`\n${sections.length} sections, rendered ${html.length} bytes`);
process.exit(failed ? 1 : 0);
