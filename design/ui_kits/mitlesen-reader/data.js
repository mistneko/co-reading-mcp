/* Sample co-reading content for the Mitlesen reader UI kit.
   Text is original/neutral to avoid any copyright entanglement; it mirrors the
   shape of the real data (books → chunks → annotations) from docs/data-format.md.
   Exposed on window.MitlesenData. */
(function () {
  const books = [
    {
      bookId: "anthropic-guidelines",
      title: "The Anthropic Guidelines",
      author: "Anthropic",
      chunks: [
        {
          id: "ch00",
          title: "Claude and the mission",
          read: true,
          text:
            "读一本书，不必一次读完。One chunk at a time, a passage held, a page turned. " +
            "共读的意思是：两个人在同一句话前停下来，各自留下一点什么，然后接着往下走。",
        },
        {
          id: "ch01",
          title: "On honesty",
          read: false,
          text:
            "诚实不是一次性的声明，而是 a standing posture —— 说出所是，标记所疑。 " +
            "当一句话既是你的，也是小奏的，它就落在页边，成为回声。 " +
            "The margin is where two readers meet without speaking over each other.",
        },
        {
          id: "ch02",
          title: "The finish ritual",
          read: false,
          text:
            "书合上了，但页边还醒着。A book is closed, yet the margins stay awake. " +
            "挑一句带走，做成一枚书签 —— 折痕、回声，或一点星尘。",
        },
      ],
    },
    {
      bookId: "night-passage",
      title: "夜航手记",
      author: "佚名",
      chunks: [
        { id: "n0", title: "起航", read: false, text: "灯塔在雾里眨眼，我们把书翻到有折角的一页。" },
        { id: "n1", title: "中夜", read: false, text: "海面很静，静得能听见上一章留下的批注。" },
      ],
    },
  ];

  // Seeded margin notes on the "On honesty" chunk.
  const annotations = [
    {
      id: "ann_ai_1",
      bookId: "anthropic-guidelines",
      chunkId: "ch01",
      author: "claude",
      quote: "a standing posture",
      note: "This is not a summary. It is a resonance marker — the sentence I would underline for both of us.",
      kind: "resonance",
      status: "published",
    },
    {
      id: "ann_human_1",
      bookId: "anthropic-guidelines",
      chunkId: "ch01",
      author: "user",
      quote: "成为回声",
      note: "我也在这句停住了。留给小奏。",
      kind: "feeling",
      status: "open",
    },
  ];

  window.MitlesenData = { books, annotations };
})();
