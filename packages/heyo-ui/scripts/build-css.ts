/**
 * Copies the stylesheets into `dist/` and appends the `@source` directive that
 * only makes sense once the files sit next to the compiled components.
 *
 * Tailwind skips `node_modules` during automatic content detection, so without
 * this every heyo-ui class would be tree-shaken out of a consumer's build. By
 * baking the directive into the shipped CSS the consumer's setup stays a single
 * `@import` line — no `@source`, no config file, nothing to remember.
 */
import { mkdir, writeFile } from "node:fs/promises";

const SOURCE_DIRECTIVE = `
/* Registers the compiled components as a Tailwind source. Required because
   Tailwind ignores node_modules when auto-detecting content. */
@source "./**/*.js";
`;

const files = [
  { from: "src/styles/theme.css", to: "dist/theme.css" },
  { from: "src/styles/styles.css", to: "dist/styles.css" },
];

await mkdir("dist", { recursive: true });

for (const { from, to } of files) {
  const css = await Bun.file(from).text();
  await writeFile(to, `${css.trimEnd()}\n${SOURCE_DIRECTIVE}`);
  console.log(`css  ${to}`);
}
