#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 启动HuiTu开发环境...')
console.log('📦 使用pnpm workspace进行开发')
console.log('---')

// 启动开发服务器
try {
  console.log('🌐 启动Web应用开发服务器...')
  execSync('pnpm --filter "@osborn/web" run dev', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ 开发服务器启动失败:', error.message)
  process.exit(1)
}