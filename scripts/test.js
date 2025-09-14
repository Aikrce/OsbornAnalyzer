#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

console.log('🧪 运行HuiTu项目测试...')
console.log('📦 运行所有包的测试套件')
console.log('---')

// 运行测试
try {
  console.log('📦 测试共享包...')
  execSync('pnpm --filter "@huitu/shared" run test', { stdio: 'inherit' })
  
  console.log('🌐 测试Web核心包...')
  execSync('pnpm --filter "@huitu/web-core" run test', { stdio: 'inherit' })
  
  console.log('📱 测试移动端核心包...')
  execSync('pnpm --filter "@huitu/mobile-core" run test', { stdio: 'inherit' })
  
  console.log('🛠️ 测试CLI工具包...')
  execSync('pnpm --filter "@huitu/cli-tools" run test', { stdio: 'inherit' })
  
  console.log('🎯 测试Web应用...')
  execSync('pnpm --filter "@huitu/web" run test', { stdio: 'inherit' })
  
  console.log('✅ 所有测试通过！')
} catch (error) {
  console.error('❌ 测试失败:', error.message)
  process.exit(1)
}