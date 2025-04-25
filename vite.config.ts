import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), dts({ entryRoot: "src/lib" })],

    build: {
      lib: {
        entry: {
          index: "src/lib/index.ts",
          "bundlers/webpack": "src/lib/bundlers/webpack.ts",
        },
        formats: ["es"],
        // fileName: (format) => `[name].js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "svelte",
          "svelte/server",
          "svelte/internal",
          "svelte/internal/client",
          "path",
        ],
        output: {
          preserveModules: true,
          preserveModulesRoot: "src/lib",
          dir: "dist",
          globals: {
            "react-dom": "ReactDom",
            react: "React",
            "react/jsx-runtime": "ReactJsxRuntime",
          },
        },
      },
    },
  };
});
