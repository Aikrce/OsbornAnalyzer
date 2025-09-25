# HuiTu 项目 GitHub Pages 部署指南

## 部署方式选择

### 1. GitHub Pages (推荐)
- **优点**: 免费、简单、与GitHub集成
- **适用**: 静态React应用部署
- **配置**: 已提供 `deploy-web.yml` 工作流

### 2. Vercel (备选)
- **优点**: 自动部署、CDN加速、预览环境
- **适用**: 需要更专业的部署体验
- **配置**: 需要VERCEL_TOKEN等secrets

## 部署步骤

### 使用GitHub Pages部署

1. **启用GitHub Pages**
   - 进入GitHub仓库 → Settings → Pages
   - 选择 "GitHub Actions" 作为源

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "feat: 添加部署配置"
   git push origin main
   ```

3. **查看部署状态**
   - 进入仓库 → Actions
   - 查看 "Deploy Web App to GitHub Pages" 工作流运行状态

4. **访问部署网站**
   - 部署成功后，在Settings → Pages中查看URL
   - 通常为: `https://[用户名].github.io/[仓库名]`

## 环境变量配置（如需要）

如果后续需要集成AI服务等，需要配置secrets：

1. **进入GitHub仓库设置**
   - Settings → Secrets and variables → Actions

2. **添加所需secrets**
   - `DEEPSEEK_API_KEY`: DeepSeek API密钥（如需要AI功能）

## 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本兼容性
   - 确认pnpm依赖安装正确

2. **页面空白**
   - 检查路由配置（需要配置为hash路由或SPA路由）
   - 确认静态资源路径正确

3. **404错误**
   - 确保配置了正确的404页面重定向

### 调试建议

1. **本地测试构建**
   ```bash
   pnpm --filter @osborn/web build
   serve apps/web/dist
   ```

2. **检查工作流日志**
   - 在GitHub Actions中查看详细错误信息

## 性能优化建议

1. **代码分割**
   - 确保Vite配置了合理的代码分割

2. **图片优化**
   - 使用WebP格式图片
   - 配置图片压缩

3. **CDN加速**
   - 考虑使用jsDelivr等CDN加速静态资源

## 监控和维护

1. **部署监控**
   - 设置部署状态通知
   - 监控页面加载性能

2. **定期更新**
   - 定期更新依赖包版本
   - 检查安全漏洞

## 技术支持

如遇到部署问题，请检查：
1. GitHub Actions日志中的具体错误信息
2. 本地构建是否成功
3. 网络连接和权限配置

---

**文档类型**: 部署指南  
**适用平台**: GitHub Pages  
**维护者**: HuiTu开发团队  
**最后更新**: 2025-01-21
