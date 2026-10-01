import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Point at source so the playground hot-reloads while you design.
      "@heyo-sh/heyo-ui": fileURLToPath(
        new URL("../../packages/heyo-ui/src/index.ts", import.meta.url),
      ),
    },
  },
});
