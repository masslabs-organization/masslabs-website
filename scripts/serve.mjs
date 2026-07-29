import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const root = process.env.SERVE_ROOT ? join(projectRoot, process.env.SERVE_ROOT) : projectRoot;
const port = Number(process.env.PORT || 4173);
const types = { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8" };

createServer(async function (request, response) {
  const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let target = normalize(join(root, urlPath));
  if (!target.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const info = await stat(target);
    if (info.isDirectory()) target = join(target, "index.html");
    await stat(target);
  } catch {
    target = join(root, "404.html");
    response.statusCode = 404;
  }
  response.setHeader("Content-Type", types[extname(target)] || "application/octet-stream");
  createReadStream(target).pipe(response);
}).listen(port, "127.0.0.1", function () {
  console.log("MassLabs is running at http://127.0.0.1:" + port);
});
