import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      features: `${path.resolve(__dirname, "./src/features/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      routes: `${path.resolve(__dirname, "./src/routes/")}`,
      contexts: `${path.resolve(__dirname, "./src/contexts/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      modals: `${path.resolve(__dirname, "./src/modals/")}`,
      constants: `${path.resolve(__dirname, "./src/constants/")}`,
      wrappers: `${path.resolve(__dirname, "./src/wrappers/")}`,
    },
  },
}));
