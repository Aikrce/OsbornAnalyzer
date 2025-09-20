import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import aiService from './services/ai/aiService';
import { getUserApiKey } from './utils/apiKeyManager';

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

// 初始化AI服务
const initializeAIService = () => {
  try {
    console.log('🔧 初始化AI服务...');

    // 使用统一的API密钥管理器获取有效配置
    const keyInfo = getUserApiKey();

    if (keyInfo) {
      console.log('🔑 找到有效API密钥:', {
        source: keyInfo.source,
        configName: keyInfo.configName,
        keyLength: keyInfo.apiKey.length,
      });

      // 获取完整的配置信息
      let fullConfig;

      if (keyInfo.source === 'basic') {
        // 从基础配置获取完整信息
        const storedConfig = localStorage.getItem('huitu-ai-config');
        if (storedConfig) {
          const config = JSON.parse(storedConfig);
          fullConfig = {
            apiKey: keyInfo.apiKey,
            model: config.model || 'deepseek-chat',
            temperature: config.temperature || 0.7,
            maxTokens: config.maxTokens || 2000,
          };
        }
      } else {
        // 从多API配置获取完整信息
        const storedMultiConfig = localStorage.getItem(
          'huitu-multi-api-configs'
        );
        if (storedMultiConfig) {
          const multiConfigs = JSON.parse(storedMultiConfig);
          const activeConfig = multiConfigs.find((c: any) => c.isActive);
          if (activeConfig) {
            fullConfig = {
              apiKey: keyInfo.apiKey,
              model: activeConfig.model || 'deepseek-chat',
              temperature: activeConfig.temperature || 0.7,
              maxTokens: activeConfig.maxTokens || 2000,
            };
          }
        }
      }

      if (fullConfig) {
        aiService.configure(fullConfig);
        console.log('✅ AI服务已自动配置:', {
          source: keyInfo.source,
          model: fullConfig.model,
          temperature: fullConfig.temperature,
          maxTokens: fullConfig.maxTokens,
        });
      } else {
        console.warn('⚠️ 无法获取完整配置信息');
      }
    } else {
      console.log('⚠️ 未找到有效的API密钥配置');
    }
  } catch (error) {
    console.error('❌ AI服务初始化失败:', error);
  }
};

// 添加错误处理
try {
  console.log('开始渲染应用...');

  // 初始化AI服务
  initializeAIService();

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
