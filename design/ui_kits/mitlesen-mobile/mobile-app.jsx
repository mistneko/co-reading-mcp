/* 共读 · Mitlesen — mobile PWA redesign. Immersive, bottom-tab, composes the
   design-system components (window.MitlesenDesignSystem_737635). */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MitlesenDesignSystem_737635;
  const { Button, ChapterRow, Highlight, MarginNote, WaxDot, VoiceStaff, RitualCard, EmptyState } = DS;
  const DATA = window.MitlesenData;

  const HUMAN = new Set(["user", "human", "koshi", "you", "小烟", "祁烟"]);
  const isHuman = (a) => HUMAN.has(String(a || "").toLowerCase()) || HUMAN.has(a);
  const COVER = { "anthropic-guidelines": "linear-gradient(150deg,#7B8EC6,#5E6FA8)", "night-passage": "linear-gradient(150deg,#8A8270,#4A4438)" };
  const PAPER = {
    warm: { background: "linear-gradient(180deg,#FBF8F1,#F3EEE2)", "--vk-paper": "#FBF8F1", "--vk-paper2": "#F3EEE2", "--vk-ink": "#4A4438", "--vk-ink-dim": "#8A8270", "--vk-rule": "#E7DFC9" },
    snow: { background: "linear-gradient(180deg,#F7F9FC,#EEF2F8)", "--vk-paper": "#F7F9FC", "--vk-paper2": "#EEF2F8", "--vk-ink": "#3A4453", "--vk-ink-dim": "#6B7889", "--vk-rule": "#DBE4EE" },
    night: { background: "linear-gradient(180deg,#23212C,#1D1B25)", "--vk-paper": "#23212C", "--vk-paper2": "#1D1B25", "--vk-ink": "#E6E1D6", "--vk-ink-dim": "#9A9384", "--vk-rule": "#37333F" },
  };

  function Ring({ pct, size = 30 }) {
    const r = (size - 4) / 2, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flex: "none" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent-soft)" strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
    );
  }

  /* 阅读山脉 — a reading-activity mountain range (echoes the ritual card's density wave). */
  function Mountains({ data }) {
    const w = 300, h = 92, max = Math.max(...data, 1), step = w / (data.length - 1);
    const pts = data.map((v, i) => [i * step, h - 10 - (v / max) * (h - 28)]);
    const line = "M " + pts.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ");
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="92" preserveAspectRatio="none" style={{ display: "block" }}>
        <defs><linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity="0.34" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0.03" /></linearGradient></defs>
        <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill="url(#mtn)" />
        <path d={line} fill="none" stroke="var(--accent-deep)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (data[i] ? <circle key={i} cx={p[0]} cy={p[1]} r="2.1" fill="var(--accent-deep)" /> : null))}
      </svg>
    );
  }

  function renderSheet(text, anns, activeId, onMark) {
    const hls = [], occ = [];
    anns.forEach((a) => {
      if (!a.quote) return;
      const off = text.indexOf(a.quote);
      if (off < 0) return;
      const end = off + a.quote.length;
      if (occ.some(([s, e]) => off < e && end > s)) return;
      occ.push([off, end]); hls.push({ start: off, end, a });
    });
    hls.sort((x, y) => x.start - y.start);
    const out = []; let cur = 0;
    hls.forEach((h) => {
      if (h.start > cur) out.push(text.slice(cur, h.start));
      out.push(<Highlight key={h.a.id} by={isHuman(h.a.author) ? "human" : "ai"} active={activeId === h.a.id} onClick={() => onMark(h.a.id)}>{text.slice(h.start, h.end)}</Highlight>);
      cur = h.end;
    });
    if (cur < text.length) out.push(text.slice(cur));
    return out;
  }

  function StatusBar() {
    return (
      <div className="status">
        <span>9:41</span>
        <span className="r"><span>5G</span><span className="bat"></span></span>
      </div>
    );
  }

  function App() {
    const [tab, setTab] = useState("shelf");
    const [view, setView] = useState("tabs");
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
    const [tocOpen, setTocOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [fs, setFs] = useState(() => { const v = parseInt(localStorage.getItem("mitlesen-fs"), 10); return v >= 16 && v <= 26 ? v : 19; });
    const [chromeHidden, setChromeHidden] = useState(false);
    const [scrollPct, setScrollPct] = useState(0);
    const [paper, setPaper] = useState(() => localStorage.getItem("mitlesen-paper") || "warm");
    const [card, setCard] = useState(null);
    const [toast, setToast] = useState(null);
    const rbodyRef = useRef(null);
    const swipe = useRef(null);
    const lastY = useRef(0);
    const toastT = useRef(null);

    const book = DATA.books.find((b) => b.bookId === bookId);
    const chunk = book.chunks.find((c) => c.id === chunkId) || book.chunks[0];
    const isRead = (bid, cid) => read.has(bid + "/" + cid);
    const idx = book.chunks.findIndex((c) => c.id === chunk.id);
    const chunkAnns = anns.filter((a) => a.bookId === bookId && a.chunkId === chunk.id && !a.parentId && a.quote);
    const lh = Math.round(fs * 1.85);

    function showToast(m) { setToast(m); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(null), 2600); }

    useEffect(() => {
      function onUp() {
        if (view !== "reading") return;
        const s = window.getSelection();
        if (!s || s.isCollapsed || !s.rangeCount) return;
        const r = s.getRangeAt(0);
        if (!rbodyRef.current || !rbodyRef.current.contains(r.commonAncestorContainer)) return;
        const q = s.toString().trim();
        if (q && q.length <= 160) setSel({ quote: q });
      }
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchend", onUp);
      return () => { document.removeEventListener("mouseup", onUp); document.removeEventListener("touchend", onUp); };
    }, [view, chunkId]);

    useEffect(() => { localStorage.setItem("mitlesen-fs", String(fs)); }, [fs]);
    useEffect(() => { localStorage.setItem("mitlesen-paper", paper); }, [paper]);

    function openBook(id) {
      setBookId(id);
      const b = DATA.books.find((x) => x.bookId === id);
      const first = b.chunks.find((c) => !isRead(id, c.id)) || b.chunks[0];
      setChunkId(first.id); setActiveId(null); setView("reading");
    }
    function openChunk(id) { setChunkId(id); setActiveId(null); setSel(null); setTocOpen(false); setChromeHidden(false); setScrollPct(0); lastY.current = 0; if (rbodyRef.current) rbodyRef.current.scrollTop = 0; }
    function saveNote() {
      const t = noteText.trim(); if (!t || !sel) return;
      setAnns((x) => [...x, { id: "ann_" + Date.now(), bookId, chunkId: chunk.id, author: "user", quote: sel.quote, note: t, status: "open" }]);
      setFormOpen(false); setSel(null); setNoteText("");
      const s = window.getSelection(); if (s) s.removeAllRanges();
      showToast("批注留下了 ✎");
    }
    function markRead() {
      setRead((s) => new Set(s).add(bookId + "/" + chunk.id));
      if (chunkAnns.length) {
        const src = chunkAnns.find((a) => !isHuman(a.author)) || chunkAnns[0];
        setCard({ art: chunkAnns.length > 1 ? "fold" : "stardust", title: book.title, subtitle: book.author + " · " + chunk.title, quote: src.quote, note: src.note, footer: chunkAnns.length > 1 ? "这里有两个人的折痕。" : "A note worth keeping." });
      } else showToast("这章读完了 ✓");
    }
    function onSwipeEnd(e) {
      const s = swipe.current; if (!s) return; swipe.current = null;
      const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y, dt = Date.now() - s.t;
      if (String(window.getSelection() || "").trim()) return;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.6 && dt < 600) {
        if (dx < 0 && idx < book.chunks.length - 1) openChunk(book.chunks[idx + 1].id);
        else if (dx > 0 && idx > 0) openChunk(book.chunks[idx - 1].id);
      }
    }
    function onReadScroll(e) {
      const el = e.currentTarget;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
      const y = el.scrollTop, dy = y - lastY.current; lastY.current = y;
      if (y > 56 && dy > 5) setChromeHidden(true);
      else if (dy < -5 || y < 36) setChromeHidden(false);
    }
    function onBodyTap(e) {
      if (e.target.closest("mark, button, a, .mds-note, .rmargins, svg")) return;
      if (String(window.getSelection() || "").trim()) return;
      setChromeHidden((v) => !v);
    }

    const readCount = book.chunks.filter((c) => isRead(bookId, c.id)).length;
    const totalNotes = anns.filter((a) => a.quote).length;
    const totalRead = DATA.books.reduce((n, b) => n + b.chunks.filter((c) => isRead(b.bookId, c.id)).length, 0);
    const mountains = [0, 1, 0, 2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 4];
    const calendar = [1, 0, 2, 1, 3, 0, 1, 2, 1, 0, 1, 3, 2, 0, 1, 1, 2, 0, 3, 1, 0, 2, 1, 1, 0, 2, 3, 1];
    const calTone = (v) => (v >= 3 ? "gold" : v === 2 ? "accent" : v === 1 ? "mint" : null);

    return (
      <div className="phone">
        <StatusBar />

        {/* ===== TAB SCREENS ===== */}
        {view === "tabs" && (
          <div className="screen">
            <div className="body">
              {tab === "shelf" && (
                <>
                  <div className="apphead">
                    <div className="brand">共读<small>Mitlesen · 书架</small></div>
                  </div>
                  <div className="shelf">
                    <div className="searchbar"><span style={{ fontSize: 16 }}>⌕</span><span>找一本书，或一句话…</span></div>
                    {DATA.books.map((b) => {
                      const rc = b.chunks.filter((c) => isRead(b.bookId, c.id)).length;
                      const pct = Math.round((rc / b.chunks.length) * 100);
                      const ac = anns.filter((a) => a.bookId === b.bookId && a.quote).length;
                      return (
                        <div className="bookrow" key={b.bookId} onClick={() => openBook(b.bookId)}>
                          <div className="cover" style={{ background: COVER[b.bookId] || "var(--accent)" }}><div className="ti">{b.title}</div></div>
                          <div className="bi">
                            <div className="bt">{b.title}</div>
                            <div className="ba">{b.author}</div>
                            <div className="bm"><span>{rc}/{b.chunks.length} 节</span>{ac ? <span style={{ color: "var(--accent-deep)" }}>✎{ac}</span> : null}</div>
                          </div>
                          <Ring pct={pct} />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {tab === "stats" && (
                <div className="me">
                  <div className="apphead" style={{ padding: "10px 0 4px" }}><div className="brand">统计<small>Klang · 记得的</small></div></div>
                  <div className="panel" style={{ background: "var(--grad-paper)", color: "var(--vk-ink)", display: "flex", justifyContent: "space-around", textAlign: "center", padding: "16px 10px" }}>
                    {[[totalRead, "读过·章"], [totalNotes, "批注"], [7, "书签"], [DATA.books.length, "在读"]].map(([n, l], i) => (
                      <div key={i}><div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 10.5, color: "var(--vk-ink-dim)", marginTop: 2 }}>{l}</div></div>
                    ))}
                  </div>
                  <div className="panel">
                    <div className="pt">阅读山脉 · 近两周</div>
                    <Mountains data={mountains} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-faint)", marginTop: 6 }}><span>两周前</span><span>今天</span></div>
                  </div>
                  <div className="panel">
                    <div className="pt">共读日历</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: 6, justifyItems: "center" }}>
                      {calendar.map((v, i) => <WaxDot key={i} tone={calTone(v) || "accent"} hollow={!calTone(v)} size={13} />)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end", marginTop: 12, fontSize: 10.5, color: "var(--text-dim)" }}>
                      少<WaxDot hollow size={11} /><WaxDot tone="mint" size={11} /><WaxDot tone="accent" size={11} /><WaxDot tone="gold" size={11} />多
                    </div>
                  </div>
                </div>
              )}

              {tab === "me" && (
                <div className="me">
                  <div className="me-hero">
                    <img className="me-av" src="../../assets/mascot-192.png" alt="" />
                    <div><div className="me-name">小烟</div><div className="me-sub">和小奏一起读书的第 128 天</div></div>
                  </div>
                  <div className="stats">
                    <div className="stat"><div className="n">{DATA.books.length}</div><div className="l">在读</div></div>
                    <div className="stat"><div className="n">{totalNotes}</div><div className="l">批注</div></div>
                    <div className="stat"><div className="n">7</div><div className="l">书签</div></div>
                  </div>
                  <div className="panel">
                    <div className="pt">这一周的心情</div>
                    <div className="streak">
                      {["rose", "accent", "mint", "gold", "lavender", "ice", "mint"].map((t, i) => <WaxDot key={i} tone={t} size={18} />)}
                    </div>
                  </div>
                  <div className="panel">
                    <div className="pt">你与小奏的合奏</div>
                    <VoiceStaff voice="first" />
                    <div style={{ textAlign: "center", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text-dim)", fontSize: 12, padding: "8px 0" }}>渐弱处即余韵</div>
                    <VoiceStaff voice="second" />
                  </div>
                </div>
              )}
            </div>

            <nav className="tabbar">
              {[["shelf", "❏", "书架"], ["stats", "◭", "统计"], ["me", "✦", "我"]].map(([k, g, t]) => (
                <button key={k} className={"tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>
                  <span className="g">{g}</span><span className="t">{t}</span>
                  <span className="dot">{tab === k ? <WaxDot tone="accent" size={5} /> : null}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* ===== IMMERSIVE READING (redesigned) ===== */}
        {view === "reading" && (
          <div className={"reading" + (chromeHidden ? " chrome-hidden" : "")} style={PAPER[paper]}>
            <div className="rspine"><i style={{ height: scrollPct + "%" }} /></div>
            <div className="rtop2">
              <button className="rcircle" onClick={() => { setView("tabs"); setTab("shelf"); setSel(null); }}>‹</button>
              <div className="rtop2-title" onClick={() => setTocOpen(true)}>{book.title}</div>
              <button className="rcircle" style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 15 }} onClick={() => setTypeOpen(true)} aria-label="字号">A<span style={{ fontSize: 10 }}>a</span></button>
            </div>
            <div className="rbody" ref={rbodyRef} onScroll={onReadScroll} onClick={onBodyTap}
              onTouchStart={(e) => { swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() }; }}
              onTouchEnd={onSwipeEnd}>
              <div className="rmast">
                <div className="rmast-k">{book.title} · 第 {idx + 1} / {book.chunks.length} 节</div>
                <h1 className="rmast-t">{chunk.title}</h1>
                <div className="rmast-by">{book.author}</div>
                <div className="rmast-voice"><VoiceStaff voice="first" /></div>
              </div>
              <div className="rtext" style={{ fontSize: fs, lineHeight: lh + "px", background: `repeating-linear-gradient(to bottom, transparent 0, transparent ${lh - 1}px, var(--vk-rule) ${lh - 1}px, var(--vk-rule) ${lh}px)`, backgroundPosition: `0 ${Math.round(fs * 0.42)}px` }}>
                {renderSheet(chunk.text, chunkAnns, activeId, (id) => setActiveId((v) => (v === id ? null : id)))}
              </div>
              {chunkAnns.length ? (
                <div className="rmargins">
                  <div className="mh">页边批注 · {chunkAnns.length}</div>
                  {chunkAnns.map((a) => (
                    <MarginNote key={a.id} persona={isHuman(a.author) ? "human" : "ai"} quote={a.quote} open={a.status === "open"} active={activeId === a.id} onReply={() => setActiveId((v) => (v === a.id ? null : a.id))}>{a.note}</MarginNote>
                  ))}
                </div>
              ) : (
                <div className="rmargins"><EmptyState seal="✎">长按一句话，留下第一条批注。</EmptyState></div>
              )}
              <div className="rend">· 本节完 ·</div>
            </div>
            <div className="rdock">
              <button className="dbtn" onClick={() => setTocOpen(true)}>☰<span>目录</span></button>
              <button className="dbtn" disabled={idx <= 0} onClick={() => openChunk(book.chunks[idx - 1].id)}>‹<span>上一章</span></button>
              {isRead(bookId, chunk.id)
                ? <div className="ddone">✓ 已读</div>
                : <button className="dread" onClick={markRead}>读完这章</button>}
              <button className="dbtn" disabled={idx >= book.chunks.length - 1} onClick={() => openChunk(book.chunks[idx + 1].id)}>›<span>下一章</span></button>
            </div>
            <div className={"selbar" + (sel && !formOpen ? " show" : "")}>
              <span className="q">「{sel ? sel.quote.slice(0, 30) : ""}」</span>
              <Button variant="primary" size="sm" icon="✍" onClick={() => setFormOpen(true)}>批注</Button>
              <button className="navb" style={{ width: 32, height: 32, fontSize: 13 }} onClick={() => { setSel(null); const s = window.getSelection(); if (s) s.removeAllRanges(); }}>✕</button>
            </div>
          </div>
        )}

        {/* ===== TOC sheet ===== */}
        <div className={"mask" + (tocOpen ? " show" : "")} onClick={() => setTocOpen(false)} />
        <div className={"sheet" + (tocOpen ? " show" : "")}>
          <div className="grab" />
          <h3>目录 · {book.title}</h3>
          <div className="toc">
            {book.chunks.map((c) => (
              <ChapterRow key={c.id} title={c.title} read={isRead(bookId, c.id)} current={c.id === chunk.id}
                annotationCount={anns.filter((a) => a.chunkId === c.id && a.bookId === bookId && a.quote).length} onClick={() => openChunk(c.id)} />
            ))}
          </div>
        </div>

        {/* ===== type-size sheet ===== */}
        <div className={"mask" + (typeOpen ? " show" : "")} onClick={() => setTypeOpen(false)} />
        <div className={"sheet" + (typeOpen ? " show" : "")}>
          <div className="grab" />
          <h3>字号 · 纸</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "4px 0 2px" }}>
            <button className="typebtn" onClick={() => setFs((v) => Math.max(16, v - 1))} aria-label="缩小">A<span style={{ fontSize: 12 }}>−</span></button>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: Math.min(fs, 24), minWidth: 84, textAlign: "center" }}>阅读 · {fs}</div>
            <button className="typebtn" onClick={() => setFs((v) => Math.min(26, v + 1))} style={{ fontSize: 24 }} aria-label="放大">A<span style={{ fontSize: 15 }}>+</span></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 18 }}>
            <span style={{ fontSize: 12, color: "var(--text-dim)", marginRight: 2 }}>底色</span>
            {[["warm", "暖", "#FBF8F1", "#4A4438"], ["snow", "雪", "#F7F9FC", "#3A4453"], ["night", "夜", "#23212C", "#E6E1D6"]].map(([k, l, bg, fg]) => (
              <button key={k} className={"paperopt" + (paper === k ? " on" : "")} style={{ background: bg, color: fg }} onClick={() => setPaper(k)}>{l}</button>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-faint)", marginTop: 14 }}>左右滑动翻章 · 点屏幕中央显隐工具</div>
        </div>

        {/* ===== composer sheet ===== */}
        <div className={"mask" + (formOpen ? " show" : "")} onClick={() => setFormOpen(false)} />
        <div className={"sheet" + (formOpen ? " show" : "")}>
          <div className="grab" />
          <h3>留一条批注</h3>
          <div className="nf-q">「{sel ? sel.quote : ""}」</div>
          <textarea className="nf-ta" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="写下你的批注…（也可以是一个问题，交给小奏）" />
          <div className="nf-row">
            <span className="nf-hint">锚在这句旁边</span>
            <Button onClick={() => setFormOpen(false)}>取消</Button>
            <Button variant="primary" onClick={saveNote}>留下批注</Button>
          </div>
        </div>

        {/* ===== ritual card overlay ===== */}
        <div className={"cardmask" + (card ? " show" : "")}>
          {card ? <RitualCard art={card.art} size="compact" title={card.title} subtitle={card.subtitle} quote={card.quote} note={card.note} footer={card.footer} /> : null}
          <div className="cm-cap">这章读完了 · 收到一枚书签</div>
          <Button variant="primary" onClick={() => { setCard(null); showToast("收下了 ✎"); }}>收下</Button>
        </div>

        <div className={"toast" + (toast ? " show" : "")}>{toast}</div>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
