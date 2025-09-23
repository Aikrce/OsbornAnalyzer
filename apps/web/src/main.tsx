import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/mobile.css';
import App from './App.tsx';
import { initMobileOptimizations } from './utils/mobileOptimization';

// 添加全局错误处理
window.addEventListener('error', event => {
  console.error('全局错误:', event.error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #ffebee; border: 2px solid #f44336; border-radius: 8px; margin: 20px;">
      <h1 style="color: #d32f2f;">JavaScript错误</h1>
      <p><strong>错误信息:</strong> ${event.error?.message || '未知错误'}</p>
      <p><strong>错误堆栈:</strong></p>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${event.error?.stack || '无堆栈信息'}</pre>
      <p>请刷新页面重试</p>
    </div>
  `;
});

window.addEventListener('unhandledrejection', event => {
  console.error('未处理的Promise拒绝:', event.reason);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #ffebee; border: 2px solid #f44336; border-radius: 8px; margin: 20px;">
      <h1 style="color: #d32f2f;">Promise错误</h1>
      <p><strong>错误信息:</strong> ${event.reason?.message || '未知错误'}</p>
      <p>请刷新页面重试</p>
    </div>
  `;
});

// 初始化移动端优化
initMobileOptimizations();

// AI服务将在需要时延迟初始化

// 简化的渲染逻辑
console.log('开始渲染应用...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<h1>错误：找不到root元素</h1>';
} else {
  console.log('找到root元素，创建React root...');
  const root = ReactDOM.createRoot(rootElement);
  console.log('渲染App组件...');
  root.render(React.createElement(App));
  console.log('应用渲染完成！');
}
