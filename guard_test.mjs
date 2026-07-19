// 审计 0719 🟠2 / 🟡3 的复现与回归
// 用法：node guard_test.mjs <repoDir>
// A: bookId "." + overwrite → 是否清空整个书库（用一次性 data 目录，绝不碰生产）
// B: 畸形 cookie → 是否 500（应为 401 暗号页）
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repo = process.argv[2];
if (!repo) { console.error("usage: node guard_test.mjs <repoDir>"); process.exit(2); }

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let failures = 0;
const check = (name, ok, detail) => {
  console.log(`${ok ? "  ok" : "NOT ok"}  ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) failures++;
};

// ---------- A: bookId "." ----------
const dataA = mkdtempSync(path.join(tmpdir(), "coread-guardA-"));
const booksDir = path.join(dataA, "books");
for (const b of ["book-one", "book-two"]) {
  mkdirSync(path.join(booksDir, b, "chunks"), { recursive: true });
  writeFileSync(path.join(booksDir, b, "manifest.json"),
    JSON.stringify({ id: b, title: b, chunks: [] }));
}
process.env.READING_MCP_DATA_DIR = dataA;
const before = readdirSync(booksDir).sort();

const { importBook } = await import(path.join(repo, "src/importer.js"));
let aErr = null;
try {
  await importBook({ bookId: ".", overwrite: true, filename: "x.txt",
    dataBase64: Buffer.from("hello world").toString("base64") });
} catch (e) { aErr = e.message; }
const after = readdirSync(booksDir).sort();
const survived = before.every(b => after.includes(b));
check("A 书库未被 bookId='.' 清空", survived,
  `before=[${before}] after=[${after}]${aErr ? " thrown=" + aErr.slice(0, 60) : " (未抛异常)"}`);
rmSync(dataA, { recursive: true, force: true });

// ---------- B: 畸形 cookie ----------
const dataB = mkdtempSync(path.join(tmpdir(), "coread-guardB-"));
const PORT = 3197;
const env = { ...process.env, PORT: String(PORT), HOST: "127.0.0.1",
  READING_MCP_DATA_DIR: dataB, MCP_AUTH_TOKEN: "secret-for-test" };
const srv = spawn("node", [path.join(repo, "src/server-sse.js")], { env, stdio: ["ignore", "pipe", "pipe"] });
await sleep(1500);
const res = await fetch(`http://127.0.0.1:${PORT}/api/books`, { headers: { cookie: "co_reading_token=%" } })
  .catch(e => ({ status: 0, err: e.code }));
check("B 畸形 cookie 不再 500", res.status === 401 || res.status === 403,
  `status=${res.status}（期望 401/403，修前是 500）`);
srv.kill("SIGKILL");
rmSync(dataB, { recursive: true, force: true });

console.log(failures === 0 ? "\n全部通过 ✅" : `\n${failures} 项未通过 ❌`);
process.exit(failures === 0 ? 0 : 1);
