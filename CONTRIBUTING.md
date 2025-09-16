# HuiTu 贡献指南

感谢您对 HuiTu 项目的关注！本指南将帮助您了解如何为项目做出贡献。

## 📋 目录

- [开始之前](#开始之前)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交流程](#提交流程)
- [测试指南](#测试指南)
- [文档贡献](#文档贡献)
- [问题报告](#问题报告)
- [功能请求](#功能请求)

## 🚀 开始之前

### 贡献类型

我们欢迎以下类型的贡献：

- 🐛 **Bug修复**: 修复现有功能的问题
- ✨ **新功能**: 添加新的功能特性
- 📚 **文档**: 改进文档和示例
- 🎨 **UI/UX**: 改进用户界面和体验
- ⚡ **性能**: 优化性能和响应速度
- 🧪 **测试**: 增加测试覆盖率
- 🔧 **工具**: 改进开发工具和流程

### 行为准则

请遵循我们的[行为准则](CODE_OF_CONDUCT.md)，保持友好和尊重的交流环境。

## 🛠️ 开发环境设置

### 系统要求

- Node.js 18+ 
- pnpm 9.0.0+
- Git 2.30+

### 安装步骤

1. **Fork 并克隆仓库**
```bash
git clone https://github.com/your-username/huitu.git
cd huitu
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
# 启动所有应用
pnpm dev

# 启动特定应用
pnpm --filter @huitu/web dev
```

4. **运行测试**
```bash
pnpm test
```

### 项目结构

```
HuiTu/
├── apps/                    # 应用入口
│   ├── web/                # Web应用
│   ├── ios/                # iOS应用
│   └── android/            # Android应用
├── packages/               # 共享包
│   ├── shared/             # 核心共享库
│   ├── web-core/           # Web核心库
│   ├── mobile-core/        # 移动端核心库
│   └── cli-tools/          # CLI工具
├── docs/                   # 文档
├── tools/                  # 开发工具
└── scripts/                # 构建脚本
```

## 📝 代码规范

### TypeScript 规范

- 使用严格的 TypeScript 配置
- 所有公共API必须有类型定义
- 使用有意义的变量和函数名
- 添加必要的注释和文档

```typescript
// ✅ 好的示例
interface AnalysisResult {
  id: string;
  title: string;
  score: number;
}

const calculateScore = (questions: string[]): number => {
  // 计算逻辑
  return questions.length * 10;
};

// ❌ 避免的写法
const calc = (q: any) => {
  return q.length * 10;
};
```

### React 组件规范

- 使用函数组件和 Hooks
- 组件名使用 PascalCase
- Props 接口以组件名 + Props 命名
- 使用 React.memo 优化性能

```typescript
// ✅ 好的示例
interface AnalysisCardProps {
  result: AnalysisResult;
  onEdit?: (id: string) => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = React.memo(({ 
  result, 
  onEdit 
}) => {
  return (
    <div className="analysis-card">
      <h3>{result.title}</h3>
      <p>Score: {result.score}</p>
    </div>
  );
});
```

### 样式规范

- 使用 Tailwind CSS 类名
- 遵循移动优先的响应式设计
- 使用 CSS 变量定义主题色彩
- 避免内联样式

```typescript
// ✅ 好的示例
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white dark:bg-gray-800">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
    Analysis Results
  </h2>
</div>
```

## 🔄 提交流程

### 1. 创建分支

```bash
# 从 main 分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 或使用 GitHub CLI
gh repo fork your-org/huitu
gh repo clone your-username/huitu
cd huitu
gh repo sync
```

### 2. 开发流程

```bash
# 开发过程中定期提交
git add .
git commit -m "feat: add new analysis feature"

# 推送到你的 fork
git push origin feature/your-feature-name
```

### 3. 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(analysis): add AI enhancement for osborn analysis

- Add AI service integration
- Implement confidence scoring
- Add error handling for AI failures

Closes #123
```

### 4. 创建 Pull Request

1. 在 GitHub 上创建 Pull Request
2. 填写详细的描述和说明
3. 关联相关的 Issue
4. 等待代码审查

## 🧪 测试指南

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @huitu/shared test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行 E2E 测试
pnpm test:e2e
```

### 编写测试

```typescript
// 单元测试示例
import { describe, it, expect } from 'vitest';
import { OsbornAnalyzer } from '../src/algorithms/osborn';

describe('OsbornAnalyzer', () => {
  it('should generate questions for given topic', () => {
    const analyzer = OsbornAnalyzer.getInstance();
    const result = analyzer.analyze('智能手机');
    
    expect(result).toBeDefined();
    expect(result.questions).toHaveProperty('other-uses');
    expect(result.totalScore).toBeGreaterThan(0);
  });
});
```

### 测试覆盖率要求

- 单元测试覆盖率 ≥ 80%
- 集成测试覆盖核心功能
- E2E 测试覆盖主要用户流程

## 📚 文档贡献

### 文档类型

- **API文档**: 在 `docs/api/` 目录
- **用户指南**: 在 `docs/guides/` 目录
- **开发文档**: 在 `docs/development/` 目录
- **README**: 项目根目录和各子目录

### 文档规范

- 使用 Markdown 格式
- 包含代码示例
- 保持内容更新
- 使用清晰的标题结构

## 🐛 问题报告

### 报告 Bug

使用 [GitHub Issues](https://github.com/your-org/huitu/issues) 报告问题，请包含：

1. **问题描述**: 清晰描述问题
2. **重现步骤**: 详细的重现步骤
3. **预期行为**: 描述期望的行为
4. **实际行为**: 描述实际发生的情况
5. **环境信息**: 操作系统、浏览器版本等
6. **截图/日志**: 相关的截图或错误日志

### Bug 报告模板

```markdown
## Bug 描述
简要描述问题

## 重现步骤
1. 进入页面 '...'
2. 点击按钮 '...'
3. 看到错误

## 预期行为
描述期望的行为

## 实际行为
描述实际发生的情况

## 环境信息
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 96.0]
- Version: [e.g. v2.0.0]

## 附加信息
添加其他相关信息
```

## 💡 功能请求

### 提出新功能

1. 检查是否已有类似的功能请求
2. 使用功能请求模板
3. 提供详细的使用场景
4. 考虑实现的复杂度

### 功能请求模板

```markdown
## 功能描述
简要描述想要的功能

## 使用场景
描述这个功能的使用场景

## 解决方案
描述你期望的解决方案

## 替代方案
描述你考虑过的替代方案

## 附加信息
添加其他相关信息
```

## 🏷️ 标签说明

我们使用以下标签来组织 Issues 和 PRs：

### Issue 标签
- `bug`: Bug 报告
- `enhancement`: 功能增强
- `documentation`: 文档相关
- `good first issue`: 适合新贡献者
- `help wanted`: 需要帮助
- `priority: high`: 高优先级
- `priority: medium`: 中优先级
- `priority: low`: 低优先级

### PR 标签
- `ready for review`: 准备审查
- `needs review`: 需要审查
- `approved`: 已批准
- `changes requested`: 需要修改
- `breaking change`: 破坏性变更

## 🎉 贡献者

感谢所有为 HuiTu 项目做出贡献的开发者！

## 📞 联系方式

- **GitHub Issues**: [项目 Issues](https://github.com/your-org/huitu/issues)
- **GitHub Discussions**: [社区讨论](https://github.com/your-org/huitu/discussions)
- **Email**: contact@huitu.dev

## 📄 许可证

本项目采用 MIT 许可证。贡献即表示您同意您的代码将在 MIT 许可证下发布。

---

再次感谢您的贡献！🎉
