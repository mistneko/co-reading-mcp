# LOCAL PATCHES (Mitlesen 部署本地补丁清单)

这是 **第三方上游** `idleprocesscc/co-reading-mcp` 的本地部署。为保持对 upstream 可干净 diff，
本地改动**不 commit 进本仓库**，而是以工作区改动存在 + 本文件记录。**re-clone / upstream 更新会抹掉以下补丁，须逐条重打。**

系统服务：systemd `co-reading-mcp.service`（`node src/server-sse.js`，`127.0.0.1:3100`），改后 `systemctl restart co-reading-mcp`。

## 1. `src/server-sse.js` — 302 重定向只对浏览器 GET 生效
原始代码对**任意** `?token=` 请求 302（浏览器 cookie 流），会破坏 MCP 的 `POST /mcp?token=`。补丁令重定向只在浏览器 GET 阅读路径触发，让 `POST /mcp?token=` 内联鉴权（同 Nachklang 的 `?token=`）。

## 2. `src/server.js` — 每工具用量计数 `_toolUsage` + `reading_status` 工具
进程内累计每工具 `calls/respTokens/respChars`（`recordUsage` 在 `callTool` 里对全部 28 工具生效），`reading_status` 工具浮现 `usageSnapshot()`。进程内累计、重启清零。

## 3. `src/server.js` + `src/http-routes.js` — `GET /api/metrics` 只读端点（2026-07-01，dev-task 2b7e57d3424e「全MCP调用统计汇总」）
- `server.js`：加 `_startedAt` 进程启动戳 + 导出 `metricsSnapshot()`（复用 #2 的 `_toolUsage`，无新计数逻辑），归一成统一形状 `{service, started_at, uptime_s, tools:{by_tool:{name:{count,tokens_out_sum}}, total_calls}}`。
- `http-routes.js`：`import { metricsSnapshot } from "./server.js"` + 在 404 兜底前加 `GET /api/metrics` 一臂。
- **鉴权**：`/api/*` 已被 `MCP_AUTH_TOKEN` 网关保护，故 `/api/metrics` 需 Bearer token（未改鉴权路径——保持第三方代码最小侵入）。同主机 Nachklang `/api/metrics/family` 带 token 拉取聚合成「全家福调用热力图」。
- 无 import 循环（`server.js` 不反向依赖 `http-routes.js`）；`metricsSnapshot` 在请求期调用、非模块求值期，安全。

## 4. `src/server.js` — 三个「一次调用化」opt-in 参数（2026-07-01，chat 简化）
全在 `dispatchTool` + 工具 schema 里，纯附加、默认行为不变、不碰上游 `store.js`：
- **`reading_continue` 加 `markRead:true`**（默认 false）：读完这块顺手标已读，下次 `continue` 直接进下一块——省一次 `reading_mark_read`（整本读从 ~2 调用/块降到 1）。markRead 的进度/卡片通知/合卷并回 `cont.markedRead`，不丢。
- **`reading_search_chunks` 加 `full:true`**（默认 false）：把首个命中的整块正文内联进 `topChunk`——省 search→再 `reading_read_chunk`。默认仍回纯片段数组（向后兼容）。
- **`reading_open_card` 的 `cardId` 改为可选**：不传→默认最新一张未处理卡（`listCards` 按 createdAt 降序，`listCardInbox()[0]`）——省 `reading_card_inbox` 一趟。无卡时清晰报错。
⚠️ `reading_continue` 仍标 `readOnlyHint:true`（默认只读；仅 `markRead:true` 时写进度，opt-in）。

（另：`public/reader.html` 亦有本地改动；`.mcp_token`/`coread.env`/`public/reader.stock.html` 为未跟踪的部署态文件。）
