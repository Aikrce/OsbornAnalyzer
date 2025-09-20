#!/usr/bin/env node

/**
 * GitHub Actions Workflow 测试脚本
 * 用于验证 workflow 配置是否正确
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 检查 GitHub Actions Workflow 配置...\n');

// 检查 workflow 文件
const workflowsDir = path.join(__dirname, '..', '.github', 'workflows');
const workflowFiles = fs.readdirSync(workflowsDir);

console.log('📁 发现的 workflow 文件:');
workflowFiles.forEach(file => {
  const filePath = path.join(workflowsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const isDisabled = content.includes('on: {}');
  const status = isDisabled ? '❌ 已禁用' : '✅ 活跃';
  console.log(`  ${file}: ${status}`);
});

console.log('\n🔧 检查主要配置:');

// 检查 main.yml 是否存在
const mainWorkflow = path.join(workflowsDir, 'main.yml');
if (fs.existsSync(mainWorkflow)) {
  console.log('✅ main.yml 存在');
  
  const content = fs.readFileSync(mainWorkflow, 'utf8');
  
  // 检查关键配置
  const checks = [
    { name: 'Node.js 版本', pattern: /node-version.*20/, found: content.includes('node-version: \'20\'') },
    { name: 'pnpm 版本', pattern: /version.*9\.0\.0/, found: content.includes('version: \'9.0.0\'') },
    { name: 'GitHub Pages 部署', pattern: /deploy-pages/, found: content.includes('deploy-pages') },
    { name: '权限配置', pattern: /pages: write/, found: content.includes('pages: write') },
    { name: '构建脚本', pattern: /build:github/, found: content.includes('build:github') }
  ];
  
  checks.forEach(check => {
    console.log(`  ${check.found ? '✅' : '❌'} ${check.name}`);
  });
} else {
  console.log('❌ main.yml 不存在');
}

console.log('\n📦 检查项目配置:');

// 检查 package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log(`✅ 项目名称: ${packageJson.name}`);
  console.log(`✅ 版本: ${packageJson.version}`);
  console.log(`✅ pnpm 版本: ${packageJson.packageManager}`);
}

// 检查 web app 配置
const webPackageJsonPath = path.join(__dirname, '..', 'apps', 'web', 'package.json');
if (fs.existsSync(webPackageJsonPath)) {
  const webPackageJson = JSON.parse(fs.readFileSync(webPackageJsonPath, 'utf8'));
  const hasBuildGithub = webPackageJson.scripts && webPackageJson.scripts['build:github'];
  console.log(`✅ Web App 构建脚本: ${hasBuildGithub ? '存在' : '缺失'}`);
}

console.log('\n🚀 建议的下一步操作:');
console.log('1. 提交这些更改到 main 分支');
console.log('2. 检查 GitHub Actions 页面是否显示新的 workflow');
console.log('3. 手动触发 workflow 进行测试');
console.log('4. 监控部署状态，确保没有 NPM_TOKEN 错误');

console.log('\n✨ 配置检查完成！');
