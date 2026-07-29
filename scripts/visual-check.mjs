import { spawn } from "node:child_process";
import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const output = join(process.cwd(), "artifacts");
await mkdir(output, { recursive: true });

const server = spawn(process.execPath, ["scripts/serve.mjs"], { stdio: ["ignore", "pipe", "inherit"] });
await new Promise(function (resolve, reject) {
  const timer = setTimeout(function () { reject(new Error("Server start timeout")); }, 8000);
  server.stdout.once("data", function () {
    clearTimeout(timer);
    resolve();
  });
});

try {
  const common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check"];
  await run(edge, common.concat(["--window-size=1440,1200", "--screenshot=" + join(output, "home-desktop.png"), "http://127.0.0.1:4173/tr/"]));
  await run(edge, common.concat(["--window-size=500,900", "--screenshot=" + join(output, "home-mobile.png"), "http://127.0.0.1:4173/tr/"]));
  console.log("Visual screenshots written to artifacts/.");
} finally {
  server.kill();
}
