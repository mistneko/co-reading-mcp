#!/usr/bin/env node
import { createServer } from "node:http";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { dataDir } from "./store.js";
import { handle } from "./server.js";
import { handleApi, readBody, sendError, sendJson, serveStatic } from "./http-routes.js";

const port = Number(process.env.MCP_SSE_PORT || process.env.PORT || 3100);
const host = process.env.MCP_SSE_HOST || "0.0.0.0";
const authToken = process.env.MCP_AUTH_TOKEN || "";
const corsOrigin = process.env.MCP_CORS_ORIGIN || (authToken ? "*" : "");
const maxBodyBytes = Number(process.env.MCP_MAX_BODY_BYTES || process.env.READING_IMPORT_MAX_BYTES || 25_000_000);
const sessions = new Map();
const authCookieName = "co_reading_token";
const protocolVersion = "2024-11-05";

function sendSse(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${typeof data === "string" ? data : JSON.stringify(data)}\n\n`);
}

function setCors(res) {
  if (!corsOrigin) return;
  res.setHeader("access-control-allow-origin", corsOrigin);
  res.setHeader("access-control-allow-methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type, authorization, mcp-protocol-version");
  res.setHeader("access-control-expose-headers", "mcp-protocol-version, www-authenticate");
}

function cookieToken(req) {
  const cookie = req.headers.cookie || "";
  const prefix = `${authCookieName}=`;
  return (
    cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix))
      ?.slice(prefix.length) || ""
  );
}

function setAuthCookie(res, token) {
  res.setHeader(
    "set-cookie",
    `${authCookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
  );
}

// 常时比较，长度不等直接 false（timingSafeEqual 长度不等会抛）。空 token 场景由 authorized 的
// fail-closed 前置守卫兜住，不会走到这里。
function tokenEq(candidate) {
  if (typeof candidate !== "string" || candidate.length !== authToken.length) return false;
  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(authToken));
}

function authorized(req, url) {
  // 未配置 token 时拒绝所有鉴权请求，确保 fail-closed。
  if (!authToken) return false;
  const _auth = req.headers.authorization || "";
  if (_auth.startsWith("Bearer ") && tokenEq(_auth.slice(7))) return true;
  if (tokenEq(url.searchParams.get("token"))) return true;
  // 审计 0719 🟡：畸形 cookie（如 co_reading_token=%）会让 decodeURIComponent 抛 URIError，
  // 而它抛在鉴权判断之前 → 冒泡到顶层 catch → 全站 500，连「报暗号」页都渲染不出来；
  // cookie 是 HttpOnly，用户在页内没有任何自救手段。解不开就当没带 cookie，自然掉进 401 暗号页。
  let cookieValue = "";
  try {
    cookieValue = decodeURIComponent(cookieToken(req));
  } catch {
    return false;
  }
  return tokenEq(cookieValue);
}

function externalBaseUrl(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || "http";
  const hostHeader = req.headers["x-forwarded-host"] || req.headers.host || `${host}:${port}`;
  return `${protocol}://${hostHeader}`;
}

function endpointFor(req, sessionId) {
  return `${externalBaseUrl(req)}/messages?sessionId=${encodeURIComponent(sessionId)}`;
}

function rpcError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function mcpResourceMetadata(req) {
  const baseUrl = externalBaseUrl(req);
  return {
    resource: `${baseUrl}/mcp`,
    resource_name: "Co-Reading MCP",
    resource_documentation: `${baseUrl}/`,
    bearer_methods_supported: ["header"],
    scopes_supported: [],
    authorization_servers: [],
  };
}

function sendMcpJson(res, status, value) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "mcp-protocol-version": protocolVersion,
  });
  res.end(JSON.stringify(value, null, 2));
}

function sendUnauthorized(req, res) {
  const metadataUrl = `${externalBaseUrl(req)}/.well-known/oauth-protected-resource/mcp`;
  res.writeHead(401, {
    "content-type": "application/json; charset=utf-8",
    "www-authenticate": `Bearer resource_metadata="${metadataUrl}"`,
  });
  res.end(JSON.stringify({ error: "Unauthorized" }, null, 2));
}

