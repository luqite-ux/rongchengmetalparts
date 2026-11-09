# 宁波荣城机电科技客户修改实施计划 · 2026-11-09

## 目标与范围

依据客户提供的《宁波荣城机电-网站更改11.9.xlsx》和 `宁波荣城机电科技 banner改.rar`，仅修改荣城站点的图片、英文文案、能力叙事、产品结构与应用描述；不改共享后台，不虚构产品、设备、型号或应用。

## 需求台账

| 编号 | 客户要求 | 修改对象 | 预期结果 | 双端验收入口 |
| --- | --- | --- | --- | --- |
| REQ-01 | 尽量少用 AI 图，换成公司产品图 | 首页三张 Banner、Applications/Manufacturing 生成式场景图 | 首页使用客户本次提供的三张横幅；内页不再复用旧生成式场景图 | `/`、`/applications`、`/manufacturing` |
| REQ-02 | 标题按英文文书习惯，检查语法、专业性和简洁性 | 全部公开页面标题、CTA、metadata、产品说明 | 标题使用自然 Title Case；无明显语法错误、冗余或不专业措辞 | Sitemap 全部公开 URL |
| REQ-03 | 强调来图定制，优先介绍 CNC、Hot Forging、Stamping、Welding | 首页内容顺序、Manufacturing 页 | 首页 Banner 后先展示四项能力和按图/按样评审流程 | `/`、`/manufacturing` |
| REQ-04 | Capability 后介绍 Air Ball Valve Series，下分 Valve Assemblies、Fittings & Adapters、Others | 首页产品导航、产品页筛选、导航 | 展示客户指定层级；Others 明确为待确认/按图评审，不虚构具体产品 | `/`、`/products` |
| REQ-05 | 产品首图改集合图，拓展图库并提供常规型号明细 | 首页产品区、产品列表、详情图库与规格 | 不再宣称“只有六种”；使用集合图和已有真实产品图；展示当前已核实规格/型号口径 | `/`、`/products`、全部产品详情 |
| REQ-06 | Application 谨慎填写，避免煤气及高要求阀门系统 | 首页 Applications、Applications 页、RFQ 选项、metadata | 只保留空气球阀、压缩空气及按图评审等可支持语境；不出现煤气能力暗示 | `/`、`/applications`、`/contact` |

## 实施顺序

1. 为六项需求补充静态契约测试，先确认旧实现失败。
2. 导入客户提供的三张 Banner，调整内容数据与组件顺序，删除旧场景图引用。
3. 修正产品分类、集合展示、应用描述和全站英文 Title Case。
4. 运行测试、TypeScript、Lint 与 Production 构建；核对禁用词及旧文案无残留。
5. 使用公司 Token 精确提交并推送 `luqite-ux/rongchengmetalparts` 的 `main`，回读 GitHub SHA。
6. 回读 Vercel Production 同一 SHA 与 `READY` 状态。
7. 在正式域名逐项完成桌面端和 390px 手机端真实浏览器复审，保存每条需求证据与审核 URL。
8. 仅当台账全部 `PASS` 后执行最终清理、工作台完成、日报和会话标题收尾。

## Review Focus

- 客户提供的 Banner 只能证明其为指定素材，不能把画面内无法核实的零件、设备或场景写成新增事实。
- `Others` 未给出产品清单，页面只能保留询图/询样入口，不能新增虚构 SKU。
- 产品数据来自 Supabase 时仍须保持新分类与静态回退一致，不能只改本地演示数据。
- Applications 必须同时覆盖首页、独立页、RFQ 下拉和 metadata，避免旧高要求场景残留。
- 手机端 Banner 必须逐张切换检查主体、文案和 CTA，不得用桌面截图替代。
