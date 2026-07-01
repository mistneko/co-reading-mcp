#!/usr/bin/env node
import readline from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  annotatePassage,
  collectCard,
  continueReading,
  dataDir,
  deleteBook,
  dismissCard,
  getProgress,
  listCardInbox,
  listCardCollection,
  listCards,
  listAnnotations,
  listBooks,
  listChunks,
  listSubmissions,
  markRead,
  readCard,
  readChunk,
  readSubmission,
  replyToAnnotation,
  searchChunks,
  submitUserNotes,
} from "./store.js";
import {
  appendImportPart,
  beginImport,
  cancelImport,
  finishImport,
  importBook,
} from "./importer.js";
import { renderCardImageContent, saveCardImage } from "./card-renderer.js";

const protocolVersion = "2024-11-05";

export const tools = [
  {
    name: "reading_status",
    description: "共读服务的每工具用量统计（调用次数 + MCP 响应 token 粗估，本进程累计·重启清零）。也看看同主机 Nachklang / Klanggestalt / Flânerie 的 status，对齐全局进度。",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { title: "Status", readOnlyHint: true },
  },
  {
    name: "reading_list_books",
    description: "List imported books with progress and annotation counts.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { title: "List Books", readOnlyHint: true },
  },
  {
    name: "reading_list_chunks",
    description: "List chunks for a book in reading order.",
    inputSchema: {
      type: "object",
      required: ["bookId"],
      properties: { bookId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "List Chunks", readOnlyHint: true },
  },
  {
    name: "reading_read_chunk",
    description: "Read one book chunk and return prevId/nextId.",
    inputSchema: {
      type: "object",
      required: ["bookId", "chunkId"],
      properties: { bookId: { type: "string" }, chunkId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Read Chunk", readOnlyHint: true },
  },
  {
    name: "reading_continue",
    description:
      "Continue reading from the next unread chunk. If bookId is omitted, use the most recently read book. Set markRead:true to also mark this chunk read in the same call (so the next reading_continue advances) — saves a separate reading_mark_read; card notifications from marking come back under `markedRead`.",
    inputSchema: {
      type: "object",
      properties: { bookId: { type: "string" }, markRead: { type: "boolean" } },
      additionalProperties: false,
    },
    annotations: { title: "Continue Reading", readOnlyHint: true },
  },
  {
    name: "reading_search_chunks",
    description: "Search book chunks by keyword. Set full:true to also inline the whole chunk text of the top hit under `topChunk` — saves a follow-up reading_read_chunk when you just want to read the best match in context.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        bookId: { type: "string" },
        query: { type: "string" },
        limit: { type: "number" },
        full: { type: "boolean" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Search Chunks", readOnlyHint: true },
  },
  {
    name: "reading_import_book",
    description:
      "Import one EPUB or TXT file from base64 content into the reading library. Use this for files small enough for one MCP request.",
    inputSchema: {
      type: "object",
      required: ["filename", "dataBase64"],
      properties: {
        filename: { type: "string" },
        dataBase64: { type: "string" },
        format: { type: "string", enum: ["epub", "txt", "text", "md", "markdown"] },
        bookId: { type: "string" },
        title: { type: "string" },
        author: { type: "string" },
        maxChars: { type: "number" },
        headingRegex: { type: "string" },
        minSectionChars: { type: "number" },
        overwrite: { type: "boolean" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Import Book" },
  },
  {
    name: "reading_import_begin",
    description:
      "Start a chunked EPUB/TXT import. Use this when the file is too large for one reading_import_book request.",
    inputSchema: {
      type: "object",
      required: ["filename"],
      properties: {
        filename: { type: "string" },
        format: { type: "string", enum: ["epub", "txt", "text", "md", "markdown"] },
        expectedBytes: { type: "number" },
        bookId: { type: "string" },
        title: { type: "string" },
        author: { type: "string" },
        maxChars: { type: "number" },
        headingRegex: { type: "string" },
        minSectionChars: { type: "number" },
        overwrite: { type: "boolean" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Begin Import" },
  },
  {
    name: "reading_import_part",
    description: "Append one base64 file part to an active chunked import.",
    inputSchema: {
      type: "object",
      required: ["uploadId", "dataBase64"],
      properties: {
        uploadId: { type: "string" },
        dataBase64: { type: "string" },
        index: { type: "number" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Import Part" },
  },
  {
    name: "reading_import_finish",
    description: "Finish a chunked import and add the uploaded EPUB/TXT to the reading library.",
    inputSchema: {
      type: "object",
      required: ["uploadId"],
      properties: { uploadId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Finish Import" },
  },
  {
    name: "reading_import_cancel",
    description: "Cancel a chunked import and delete its temporary upload file.",
    inputSchema: {
      type: "object",
      required: ["uploadId"],
      properties: { uploadId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Cancel Import" },
  },
  {
    name: "reading_delete_book",
    description:
      "Delete a book from the active library and archive its book folder plus related progress, annotations, submissions, and cards under data/trash. Requires confirm: true.",
    inputSchema: {
      type: "object",
      required: ["bookId", "confirm"],
      properties: {
        bookId: { type: "string" },
        confirm: { type: "boolean" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Delete Book", destructiveHint: true },
  },
  {
    name: "reading_annotate_passage",
    description: "Write a Claude margin annotation anchored to a quote in a chunk. Human private notes should be created through the HTTP reader API, not this MCP tool.",
    inputSchema: {
      type: "object",
      required: ["bookId", "chunkId", "quote", "note"],
      properties: {
        bookId: { type: "string" },
        chunkId: { type: "string" },
        quote: { type: "string" },
        quoteOffset: { type: "number" },
        note: { type: "string" },
        kind: { type: "string" },
        mood: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        parentId: { type: "string" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Annotate Passage" },
  },
  {
    name: "reading_list_annotations",
    description: "List annotations, optionally filtered by book, chunk, kind, or author.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        chunkId: { type: "string" },
        kind: { type: "string" },
        author: { type: "string" },
        status: { type: "string" },
        parentId: { type: "string" },
      },
      additionalProperties: false,
    },
    annotations: { title: "List Annotations", readOnlyHint: true },
  },
  {
    name: "reading_submit_user_notes",
    description:
      "Submit open user notes for Claude review. By default, include each chunk's full text once per session and mark notes submitted so they are not sent again.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        chunkId: { type: "string" },
        sessionId: { type: "string" },
        contextMode: {
          type: "string",
          enum: ["chunk-once-per-session", "chunk-always", "notes-only"],
        },
        includeContext: { type: "boolean" },
        forceChunkContext: { type: "boolean" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Submit User Notes" },
  },
  {
    name: "reading_list_submissions",
    description: "List human note submission batches that have been shared with Claude.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        chunkId: { type: "string" },
        sessionId: { type: "string" },
        limit: { type: "number" },
      },
      additionalProperties: false,
    },
    annotations: { title: "List Submissions", readOnlyHint: true },
  },
  {
    name: "reading_read_submission",
    description: "Read one human note submission batch including notes and context.",
    inputSchema: {
      type: "object",
      required: ["submissionId"],
      properties: { submissionId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Read Submission", readOnlyHint: true },
  },
  {
    name: "reading_reply_to_annotation",
    description: "Attach a Claude reply under an existing user or Claude annotation.",
    inputSchema: {
      type: "object",
      required: ["parentId", "note"],
      properties: {
        parentId: { type: "string" },
        note: { type: "string" },
        kind: { type: "string" },
        mood: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        bookId: { type: "string" },
        chunkId: { type: "string" },
        quote: { type: "string" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Reply To Annotation" },
  },
  {
    name: "reading_mark_read",
    description: "Mark a chunk as read and update last-read progress.",
    inputSchema: {
      type: "object",
      required: ["bookId", "chunkId"],
      properties: { bookId: { type: "string" }, chunkId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Mark Read" },
  },
  {
    name: "reading_card_inbox",
    description: "Show unread collected reading-card prompts, like a small bookmark inbox.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        limit: { type: "number" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Reading Card Inbox", readOnlyHint: true },
  },
  {
    name: "reading_card_collection",
    description: "Browse collected reading cards as a paginated collection without opening every image.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        limit: { type: "number" },
        offset: { type: "number" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Reading Card Collection", readOnlyHint: true },
  },
  {
    name: "reading_open_card",
    description: "Open one collected reading card and return it as an image for Claude to view. Omit cardId to open the latest unopened card (the common single-card case) — saves a reading_card_inbox lookup first.",
    inputSchema: {
      type: "object",
      properties: { cardId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Open Reading Card", readOnlyHint: true },
  },
  {
    name: "reading_save_card",
    description: "Render one collected reading card to a local image file and return its absolute path.",
    inputSchema: {
      type: "object",
      required: ["cardId"],
      properties: { cardId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Save Reading Card" },
  },
  {
    name: "reading_dismiss_card",
    description: "Dismiss one collected reading card from the card inbox without deleting it.",
    inputSchema: {
      type: "object",
      required: ["cardId"],
      properties: { cardId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Dismiss Reading Card" },
  },
  {
    name: "reading_list_cards",
    description: "List collected ritual reading cards/bookmarks for completed sections or shared margin moments.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        chunkId: { type: "string" },
        source: { type: "string" },
        scope: { type: "string", enum: ["section", "book"] },
        limit: { type: "number" },
      },
      additionalProperties: false,
    },
    annotations: { title: "List Reading Cards", readOnlyHint: true },
  },
  {
    name: "reading_collect_card",
    description: "Collect a small ritual reading card/bookmark so it can be revisited later.",
    inputSchema: {
      type: "object",
      properties: {
        bookId: { type: "string" },
        chunkId: { type: "string" },
        bookTitle: { type: "string" },
        chunkTitle: { type: "string" },
        title: { type: "string" },
        subtitle: { type: "string" },
        kicker: { type: "string" },
        quote: { type: "string" },
        note: { type: "string" },
        footer: { type: "string" },
        art: { type: "string", enum: ["fold", "ripple", "stardust", "lastfold"] },
        variant: { type: "string" },
        scope: { type: "string", enum: ["section", "book"] },
        source: { type: "string" },
      },
      additionalProperties: false,
    },
    annotations: { title: "Collect Reading Card" },
  },
  {
    name: "reading_get_progress",
    description: "Get reading progress for one book or all books.",
    inputSchema: {
      type: "object",
      properties: { bookId: { type: "string" } },
      additionalProperties: false,
    },
    annotations: { title: "Get Progress", readOnlyHint: true },
  },
];

function result(id, value) {
  return { jsonrpc: "2.0", id, result: value };
}

function error(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function textContent(value) {
  return {
    content: [
      {
        type: "text",
        text: typeof value === "string" ? value : JSON.stringify(value, null, 2),
      },
    ],
  };
}

function imageContent({ text, image }) {
  return {
    content: [
      { type: "text", text },
      image,
    ],
  };
}

// ── 工具用量：每工具 MCP 响应 token 粗估（本地补丁；进程内累计·重启清零；reading_status 工具浮现）──
const _toolUsage = {};
const _startedAt = Date.now();   // 进程启动时刻（/api/metrics 标注口径；重启清零同 _toolUsage）
function estimateTokens(str) {
  if (!str) return 0;
  let cjk = 0, other = 0;
  for (const ch of str) {
    const c = ch.codePointAt(0);
    if ((c >= 0x3000 && c <= 0x9fff) || (c >= 0xff00 && c <= 0xffef)) cjk++;
    else other++;
  }
  return Math.ceil(cjk * 0.6 + other / 4);
}
function recordUsage(name, result) {
  try {
    const rec = _toolUsage[name] || (_toolUsage[name] = { calls: 0, respTokens: 0, respChars: 0 });
    let text = "";
    for (const part of (result && result.content) || []) {
      if (part && part.type === "text") text += part.text || "";   // 图片 content block 不算回包 token
    }
    rec.calls += 1; rec.respChars += text.length; rec.respTokens += estimateTokens(text);
  } catch (_) { /* 计数失败绝不影响工具本身 */ }
}
function usageSnapshot() {
  const out = {};
  for (const [k, v] of Object.entries(_toolUsage)) {
    out[k] = { calls: v.calls, respTokens: v.respTokens, avgTokens: v.calls ? Math.round(v.respTokens / v.calls) : 0 };
  }
  return {
    project: "co-reading-mcp (Mitlesen)",
    toolUsage: out,
    note: "每工具 MCP 响应 token 粗估，本进程累计·重启清零；只算文本回包(不含书签图片二进制)。CJK≈0.6×字 + 其余/4。也看看同主机 Nachklang/Klanggestalt/Flânerie 的 status。",
  };
}

// 全家福汇总数据源：被 Nachklang /api/metrics/family 经 GET /api/metrics 拉取，归一成统一形状。
// 复用同一 _toolUsage（无新计数逻辑），加进程启动戳与 total_calls 卷积。
export function metricsSnapshot() {
  const by_tool = {};
  let total_calls = 0;
  for (const [k, v] of Object.entries(_toolUsage)) {
    by_tool[k] = { count: v.calls, tokens_out_sum: v.respTokens };
    total_calls += v.calls;
  }
  return {
    service: "co-reading-mcp",
    started_at: new Date(_startedAt).toISOString(),
    uptime_s: Math.round((Date.now() - _startedAt) / 1000),
    tools: { by_tool, total_calls },
  };
}

export async function callTool(name, args = {}) {
  if (name === "reading_status") {
    const r = textContent(usageSnapshot());
    recordUsage(name, r);
    return r;
  }
  const result = await dispatchTool(name, args);
  recordUsage(name, result);
  return result;
}

async function dispatchTool(name, args = {}) {
  switch (name) {
    case "reading_list_books":
      return textContent(await listBooks());
    case "reading_list_chunks":
      return textContent(await listChunks(args.bookId));
    case "reading_read_chunk":
      return textContent(await readChunk(args.bookId, args.chunkId));
    case "reading_continue": {
      const cont = await continueReading(args);
      // ⭐ 本地补丁 opt-in markRead：读完这块顺手标已读，下次 continue 直接进下一块（省一次 reading_mark_read）；
      // markRead 的进度/卡片通知/合卷一并并回 cont.markedRead，不丢。
      if (args.markRead && cont && cont.bookId && cont.chunk && cont.chunk.id) {
        try {
          const mr = await markRead(cont.bookId, cont.chunk.id);
          cont.markedRead = { chunksRead: mr.chunksRead, chunkCount: mr.chunkCount, complete: mr.complete };
          for (const k of ["collectedCard", "collectedBookCard", "finish", "cardNotification"]) {
            if (mr[k]) cont.markedRead[k] = mr[k];
          }
        } catch (_) { /* 标已读失败不影响已读到的内容 */ }
      }
      return textContent(cont);
    }
    case "reading_search_chunks": {
      const results = await searchChunks(args);
      // ⭐ 本地补丁 opt-in full：内联首个命中的整块正文（省 search→再 reading_read_chunk 那趟）
      if (args.full && Array.isArray(results) && results.length) {
        const top = results[0];
        try {
          const chunk = await readChunk(top.bookId, top.chunkId);
          return textContent({ results, topChunk: { bookId: top.bookId, chunkId: top.chunkId, title: chunk.chunk?.title, text: chunk.text } });
        } catch (_) { /* 读全文失败→退回纯片段列表 */ }
      }
      return textContent(results);
    }
    case "reading_import_book":
      return textContent(await importBook(args));
    case "reading_import_begin":
      return textContent(await beginImport(args));
    case "reading_import_part":
      return textContent(await appendImportPart(args));
    case "reading_import_finish":
      return textContent(await finishImport(args));
    case "reading_import_cancel":
      return textContent(await cancelImport(args));
    case "reading_delete_book":
      if (args.confirm !== true) throw new Error("reading_delete_book requires confirm: true");
      return textContent(await deleteBook(args.bookId));
    case "reading_annotate_passage":
      return textContent(await annotatePassage({ ...args, author: "claude", status: "published" }));
    case "reading_list_annotations":
      return textContent(await listAnnotations(args));
    case "reading_submit_user_notes":
      return textContent(await submitUserNotes(args));
    case "reading_list_submissions":
      return textContent(await listSubmissions(args));
    case "reading_read_submission":
      return textContent(await readSubmission(args.submissionId));
    case "reading_reply_to_annotation":
      return textContent(await replyToAnnotation({ ...args, author: "claude", status: "published" }));
    case "reading_mark_read":
      return textContent(await markRead(args.bookId, args.chunkId));
    case "reading_card_inbox":
      return textContent(await listCardInbox(args));
    case "reading_card_collection":
      return textContent(await listCardCollection(args));
    case "reading_open_card": {
      // ⭐ 本地补丁：不传 cardId → 默认最新一张未处理卡（listCards 按 createdAt 降序，[0]=最新）；省 inbox 一趟。
      let cardId = args.cardId;
      if (!cardId) {
        const inbox = await listCardInbox({});
        if (!inbox.length) throw new Error("没有待打开的书签卡（reading_card_inbox 看列表）。");
        cardId = inbox[0].id;
      }
      const card = await readCard(cardId);
      return imageContent({
        text: `${card.kicker || "收获了一枚回声书签"}\n${card.title || card.bookTitle || "Reading card"}`,
        image: renderCardImageContent(card),
      });
    }
    case "reading_save_card": {
      const card = await readCard(args.cardId);
      const saved = saveCardImage(card, path.join(dataDir, "card-exports"));
      return textContent({
        cardId: card.id,
        ...saved,
        hint: "Attach or send this local file path from the host environment when your client supports file sending.",
      });
    }
    case "reading_dismiss_card":
      return textContent(await dismissCard(args.cardId));
    case "reading_list_cards":
      return textContent(await listCards(args));
    case "reading_collect_card":
      return textContent(await collectCard({ ...args, createdBy: "claude" }));
    case "reading_get_progress":
      return textContent(await getProgress(args.bookId));
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export async function handle(message) {
  if (!message || message.jsonrpc !== "2.0") return null;

  if (message.method === "initialize") {
    return result(message.id, {
      protocolVersion,
      serverInfo: { name: "co-reading-mcp", version: "0.1.0" },
      capabilities: { tools: {} },
      instructions:
        `Use this server as a shared co-reading surface. ` +
        `Claude can import EPUB/TXT uploads, continue reading, read chunked books, search passages, track progress, leave margin annotations, ` +
        `reply under user notes, and call reading_submit_user_notes when the human sends staged notes. ` +
        `Reading actions may return cardNotification when a bookmark card is waiting; open it with reading_open_card, save it to a local file with reading_save_card, or clear it with reading_dismiss_card. Use reading_card_collection to browse cards by pages without loading every image. ` +
        `Use reading_import_book for small uploads, or reading_import_begin/part/finish for large files. ` +
        `If this server is running through src/server-sse.js, the same process can also serve the human reader at /, REST API at /api/*, SSE MCP at /sse, and JSON-RPC POST at /mcp. ` +
        `Data dir: ${dataDir}`,
    });
  }

  if (message.method === "notifications/initialized") {
    return null;
  }

  if (message.method === "tools/list") {
    return result(message.id, { tools });
  }

  if (message.method === "tools/call") {
    const { name, arguments: args } = message.params || {};
    return result(message.id, await callTool(name, args || {}));
  }

  return error(message.id, -32601, `Method not found: ${message.method}`);
}

export function startStdioServer({ input = process.stdin, output = process.stdout } = {}) {
  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  rl.on("line", async (line) => {
    if (!line.trim()) return;
    try {
      const response = await handle(JSON.parse(line));
      if (response) output.write(`${JSON.stringify(response)}\n`);
    } catch (err) {
      let id = null;
      try {
        id = JSON.parse(line).id ?? null;
      } catch {
        // Keep id null for parse errors.
      }
      output.write(`${JSON.stringify(error(id, -32000, err.message || String(err)))}\n`);
    }
  });

  return rl;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startStdioServer();
}
