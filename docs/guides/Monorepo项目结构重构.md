# Monorepo项目结构重构

## Core Features

- 共享代码包管理

- 多应用入口结构

- 依赖关系配置

- 构建系统优化

## Tech Stack

{
  "架构": "Monorepo with pnpm workspace",
  "构建工具": "Vite + 平台特定工具",
  "语言": "JavaScript/TypeScript"
}

## Design

项目结构设计优化，不涉及UI设计

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 配置pnpm workspace和monorepo基础结构

[X] 创建共享包目录结构并初始化各包配置

[X] 迁移web目录代码到apps/web应用入口

[X] 配置共享包之间的依赖关系

[X] 设置构建脚本和开发环境配置

[/] 测试monorepo结构的构建和运行

[ ] 更新文档说明新的项目结构
