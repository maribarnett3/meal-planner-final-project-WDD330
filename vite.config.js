import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        search: resolve(__dirname, "src/search/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
        "meal-planner": resolve(__dirname, "src/meal-planner/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
      },
    },
  },
});
