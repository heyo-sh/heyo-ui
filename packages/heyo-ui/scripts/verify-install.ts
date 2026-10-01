/**
 * Proves the advertised setup actually works.
 *
 * Packs the real tarball, installs it into a throwaway project that knows
 * nothing about this repo, and then checks the two things a consumer cares
 * about:
 *
 *   1. `@import "@heyo-sh/heyo-ui";` in a CSS file produces the component
 *      classes — no `@source`, no `tailwind.config.js`.
 *   2. `import { Button } from "@heyo-sh/heyo-ui"` typechecks and bundles.
 *
 * Unit tests can't catch a broken `exports` map or a missing `@source`; this
 * can. Run it before every release.
 */
import { $ } from "bun";
import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const pkgDir = process.cwd();
const workDir = await mkdtemp(join(tmpdir(), "heyo-ui-verify-"));
let failed = false;

function check(name: string, ok: boolean, detail?: string) {
  console.log(
    `${ok ? "ok  " : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`,
  );
  if (!ok) failed = true;
}

try {
  console.log(`workspace: ${workDir}\n`);

  // 1. Pack exactly what npm would publish.
  const packOutput = await $`bun pm pack --destination ${workDir}`
    .cwd(pkgDir)
    .text();
  const tarball = packOutput.match(/\S+\.tgz/)?.[0];
  if (!tarball) throw new Error(`could not find tarball in:\n${packOutput}`);
  const tarballPath = join(workDir, tarball.split("/").pop()!);

  // 2. A fresh consumer project. Tailwind is the only thing it configures.
  await mkdir(join(workDir, "app/src"), { recursive: true });
  const appDir = join(workDir, "app");

  await writeFile(
    join(appDir, "package.json"),
    JSON.stringify(
      {
        name: "consumer",
        private: true,
        type: "module",
        dependencies: {
          "@heyo-sh/heyo-ui": `file:${tarballPath}`,
          react: "19.2.8",
          "react-dom": "19.2.8",
        },
        devDependencies: {
          "@tailwindcss/cli": "^4.1.14",
          "@types/react": "19.3.0",
          tailwindcss: "^4.1.14",
          typescript: "7.0.2",
        },
      },
      null,
      2,
    ),
  );

  // The entire styling setup a consumer has to write.
  await writeFile(join(appDir, "src/app.css"), `@import "@heyo-sh/heyo-ui";\n`);

  await writeFile(
    join(appDir, "src/app.tsx"),
    `import { Button, Input, Sidebar, useSidebar } from "@heyo-sh/heyo-ui";
import { Badge } from "@heyo-sh/heyo-ui/components/badge";

export function App() {
  return (
    <Sidebar.Provider defaultOpen>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuButton active>Home</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset>
        <Button variant="primary" size="sm">Deploy</Button>
        <Input label="Name" placeholder="my-worker" />
        <Badge dot variant="success">Live</Badge>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}

export { useSidebar };
`,
  );

  await writeFile(
    join(appDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM"],
          module: "Preserve",
          moduleResolution: "bundler",
          jsx: "react-jsx",
          strict: true,
          noEmit: true,
          skipLibCheck: true,
        },
        include: ["src"],
      },
      null,
      2,
    ),
  );

  console.log("installing tarball into a clean project…\n");
  await $`bun install --no-save`.cwd(appDir).quiet();

  // 3. Does one CSS import really produce the component classes?
  await $`bunx @tailwindcss/cli -i src/app.css -o out.css`.cwd(appDir).quiet();
  const css = await Bun.file(join(appDir, "out.css")).text();

  check("css: tokens emitted", css.includes("--color-heyo-base"));
  check("css: focus utility emitted", css.includes(".heyo-focus"));
  check(
    "css: component classes survived tree-shaking",
    css.includes("bg-heyo-tint") && css.includes("ring-heyo-line"),
  );
  check(
    "css: fractional control sizes emitted",
    css.includes("h-6\\.5") || css.includes("h-6.5"),
  );
  check(
    "css: light-dark() used (no dark: variants)",
    // Lightning CSS may lower light-dark() into its own two-var form.
    css.includes("light-dark(") || css.includes("lightningcss-dark"),
  );
  check("css: no dark variant selectors", !css.includes(":is(.dark *)"));

  // Design invariants. These are load-bearing decisions rather than incidental
  // values, so lock them here — a later refactor shouldn't be able to quietly
  // undo them without a failing check explaining why they existed.
  const token = (name: string) =>
    css.match(new RegExp(`--color-heyo-${name}:([^;}]*)`))?.[1]?.trim() ?? "";

  check(
    "design: sidebar shares the page background",
    token("sidebar").includes("--color-heyo-canvas"),
    token("sidebar"),
  );
  /** Pulls the dark slot out of `light-dark(<light>, <dark>)`. */
  const darkSlot = (value: string) =>
    value
      .match(/light-dark\(\s*[^,]+,\s*([^)]+)\)/)?.[1]
      ?.trim()
      .toLowerCase() ?? "";

  check(
    "design: secondary surface is #111 in dark",
    ["#111", "#111111"].includes(darkSlot(token("base"))),
    token("base"),
  );

  // The other supported entry point: apps that already import Tailwind.
  await writeFile(
    join(appDir, "src/theme-only.css"),
    `@import "tailwindcss";\n@import "@heyo-sh/heyo-ui/theme.css";\n`,
  );
  await $`bunx @tailwindcss/cli -i src/theme-only.css -o theme-only.css`
    .cwd(appDir)
    .quiet();
  const themeOnlyCss = await Bun.file(join(appDir, "theme-only.css")).text();
  check(
    "css: theme.css entry point also self-registers sources",
    themeOnlyCss.includes("bg-heyo-tint") &&
      themeOnlyCss.includes("--color-heyo-base"),
  );

  // 4. Do the exports resolve, for both the barrel and a granular import?
  const tscOutput = await $`bunx tsc -p tsconfig.json`
    .cwd(appDir)
    .nothrow()
    .text();
  check(
    "types: consumer typechecks",
    tscOutput.trim() === "",
    tscOutput.trim(),
  );

  // 5. Does it bundle, with "use client" preserved for RSC frameworks?
  await $`bunx bun build src/app.tsx --outfile bundle.js --target browser --external react --external react-dom --external react/jsx-runtime`
    .cwd(appDir)
    .quiet();
  const bundle = await Bun.file(join(appDir, "bundle.js")).text();
  check("bundle: builds", bundle.length > 0);

  const indexJs = await Bun.file(
    join(appDir, "node_modules/@heyo-sh/heyo-ui/dist/index.js"),
  ).text();
  check(
    'bundle: "use client" banner shipped',
    indexJs.startsWith('"use client"'),
  );

  console.log(
    `\ncss weight: ${(css.length / 1024).toFixed(1)} kB uncompressed`,
  );
} finally {
  await rm(workDir, { recursive: true, force: true });
}

process.exit(failed ? 1 : 0);
