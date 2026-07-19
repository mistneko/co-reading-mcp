/* Mitlesen reader — an interactive recreation composing the design-system
   components (window.MitlesenDesignSystem_737635) with sample content
   (window.MitlesenData). Mounts itself into #root. */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MitlesenDesignSystem_737635;
  const {
    Button, IconButton, Eyebrow, BookCard, ChapterRow, ProgressRail,
    Sheet, Highlight, MarginNote, Toast, EmptyState, RitualCard,
  } = DS;
  const DATA = window.MitlesenData;

  const HUMAN = new Set(["user", "human", "koshi", "you", "小烟", "祁烟"]);
  const isHuman = (a) => HUMAN.has(String(a || "").toLowerCase()) || HUMAN.has(a);

  /* Split chunk text, wrapping each annotated quote in a <Highlight>. */
  function renderSheet(text, anns, activeId, onMark) {
    const hls = [];
    const occ = [];
    anns.forEach((a) => {
      if (!a.quote) return;
      const off = text.indexOf(a.quote);
      if (off < 0) return;
      const end = off + a.quote.length;
      if (occ.some(([s, e]) => off < e && end > s)) return;
      occ.push([off, end]);
      hls.push({ start: off, end, a });
    });
    hls.sort((x, y) => x.start - y.start);
    const out = [];
    let cur = 0;
    hls.forEach((h) => {
      if (h.start > cur) out.push(text.slice(cur, h.start));
      out.push(
        <Highlight
          key={h.a.id}
          by={isHuman(h.a.author) ? "human" : "ai"}
          active={activeId === h.a.id}
          onClick={() => onMark(h.a.id)}
        >
          {text.slice(h.start, h.end)}
        </Highlight>
      );
      cur = h.end;
    });
    if (cur < text.length) out.push(text.slice(cur));
    return out;
  }

  function App() {
    const [theme, setTheme] = useState("light");
    const [bookId, setBookId] = useState("anthropic-guidelines");
    const [chunkId, setChunkId] = useState("ch01");
    const [anns, setAnns] = useState(DATA.annotations);
    const [read, setRead] = useState(() => {
      const s = new Set();
      DATA.books.forEach((b) => b.chunks.forEach((c) => c.read && s.add(b.bookId + "/" + c.id)));
      return s;
    });
    const [activeId, setActiveId] = useState(null);
    const [sel, setSel] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [toast, setToast] = useState(null);
    const [card, setCard] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const sheetRef = useRef(null);
    const toastT = useRef(null);

    useEffect(() => {
      document.documentElement.dataset.theme = theme;
    }, [theme]);

    function showToast(msg) {
      setToast(msg);
      clearTimeout(toastT.current);
      toastT.current = setTimeout(() => setToast(null), 2800);
    }

    const book = DATA.books.find((b) => b.bookId === bookId);
    const chunk = book.chunks.find((c) => c.id === chunkId) || book.chunks[0];
    const isRead = (bid, cid) => read.has(bid + "/" + cid);
    const chunkAnns = anns.filter((a) => a.bookId === bookId && a.chunkId === chunk.id && !a.parentId && a.quote);
    const idx = book.chunks.findIndex((c) => c.id === chunk.id);
    const openHuman = chunkAnns.filter((a) => isHuman(a.author) && a.status === "open");

    useEffect(() => {
      function onUp() {
        const s = window.getSelection();
        if (!s || s.isCollapsed || !s.rangeCount) return;
        const r = s.getRangeAt(0);
        if (!sheetRef.current || !sheetRef.current.contains(r.commonAncestorContainer)) return;
        const q = s.toString().trim();
        if (q && q.length <= 200) setSel({ quote: q });
      }
      document.addEventListener("mouseup", onUp);
      return () => document.removeEventListener("mouseup", onUp);
    }, [chunkId, bookId]);

    function openBook(id) {
      setBookId(id);
      const b = DATA.books.find((x) => x.bookId === id);
      const first = b.chunks.find((c) => !isRead(id, c.id)) || b.chunks[0];
      setChunkId(first.id);
      setActiveId(null);
      setDrawer(false);
    }
    function openChunk(id) {
      setChunkId(id);
      setActiveId(null);
      setSel(null);
    }
    function saveNote() {
      const t = noteText.trim();
      if (!t || !sel) return;
      setAnns((x) => [
        ...x,
        { id: "ann_" + Date.now(), bookId, chunkId: chunk.id, author: "user", quote: sel.quote, note: t, kind: "annotation", status: "open" },
      ]);
      setFormOpen(false);
      setSel(null);
      setNoteText("");
      const s = window.getSelection();
      if (s) s.removeAllRanges();
      showToast("批注留下了 ✎");
    }
    function markRead() {
      setRead((s) => new Set(s).add(bookId + "/" + chunk.id));
      if (chunkAnns.length) {
        const src = chunkAnns.find((a) => !isHuman(a.author)) || chunkAnns[0];
        const shared = chunkAnns.length > 1;
        setCard({
          art: shared ? "fold" : "stardust",
          title: book.title,
          subtitle: book.author + " · " + chunk.title,
          quote: src.quote,
          note: src.note,
          footer: shared ? "这里有两个人的折痕。" : "A note worth keeping.",
        });
      }
      showToast("这章读完了 ✓" + (book.chunks[idx + 1] ? "，去下一章 →" : ""));
    }
    function submitNotes() {
      const n = openHuman.length;
      setAnns((x) => x.map((a) => (a.bookId === bookId && isHuman(a.author) && a.status === "open" ? { ...a, status: "submitted" } : a)));
      showToast(n ? `交给小奏了 · ${n} 条批注` : "没有待交的批注");
    }

    const readCount = book.chunks.filter((c) => isRead(bookId, c.id)).length;

    return (
      <div className="kit">
        <header className="topbar">
          <IconButton label="书架" className="menu-btn" onClick={() => setDrawer((d) => !d)}>☰</IconButton>
          <div className="brand">共读<small>Mitlesen</small></div>
          <div className="top-book">{book.title}</div>
          <IconButton label="明暗" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>◐</IconButton>
        </header>

        <div className="app">
          {drawer ? <div className="scrim" onClick={() => setDrawer(false)} /> : null}
          <aside className={"rail" + (drawer ? " open" : "")}>
            <div className="rail-head">
              <div><Eyebrow>书架</Eyebrow><h2>Bibliothek</h2></div>
              <div className="rail-actions">
                <IconButton label="导入 EPUB / TXT" onClick={() => showToast("演示：导入已停用")}>＋</IconButton>
                <IconButton label="刷新" onClick={() => showToast("已刷新")}>↻</IconButton>
              </div>
            </div>
            <div className="shelf">
              {DATA.books.map((b) => {
                const rc = b.chunks.filter((c) => isRead(b.bookId, c.id)).length;
                const ac = anns.filter((a) => a.bookId === b.bookId && a.quote).length;
                const active = b.bookId === bookId;
                return (
                  <div key={b.bookId}>
                    <BookCard
                      title={b.title}
                      author={b.author}
                      read={rc}
                      total={b.chunks.length}
                      annotationCount={ac}
                      active={active}
                      onClick={() => openBook(b.bookId)}
                    />
                    {active ? (
                      <div className="chapters">
                        {b.chunks.map((c) => (
                          <ChapterRow
                            key={c.id}
                            title={c.title}
                            read={isRead(b.bookId, c.id)}
                            current={c.id === chunk.id}
                            annotationCount={anns.filter((a) => a.chunkId === c.id && a.bookId === b.bookId && a.quote).length}
                            onClick={() => openChunk(c.id)}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </aside>

          <main className="reader">
            <div className="reader-head">
              <div style={{ flex: 1, minWidth: 0 }}>
                <Eyebrow>{book.title}</Eyebrow>
                <h2 className="chunk-title">{chunk.title}</h2>
              </div>
              <div className="r-actions">
                <Button onClick={() => { const u = book.chunks.find((c) => !isRead(bookId, c.id)); if (u) openChunk(u.id); else showToast("整本都读完啦 🎉"); }}>续读</Button>
                {isRead(bookId, chunk.id)
                  ? <Button variant="done" icon="✓">已读</Button>
                  : <Button variant="primary" onClick={markRead}>读完这章</Button>}
              </div>
            </div>

            <div ref={sheetRef} className="sheet-wrap">
              <Sheet>{renderSheet(chunk.text, chunkAnns, activeId, (id) => setActiveId((v) => (v === id ? null : id)))}</Sheet>
            </div>

            <div className="sheet-foot">
              <button className="navbtn" disabled={idx <= 0} onClick={() => openChunk(book.chunks[idx - 1].id)}>‹ 上一章</button>
              <span>{idx >= 0 ? `第 ${idx + 1} / ${book.chunks.length} 节` : ""}</span>
              <button className="navbtn" disabled={idx >= book.chunks.length - 1} onClick={() => openChunk(book.chunks[idx + 1].id)}>下一章 ›</button>
            </div>

            {chunkAnns.length ? (
              <div className="margins">
                <div className="margins-head">页边批注 · {chunkAnns.length}</div>
                {chunkAnns.map((a) => (
                  <MarginNote
                    key={a.id}
                    persona={isHuman(a.author) ? "human" : "ai"}
                    quote={a.quote}
                    open={a.status === "open"}
                    active={activeId === a.id}
                    onReply={() => setActiveId((v) => (v === a.id ? null : a.id))}
                  >
                    {a.note}
                  </MarginNote>
                ))}
                {openHuman.length ? <Button onClick={submitNotes} icon="→">把我的批注交给小奏</Button> : null}
              </div>
            ) : (
              <div className="margins">
                <EmptyState seal="✎">在正文里划一句话，<br />留下第一条批注。</EmptyState>
              </div>
            )}
          </main>
        </div>

        {/* Selection bar */}
        <div className={"selbar" + (sel && !formOpen ? " show" : "")}>
          <span className="sel-q">「{sel ? sel.quote.slice(0, 42) : ""}」</span>
          <Button variant="primary" size="sm" icon="✍" onClick={() => setFormOpen(true)}>批注</Button>
          <IconButton label="清除" size="sm" onClick={() => { setSel(null); const s = window.getSelection(); if (s) s.removeAllRanges(); }}>✕</IconButton>
        </div>

        {/* Note composer */}
        <div className={"noteform" + (formOpen ? " show" : "")}>
          <div className="nf-q">「{sel ? sel.quote : ""}」</div>
          <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="写下你的批注…（也可以是一个问题，交给小奏）" />
          <div className="nf-row">
            <span className="nf-hint">锚在这句旁边</span>
            <Button onClick={() => { setFormOpen(false); }}>取消</Button>
            <Button variant="primary" onClick={saveNote}>留下批注</Button>
          </div>
        </div>

        {/* Ritual card overlay */}
        {card ? (
          <div className="card-panel">
            <div className="card-panel-head">
              <div><Eyebrow>收到一枚书签</Eyebrow><h2>Ritual card</h2></div>
              <IconButton label="收起" onClick={() => setCard(null)}>✕</IconButton>
            </div>
            <div className="card-preview">
              <RitualCard art={card.art} size="compact" title={card.title} subtitle={card.subtitle} quote={card.quote} note={card.note} footer={card.footer} />
            </div>
            <div className="card-actions">
              <Button variant="primary" onClick={() => { setCard(null); showToast("收下了 ✎"); }}>收下</Button>
            </div>
          </div>
        ) : null}

        {toast ? <div className="toast-wrap"><Toast>{toast}</Toast></div> : null}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
