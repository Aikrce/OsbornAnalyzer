# HuiTu项目测试指南

## 测试概览
HuiTu项目采用多层次的测试策略，确保代码质量和功能稳定性。

## 测试类型
1. 单元测试 - 各包的src/__tests__目录，使用Vitest
2. 集成测试 - apps/web/src/__tests__/integration/，使用React Testing Library
3. 端到端测试 - e2e-tests/，使用Playwright

## 运行测试
- 所有测试: pnpm test
- 特定包: pnpm --filter @huitu/shared test
- 端到端: npx playwright test
- 覆盖率: pnpm test:coverage

## 测试覆盖率目标
- 单元测试: > 80%
- 集成测试: > 70%
- 端到端测试: 主要用户流程 100%

## 测试最佳实践
1. 使用描述性测试名称
2. 遵循AAA模式: Arrange, Act, Assert
3. 每个测试只验证一个行为
4. 对外部依赖进行Mock
5. 使用async/await处理异步操作
