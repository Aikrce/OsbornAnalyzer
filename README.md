# OsbornAnalyzer - 奥斯本创新九问智能分析工具

基于奥斯本检核表法的创新思维分析工具，集成75+真实案例数据库，支持本地分析和AI深度分析双模式。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)

## 🎯 项目概述

OsbornAnalyzer是一个基于奥斯本检核表法的创新思维分析工具，通过系统化的九维度分析框架，帮助用户从不同角度思考问题，激发创新灵感。项目采用现代化的Monorepo架构，支持Web、移动端多平台部署。

### ✨ 核心特性

- **奥斯本九维度分析**：系统化的创新思维框架
- **AI增强分析**：集成DeepSeek API，提供智能分析建议
- **案例数据库**：75+真实创新案例，多行业覆盖
- **多平台支持**：Web应用、iOS/Android移动端
- **现代化架构**：Monorepo + TypeScript + React 19

## 🏗️ 项目架构

```
OsbornAnalyzer/
├── apps/                    # 应用入口
│   ├── web/                # Web应用 (React + Vite)
│   ├── ios/                # iOS应用 (React Native)
│   └── android/            # Android应用 (React Native)
├── packages/               # 共享包
│   ├── shared/             # 共享类型和工具
│   ├── web-core/           # Web核心库
│   ├── mobile-core/        # 移动端核心库
│   └── cli-tools/          # CLI工具
├── tools/                  # 开发工具
│   ├── osborn-tool/        # 奥斯本分析工具
│   └── project-diagnosis-tool/ # 项目诊断工具
├── docs/                   # 项目文档
│   ├── guides/             # 开发指南
│   ├── reports/            # 项目报告
│   ├── api/                # API文档
│   ├── architecture/       # 架构文档
│   └── web/                # Web相关文档
├── configs/                # 配置文件
├── scripts/                # 构建脚本
└── e2e-tests/              # 端到端测试
```

## 🚀 快速开始

### 环境要求

- **Node.js**: 18.0.0 或更高版本
- **pnpm**: 8.0.0 或更高版本
- **Git**: 版本控制
- **iOS开发**: Xcode 14+ (仅iOS开发需要)
- **Android开发**: Android Studio (仅Android开发需要)

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd HuiTu

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动所有应用
pnpm dev

# 启动特定应用
pnpm --filter @osborn-analyzer/web dev          # Web应用
pnpm --filter @osborn-analyzer/mobile-core dev  # 移动端核心
pnpm --filter osborn-tool dev         # 奥斯本工具
```

### 构建项目

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @osborn-analyzer/web build
pnpm --filter @osborn-analyzer/shared build
```

## 🎯 奥斯本九维度分析

奥斯本检核表法通过九个维度系统化地分析问题，激发创新思维：

1. **能否他用？** (Put to other uses) - 寻找其他用途
2. **能否借用？** (Adapt) - 借鉴其他领域的解决方案
3. **能否修改？** (Modify) - 改变形状、颜色、声音等
4. **能否扩大？** (Magnify) - 增加尺寸、时间、频率等
5. **能否缩小？** (Minify) - 减少尺寸、简化功能等
6. **能否替代？** (Substitute) - 用其他材料、方法替代
7. **能否调整？** (Rearrange) - 改变顺序、布局等
8. **能否颠倒？** (Reverse) - 颠倒顺序、角色等
9. **能否组合？** (Combine) - 将不同元素组合

## 🤖 AI增强功能

### DeepSeek API集成
- 智能提示词生成
- 多维度深度分析
- 置信度评分系统
- 个性化建议

### 分析引擎
- 本地分析引擎：快速响应，保护隐私
- AI分析引擎：深度洞察，智能建议
- 混合分析模式：结合两种引擎的优势

## 📊 案例数据库

### 数据规模
- **75+真实案例**：来自科技、医疗、教育、金融等多个行业
- **质量评级系统**：每个案例都有详细的质量评估
- **智能搜索**：支持关键词、标签、行业等多维度搜索

### 案例类型
- 产品创新案例
- 服务创新案例
- 商业模式创新
- 技术创新案例

## 🛠️ 技术栈

