#!/usr/bin/env node

/**
 * 移动端测试脚本
 * 用于测试移动端兼容性和性能
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
  log('📱 移动端兼容性测试开始', 'bold');
  log('='.repeat(50), 'blue');

  let allChecksPassed = true;

  // 1. 检查移动端CSS文件
  log('\n📋 检查移动端样式文件...', 'blue');
  const mobileCSSPath = 'apps/web/src/styles/mobile.css';
  if (!checkFile(mobileCSSPath, '移动端CSS文件')) {
    allChecksPassed = false;
  }

  // 2. 检查移动端优化工具
  log('\n⚙️  检查移动端优化工具...', 'blue');
  const mobileOptPath = 'apps/web/src/utils/mobileOptimization.ts';
  if (!checkFile(mobileOptPath, '移动端优化工具')) {
    allChecksPassed = false;
  }

  // 3. 检查移动端Hook
  log('\n🔧 检查移动端Hook...', 'blue');
  const mobileHookPath = 'apps/web/src/hooks/useMobile.ts';
  if (!checkFile(mobileHookPath, '移动端Hook')) {
    allChecksPassed = false;
  }

  // 4. 检查HTML中的移动端配置
  log('\n🌐 检查HTML移动端配置...', 'blue');
  const indexPath = 'apps/web/index.html';
  if (checkFile(indexPath, 'HTML文件')) {
    checkFileContent(indexPath, 'viewport', 'Viewport meta标签');
    checkFileContent(indexPath, 'width=device-width', '响应式viewport配置');
    checkFileContent(indexPath, 'initial-scale=1', '初始缩放配置');
  }

  // 5. 检查主应用文件中的移动端初始化
  log('\n🚀 检查移动端初始化...', 'blue');
  const mainPath = 'apps/web/src/main.tsx';
  if (checkFile(mainPath, '主应用文件')) {
    checkFileContent(mainPath, 'mobile.css', '移动端CSS导入');
    checkFileContent(mainPath, 'initMobileOptimizations', '移动端优化初始化');
  }

  // 6. 执行构建测试
  log('\n🏗️  执行移动端构建测试...', 'blue');
  try {
    log('正在构建项目...', 'yellow');
    execSync('cd apps/web && pnpm build', { stdio: 'inherit' });
    log('✅ 构建成功', 'green');
  } catch {
    log('❌ 构建失败', 'red');
    allChecksPassed = false;
  }

  // 7. 检查构建输出
  log('\n📦 检查构建输出...', 'blue');
  const distPath = 'apps/web/dist';
  if (checkFile(distPath, '构建输出目录')) {
    checkFile(join(distPath, 'index.html'), '主页面文件');
    checkFile(join(distPath, 'assets'), '资源目录');
  }

  // 8. 生成移动端测试报告
  log('\n📊 移动端测试报告', 'bold');
  log('='.repeat(50), 'blue');
  
  if (allChecksPassed) {
    log('🎉 所有移动端检查通过！', 'green');
    log('\n📝 移动端优化建议：', 'blue');
    log('1. 在真机上测试触摸交互');
    log('2. 测试不同屏幕尺寸的适配');
    log('3. 验证网络慢速下的性能');
    log('4. 测试横竖屏切换');
    log('5. 验证键盘弹出时的布局');
  } else {
    log('⚠️  发现问题，请修复后再试', 'red');
    log('\n🔧 建议操作：', 'blue');
    log('1. 检查上述失败的检查项');
    log('2. 修复移动端配置问题');
    log('3. 重新运行此测试脚本');
  }

  log('\n📚 移动端优化文档：', 'yellow');
  log('- 触摸目标至少44px');
  log('- 字体大小至少16px防止缩放');
  log('- 使用CSS媒体查询适配不同屏幕');
  log('- 优化图片和资源加载');
  log('- 处理键盘弹出和横竖屏切换');
}

main().catch((error) => {
  console.error(error);
});
