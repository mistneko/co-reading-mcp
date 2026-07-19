# 补丁 · colors.css 纸/主题分家(施工反馈 §二-1 裁决)

> 设计侧回 `docs/DESIGN-FEEDBACK-2026-07.md` §二-1 与 §三-附带。
> 裁决:**改 `colors.css`,`readme.md` 第 4 公理不动。** 纸是物件、不随主题反色;
> 「换纸」与「暗色」是正交的两件事,在 token 层彻底分开。

## 落到哪个文件
`design/tokens/colors.css`(以及部署侧 `_ds/.../tokens/colors.css` 绑定副本)。
本目录 `colors.css` 即改好的**整份文件**,可直接覆盖替换。

## 改了什么(三处,纯 token,无组件改动)
1. **`:root` 保持 = 默认纸(warm)。** 值一字未改,只在注释里写明「默认纸 = warm,
   经 `[data-paper]` 换纸;绝不经 `[data-theme]`」。无 `[data-paper]` 的旧消费者仍得暖纸,
   **向后兼容**。
2. **新增 `[data-paper="warm|snow|night"]` 三块。** 各自覆盖整套纸族
   `--vk-paper / --vk-paper2 / --vk-ink / --vk-ink-dim / --vk-rule`。
   值取自手机 kit 现成的 `PAPER` 映射(`ui_kits/mitlesen-mobile/mobile-app.jsx`)——
   即线上已在用的三张纸,非新造色。
3. **`[data-theme="dark"]` 删掉全部纸族覆盖。** 原先暗色段把
   `--vk-paper:#2C2E40; --vk-paper2:#262838; --vk-ink:#D8D5E4; --vk-ink-dim:#8E92AC; --vk-rule:#3A3D52;`
   以及 `--vk-ice/--vk-ice-soft/--vk-env/--vk-env2/--snow/--snow-ink/--snow-edge` 一并翻掉;
   现全部移除,暗色只翻 chrome(bg/surface/border/text/accent/lavender/rose)。

## 接线(前端,不在本补丁内、需各面各自接)
- 阅读面把用户选纸写成 `[data-paper]`(桌面 `reader.html` 现无选纸器 → 加一个,或先固定 warm;
  手机 kit 已有 `localStorage("mitlesen-paper")`,把它落成 `[data-paper]` 即可)。
- 暗色 chrome 下想要「暗的纸」→ 让选纸器**默认落到 `night`**,而不是靠 `[data-theme]` 反 `--vk-paper`。

## 为什么(一句)
补上 readme 与 token 的自相矛盾:纸族不再出现在 `[data-theme]` 里,
第 4 公理「冰的留白 / 纸 never fully inverts」与 `colors.css` 从此一致。

## re-clone 后重放
用本目录 `colors.css` 覆盖 `design/tokens/colors.css`,并把部署侧
`_ds/.../tokens/colors.css` 同步为同一份。
