// 最终解决方案 - 修复 401 错误的根本原因
// 在浏览器控制台中运行此脚本

console.log('🔧 应用最终解决方案...\n');

// 1. 检查当前配置状态
console.log('📋 1. 检查当前配置状态:');

const basicConfig = localStorage.getItem('huitu-ai-config');
const multiConfig = localStorage.getItem('huitu-multi-api-configs');

let hasValidConfig = false;
let activeApiKey = null;

if (multiConfig) {
  try {
    const configs = JSON.parse(multiConfig);
    if (Array.isArray(configs)) {
      const active = configs.find(c => c.isActive);
      if (active && active.apiKey && active.apiKey.trim().length > 0) {
        hasValidConfig = true;
        activeApiKey = active.apiKey;
        console.log('✅ 找到多API配置中的活跃密钥');
      }
    }
  } catch (e) {
    console.log('❌ 多API配置解析失败');
  }
}

if (!hasValidConfig && basicConfig) {
  try {
    const config = JSON.parse(basicConfig);
    if (config.apiKey && config.apiKey.trim().length > 0) {
      hasValidConfig = true;
      activeApiKey = config.apiKey;
      console.log('✅ 找到基础配置中的密钥');
    }
  } catch (e) {
    console.log('❌ 基础配置解析失败');
  }
}

console.log(`配置状态: ${hasValidConfig ? '有效' : '无效'}`);
console.log(`API密钥: ${activeApiKey ? `存在 (${activeApiKey.length}字符)` : '不存在'}`);

// 2. 解决方案选择
console.log('\n💡 2. 解决方案选择:');

if (!hasValidConfig) {
  console.log('🚨 主要问题: 没有有效的API密钥配置');
  console.log('\n🔧 解决方案 A: 配置API密钥');
  console.log('1. 访问AI配置页面');
  console.log('2. 输入有效的DeepSeek API密钥');
  console.log('3. 保存配置');
  console.log('4. 刷新页面');
  
  console.log('\n🔧 解决方案 B: 禁用自动API分析');
  console.log('1. 修改页面默认分析类型为本地分析');
  console.log('2. 避免自动触发API调用');
  
  console.log('\n🔧 解决方案 C: 清除所有配置重新开始');
  console.log('1. 清除localStorage中的所有配置');
  console.log('2. 重新配置应用');
} else {
  console.log('✅ 配置存在，401错误可能是其他原因');
  console.log('\n🔧 可能的解决方案:');
  console.log('1. 检查API密钥是否过期');
  console.log('2. 检查DeepSeek账户状态');
  console.log('3. 重新生成API密钥');
}

// 3. 立即修复选项
console.log('\n🛠️ 3. 立即修复选项:');

if (!hasValidConfig) {
  console.log('选项 1: 清除配置，禁用自动API分析');
  console.log('localStorage.removeItem("huitu-ai-config");');
  console.log('localStorage.removeItem("huitu-multi-api-configs");');
  console.log('// 然后刷新页面');
  
  console.log('\n选项 2: 设置默认分析类型为本地');
  console.log('// 这需要修改代码，将默认analysisType改为"local"');
  
  console.log('\n选项 3: 添加有效的API密钥');
  console.log('// 访问AI配置页面设置API密钥');
} else {
  console.log('选项 1: 测试API密钥有效性');
  console.log('// 运行API密钥验证');
  
  console.log('\n选项 2: 重新配置API密钥');
  console.log('// 清除现有配置，重新设置');
}

// 4. 提供具体的修复命令
console.log('\n🔧 4. 具体修复命令:');

if (!hasValidConfig) {
  console.log('立即修复命令（清除配置）:');
  console.log(`
// 清除所有配置
localStorage.removeItem("huitu-ai-config");
localStorage.removeItem("huitu-multi-api-configs");

// 刷新页面
location.reload();
  `);
  
  console.log('或者手动设置API密钥:');
  console.log(`
// 设置基础配置
localStorage.setItem("huitu-ai-config", JSON.stringify({
  apiKey: "你的API密钥",
  model: "deepseek-chat",
  temperature: 0.7,
  maxTokens: 2000
}));

// 刷新页面
location.reload();
  `);
} else {
  console.log('测试API密钥命令:');
  console.log(`
// 测试当前API密钥
fetch('https://api.deepseek.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${activeApiKey}',
  },
  body: JSON.stringify({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'test' }],
    max_tokens: 10
  })
}).then(response => {
  console.log('API测试结果:', response.status);
  return response.text();
}).then(data => {
  console.log('响应数据:', data);
});
  `);
}

console.log('\n✅ 解决方案分析完成！');
console.log('请根据您的需求选择合适的解决方案。');
