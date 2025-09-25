# GitHub Actions部署失败问题分析与解决方案

## 📋 问题概述

本文档分析了HuiTu项目在GitHub Actions部署过程中遇到的常见问题，并提供了详细的解决方案和最佳实践。

## 🔍 核心问题分析

### 主要问题类型

- **NPM_TOKEN错误排查**
- **Git认证问题解决**
- **YAML语法验证**
- **环境依赖兼容性检查**
- **完整部署工作流配置**

## 🛠️ 技术栈信息

```json
{
  "CI/CD": "GitHub Actions",
  "Package Manager": "pnpm",
  "Language": "TypeScript",
  "Frontend": "React + Vite",
  "Mobile": "Android + iOS"
}
```

## 📊 问题解决进度

### 已完成任务 ✅

- [x] 分析GitHub Actions日志，识别具体的错误类型和位置
- [x] 检查NPM_TOKEN配置，验证密钥格式和权限设置
- [x] 排查Git认证问题，检查SSH密钥或PAT令牌配置
- [x] 验证YAML语法正确性，检查缩进和关键字使用
- [x] 检查环境依赖问题，确认Node.js版本和pnpm兼容性
- [x] 提供针对每种错误类型的详细解决方案和修复步骤
- [x] 创建完整的GitHub Actions工作流配置示例
- [x] 编写部署问题排查指南和最佳实践文档

## 🚨 常见部署问题及解决方案

### 1. NPM_TOKEN配置问题

**问题描述**: 构建过程中出现NPM认证失败

**解决方案**:
```yaml
# 在GitHub仓库设置中添加secrets
NPM_TOKEN: your_npm_token_here
```

**验证步骤**:
1. 检查token格式是否正确
2. 确认token权限是否足够
3. 验证token是否过期

### 2. Git认证问题

**问题描述**: 代码推送或拉取时出现认证失败

**解决方案**:
```yaml
# 使用Personal Access Token (PAT)
- name: Checkout code
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

### 3. YAML语法错误

**问题描述**: GitHub Actions工作流文件语法错误

**解决方案**:
- 检查缩进是否正确（使用2个空格）
- 验证关键字拼写
- 确保所有步骤都有正确的name和uses

### 4. 环境依赖问题

**问题描述**: Node.js版本不兼容或pnpm安装失败

**解决方案**:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'pnpm'
```

### 5. 构建失败问题

**问题描述**: 项目构建过程中出现错误

**解决方案**:
1. 检查package.json中的脚本配置
2. 确认所有依赖都已正确安装
3. 验证TypeScript配置是否正确

## 🔧 完整工作流配置示例

```yaml
name: Deploy Web App to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'pnpm'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 9
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm --filter @osborn/web build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./apps/web/dist
```

## 📋 部署检查清单

### 部署前检查
- [ ] GitHub Pages已启用
- [ ] 必要的secrets已配置
- [ ] 工作流文件语法正确
- [ ] 本地构建测试通过

### 部署后验证
- [ ] 网站可正常访问
- [ ] 所有页面路由正常
- [ ] 静态资源加载正常
- [ ] 功能测试通过

## 🎯 最佳实践建议

### 1. 环境配置
- 使用固定版本的Node.js和pnpm
- 配置适当的缓存策略
- 设置合理的超时时间

### 2. 错误处理
- 添加详细的错误日志
- 设置失败通知机制
- 提供回滚方案

### 3. 性能优化
- 使用并行构建
- 优化依赖安装
- 减少构建时间

## 📞 技术支持

如遇到其他部署问题，请：

1. **查看GitHub Actions日志**
   - 进入仓库 → Actions
   - 查看具体错误信息

2. **检查本地构建**
   ```bash
   pnpm --filter @osborn/web build
   ```

3. **验证配置**
   - 检查secrets配置
   - 验证工作流文件语法

4. **联系支持**
   - 创建GitHub Issue
   - 提供详细的错误日志

---

**文档类型**: 问题排查指南  
**适用场景**: GitHub Actions部署问题  
**维护者**: HuiTu开发团队  
**最后更新**: 2025-01-21
