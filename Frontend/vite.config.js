import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
  plugins: [react(), tailwindcss()],
});
