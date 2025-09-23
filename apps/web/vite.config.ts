import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // 设置 base 路径为 GitHub Pages 仓库名
  base: process.env.NODE_ENV === 'production' ? '/HuiTu/' : '/',
  plugins: [
    react({
      // 优化JSX运行时
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@osborn/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@osborn/web-core': path.resolve(__dirname, '../../packages/web-core/src')
    }
  },
  server: {
    port: 5371,
    host: '0.0.0.0',
    open: true,
    strictPort: false, // 允许端口自动选择
    // 启用HMR优化
    hmr: {
      overlay: true,
      port: undefined, // 让HMR自动选择端口
    },
    // 预构建优化相关配置可放在 optimizeDeps 选项中
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    // 启用压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 优化chunk大小
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 更精细的代码分割
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-slot'],
          'query-vendor': ['@tanstack/react-query'],
          'utils': ['clsx', 'tailwind-merge', 'lucide-react'],
          'ai-services': ['@osborn/shared'],
          'collaboration-services': ['@osborn/web-core'],
        },
        // 优化chunk命名
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'zustand',
      'clsx',
      'tailwind-merge',
      'lucide-react',
    ],
    exclude: ['@osborn/shared', '@osborn/web-core'],
  },
  // 启用构建缓存
  cacheDir: 'node_modules/.vite'
})
