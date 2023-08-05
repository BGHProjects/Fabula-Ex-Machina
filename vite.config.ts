import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  server: {
    fs: {
      // Allow serving files from public/p5 as '/p5'
      allow: [".."],
    },
  },
});
