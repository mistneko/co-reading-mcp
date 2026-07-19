import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  annotatePassage,
  collectCard,
  continueReading,
  deleteBook,
  dismissCard,
  getProgress,
  listCardInbox,
  listCardCollection,
  listCards,
  listAnnotations,
  listBooks,
  listChunks,
  markRead,
  readCard,
  readChunk,
  replyToAnnotation,
  searchChunks,
  submitUserNotes,
} from "./store.js";
import { importBook } from "./importer.js";
import { renderCardPng, renderCardSvg } from "./card-renderer.js";
import { metricsSnapshot } from "./server.js";   // 本地补丁：GET /api/metrics 全家福数据源（无 import 循环，server.js 不反向依赖本文件）

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(ROOT, "public");
const defaultMaxBodyBytes = Number(process.env.READING_HTTP_MAX_BODY_BYTES || process.env.READING_IMPORT_MAX_BYTES || 25_000_000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png", // local patch #5: PWA 图标（manifest 校验要求正确 MIME）
};

export function sendJson(res, status, value) {
  // 审计 0719 🔴：任何「已写响应头之后才抛出」的处理器，都会让顶层 catch 在这里二次 writeHead
  // → ERR_HTTP_HEADERS_SENT 在 catch 回调内同步抛出 → unhandled rejection → Node ≥15 直接杀进程。
  // 守住这一处，整类「写头后失败」就退化成断连而非宕机。
  if (res.headersSent) {
    res.destroy();
    return;
  }
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value, null, 2));
}

export function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

export async function readBody(req, { maxBytes = defaultMaxBodyBytes, allowEmpty = true } = {}) {
  const contentType = req.headers["content-type"] || "";
  if (contentType && !contentType.includes("application/json")) {
    const err = new Error("Content-Type must be application/json");
    err.statusCode = 415;
    throw err;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) throw new Error(`Request body exceeds ${maxBytes} bytes`);
    chunks.push(chunk);
  }
  if (!chunks.length) {
    if (allowEmpty) return {};
    throw new Error("Missing JSON body");
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function routeParts(url) {
  return url.pathname
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));
}

