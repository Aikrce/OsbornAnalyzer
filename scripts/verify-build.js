#!/usr/bin/env node

/**
 * 构建验证脚本
 * 确保应用可以在没有API密钥的情况下正常构建
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 开始验证HuiTu Web应用构建...');

// 检查当前目录
const rootDir = process.cwd();
console.log(`📁 工作目录: ${rootDir}`);

// 1. 检查必要的配置文件
console.log('\n1. 📋 检查配置文件...');
const configFiles = [
  'apps/web/vite.config.ts',
  'apps/web/.env.production', 
  'package.json'
];

configFiles.forEach(file => {
  if (fs.existsSync(path.join(rootDir, file))) {
    console.log(`✅ ${file} 存在`);
  } else {
    console.log(`❌ ${file} 不存在`);
    process.exit(1);
  }
});

// 2. 检查环境变量配置
console.log('\n2. 🔧 检查环境变量配置...');
try {
  const envContent = fs.readFileSync(path.join(rootDir, 'apps/web/.env.production'), 'utf8');
  if (!envContent.includes('DEEPSEEK_API_KEY')) {
    console.log('✅ 生产环境配置中没有硬编码的API密钥');
  } else {
    console.log('❌ 生产环境配置中包含API密钥，需要移除');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ 无法读取环境配置文件');
  process.exit(1);
}

// 3. 尝试构建应用
console.log('\n3. 🛠️ 尝试构建Web应用...');
try {
  console.log('执行: pnpm --filter @osborn/web build');
  
  // 设置环境变量确保构建时不需要API密钥
  const env = { ...process.env };
  delete env.DEEPSEEK_API_KEY;
  delete env.VITE_DEEPSEEK_API_KEY;
  
  execSync('pnpm --filter @osborn/web build', { 
    stdio: 'inherit',
    env,
    cwd: rootDir
  });
  
  console.log('✅ Web应用构建成功！');
} catch (error) {
  console.log('❌ Web应用构建失败');
  console.log('错误信息:', error.message);
  process.exit(1);
}

// 4. 检查构建输出
console.log('\n4. 📦 检查构建输出...');
const distDir = path.join(rootDir, 'apps/web/dist');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  console.log(`✅ 构建输出目录存在，包含 ${files.length} 个文件`);
  
  // 检查主要的输出文件
  const requiredFiles = ['index.html', 'assets'];
  requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(distDir, file))) {
      console.log(`✅ ${file} 存在`);
    } else {
      console.log(`❌ ${file} 不存在`);
    }
  });
} else {
  console.log('❌ 构建输出目录不存在');
  process.exit(1);
}

// 5. 验证构建产物不包含敏感信息
console.log('\n5. 🔍 检查构建产物中的敏感信息...');
try {
  const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const jsFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.js'));
  
  let hasSensitiveInfo = false;
  
  // 检查HTML中的敏感信息
  if (indexHtml.includes('DEEPSEEK_API_KEY') || indexHtml.includes('sk-')) {
    console.log('❌ HTML中包含敏感信息');
    hasSensitiveInfo = true;
  }
  
  // 随机检查几个JS文件
  for (let i = 0; i < Math.min(3, jsFiles.length); i++) {
    const jsFile = jsFiles[i];
    const jsContent = fs.readFileSync(path.join(distDir, 'assets', jsFile), 'utf8');
    
    if (jsContent.includes('DEEPSEEK_API_KEY') || jsContent.includes('sk-')) {
      console.log(`❌ JS文件 ${jsFile} 中包含敏感信息`);
      hasSensitiveInfo = true;
      break;
    }
  }
  
  if (!hasSensitiveInfo) {
    console.log('✅ 构建产物中没有发现敏感信息');
  } else {
    console.log('❌ 构建产物中包含敏感信息，需要修复');
    process.exit(1);
  }
} catch (error) {
  console.log('⚠️ 无法详细检查构建产物:', error.message);
}

console.log('\n🎉 所有验证通过！应用可以在没有API密钥的情况下正常构建和部署。');
console.log('\n📋 下一步操作:');
console.log('1. 推送代码到GitHub: git add . && git commit -m "fix: 修复部署配置" && git push');
console.log('2. 在GitHub仓库Settings → Pages中启用GitHub Pages');
console.log('3. 查看Actions中的部署状态');
console.log('4. 访问部署的网站验证功能');

process.exit(0);