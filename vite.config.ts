import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ["**/*.onnx"],

  // This is here because of https://github.com/vitejs/vite/issues/7287
  optimizeDeps: {
    exclude: ["@webonnx/wonnx-wasm"],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