export async function handleApi(req, res, url, options = {}) {
  const parts = routeParts(url);
  const maxBytes = options.maxBodyBytes || defaultMaxBodyBytes;

  if (req.method === "GET" && parts.length === 2 && parts[1] === "books") {
    return sendJson(res, 200, await listBooks({ includePrivate: true }));
  }

  if (req.method === "GET" && parts.length === 4 && parts[1] === "books" && parts[3] === "chunks") {
    return sendJson(res, 200, await listChunks(parts[2], { includePrivate: true }));
  }

  if (req.method === "DELETE" && parts.length === 3 && parts[1] === "books") {
    return sendJson(res, 200, await deleteBook(parts[2]));
  }

  if (req.method === "GET" && parts.length === 5 && parts[1] === "books" && parts[3] === "chunks") {
    return sendJson(res, 200, await readChunk(parts[2], parts[4]));
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "continue") {
    return sendJson(res, 200, await continueReading({ bookId: url.searchParams.get("bookId") || undefined }));
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "annotations") {
    return sendJson(
      res,
      200,
      await listAnnotations({
        bookId: url.searchParams.get("bookId") || undefined,
        chunkId: url.searchParams.get("chunkId") || undefined,
        kind: url.searchParams.get("kind") || undefined,
        author: url.searchParams.get("author") || undefined,
        status: url.searchParams.get("status") || undefined,
        parentId: url.searchParams.has("parentId") ? url.searchParams.get("parentId") : undefined,
        includePrivate: true,
      }),
    );
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "cards") {
    return sendJson(
      res,
      200,
      await listCards({
        bookId: url.searchParams.get("bookId") || undefined,
        chunkId: url.searchParams.get("chunkId") || undefined,
        source: url.searchParams.get("source") || undefined,
        limit: Number(url.searchParams.get("limit") || 20),
        offset: Number(url.searchParams.get("offset") || 0),
      }),
    );
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "card-collection") {
    return sendJson(
      res,
      200,
      await listCardCollection({
        bookId: url.searchParams.get("bookId") || undefined,
        limit: Number(url.searchParams.get("limit") || 12),
        offset: Number(url.searchParams.get("offset") || 0),
      }),
    );
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "card-inbox") {
    return sendJson(
      res,
      200,
      await listCardInbox({
        bookId: url.searchParams.get("bookId") || undefined,
        limit: Number(url.searchParams.get("limit") || 10),
      }),
    );
  }

  if (req.method === "GET" && parts.length === 4 && parts[1] === "cards" && parts[3] === "image.svg") {
    const card = await readCard(parts[2]);
    const svg = renderCardSvg(card);        // 先渲染后写头：渲染失败要能走正常错误响应
    res.writeHead(200, { "content-type": "image/svg+xml; charset=utf-8" });
    res.end(svg);
    return;
  }

  if (req.method === "GET" && parts.length === 4 && parts[1] === "cards" && parts[3] === "image.png") {
    const card = await readCard(parts[2]);
    // 先渲染后写头。本机没装 Playwright（renderCardPng 第一行就 throw），此前是「头已发出再抛」
    // → 顶层 catch 二次 writeHead → 进程被杀。缺 Playwright 时回退 SVG，而不是让请求打死服务。
    let png;
    try {
      png = renderCardPng(card);
    } catch (error) {
      const svg = renderCardSvg(card);
      res.writeHead(200, {
        "content-type": "image/svg+xml; charset=utf-8",
        "x-card-fallback": "svg",   // 告诉调用方这不是 PNG：没装 Playwright
      });
      res.end(svg);
      return;
    }
    res.writeHead(200, { "content-type": "image/png" });
    res.end(png);
    return;
  }

  if (req.method === "POST" && parts.length === 4 && parts[1] === "cards" && parts[3] === "dismiss") {
    return sendJson(res, 200, await dismissCard(parts[2]));
  }

  if (req.method === "POST" && parts.length === 2 && parts[1] === "cards") {
    const body = await readBody(req, { maxBytes });
    return sendJson(res, 201, await collectCard({ ...body, createdBy: body.createdBy || "human" }));
  }

  if (req.method === "POST" && parts.length === 2 && parts[1] === "annotations") {
    const body = await readBody(req, { maxBytes });
    return sendJson(
      res,
      201,
      await annotatePassage({
        ...body,
        author: body.author || "user",
        status: body.status || "open",
      }),
    );
  }

  if (req.method === "POST" && parts.length === 2 && parts[1] === "replies") {
    const body = await readBody(req, { maxBytes });
    return sendJson(
      res,
      201,
      await replyToAnnotation({
        ...body,
        author: body.author || "user",
        kind: body.kind || "reply",
        status: body.status || "open",
      }),
    );
  }

  if (req.method === "POST" && parts.length === 2 && parts[1] === "submit-notes") {
    return sendJson(res, 200, await submitUserNotes(await readBody(req, { maxBytes })));
  }

  if (req.method === "POST" && parts.length === 2 && parts[1] === "mark-read") {
    const body = await readBody(req, { maxBytes });
    return sendJson(res, 200, await markRead(body.bookId, body.chunkId));
  }

  if (req.method === "POST" && parts.length === 2 && parts[1] === "import") {
    return sendJson(res, 201, await importBook(await readBody(req, { maxBytes })));
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "progress") {
    return sendJson(res, 200, await getProgress(url.searchParams.get("bookId") || undefined));
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "search") {
    return sendJson(
      res,
      200,
      await searchChunks({
        bookId: url.searchParams.get("bookId") || undefined,
        query: url.searchParams.get("q") || "",
        limit: Number(url.searchParams.get("limit") || 10),
      }),
    );
  }

  if (req.method === "GET" && parts.length === 2 && parts[1] === "metrics") {
    return sendJson(res, 200, metricsSnapshot());   // 本地补丁：全MCP调用统计汇总·各自统计侧
  }

  return sendError(res, 404, "Not found");
}

export async function serveStatic(req, res, url) {
  const requested = url.pathname === "/" ? "reader.html" : url.pathname.slice(1);
  const resolved = path.resolve(publicDir, requested);
  const relative = path.relative(publicDir, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return sendError(res, 403, "Forbidden");
  }

  try {
    const body = await readFile(resolved);
    res.writeHead(200, {
      "content-type": contentTypes[path.extname(resolved)] || "application/octet-stream",
    });
    res.end(body);
  } catch (error) {
    if (error.code === "ENOENT") return sendError(res, 404, "Not found");
    throw error;
  }
}
