import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

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

// AI服务将在需要时延迟初始化

// 添加错误处理
try {
  console.log('开始渲染应用...');

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  console.log('找到root元素，创建React root...');
  const root = ReactDOM.createRoot(rootElement);
  console.log('渲染App组件...');
  root.render(React.createElement(App));
  console.log('应用渲染完成！');
} catch (error) {
  console.error('Failed to render app:', error);
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : '';
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #ffebee; border: 2px solid #f44336; border-radius: 8px; margin: 20px;">
      <h1 style="color: #d32f2f;">应用加载失败</h1>
      <p><strong>错误信息:</strong> ${errorMessage}</p>
      <p><strong>错误堆栈:</strong></p>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${errorStack}</pre>
      <p>请刷新页面重试</p>
    </div>
  `;
}
