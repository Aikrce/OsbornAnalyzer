# 奥斯本创新九问工具 - 部署与发布指南

## 🚀 快速开始

### 环境要求
- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器
- Git 版本控制

### 本地开发
1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 访问应用：http://localhost:3005

### 运行测试
```bash
# 运行所有测试
npm test

# 运行测试并监听文件变化
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

## 📦 构建与部署

### 生产环境构建
```bash
npm run build
```

### Vercel 部署
1. 安装 Vercel CLI: `npm i -g vercel`
2. 登录 Vercel: `vercel login`
3. 部署项目: `vercel --prod`

### Netlify 部署
1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令: `npm run build`
3. 设置发布目录: `dist`
4. 配置环境变量

## 🔧 环境变量配置

创建 `.env` 文件：
```env
DEEPSEEK_API_KEY=your_deepseek_api_key
PORT=3005
NODE_ENV=production
```

## 🧪 测试策略

### 单元测试
- 组件渲染测试
- 用户交互测试
- 状态管理测试

### 集成测试
- API 接口测试
- 端到端流程测试
- 跨浏览器兼容性测试

### 测试覆盖率目标
- 语句覆盖率: ≥80%
- 分支覆盖率: ≥70%
- 函数覆盖率: ≥85%
- 行覆盖率: ≥80%

## 📱 App 验证流程

### 移动端测试
1. **真机测试**
   - iOS 设备测试
   - Android 设备测试
   - 平板设备测试

2. **浏览器兼容性**
   - Chrome Mobile
   - Safari Mobile
   - Firefox Mobile

3. **性能测试**
   - 加载时间优化
   - 内存使用监控
   - 电池消耗测试

### 测试工具推荐
- BrowserStack - 跨浏览器测试
- Lighthouse - 性能测试
- WebPageTest - 加载速度测试

## 🔄 Git 工作流

### 分支策略
- `main` - 生产环境分支
- `develop` - 开发分支
- `feature/*` - 功能分支
- `hotfix/*` - 紧急修复分支

### 提交规范
```
feat: 添加新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具变动
```

## 🚨 故障排除

### 常见问题
1. **端口占用**
   ```bash
   lsof -ti:3005 | xargs kill -9
   ```

2. **依赖安装失败**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **构建失败**
   - 检查 Node.js 版本
   - 清理缓存: `npm run clean`

### 性能优化
- 代码分割和懒加载
- 图片优化和压缩
- CDN 资源加速

## 📊 监控与分析

### 性能监控
- Google Analytics
- Hotjar 用户行为分析
- Sentry 错误监控

### 业务指标
- 用户活跃度
- 功能使用率
- 转化率分析

## 🔒 安全最佳实践

1. API 密钥保护
2. HTTPS 强制启用
3. 输入验证和清理
4. XSS 和 CSRF 防护

---

**最后更新**: 2025-09-08  
**维护者**: 开发团队