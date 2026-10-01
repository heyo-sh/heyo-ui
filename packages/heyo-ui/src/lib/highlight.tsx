import type { ReactNode } from "react";

/**
 * A very small syntax highlighter.
 *
 * Not a parser, and not trying to be: it's one regex per language, alternating
 * over the constructs whose *colour* people actually read — strings, comments,
 * numbers, keywords, and the name right after `function`/`class`/a dot. That
 * covers the 95% of code snippets that appear in a UI (a config file, an import
 * block, a curl command) at a cost of about a kilobyte and zero dependencies.
 *
 * If you need real grammars, hand `CodeBlock` the markup Shiki or Prism
 * produced — it renders children untouched.
 */

export type TokenKind =
  | "plain"
  | "comment"
  | "string"
  | "number"
  | "keyword"
  | "builtin"
  | "function"
  | "property"
  | "operator"
  | "punctuation"
  | "tag"
  | "attr";

export interface Token {
  kind: TokenKind;
  value: string;
}

export type Language =
  | "ts"
  | "tsx"
  | "js"
  | "jsx"
  | "json"
  | "sh"
  | "bash"
  | "css"
  | "html"
  | "yaml"
  | "sql"
  | "text";

const JS_KEYWORDS =
  "as|async|await|break|case|catch|class|const|continue|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|private|protected|public|readonly|return|satisfies|set|static|switch|this|throw|try|type|typeof|var|void|while|yield";

const JS_BUILTINS =
  "true|false|null|undefined|NaN|Infinity|console|window|document|Math|JSON|Object|Array|String|Number|Boolean|Promise|Map|Set|Date|Intl|React";

const SH_BUILTINS =
  "cd|curl|echo|export|git|grep|ls|mkdir|mv|npm|npx|pnpm|bun|yarn|rm|sudo|cat|docker|kubectl|ssh|awk|sed|find|chmod|tar|wget";

/**
 * Ordered alternatives. First match wins, which is why comments and strings
 * come before everything that could appear inside one.
 */
