"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";
import { renderTokens, tokenizeLines } from "../lib/highlight";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps extends Omit<
  ComponentProps<"div">,
  "children" | "title"
> {
  /** The source. Leading indentation common to every line is stripped. */
  children: string;
  /** Filename or command shown in the bar above. */
  title?: ReactNode;
  icon?: IconLike;
  /**
   * Turns highlighting on and labels the block. `ts`, `tsx`, `js`, `jsx`,
   * `json`, `sh`, `css`, `html`, `yaml` and `sql` are understood; anything else
   * renders plain.
   */
  language?: string;
  /** @default false */
  lineNumbers?: boolean;
  /** 1-based lines to mark — the ones the surrounding prose is about. */
  highlight?: number[];
  /** @default true */
  copy?: boolean;
  /** Caps the height and scrolls past it, e.g. `"20rem"`. */
  maxHeight?: string;
  /** Wrap long lines instead of scrolling sideways. @default false */
  wrap?: boolean;
  /** Hide the language tag on the right of the bar. */
  hideLanguage?: boolean;
}

/**
 * Strips the indentation the template literal picked up from the JSX around it,
 * so `{`\n  npm i\n`}` isn't rendered two spaces deep.
 */
function dedent(source: string): string {
  const lines = source.replace(/\t/g, "  ").split("\n");
  while (lines.length && lines[0]!.trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1]!.trim() === "") lines.pop();

  const indent = lines
    .filter((line) => line.trim() !== "")
    .reduce((min, line) => Math.min(min, line.match(/^ */)![0].length), 1e3);

  return lines.map((line) => line.slice(indent)).join("\n");
}

/**
 * A block of code: highlighted, with line numbers, marked lines, a copy button
 * and a filename bar.
 *
 * It is always dark, in both colour modes. A code block is a quotation from a
 * terminal, and a terminal is dark — a light one reads as another piece of UI
 * rather than as output, and it doubles the number of token palettes anyone has
 * to keep tuned.
 *
 * The highlighting is monochrome: one grey ramp, plus italics for comments and
 * a heavier weight for keywords. Syntax colour is decoration that competes with
 * the parts of the interface where colour *means* something. The tokens are
 * `--code-*` custom properties, so a coloured palette is a handful of variables
 * rather than a fork.
 *
 * The highlighter is intentionally tiny (one regex per language, no grammars).
 * If you already ship Shiki or Prism, pass their markup as `children` and this
 * renders it untouched.
 */
export function CodeBlock({
  className,
  children,
  title,
  icon,
  language,
  lineNumbers,
  highlight,
  copy = true,
  maxHeight,
  wrap,
  hideLanguage,
  ...props
}: CodeBlockProps) {
  const source = dedent(children);
  const lines = tokenizeLines(source, language);
  const marked = new Set(highlight ?? []);
  const hasBar = Boolean(title || (language && !hideLanguage) || copy);
  const gutter = lineNumbers ? String(lines.length).length : 0;

  return (
    <div
      data-slot="code-block"
      data-language={language}
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-xl",
        "bg-code-surface ring-1 ring-code-edge",
        className,
      )}
      {...props}
    >
      {hasBar ? (
        <div
          data-slot="code-block-bar"
          className={cn(
            "flex h-9 shrink-0 items-center gap-2 border-b border-code-edge",
            "bg-code-bar pr-1.5 pl-3",
          )}
        >
          {icon ? (
            <span className="size-3.5 shrink-0 text-(--code-punctuation)">
              {renderIcon(icon, "size-full")}
            </span>
          ) : null}
          {title ? (
            <span className="min-w-0 truncate font-mono text-xs text-(--code-plain)">
              {title}
            </span>
          ) : null}
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            {language && !hideLanguage ? (
              <span className="font-mono text-[11px] tracking-wide text-(--code-punctuation) uppercase">
                {language}
              </span>
            ) : null}
            {copy ? (
              <CopyButton
                value={source}
                size="xs"
                className={cn(
                  "text-(--code-punctuation)",
                  "hover:bg-white/8 hover:text-(--code-plain)",
                  // Brightest step in the ramp: with no green to switch to, the
                  // tick has to announce itself with contrast instead.
                  "data-copied:text-(--code-keyword)",
                )}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        className="min-w-0 overflow-auto heyo-scrollbar"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <pre
          className={cn(
            "m-0 min-w-full py-3 font-mono text-xs leading-5 text-(--code-plain)",
            wrap ? "break-words whitespace-pre-wrap" : "whitespace-pre",
          )}
        >
          <code>
            {lines.map((tokens, index) => (
              <span
                key={index}
                data-marked={marked.has(index + 1) ? "" : undefined}
                className={cn(
                  "block px-4",
                  // A tint plus a bar on the left edge. Colour alone fails in a
                  // screenshot, in a colourblind eye, and in a diff.
                  "data-marked:bg-code-highlight",
                  "data-marked:shadow-[inset_2px_0_0_var(--color-code-highlight-edge)]",
                  lineNumbers && "pl-0",
                )}
              >
                {lineNumbers ? (
                  <span
                    aria-hidden
                    className="mr-3 inline-block shrink-0 pr-2 text-right text-code-gutter tabular-nums select-none"
                    style={{ width: `${gutter + 2}ch` }}
                  >
                    {index + 1}
                  </span>
                ) : null}
                {tokens.length ? renderTokens(tokens) : "\u00a0"}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
