# 部署指南 — Cloudflare Pages 纯静态托管（小白版）

本网站前台采用**静态导出（SSG）**：所有公开页面在构建时一次性生成 HTML 文件。
管理员访问分析使用一个隔离的 Cloudflare Pages Function，API Token 不会进入浏览器或静态文件。
这正是之前 Cloudflare 构建卡在 `async_hooks` 错误的根因被彻底绕开的办法。

---

## 第一步：把代码推到 GitHub（代码已在 GitHub 可跳过）
在 `ai-tools-directory` 文件夹里打开终端，执行：
```bash
git add -A
git commit -m "feat: convert to static export"
git push origin main
```

## 第二步：Cloudflare Pages 连 Git（在浏览器里点）
1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → 连接 Git 仓库**。
2. 选你的仓库 `matchyang36-accp/ai-tools-directory`，Production branch 选 `main`。
3. **Build command（构建命令）：** `npm run build`
4. **Output directory（输出目录）：** `out`
5. **环境变量**（点 "Add variable"，构建时）：`NODE_VERSION` = `20`
6. 点 **Save and Deploy** 开始首次构建。

### 管理员访问分析配置

在 Pages 项目 **Settings → Variables and Secrets** 中添加：

- `CF_ZONE_ID`：`whichaiuse.com` 对应的 Zone ID。
- `CF_ANALYTICS_API_TOKEN`：Cloudflare Analytics 只读 API Token，必须选择 **Secret / Encrypt**，不要使用明文变量，也不要写进 Git。

同时在 Cloudflare Zero Trust → Access 中创建 Self-hosted application，仅保护：

- `whichaiuse.com/admin/*`
- `whichaiuse.com/api/admin/*`

策略只允许管理员邮箱。后台页面和分析接口必须一起保护，避免只锁页面却留下公开 API。

> ⚠️ 不要把输出目录用默认的，一定手动改成 `out`。也不要选 Next.js 预设自带的输出目录。

## 第三步：验证上线
构建完成后打开分配的 `*.pages.dev` 网址，检查：
- 首页 `/` 正常显示工具列表
- `/tools/<任意slug>` 能打开（例如 `/tools/jasper`）
- `/search` 输入关键词能实时出结果
- `/sitemap.xml` 和 `/robots.txt` 能打开（SEO 用）

## 以后改内容怎么更新？
网站所有内容都在 `data/tools.ts`（57 个工具、9 个分类、评测、对比）里。
改完这个文件后：
```bash
git add -A && git commit -m "update content" && git push origin main
```
Cloudflare 会自动重新构建部署（几分钟）。公开内容不需要数据库；只有管理员分析接口使用 Pages Function。

## 自定义域名（可选）
在 Cloudflare Pages 项目的 **Custom domains** 里添加你的域名，按提示改 DNS 即可。

---

### 技术说明（可忽略）
- `next.config.mjs` 设了 `output: "export"`，`npm run build` 把整站导出到 `out/`。
- 搜索改成浏览器端过滤（`app/search/page.tsx` 直接 import 数据），不再依赖 API 路由。
- 之前的 D1 / next-on-pages 数据层配置仍未启用（公开内容全在 `data/tools.ts`）。
- `functions/api/admin/analytics.ts` 只负责服务端读取 Cloudflare Analytics，缺少 Access 身份或环境变量时会尽早失败。
  若将来要动态管理海量内容，可再迁回带数据库的架构，但当前纯静态方案最稳、最快、最便宜。
