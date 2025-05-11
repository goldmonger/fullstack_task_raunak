import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.VITE_MQTT_PROTOCOL": JSON.stringify(
      process.env.VITE_MQTT_PROTOCOL
    ),
    "process.env.VITE_MQTT_HOST": JSON.stringify(process.env.VITE_MQTT_HOST),
    "process.env.VITE_MQTT_PORT": JSON.stringify(process.env.VITE_MQTT_PORT),
    "process.env.VITE_MQTT_USERNAME": JSON.stringify(
      process.env.VITE_MQTT_USERNAME
    ),
    "process.env.VITE_MQTT_PASSWORD": JSON.stringify(
      process.env.VITE_MQTT_PASSWORD
    ),
    "process.env.VITE_SERVER_HOST": JSON.stringify(
      process.env.VITE_SERVER_HOST
    ),
    "process.env.VITE_SERVER_PORT": JSON.stringify(
      process.env.VITE_SERVER_PORT
    ),
  },
}) satisfies UserConfig;
