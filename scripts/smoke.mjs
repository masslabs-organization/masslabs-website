import { spawn } from "node:child_process";

const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, SERVE_ROOT: "public" }
});
const timeout = setTimeout(function () {
  server.kill();
  console.error("Local server did not start in time.");
  process.exit(1);
}, 8000);

server.stdout.once("data", async function () {
  clearTimeout(timeout);
  const checks = [
    ["/tr/", 200],
    ["/en/", 200],
    ["/tr/projeler/pma/", 200],
    ["/en/contact/", 200],
    ["/missing-page/", 404]
  ];
  const failures = [];
  for (const [path, expected] of checks) {
    const response = await fetch("http://127.0.0.1:4173" + path);
    if (response.status !== expected) failures.push(path + ": expected " + expected + ", received " + response.status);
    const text = await response.text();
    if (!text.includes("<!DOCTYPE html>")) failures.push(path + ": response is not HTML");
  }
  server.kill();
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
  console.log("HTTP smoke test passed for 5 representative routes.");
});

server.stderr.on("data", function (data) {
  clearTimeout(timeout);
  console.error(String(data));
  server.kill();
  process.exit(1);
});
