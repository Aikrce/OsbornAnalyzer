# HuiTu项目测试指南

**文档版本**: v2.0.0  
**更新日期**: 2025-01-21  
**适用范围**: 全项目测试策略、测试执行、测试维护

## 📋 测试概览

HuiTu项目采用多层次的测试策略，确保代码质量和功能稳定性。测试体系包括单元测试、集成测试、端到端测试和性能测试。

## 🏗️ 测试架构

### 测试金字塔
```
        E2E Tests (10%)
       /              \
   Integration Tests (20%)
  /                      \
Unit Tests (70%)
```

### 测试层次说明
- **单元测试 (70%)**: 测试单个函数、组件或模块
- **集成测试 (20%)**: 测试模块间的交互
- **端到端测试 (10%)**: 测试完整的用户流程

## 🧪 测试类型

### 1. 单元测试
**位置**: 各包的`src/__tests__`目录  
**工具**: Vitest  
**目标**: 测试单个函数、组件或模块的功能

#### 测试范围
- 工具函数测试
- 组件渲染测试
- 业务逻辑测试
- 类型定义测试

#### 示例
```typescript
// packages/shared/src/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/date';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2025-01-21');
    expect(formatDate(date)).toBe('2025-01-21');
  });
});
```

### 2. 集成测试
**位置**: `apps/web/src/__tests__/integration/`  
**工具**: React Testing Library + Vitest  
**目标**: 测试组件间的交互和API集成

#### 测试范围
- 组件交互测试
- API集成测试
- 状态管理测试
- 路由测试

#### 示例
```typescript
// apps/web/src/__tests__/integration/analysis.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AnalysisForm } from '../components/AnalysisForm';

describe('AnalysisForm Integration', () => {
  it('should submit analysis successfully', async () => {
    render(<AnalysisForm />);
    
    fireEvent.change(screen.getByLabelText('问题描述'), {
      target: { value: '测试问题' }
    });
    
    fireEvent.click(screen.getByText('开始分析'));
    
    expect(await screen.findByText('分析完成')).toBeInTheDocument();
  });
});
```

### 3. 端到端测试
**位置**: `e2e-tests/`  
**工具**: Playwright  
**目标**: 测试完整的用户流程

#### 测试范围
- 用户注册登录流程
- 奥斯本分析完整流程
- 结果导出功能
- 跨浏览器兼容性

#### 示例
```typescript
// e2e-tests/analysis-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete analysis flow', async ({ page }) => {
  await page.goto('/');
  
  // 填写分析表单
  await page.fill('[data-testid="problem-input"]', '如何提高团队效率');
  await page.click('[data-testid="start-analysis"]');
  
  // 等待分析完成
  await expect(page.locator('[data-testid="analysis-result"]')).toBeVisible();
  
  // 验证结果
  await expect(page.locator('[data-testid="result-title"]')).toContainText('分析结果');
});
```

### 4. 性能测试
**位置**: `tests/performance/`  
**工具**: Lighthouse + Custom Metrics  
**目标**: 测试应用性能指标

#### 测试范围
- 页面加载性能
- 组件渲染性能
- 内存使用情况
- 网络请求性能

## 🚀 运行测试

### 测试命令

#### 运行所有测试
```bash
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行测试并监听文件变化
pnpm test:watch
```

#### 运行特定类型测试
```bash
# 运行单元测试
pnpm test:unit

# 运行集成测试
pnpm test:integration

# 运行端到端测试
pnpm test:e2e

# 运行性能测试
pnpm test:performance
```

#### 运行特定包测试
```bash
# 运行特定包的测试
pnpm --filter @osborn/shared test
pnpm --filter @osborn/web-core test
pnpm --filter @osborn/mobile-core test
```

#### 运行特定文件测试
```bash
# 运行特定测试文件
pnpm test src/__tests__/utils.test.ts

# 运行匹配模式的测试
pnpm test --grep "formatDate"
```

### 测试环境配置

#### 开发环境
```bash
# 启动测试开发环境
pnpm test:dev

# 启动测试UI界面
pnpm test:ui
```

#### CI/CD环境
```bash
# CI环境测试
pnpm test:ci

# 生成测试报告
pnpm test:report
```

## 📊 测试覆盖率

### 覆盖率目标
- **单元测试**: > 80%
- **集成测试**: > 70%
- **端到端测试**: 主要用户流程 100%
- **整体覆盖率**: > 75%

### 覆盖率报告
```bash
# 生成覆盖率报告
pnpm test:coverage

# 查看覆盖率报告
open coverage/index.html
```

