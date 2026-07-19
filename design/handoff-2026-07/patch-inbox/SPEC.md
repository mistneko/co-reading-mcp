# 信箱 v1 · 接线 / 时序清单(施工反馈 §二-2 裁决)

> 设计侧回 `docs/DESIGN-FEEDBACK-2026-07.md` §二-2 与 §四。
> 裁决:底部第二 tab = **信箱**;v1 **只接现成的本地卡片信箱**,零后端改动;
> 跨服务 Vorklang 慢递后置为 v2。设计稿见 `长目录退化.dc.html` 的 **2a**。

---

## 0. 一句话
把「读完这章铸的仪式卡」这条**已经存在、前端没人用**的后端链路,接成一个 tab:
未拆的卡 = 一枚**火漆**;破封 → 显服务端直出的卡面;收下 → dismiss。

## 1. 现成端点(全部已存在,v1 不新增后端)
| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/api/card-inbox` | 未收下的卡列表(= 信箱内容) |
| GET | `/api/cards/:id/image.svg` | 服务端渲染好的**卡面 SVG**(唯一真源,勿在前端重画) |
| POST | `/api/cards/:id/dismiss` | 「收下」——把卡移出信箱 |
| GET | `/api/card-collection` | 全部卡(含已收下)——「我」里的收藏格 |

**鉴权**:`/api/*` 已由 `MCP_AUTH_TOKEN` 网关保护;阅读器同源、已带 token/cookie 流
(见 `LOCAL_PATCHES.md` #1/#3/#5),沿用现有 `fetch`(与批注同一套),无需新增鉴权。

## 2. 每张卡的三态(前端状态机)
```
sealed(未拆) ──破封──▶ opened(已破封·显卡面) ──收下──▶ dismissed(离开信箱)
   ▲ 火漆(breathe)        ▲ image.svg 作卡面           ▲ POST dismiss,乐观移除
```
- `sealed` / `opened` 是**前端本地态**(记一个 `openedIds` set 即可,或不持久化);
- `dismissed` 是**服务端真相**(dismiss 成功后从列表移除,失败回滚)。

## 3. 时序
**进入信箱 tab**
1. `GET /api/card-inbox` → 得卡列表。
2. 每张先渲染为**火漆封缄**(`WaxSeal` breathe;标题/副标/kicker 可见,卡面不显)。
3. 空列表 → `EmptyState` seal=`✒`:「还没有信。读到一处停下,小奏会封一枚给你。」

**破封**(点某张的「破封 ✒」)
4. 本地置该卡 `opened`;火漆播一次「破」的微动效(`WaxSeal broken`)。
5. `GET /api/cards/:id/image.svg` → 作为卡面填入 `RitualCard` 位置(`<img>` 或内联 SVG)。
   *卡面一律用服务端 SVG,前端不用 card kind 再画一遍。*
6. 拉取失败 → 退回火漆态 + 轻 toast:「这封没打开,回头再试」。

**收下**(点已破封卡的「收下」)
7. 乐观:先从 inbox 列表移除该卡。
8. `POST /api/cards/:id/dismiss`;失败 → 把卡放回并 toast。
9. toast:「收下了 ✎」。卡进入「我」的收藏(`card-collection`)。

**「我」· 收藏**
10. `GET /api/card-collection` → 只读网格,展示全部卡面(image.svg 缩略)。

## 4. IA 变更(配合裁决)
- 底部 tab:`书架 / 统计 / 我` → **`书架 / 信箱 / 我`**。
- `统计`(阅读山脉 + 共读日历)**移入「我」**——它本来就在「我」里重复了一份(见 `ui_kits/mitlesen-mobile/mobile-app.jsx` 的 `me` tab)。
- 信箱 tab 图标:无彩色 emoji;用字形 `✉`(**substitution**,DS 图标表未列,登记于此),激活态下方缀一枚 `WaxDot`。

## 5. 字段(以后端为准,先按此假设接;跑通后回填真名)
`card-inbox` / `card-collection` 每项预期含:`id`、`art`/`kind`(fold/ripple/stardust/lastfold)、
`title`、`subtitle`、`quote`、`note`、`kicker`、`footer`、`createdAt`、`dismissed`。
> 火漆行只需 `title/subtitle/kicker`;卡面完全交给 `image.svg`,故字段缺失不阻塞破封。

## 6. v1 明确不做(→ v2)
- 不接 Nachklang **Vorklang 慢递**(跨服务)。
- v2:信箱同一壳里加第二段「小奏寄来的信」——破火漆读**双声部**(`VoiceStaff`),
  与 v1 的卡片信箱并列。工作量后置,不阻塞 v1。

## 7. 组件对照(全部现成 DS 组件)
`WaxSeal`(封缄/破封) · `RitualCard`(卡面容器,内嵌 image.svg) · `Button`(破封/收下) ·
`WaxDot`(tab 激活点) · `EmptyState`(空信箱) · `Toast`(收下确认)。