### 前端技术
- **React 19**: 最新版本的React框架
- **TypeScript 5.9**: 类型安全的JavaScript
- **Vite 5.4**: 快速的构建工具
- **Tailwind CSS**: 实用优先的CSS框架
- **Zustand**: 轻量级状态管理
- **React Query**: 数据获取和缓存

### 移动端技术
- **React Native 0.81**: 跨平台移动应用开发
- **Expo**: 移动应用开发平台

### 构建工具
- **Turborepo**: Monorepo构建系统
- **pnpm**: 高效的包管理器
- **ESLint + Prettier**: 代码质量和格式化

### 测试框架
- **Vitest**: 单元测试框架
- **Testing Library**: 组件测试
- **Playwright**: 端到端测试

## 📱 平台支持

### Web应用
- 现代化响应式设计
- PWA支持
- 离线功能
- 多浏览器兼容

### 移动端应用
- iOS应用：原生iOS体验
- Android应用：原生Android体验
- 跨平台代码共享

## 🧪 测试策略

### 测试覆盖
- **单元测试**: 组件和工具函数测试
- **集成测试**: 服务集成测试
- **端到端测试**: 完整用户流程测试

### 测试工具
```bash
# 运行所有测试
pnpm test

# 运行测试并监听变化
pnpm test:watch

# 生成测试覆盖率报告
pnpm test:coverage

# 运行端到端测试
pnpm test:e2e
```

## 📈 性能指标

### 目标指标
- **首屏加载时间**: < 3秒
- **Lighthouse评分**: > 90分
- **包体积**: Web < 500KB, Mobile < 5MB
- **API响应时间**: < 200ms

### 性能优化
- 代码分割和懒加载
- 图片优化和压缩
- CDN资源加速
- 缓存策略优化

## 🔧 开发指南

### 代码规范
- 使用TypeScript严格模式
- ESLint + Prettier自动格式化
- 提交前自动检查
- 统一的命名规范

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

### 分支策略
- `main`: 生产环境分支
- `develop`: 开发分支
- `feature/*`: 功能分支
- `hotfix/*`: 紧急修复分支

## 🚀 部署指南

### Web应用部署
```bash
# 构建生产版本
pnpm --filter @osborn-analyzer/web build

# 部署到Vercel
vercel --prod

# 部署到Netlify
netlify deploy --prod --dir=apps/web/dist
```

### 移动端发布
- **iOS**: 通过Xcode发布到App Store
- **Android**: 通过Android Studio发布到Google Play

### 环境变量配置
```env
# AI服务配置
DEEPSEEK_API_KEY=your_deepseek_api_key

# 应用配置
PORT=3005
NODE_ENV=production
```

## 📚 文档资源

- [开发指南](docs/guides/) - 详细的开发文档
- [API文档](docs/api/) - 接口文档
- [架构文档](docs/architecture/) - 系统架构说明
- [项目报告](docs/reports/) - 项目状态和测试报告

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

### 贡献类型
- 🐛 Bug修复
- ✨ 新功能开发
- 📚 文档改进
- 🧪 测试用例
- 🎨 UI/UX改进

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🆘 技术支持

- **文档**: [docs/](docs/) - 完整的项目文档
- **问题反馈**: [GitHub Issues](https://github.com/your-org/huitu/issues)
- **讨论交流**: [GitHub Discussions](https://github.com/your-org/huitu/discussions)

## 🗺️ 路线图

### 短期目标 (1-2个月)
- [ ] 完善移动端功能
- [ ] 增加更多案例数据
- [ ] 优化AI分析算法
- [ ] 提升用户体验

### 中期目标 (3-6个月)
- [ ] 实现本地AI模型
- [ ] 增加协作功能
- [ ] 扩展案例数据库
- [ ] 多语言支持

### 长期目标 (6-12个月)
- [ ] 企业版功能
- [ ] API开放平台
- [ ] 生态系统建设
- [ ] 国际化部署

---

**最后更新**: 2025-01-14  
**版本**: v2.0.0 (开发中)  
**维护者**: OsbornAnalyzer开发团队

> 💡 **提示**: 当前版本为开发版本，建议在修复已知问题后再进行生产部署。详细的问题列表请参考 [项目报告](docs/reports/)。