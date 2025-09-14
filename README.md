# HuiTu - 奥斯本检核表创新分析工具

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/your-org/huitu)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Monorepo](https://img.shields.io/badge/Monorepo-Turbo-orange.svg)](https://turbo.build/)

> 基于奥斯本检核表法的创新思维分析工具，支持Web、iOS、Android多平台，帮助用户系统性地探索创新可能性。

## 🎯 项目概述

HuiTu是一个基于奥斯本检核表法的创新分析工具，通过系统性的问题引导，帮助用户从多个维度探索创新可能性。项目采用现代化的Monorepo架构，支持多平台部署。

### ✨ 核心功能

- **奥斯本检核表分析**: 基于9大创新维度的系统性分析
- **智能案例库**: 75+真实创新案例分析
- **多平台支持**: Web、iOS、Android全平台覆盖
- **AI增强分析**: 集成AI能力，提供智能建议
- **导出功能**: 支持PDF、Word、Excel、Markdown多种格式
- **协作功能**: 团队共享和版本管理

## 🏗️ 项目架构

```
HuiTu/
├── packages/                    # 📦 核心包
│   ├── shared/                  # 🔧 共享资源
│   │   ├── algorithms/         # 核心分析算法
│   │   ├── data/               # 案例数据库
│   │   ├── types/              # TypeScript类型
│   │   └── utils/              # 通用工具
│   ├── web-core/               # 🌐 Web核心库
│   ├── mobile-core/            # 📱 移动端核心库
│   └── cli-tools/              # 🛠️ 开发工具
├── apps/                        # 📱 应用入口
│   ├── web/                    # Web应用
│   ├── ios/                    # iOS应用
│   └── android/                # Android应用
├── tools/                       # 🔨 开发工具
├── docs/                        # 📚 文档
└── configs/                     # ⚙️ 配置文件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- iOS开发: Xcode >= 14.0
- Android开发: Android Studio >= 2022.1

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-org/huitu.git
cd huitu

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动所有服务
pnpm dev

# 启动特定应用
pnpm dev --filter @huitu/web
pnpm dev --filter @huitu/ios
pnpm dev --filter @huitu/android
```

### 构建项目

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm build --filter @huitu/shared
pnpm build --filter @huitu/web-core
```

## 📱 平台支持

### Web应用
- **技术栈**: React 19 + TypeScript + Vite + Tailwind CSS
- **功能**: 完整的奥斯本分析、案例库、导出功能
- **部署**: 支持Vercel、Netlify等平台

### iOS应用
- **技术栈**: React Native + TypeScript
- **功能**: 移动端优化的分析界面
- **发布**: App Store发布支持

### Android应用
- **技术栈**: React Native + TypeScript
- **功能**: 与iOS功能一致
- **发布**: Google Play发布支持

## 🧪 测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm test --filter @huitu/shared
pnpm test --filter @huitu/web-core

# 测试覆盖率
pnpm test:coverage
```

## 📦 包管理

### 核心包

- **@huitu/shared**: 共享算法、数据和工具
- **@huitu/web-core**: Web端核心组件和Hooks
- **@huitu/mobile-core**: 移动端核心组件
- **@huitu/cli-tools**: 开发和部署工具

### 应用包

- **@huitu/web**: Web应用
- **@huitu/ios**: iOS应用
- **@huitu/android**: Android应用

## 🔧 开发工具

### 代码质量

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

### 构建工具

```bash
# 清理构建缓存
pnpm clean

# 构建分析
pnpm build:analyze

# 部署到测试环境
pnpm deploy:staging

# 部署到生产环境
pnpm deploy:production
```

## 📚 文档

- [开发指南](docs/guides/)
- [API文档](docs/api/)
- [部署文档](docs/deployment/)
- [贡献指南](CONTRIBUTING.md)

## 🤝 贡献

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详细信息。

## 🙏 致谢

- [奥斯本检核表法](https://en.wikipedia.org/wiki/SCAMPER) - 创新思维方法
- [React](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript
- [Turbo](https://turbo.build/) - Monorepo构建工具

## 📞 联系我们

- 项目主页: [https://github.com/your-org/huitu](https://github.com/your-org/huitu)
- 问题反馈: [Issues](https://github.com/your-org/huitu/issues)
- 讨论区: [Discussions](https://github.com/your-org/huitu/discussions)

---

**HuiTu** - 让创新思维更系统化 🚀
