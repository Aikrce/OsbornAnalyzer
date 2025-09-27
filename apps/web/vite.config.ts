import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // 设置 base 路径为 GitHub Pages 仓库名
  base: process.env.NODE_ENV === 'production' ? '/OsbornAnalyzer/' : '/',
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
      '@osborn/web-core': path.resolve(
        __dirname,
        '../../packages/web-core/src'
      ),
    },
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
    // 移动端优化
    cssCodeSplit: true,
    // 优化chunk大小
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 更精细的代码分割
        manualChunks: id => {
          // 将React相关库分组
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // 将路由相关库分组
          if (id.includes('react-router')) {
            return 'router-vendor';
          }
          // 将UI组件库分组
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-vendor';
          }
          // 将查询相关库分组
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          // 将工具库分组
          if (id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'utils';
          }
          // 将AI服务分组
          if (id.includes('@osborn/shared')) {
            return 'ai-services';
          }
          // 将协作服务分组
          if (id.includes('@osborn/web-core')) {
            return 'collaboration-services';
          }
          // 将页面组件按路由分组
          if (id.includes('/pages/')) {
            return 'pages';
          }
          // 将hooks分组
          if (id.includes('/hooks/')) {
            return 'hooks';
          }
          // 将组件分组
          if (id.includes('/components/')) {
            return 'components';
          }
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
  cacheDir: 'node_modules/.vite',
  // 预加载优化
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'html') {
        // 只预加载关键资源
        if (
          filename.includes('react-vendor') ||
          filename.includes('router-vendor')
        ) {
          return filename;
        }
      }
      return { relative: true };
    },
  },
});
