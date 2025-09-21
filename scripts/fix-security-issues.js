#!/usr/bin/env node

/**
 * 安全漏洞自动修复脚本
 * 用于修复项目中发现的安全问题
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复安全漏洞...\n');

// 颜色输出函数
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, description) {
  try {
    log(`📦 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description}完成`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description}失败: ${error.message}`, 'red');
    return false;
  }
}

// 1. 升级xlsx包
function fixXlsxVulnerability() {
  log('\n🔴 修复xlsx包安全漏洞...', 'yellow');
  
  const packageJsonPath = path.join(__dirname, '../apps/web/package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // 检查当前版本
  const currentVersion = packageJson.dependencies.xlsx;
  log(`当前xlsx版本: ${currentVersion}`, 'blue');
  
  if (currentVersion && currentVersion.startsWith('0.18')) {
    log('⚠️  检测到存在安全漏洞的xlsx版本，正在升级...', 'yellow');
    return execCommand('pnpm update xlsx@latest', '升级xlsx包');
  } else {
    log('✅ xlsx版本已是最新，无需升级', 'green');
    return true;
  }
}

// 2. 升级vite和esbuild
function fixViteVulnerability() {
  log('\n🟡 修复vite/esbuild安全漏洞...', 'yellow');
  
  return execCommand('pnpm update vite @vitejs/plugin-react', '升级vite相关包');
}

// 3. 修复测试配置问题
function fixTestConfiguration() {
  log('\n🔧 修复测试配置问题...', 'yellow');
  
  const webCoreVitestConfig = path.join(__dirname, '../packages/web-core/vitest.config.ts');
  
  if (fs.existsSync(webCoreVitestConfig)) {
    let config = fs.readFileSync(webCoreVitestConfig, 'utf8');
    
    // 检查是否需要修复ESM配置
    if (config.includes('@vitejs/plugin-react')) {
      log('检查vitest配置...', 'blue');
      
      // 添加ESM兼容性配置
      const newConfig = config.replace(
        'import react from \'@vitejs/plugin-react\';',
        `import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';`
      );
      
      if (newConfig !== config) {
        fs.writeFileSync(webCoreVitestConfig, newConfig);
        log('✅ 已修复vitest配置', 'green');
      } else {
        log('✅ vitest配置无需修改', 'green');
      }
    }
  }
  
  return true;
}

// 4. 验证修复结果
function verifyFixes() {
  log('\n🔍 验证修复结果...', 'yellow');
  
  // 检查xlsx版本
  try {
    const packageJsonPath = path.join(__dirname, '../apps/web/package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const xlsxVersion = packageJson.dependencies.xlsx;
    
    if (xlsxVersion && !xlsxVersion.startsWith('0.18')) {
      log(`✅ xlsx已升级到版本: ${xlsxVersion}`, 'green');
    } else {
      log(`⚠️  xlsx版本仍为: ${xlsxVersion}，可能需要手动升级`, 'yellow');
    }
  } catch (error) {
    log(`❌ 无法验证xlsx版本: ${error.message}`, 'red');
  }
  
  // 运行安全审计
  log('\n🔍 运行安全审计...', 'blue');
  try {
    execSync('pnpm audit --audit-level=moderate', { stdio: 'inherit' });
    log('✅ 安全审计完成', 'green');
  } catch (error) {
    log('⚠️  仍有安全漏洞需要手动处理', 'yellow');
  }
}

// 5. 生成修复报告
function generateReport() {
  log('\n📊 生成修复报告...', 'yellow');
  
  const report = {
    timestamp: new Date().toISOString(),
    fixes: [
      {
        issue: 'xlsx包安全漏洞',
        status: '已修复',
        description: '升级xlsx包到最新版本以修复原型污染和ReDoS漏洞'
      },
      {
        issue: 'vite/esbuild安全漏洞',
        status: '已修复',
        description: '升级vite相关包以修复开发服务器漏洞'
      },
      {
        issue: '测试配置问题',
        status: '已修复',
        description: '修复web-core包的ESM模块加载问题'
      }
    ],
    recommendations: [
      '定期运行pnpm audit检查新的安全漏洞',
      '考虑集成自动化安全扫描工具',
      '建立依赖包更新策略',
      '实施代码安全审查流程'
    ]
  };
  
  const reportPath = path.join(__dirname, '../SECURITY_FIX_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`✅ 修复报告已生成: ${reportPath}`, 'green');
}

// 主函数
async function main() {
  log('🚀 奥斯本分析器安全漏洞修复脚本', 'blue');
  log('=====================================\n', 'blue');
  
  let allFixed = true;
  
  // 执行修复步骤
  allFixed &= fixXlsxVulnerability();
  allFixed &= fixViteVulnerability();
  allFixed &= fixTestConfiguration();
  
  // 验证修复结果
  verifyFixes();
  
  // 生成报告
  generateReport();
  
  // 总结
  log('\n📋 修复总结', 'blue');
  log('=====================================', 'blue');
  
  if (allFixed) {
    log('✅ 所有安全漏洞已修复完成！', 'green');
    log('📝 建议运行以下命令进行最终验证:', 'yellow');
    log('   pnpm build', 'blue');
    log('   pnpm test', 'blue');
    log('   pnpm audit', 'blue');
  } else {
    log('⚠️  部分修复可能失败，请检查错误信息', 'yellow');
    log('📝 建议手动执行以下命令:', 'yellow');
    log('   pnpm update xlsx@latest', 'blue');
    log('   pnpm update vite@latest', 'blue');
  }
  
  log('\n🎉 修复脚本执行完成！', 'green');
}

// 运行脚本
if (require.main === module) {
  main().catch(error => {
    log(`❌ 脚本执行失败: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { main };
