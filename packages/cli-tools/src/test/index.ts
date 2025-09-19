#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

export function runTests() {
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
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ 测试失败:', errorMessage)
    process.exit(1)
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  runTests()
}