const RULES: Record<string, [TokenKind, RegExp][]> = {
  js: [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ["string", /`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y],
    ["number", /\b0[xX][\da-fA-F]+\b|\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y],
    ["keyword", new RegExp(`\\b(?:${JS_KEYWORDS})\\b`, "y")],
    ["builtin", new RegExp(`\\b(?:${JS_BUILTINS})\\b`, "y")],
    // A name immediately followed by `(` is being called or declared.
    ["function", /\b[A-Za-z_$][\w$]*(?=\s*\()/y],
    // `.thing` — a property access reads better in its own colour.
    ["property", /(?<=\.)[A-Za-z_$][\w$]*/y],
    // JSX tags, before the operator rule swallows the `<`. The lookahead is
    // what stops `a < b` from being read as an opening tag.
    ["tag", /<\/?[A-Za-z][\w.:-]*(?=[\s/>])|<>|<\/>/y],
    ["operator", /=>|[+\-*/%!<>=&|?:]+/y],
    ["punctuation", /[{}[\]();,.]/y],
  ],
  json: [
    ["property", /"(?:\\.|[^"\\])*"(?=\s*:)/y],
    ["string", /"(?:\\.|[^"\\])*"/y],
    ["number", /-?\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y],
    ["builtin", /\b(?:true|false|null)\b/y],
    ["punctuation", /[{}[\]:,]/y],
  ],
  sh: [
    ["comment", /#[^\n]*/y],
    ["string", /"(?:\\.|[^"\\])*"|'[^']*'/y],
    // `--flag`, `-f`
    ["attr", /(?<=\s)-{1,2}[A-Za-z][\w-]*/y],
    ["builtin", new RegExp(`(?<![\\w-])(?:${SH_BUILTINS})(?![\\w-])`, "y")],
    ["property", /\$\{?[A-Za-z_][\w]*\}?/y],
    ["operator", /[|&;<>]+/y],
  ],
  css: [
    ["comment", /\/\*[\s\S]*?\*\//y],
    ["string", /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y],
    ["keyword", /@[\w-]+/y],
    ["property", /[-\w]+(?=\s*:)/y],
    [
      "number",
      /-?\b[\d.]+(?:px|rem|em|%|s|ms|vh|vw|deg|fr)?\b|#[\da-fA-F]{3,8}\b/y,
    ],
    ["function", /\b[\w-]+(?=\()/y],
    ["punctuation", /[{};:,]/y],
  ],
  html: [
    ["comment", /<!--[\s\S]*?-->/y],
    ["tag", /<\/?[A-Za-z][\w:-]*|\/?>/y],
    ["string", /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y],
    ["attr", /(?<=\s)[\w:-]+(?==)/y],
  ],
  yaml: [
    ["comment", /#[^\n]*/y],
    ["property", /^[ \t]*[-\w.]+(?=\s*:)/my],
    ["string", /"(?:\\.|[^"\\])*"|'[^']*'/y],
    ["number", /\b-?\d[\d_]*(?:\.\d+)?\b/y],
    ["builtin", /\b(?:true|false|null|yes|no)\b/y],
    ["punctuation", /[-:[\]{},]/y],
  ],
  sql: [
    ["comment", /--[^\n]*/y],
    ["string", /'(?:''|[^'])*'/y],
    [
      "keyword",
      /\b(?:SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|ORDER|BY|LIMIT|OFFSET|AS|AND|OR|NOT|NULL|CREATE|TABLE|INDEX|PRIMARY|KEY|DEFAULT|RETURNING|WITH|DISTINCT|COUNT|SUM|AVG)\b/iy,
    ],
    ["number", /\b\d+(?:\.\d+)?\b/y],
    ["punctuation", /[(),;.*]/y],
  ],
};

const ALIASES: Record<string, keyof typeof RULES> = {
  ts: "js",
  tsx: "js",
  typescript: "js",
  js: "js",
  jsx: "js",
  javascript: "js",
  json: "json",
  jsonc: "json",
  sh: "sh",
  bash: "sh",
  zsh: "sh",
  shell: "sh",
  console: "sh",
  css: "css",
  scss: "css",
  html: "html",
  xml: "html",
  svg: "html",
  yaml: "yaml",
  yml: "yaml",
  sql: "sql",
};

/** Splits `source` into coloured runs. Unknown languages come back as one run. */
export function tokenize(source: string, language?: string): Token[] {
  const rules = language ? RULES[ALIASES[language.toLowerCase()] ?? ""] : null;
  if (!rules) return [{ kind: "plain", value: source }];

  const tokens: Token[] = [];
  let index = 0;
  let plain = "";

  /** Flushes the run of unmatched characters collected so far. */
  function flush() {
    if (plain) {
      tokens.push({ kind: "plain", value: plain });
      plain = "";
    }
  }

  while (index < source.length) {
    let matched = false;

    for (const [kind, pattern] of rules) {
      // Sticky regexes: `lastIndex` makes each rule test *at* the cursor
      // instead of searching forward, which is what keeps this linear.
      pattern.lastIndex = index;
      const match = pattern.exec(source);
      if (match && match[0]) {
        flush();
        tokens.push({ kind, value: match[0] });
        index += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      plain += source[index];
      index += 1;
    }
  }

  flush();
  return tokens;
}

/** Splits tokens at newlines so a block can render one element per line. */
export function tokenizeLines(source: string, language?: string): Token[][] {
  const lines: Token[][] = [[]];

  for (const token of tokenize(source, language)) {
    const parts = token.value.split("\n");
    parts.forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part)
        lines[lines.length - 1]!.push({ kind: token.kind, value: part });
    });
  }

  return lines;
}

/**
 * Token colours live in CSS (`--code-*`), so a consumer can retheme them.
 *
 * The default palette is monochrome, so weight and italics carry part of the
 * distinction that hue used to: keywords, tags and call names sit heavier than
 * the surrounding code, comments lean. Swap the variables for a coloured set
 * and this still reads correctly — the emphasis just stops doing the work
 * alone.
 */
const tokenClass: Record<TokenKind, string> = {
  plain: "text-(--code-plain)",
  comment: "text-(--code-comment) italic",
  string: "text-(--code-string)",
  number: "text-(--code-number)",
  keyword: "text-(--code-keyword) font-medium",
  builtin: "text-(--code-builtin)",
  function: "text-(--code-function) font-medium",
  property: "text-(--code-property)",
  operator: "text-(--code-operator)",
  punctuation: "text-(--code-punctuation)",
  tag: "text-(--code-keyword) font-medium",
  attr: "text-(--code-property) italic",
};

export function renderTokens(tokens: Token[]): ReactNode {
  return tokens.map((token, index) =>
    token.kind === "plain" ? (
      token.value
    ) : (
      <span key={index} className={tokenClass[token.kind]}>
        {token.value}
      </span>
    ),
  );
}