async function route(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || `${host}:${port}`}`);
  // `?token=` → cookie + redirect is the BROWSER reader convenience only. Don't apply it to
  // API/MCP endpoints: remote MCP clients (claude.ai) carry the token in the connector URL as
  // `?token=` and need it authorized INLINE (302 would break the JSON-RPC POST). For those paths
  // we fall through to authorized() which already accepts ?token=. (local patch — see CLAUDE.md)
  const _readerPath = !(
    url.pathname === "/mcp" ||
    url.pathname === "/sse" ||
    url.pathname === "/messages" ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/.well-known/")
  );
  if (req.method === "GET" && _readerPath && authToken && url.searchParams.get("token") === authToken) {
    setAuthCookie(res, authToken);
    url.searchParams.delete("token");
    res.writeHead(302, { location: url.pathname + url.search });
    res.end();
    return;
  }

  if (
    req.method === "GET" &&
    (url.pathname === "/.well-known/oauth-protected-resource" ||
      url.pathname === "/.well-known/oauth-protected-resource/mcp")
  ) {
    sendJson(res, 200, mcpResourceMetadata(req));
    return;
  }

  // local patch #5 (PWA 化): 这批公开资产免鉴权——manifest/图标/SW 无敏感内容，
  // 且浏览器拉 manifest / iOS 拉 apple-touch-icon 默认不带 cookie，锁着会装不上。
  const _publicAsset =
    req.method === "GET" &&
    (url.pathname === "/manifest.json" ||
      url.pathname === "/sw.js" ||
      url.pathname === "/icon-192.png" ||
      url.pathname === "/icon-512.png" ||
      url.pathname === "/apple-touch-icon.png" ||
      url.pathname === "/favicon.png");

  const protectedRoute =
    !_publicAsset &&
    (Boolean(authToken) ||
      url.pathname.startsWith("/api/") ||
      url.pathname === "/mcp" ||
      url.pathname === "/sse" ||
      url.pathname === "/messages" ||
      url.pathname === "/health");

  if (protectedRoute && !authorized(req, url)) {
    // local patch #5: 浏览器 GET 阅读路径给一个内联「输入暗号」页——iOS 装到主屏的 PWA
    // 有独立 cookie 容器，首启没有 Safari 的 cookie；在这页输入 token 会在 App 容器内
    // 走一遍 /?token= 的 302+种 cookie 流程（token 不进 manifest，钥匙不插门上）。
    const wantsHtml = (req.headers.accept || "").includes("text/html");
    if (req.method === "GET" && _readerPath && wantsHtml) {
      res.writeHead(401, { "content-type": "text/html; charset=utf-8" });
      res.end(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>共读 · Mitlesen</title><link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"><meta name="theme-color" content="#F0F3FA">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F5F1E8;
font-family:'DM Sans','Songti SC','Noto Serif SC',serif;color:#2D3142}
.card{background:rgba(255,255,255,.85);border:1px solid rgba(160,170,200,.22);border-radius:16px;
padding:34px 30px;box-shadow:0 4px 24px rgba(45,49,66,.07);text-align:center;max-width:320px}
img{width:88px;height:88px;border-radius:22px;margin-bottom:14px}
h1{font-size:19px;font-weight:600;margin:0 0 6px}p{font-size:13px;color:#8A90A8;margin:0 0 18px}
input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid rgba(160,170,200,.35);
border-radius:10px;font-size:14px;margin-bottom:12px;background:#fff}
button{width:100%;padding:10px;border:0;border-radius:10px;background:#7B8EC6;color:#fff;
font-size:14px;cursor:pointer}button:active{filter:brightness(.95)}</style></head>
<body><form class="card" onsubmit="location.href='/?token='+encodeURIComponent(this.t.value.trim());return false">
<img src="/icon-192.png" alt=""><h1>共读 · Mitlesen</h1><p>这间书房上了锁，报一下暗号。</p>
<input name="t" type="password" placeholder="token" autocomplete="current-password" required>
<button type="submit">进书房</button></form></body></html>`);
      return;
    }
    sendUnauthorized(req, res);
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    return handleApi(req, res, url, { maxBodyBytes });
  }

  if (req.method === "POST" && url.pathname === "/mcp") {
    let message;
    try {
      message = await readBody(req, { maxBytes: maxBodyBytes, allowEmpty: false });
    } catch (error) {
      sendMcpJson(res, 400, { error: error.message || "Invalid JSON body" });
      return;
    }

    try {
      const response = await handle(message);
      sendMcpJson(res, 200, response || { accepted: true });
    } catch (error) {
      sendMcpJson(res, 200, rpcError(message?.id ?? null, -32000, error.message || String(error)));
    }
    return;
  }

  if (req.method === "GET" && url.pathname === "/mcp") {
    res.writeHead(405, {
      allow: "POST",
      "content-type": "application/json; charset=utf-8",
      "mcp-protocol-version": protocolVersion,
    });
    res.end(JSON.stringify({ error: "Method Not Allowed", expected: "POST JSON-RPC" }, null, 2));
    return;
  }

  if (req.method === "GET" && url.pathname === "/sse") {
    const sessionId = crypto.randomUUID();

    res.writeHead(200, {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    });
    res.write(": connected\n\n");

    sessions.set(sessionId, { res });
    sendSse(res, "endpoint", endpointFor(req, sessionId));

    const keepAlive = setInterval(() => {
      if (!sessions.has(sessionId)) {
        clearInterval(keepAlive);
        return;
      }
      try {
        const ok = res.write(": ping\n\n");
        if (!ok && res.destroyed) {
          clearInterval(keepAlive);
          sessions.delete(sessionId);
        }
      } catch {
        clearInterval(keepAlive);
        sessions.delete(sessionId);
      }
    }, 30_000);

    req.on("close", () => {
      clearInterval(keepAlive);
      sessions.delete(sessionId);
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/messages") {
    const sessionId = url.searchParams.get("sessionId") || "";
    const session = sessions.get(sessionId);
    if (!session) {
      sendJson(res, 404, { error: "Unknown or expired SSE session" });
      return;
    }

    let message;
    try {
      message = await readBody(req, { maxBytes: maxBodyBytes, allowEmpty: false });
    } catch (error) {
      sendJson(res, 400, { error: error.message || "Invalid JSON body" });
      return;
    }

    sendJson(res, 202, { accepted: true });

    try {
      const response = await handle(message);
      if (response && sessions.has(sessionId)) sendSse(session.res, "message", response);
    } catch (error) {
      const response = rpcError(message?.id ?? null, -32000, error.message || String(error));
      if (sessions.has(sessionId)) sendSse(session.res, "message", response);
    }
    return;
  }

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
    if (url.pathname === "/") return serveStatic(req, res, url);
    sendJson(res, 200, {
      status: "ok",
      transport: "sse+http",
      dataDir,
      sessions: sessions.size,
      auth: authToken ? "enabled" : "disabled",
      endpoints: {
        reader: "/",
        api: "/api/*",
        sse: "/sse",
        messages: "/messages?sessionId=<id>",
        mcp: "/mcp",
      },
    });
    return;
  }

  if (req.method === "GET") {
    return serveStatic(req, res, url);
  }

  sendError(res, 404, "Not found");
}

export function startSseServer() {
  const server = createServer((req, res) => {
    route(req, res).catch((error) => {
      const status = error.statusCode || 500;
      sendJson(res, status, { error: error.message || String(error) });
    });
  });

  server.listen(port, host, () => {
    process.stderr.write(
      `Co-Reading remote server: http://${host}:${port}\nReader: /\nREST API: /api/*\nMCP SSE: /sse\nMCP POST: /mcp\nData dir: ${dataDir}\nAuth: ${
        authToken ? "enabled" : "disabled; set MCP_AUTH_TOKEN before exposing this server"
      }\n`,
    );
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startSseServer();
}
