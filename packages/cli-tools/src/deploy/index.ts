#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

export function deployProject() {
  console.log('🚀 启动HuiTu开发环境...')
  console.log('📦 使用pnpm workspace进行开发')
  console.log('---')

  // 启动开发服务器
  try {
    console.log('🌐 启动Web应用开发服务器...')
    execSync('pnpm --filter "@osborn/web" run dev', { stdio: 'inherit' })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ 开发服务器启动失败:', errorMessage)
    process.exit(1)
  }
}

// 如果直接运行此文件，则执行部署
if (require.main === module) {
  deployProject()
}