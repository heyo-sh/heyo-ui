import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know about our custom `text-heyo-*` colour tokens, so
 * without this it would happily let `text-sm` (a font size) clobber
 * `text-heyo-subtle` (a colour). Teaching it the token list keeps class merging
 * predictable for consumers overriding component styles.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"] }],
      "text-color": [
        {
          text: [
            "heyo-default",
            "heyo-strong",
            "heyo-subtle",
            "heyo-inactive",
            "heyo-placeholder",
            "heyo-inverse",
            "heyo-brand",
            "heyo-link",
            "heyo-info",
            "heyo-success",
            "heyo-warning",
            "heyo-danger",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export type { ClassValue };
