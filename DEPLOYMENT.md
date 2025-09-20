# 奥斯本分析器 - 部署指南

## 📋 项目概述

奥斯本分析器是一个基于React的Web应用程序，提供奥斯本九问创新分析功能。

## 🚀 快速部署

### 1. 本地开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
cd apps/web
npm run dev

# 访问应用
# http://localhost:5371
```

### 2. 生产构建

```bash
# 构建生产版本
cd apps/web
npm run build

# 预览构建结果
npm run preview
```

## 🌐 页面路由配置

### 主要页面路由

| 路径 | 页面 | 描述 |
|------|------|------|
| `/` | 首页 | 主页面，选择分析类型 |
| `/osborn-analysis` | 奥斯本分析 | 奥斯本九问分析页面 |
| `/deep-analysis` | 深度分析 | AI深度分析页面 |
| `/analysis-detail` | 分析详情 | 查看分析结果详情 |
| `/analysis-progress` | 分析进度 | 显示分析进度 |
| `/case-library` | 案例库 | 查看保存的分析案例 |
| `/collaboration` | 协作页面 | 团队协作功能 |
| `/settings` | 设置页面 | 应用设置和配置 |
| `/ai-diagnostics` | AI诊断 | AI服务诊断工具 |
| `/user` | 用户中心 | 用户信息管理 |

### 路由特性

- ✅ **懒加载**: 所有页面都使用懒加载，提升首屏加载速度
- ✅ **错误边界**: 每个页面都有错误边界保护
- ✅ **加载状态**: 页面切换时显示加载动画
- ✅ **404处理**: 未匹配路由自动重定向到首页

## 🏗️ 构建配置

### Vite配置优化

- **代码分割**: 按功能模块分割代码
- **压缩优化**: 生产环境自动压缩代码
- **缓存优化**: 启用构建缓存
- **HMR**: 开发环境热更新

### 构建输出

```
dist/
├── assets/
│   ├── [name]-[hash].js      # JavaScript文件
│   ├── [name]-[hash].css     # CSS文件
│   └── [name]-[hash].[ext]   # 其他资源文件
├── index.html                # 主HTML文件
└── favicon.ico              # 网站图标
```

## 🌍 部署选项

### 1. 静态文件部署

适用于：Vercel、Netlify、GitHub Pages等

```bash
# 构建
npm run build

# 部署dist目录到静态文件服务器
```

### 2. Docker部署

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Nginx配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /usr/share/nginx/html;
    index index.html;

    # 处理SPA路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

## 🔧 环境配置

### 环境变量

创建 `.env` 文件：

```env
# API配置
VITE_API_BASE_URL=https://api.your-domain.com
VITE_AI_SERVICE_URL=https://api.deepseek.com

# 应用配置
VITE_APP_NAME=奥斯本分析器
VITE_APP_VERSION=2.0.0

# 功能开关
VITE_ENABLE_AI_ANALYSIS=true
VITE_ENABLE_COLLABORATION=true
```

### 开发环境配置

```env
# 开发环境
VITE_NODE_ENV=development
VITE_DEBUG=true
VITE_API_BASE_URL=http://localhost:3000
```

## 📊 性能优化

### 1. 代码分割策略

- **React相关**: `react-vendor`
- **路由相关**: `router-vendor`
- **UI组件**: `ui-vendor`
- **状态管理**: `query-vendor`
- **工具库**: `utils`
- **AI服务**: `ai-services`

### 2. 缓存策略

- **静态资源**: 长期缓存 (1年)
- **HTML文件**: 短期缓存 (1小时)
- **API响应**: 根据内容类型设置

### 3. 加载优化

- **懒加载**: 页面组件按需加载
- **预加载**: 关键资源预加载
- **压缩**: Gzip/Brotli压缩

## 🔍 监控和调试

### 1. 错误监控

- **错误边界**: 捕获React错误
- **全局错误处理**: 捕获未处理的错误
- **API错误处理**: 统一API错误处理

### 2. 性能监控

- **Web Vitals**: 核心性能指标
- **Bundle分析**: 分析打包大小
- **加载时间**: 监控页面加载时间

### 3. 调试工具

- **React DevTools**: React组件调试
- **Redux DevTools**: 状态管理调试
- **Network面板**: 网络请求调试

## 🚨 故障排除

### 常见问题

1. **路由404错误**
   - 检查服务器配置，确保支持SPA路由
   - 配置 `try_files $uri $uri/ /index.html`

2. **构建失败**
   - 检查Node.js版本 (推荐18+)
   - 清除缓存: `rm -rf node_modules/.vite`
   - 重新安装依赖: `npm ci`

3. **页面加载慢**
   - 检查网络连接
   - 分析Bundle大小
   - 启用Gzip压缩

### 调试命令

```bash
# 分析Bundle大小
npm run build -- --analyze

# 检查类型错误
npm run type-check

# 运行测试
npm run test

# 代码检查
npm run lint
```

## 📝 更新日志

### v2.0.0
- ✅ 重构为Monorepo架构
- ✅ 优化构建配置
- ✅ 改进路由系统
- ✅ 增强错误处理

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📞 支持

如有问题，请：
1. 查看本文档
2. 检查GitHub Issues
3. 创建新的Issue
4. 联系维护者

---

**注意**: 这是一个开发版本，建议在修复已知问题后再进行生产部署。
