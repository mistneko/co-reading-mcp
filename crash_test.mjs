// 审计 0719 🔴 复现与回归：GET /api/cards/<id>/image.png 是否打死进程
// 用法：node crash_test.mjs <repoDir>   （repoDir = 要测的代码副本；会起独立端口、用临时 data 目录）
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repo = process.argv[2];
if (!repo) { console.error("usage: node crash_test.mjs <repoDir>"); process.exit(2); }

const PORT = 3199;
const data = mkdtempSync(path.join(tmpdir(), "coread-crashtest-"));
// 卡直接落 dataDir/cards.jsonl（不是 cards/ 子目录）
// 一张最普通的卡
const card = {
  id: "testcard1", kind: "margin", bookId: "b1", chunkId: "c1",
  title: "验证卡", quote: "一句话", note: "测试用", createdAt: new Date(0).toISOString(),
  status: "pending",
};
writeFileSync(path.join(data, "cards.jsonl"), JSON.stringify(card) + "\n");

const env = { ...process.env, PORT: String(PORT), READING_MCP_DATA_DIR: data, MCP_AUTH_TOKEN: "" , HOST: "127.0.0.1" };
const srv = spawn("node", [path.join(repo, "src/server-sse.js")], { env, stdio: ["ignore", "pipe", "pipe"] });
let exited = null;
srv.on("exit", (code, sig) => { exited = { code, sig }; });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (p) => {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}${p}`);
    if (r.status >= 400) return { status: r.status, body: (await r.text()).slice(0,120) };
    return { status: r.status, ct: r.headers.get("content-type"), fallback: r.headers.get("x-card-fallback") };
  } catch (e) { return { error: e.code || e.message }; }
};

const main = async () => {
  await sleep(1500);
  const alive0 = exited === null;
  const svg = await get("/api/cards/testcard1/image.svg");
  await sleep(200);
  const png = await get("/api/cards/testcard1/image.png");
  await sleep(800);                       // 给进程死亡留出时间
  const aliveAfter = exited === null;
  const health = aliveAfter ? await get("/api/cards/testcard1/image.svg") : { error: "process dead" };

  console.log("启动成功:        ", alive0);
  console.log("image.svg:       ", JSON.stringify(svg));
  console.log("image.png:       ", JSON.stringify(png));
  console.log("请求 png 后进程存活:", aliveAfter, exited ? `(exit=${JSON.stringify(exited)})` : "");
  console.log("之后仍能服务:    ", JSON.stringify(health));
  console.log(aliveAfter ? "\n结论: ✅ 进程未被打死" : "\n结论: 🔴 进程已死——一次 GET 打垮服务");

  srv.kill("SIGKILL");
  rmSync(data, { recursive: true, force: true });
  process.exit(aliveAfter ? 0 : 1);
};
main();
