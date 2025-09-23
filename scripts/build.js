#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

console.log('🚀 开始构建HuiTu项目...')
console.log(`📦 项目版本: ${packageJson.version}`)
console.log('---')

// 构建所有包
try {
  console.log('📦 构建共享包...')
  execSync('pnpm --filter "@osborn/shared" run build', { stdio: 'inherit' })
  
  console.log('🌐 构建Web核心包...')
  execSync('pnpm --filter "@osborn/web-core" run build', { stdio: 'inherit' })
  
  console.log('📱 构建移动端核心包...')
  execSync('pnpm --filter "@osborn/mobile-core" run build', { stdio: 'inherit' })
  
  console.log('🛠️ 构建CLI工具包...')
  execSync('pnpm --filter "@osborn/cli-tools" run build', { stdio: 'inherit' })
  
  console.log('🎯 构建Web应用...')
  execSync('pnpm --filter "@osborn/web" run build', { stdio: 'inherit' })
  
  console.log('✅ 所有包构建完成！')
} catch (error) {
  console.error('❌ 构建失败:', error.message)
  process.exit(1)
}