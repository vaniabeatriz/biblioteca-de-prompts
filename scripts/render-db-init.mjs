import { spawnSync } from "node:child_process";

if (process.env.RENDER !== "true") {
  console.log("Skipping Render database init outside Render.");
  process.exit(0);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required for Render database init.");
  process.exit(1);
}

const result = spawnSync("npm", ["run", "render:predeploy"], {
  stdio: "inherit",
  shell: process.platform === "win32"
});

process.exit(result.status ?? 1);
