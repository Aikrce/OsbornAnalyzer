#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */

/**
 * GitHub Pages 部署测试脚本
 * 用于验证本地构建是否适合 GitHub Pages 部署
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  if (existsSync(filePath)) {
    log(`✅ ${description}: ${filePath}`, 'green');
    return true;
  } else {
    log(`❌ ${description}: ${filePath}`, 'red');
    return false;
  }
}

function checkFileContent(filePath, expectedContent, description) {
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf8');
    if (content.includes(expectedContent)) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`❌ ${description} - 内容不匹配`, 'red');
      return false;
    }
  } else {
    log(`❌ ${description} - 文件不存在`, 'red');
    return false;
  }
}

async function main() {
  log('🚀 GitHub Pages 部署测试开始', 'bold');
  log('='.repeat(50), 'blue');

  let allChecksPassed = true;

  // 1. 检查工作流文件
  log('\n📋 检查 GitHub Actions 工作流...', 'blue');
  const workflowPath = '.github/workflows/deploy-web.yml';
  if (!checkFile(workflowPath, 'GitHub Pages 工作流文件')) {
    allChecksPassed = false;
  }

  // 2. 检查 Vite 配置
  log('\n⚙️  检查 Vite 配置...', 'blue');
  const viteConfigPath = 'apps/web/vite.config.ts';
  if (!checkFile(viteConfigPath, 'Vite 配置文件')) {
    allChecksPassed = false;
  } else {
    checkFileContent(viteConfigPath, "base: process.env.NODE_ENV === 'production' ? '/OsbornAnalyzer/' : '/'", 'Base 路径配置');
  }

  // 3. 检查构建脚本
  log('\n🔨 检查构建脚本...', 'blue');
  const packageJsonPath = 'apps/web/package.json';
  if (!checkFile(packageJsonPath, 'Package.json 文件')) {
    allChecksPassed = false;
  } else {
    checkFileContent(packageJsonPath, 'build:github', 'GitHub Pages 构建脚本');
  }

  // 4. 执行构建测试
  log('\n🏗️  执行构建测试...', 'blue');
  try {
    log('正在构建项目...', 'yellow');
    execSync('cd apps/web && pnpm build:github', { stdio: 'inherit' });
    log('✅ 构建成功', 'green');
  } catch {
    log('❌ 构建失败', 'red');
    allChecksPassed = false;
  }

  // 5. 检查构建输出
  log('\n📦 检查构建输出...', 'blue');
  const distPath = 'apps/web/dist';
  if (!checkFile(distPath, '构建输出目录')) {
    allChecksPassed = false;
  } else {
    checkFile(join(distPath, 'index.html'), '主页面文件');
    checkFile(join(distPath, '.nojekyll'), '.nojekyll 文件');
    checkFile(join(distPath, 'assets'), '资源目录');
  }

  // 6. 检查 HTML 内容
  log('\n🌐 检查 HTML 内容...', 'blue');
  const indexPath = join(distPath, 'index.html');
  if (existsSync(indexPath)) {
    const htmlContent = readFileSync(indexPath, 'utf8');
    if (htmlContent.includes('/OsbornAnalyzer/')) {
      log('✅ HTML 中的路径配置正确', 'green');
    } else {
      log('❌ HTML 中的路径配置可能有问题', 'red');
      allChecksPassed = false;
    }
  }

  // 7. 生成测试报告
  log('\n📊 测试报告', 'bold');
  log('='.repeat(50), 'blue');
  
  if (allChecksPassed) {
    log('🎉 所有检查通过！项目已准备好部署到 GitHub Pages', 'green');
    log('\n📝 下一步操作：', 'blue');
    log('1. 提交所有更改到 Git');
    log('2. 推送到 main 分支');
    log('3. 检查 GitHub Actions 页面确认部署');
    log('4. 访问 https://aikrce.github.io/OsbornAnalyzer/ 验证部署');
  } else {
    log('⚠️  发现问题，请修复后再试', 'red');
    log('\n🔧 建议操作：', 'blue');
    log('1. 检查上述失败的检查项');
    log('2. 修复配置问题');
    log('3. 重新运行此测试脚本');
  }

  log('\n📚 更多信息请查看：docs/guides/GITHUB_PAGES_DEPLOYMENT.md', 'yellow');
}

main().catch((error) => {
  console.error(error);
});
