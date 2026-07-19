# LOCAL PATCHES (Mitlesen 部署本地补丁清单)

这是 **第三方上游** `idleprocesscc/co-reading-mcp` 的本地部署（Mitlesen）。**2026-07-01 起已 fork 到 `mistneko/co-reading-mcp`**，
补丁已 commit 并 push 到我们的 fork（远端 `mist`；`origin` 仍指上游供 `git fetch origin` 拉更新）。
本文件保留为**人读补丁清单 + 重打指南**：若从纯上游 re-clone 或 rebase 上游更新导致冲突，按此逐条重打。

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

## 5. PWA 化 + 像素图标（2026-07-15，dev-task 0305a504aaeb）
- `public/`：新增 `manifest.json` / `sw.js`（precache 仅图标；/api /sse /mcp /messages 永不拦）/ `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` / `favicon.png`（像素系列第 6 枚「金毛与像素小烟并读冰蓝书」，源图 Nachklang gallery 7e079179a59d，黑角已填信纸暖白 #F5F1E8）。
- `public/reader.html`：head 加 manifest/图标/theme-color/apple-* meta + SW 注册（`sw.js?v=mitlesen-v1`）。**改前端记得双 bump**（sw.js 的 CACHE + reader.html 的 ?v=）。
- `src/http-routes.js`：`contentTypes` 补 `.png`。
- `src/server-sse.js`：①公开资产免鉴权白名单（manifest.json/sw.js/icon-*/apple-touch-icon/favicon——浏览器拉 manifest、iOS 拉 touch-icon 默认不带 cookie，锁着装不上）；②未授权浏览器 GET 阅读路径改出内联「输入暗号」页（替代裸 401 JSON）——iOS 主屏 PWA cookie 容器独立，首启在页内输入 token 走 `/?token=` 302+种 cookie 流。**token 不进 manifest**（安全评估结论）。

## 6. `public/reader.html` — 设计系统桌面批（2026-07）
- 补齐设计系统 token 别名，并修正暗色纸上的冰色对比；既有声明保持不动。
- 「读完这章」后读取当前书的卡片信箱，以服务端 `image.svg` 为唯一卡面真源，逐张展示玻璃仪式浮层并在「收下」时 dismiss；无卡或拉取失败仍沿用原 toast。
- 无批注时显示邀请式空状态；选区「批注」按钮改用设计系统小尺寸；`public/sw.js` 与 reader 注册串同步 bump 到 `mitlesen-v2`。
- **为什么**：补上桌面设计系统唯一缺失的「一页一仪式」，并收齐两项小件，不改变既有桌面几何、色板与信纸物性。
- **re-clone 后重放**：把 `reader.html` 中所有 `BEAUTIFY-2026-07 · 设计系统桌面批` 标记块按原位置放回，同步恢复 `sw.js` 的 `mitlesen-v2`（或继续递增）及 reader 注册版本串。