### 覆盖率配置
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
});
```

## 🎯 测试最佳实践

### 1. 测试命名规范
```typescript
// 好的测试命名
describe('formatDate function', () => {
  it('should return formatted date for valid input', () => {
    // test implementation
  });
  
  it('should throw error for invalid input', () => {
    // test implementation
  });
});

// 避免的测试命名
describe('test', () => {
  it('works', () => {
    // test implementation
  });
});
```

### 2. 测试结构 (AAA模式)
```typescript
it('should calculate total price correctly', () => {
  // Arrange - 准备测试数据
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  
  // Act - 执行被测试的功能
  const total = calculateTotal(items);
  
  // Assert - 验证结果
  expect(total).toBe(35);
});
```

### 3. 测试数据管理
```typescript
// 使用测试工厂函数
const createUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
});

// 使用测试数据构建器
class UserBuilder {
  private user = createUser();
  
  withName(name: string) {
    this.user.name = name;
    return this;
  }
  
  withEmail(email: string) {
    this.user.email = email;
    return this;
  }
  
  build() {
    return this.user;
  }
}
```

### 4. 异步测试处理
```typescript
// 使用 async/await
it('should fetch user data', async () => {
  const user = await fetchUser(1);
  expect(user).toBeDefined();
  expect(user.id).toBe(1);
});

// 使用 waitFor
it('should show loading state', async () => {
  render(<UserProfile userId={1} />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });
});
```

### 5. Mock和Stub使用
```typescript
// Mock外部依赖
vi.mock('../api/user', () => ({
  fetchUser: vi.fn()
}));

// Mock组件
vi.mock('../components/UserCard', () => ({
  UserCard: ({ user }: { user: User }) => (
    <div data-testid="user-card">{user.name}</div>
  )
}));

// Mock环境变量
vi.stubEnv('API_URL', 'http://test-api.com');
```

## 🔧 测试工具配置

### Vitest配置
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov']
    }
  }
});
```

### Playwright配置
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## 📋 测试检查清单

### 开发阶段
- [ ] 编写单元测试
- [ ] 编写集成测试
- [ ] 运行测试套件
- [ ] 检查测试覆盖率
- [ ] 修复失败的测试

### 代码审查阶段
- [ ] 审查测试覆盖率
- [ ] 审查测试质量
- [ ] 验证测试场景完整性
- [ ] 检查测试性能
- [ ] 确认测试文档

### 发布前检查
- [ ] 运行完整测试套件
- [ ] 运行端到端测试
- [ ] 运行性能测试
- [ ] 检查测试报告
- [ ] 验证测试环境

## 🚨 常见问题解决

### 1. 测试运行缓慢
**问题**: 测试运行时间过长
**解决方案**:
- 使用并行测试
- 优化测试数据
- 使用测试缓存
- 减少不必要的等待

### 2. 测试不稳定
**问题**: 测试结果不一致
**解决方案**:
- 使用固定的测试数据
- 避免依赖外部状态
- 使用适当的等待机制
- 清理测试环境

### 3. 测试覆盖率不足
**问题**: 测试覆盖率低于目标
**解决方案**:
- 识别未覆盖的代码
- 编写更多测试用例
- 使用覆盖率报告分析
- 关注关键业务逻辑

### 4. 测试维护困难
**问题**: 测试难以维护
**解决方案**:
- 使用测试工厂函数
- 建立测试数据管理
- 使用页面对象模式
- 定期重构测试代码

## 📈 测试指标监控

### 关键指标
- **测试通过率**: > 95%
- **测试覆盖率**: > 75%
- **测试执行时间**: < 5分钟
- **测试稳定性**: > 98%

### 监控工具
- **测试报告**: 自动生成测试报告
- **覆盖率报告**: 实时监控覆盖率
- **性能监控**: 监控测试执行性能
- **质量门禁**: 设置质量检查点

## 🎯 总结

HuiTu项目的测试体系已经建立完善，包括单元测试、集成测试、端到端测试和性能测试。通过遵循测试最佳实践，使用合适的测试工具，建立完善的测试流程，确保项目代码质量和功能稳定性。

### 测试体系优势
1. **全面覆盖**: 多层次测试覆盖
2. **自动化**: 完全自动化测试流程
3. **持续集成**: 与CI/CD流程集成
4. **质量保证**: 确保代码质量

### 持续改进
1. **测试覆盖率**: 持续提高测试覆盖率
2. **测试质量**: 不断改进测试质量
3. **测试效率**: 优化测试执行效率
4. **测试维护**: 简化测试维护工作

---

**文档维护**: 项目开发团队  
**最后更新**: 2025-01-21  
**下次审查**: 2025-04-21