import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

const API_TARGET = "https://api.venbuk.com";
const proxyRoute = { target: API_TARGET, changeOrigin: true };
// const proxyRoute = {
//   target: `http://100.122.206.124:8002`,
//   changeOrigin: true,
//   rewrite: (path) => path.replace(/^\/api/, ""),
// };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/auth": proxyRoute,
      "/users": proxyRoute,
      "/dictionaries": proxyRoute,
      "/enums": proxyRoute,
    },
  },
});
// export default defineConfig({
//   plugins: [react(), eslint()],
//   server: {
//     proxy: {
//       "/api": proxyRoute,
//     },
//   },
// });
