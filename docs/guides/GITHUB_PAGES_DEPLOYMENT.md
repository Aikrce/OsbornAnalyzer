# GitHub Pages 部署指南

## 概述

本指南说明如何将 HuiTu 项目部署到 GitHub Pages。

## 部署配置

### 1. GitHub Pages 设置

在 GitHub 仓库设置中：
- 进入 Settings > Pages
- Source 选择 "GitHub Actions"
- 确保仓库已启用 GitHub Pages

### 2. 工作流配置

项目包含专门的 GitHub Pages 部署工作流：`.github/workflows/github-pages.yml`

该工作流会在以下情况触发：
- 推送到 `main` 分支
- 创建 Pull Request 到 `main` 分支
- 手动触发工作流

### 3. 构建配置

#### Vite 配置
- 生产环境自动设置 `base: '/OsbornAnalyzer/'`
- 开发环境使用 `base: '/'`

#### 构建脚本
- `pnpm build`: 标准构建
- `pnpm build:github`: GitHub Pages 专用构建（自动创建 `.nojekyll` 文件）

### 4. 部署流程

1. **自动部署**：推送到 main 分支时自动触发
2. **手动部署**：在 Actions 页面手动运行工作流
3. **部署环境**：使用 `github-pages` 环境

## 部署步骤

### 首次部署

1. 确保 GitHub Pages 已启用
2. 推送代码到 main 分支
3. 检查 Actions 页面确认部署成功
4. 访问 `https://aikrce.github.io/OsbornAnalyzer/`

### 更新部署

1. 修改代码
2. 提交并推送到 main 分支
3. 等待自动部署完成

## 故障排除

### 常见问题

1. **404 错误**
   - 检查 `base` 路径配置是否正确
   - 确认 `.nojekyll` 文件存在

2. **资源加载失败**
   - 检查 Vite 配置中的 `base` 设置
   - 确认所有资源路径使用相对路径

3. **部署失败**
   - 检查 Actions 日志
   - 确认构建过程无错误
   - 检查权限设置

### 调试步骤

1. 本地测试构建：
   ```bash
   cd apps/web
   pnpm build:github
   pnpm preview
   ```

2. 检查构建输出：
   ```bash
   ls -la apps/web/dist/
   ```

3. 验证 `.nojekyll` 文件：
   ```bash
   cat apps/web/dist/.nojekyll
   ```

## 环境变量

部署过程中使用以下环境变量：
- `NODE_VERSION`: '20'
- `PNPM_VERSION`: '9.0.0'
- `NODE_ENV`: 'production' (构建时)

## 权限要求

GitHub Actions 需要以下权限：
- `contents: read`
- `pages: write`
- `id-token: write`

## 部署 URL

- 生产环境：`https://aikrce.github.io/OsbornAnalyzer/`
- 开发环境：`http://localhost:5371`

## 相关文件

- `.github/workflows/github-pages.yml` - 部署工作流
- `apps/web/vite.config.ts` - 构建配置
- `apps/web/package.json` - 构建脚本
- `apps/web/dist/.nojekyll` - GitHub Pages 配置
