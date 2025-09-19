// AI 配置诊断脚本
// 在浏览器控制台中运行此脚本来检查配置状态

console.log('🔍 开始 HuiTu AI 配置诊断...\n');

// 1. 检查 localStorage 配置
console.log('📋 1. 检查 localStorage 配置:');
const configs = ['huitu-ai-config', 'huitu-multi-api-configs'];
let hasValidConfig = false;
let foundApiKey = '';

configs.forEach(key => {
  const stored = localStorage.getItem(key);
  console.log(`  ${key}:`, stored ? '✅ 有数据' : '❌ 无数据');
  
  if (stored) {
    try {
      const config = JSON.parse(stored);
      console.log(`    配置内容:`, config);
      
      if (Array.isArray(config)) {
        // 多API配置
        const activeConfig = config.find(c => c.isActive);
        if (activeConfig && activeConfig.apiKey) {
          hasValidConfig = true;
          foundApiKey = activeConfig.apiKey;
          console.log(`    ✅ 找到活跃配置: ${activeConfig.name}`);
          console.log(`    API密钥长度: ${activeConfig.apiKey.length}`);
          console.log(`    API密钥前缀: ${activeConfig.apiKey.substring(0, 10)}...`);
        }
      } else if (config.apiKey) {
        // 单API配置
        hasValidConfig = true;
        foundApiKey = config.apiKey;
        console.log(`    ✅ 找到单API配置`);
        console.log(`    API密钥长度: ${config.apiKey.length}`);
        console.log(`    API密钥前缀: ${config.apiKey.substring(0, 10)}...`);
      }
    } catch (e) {
      console.log(`    ❌ 配置解析失败:`, e.message);
    }
  }
});

console.log(`\n📊 配置检查结果: ${hasValidConfig ? '✅ 有有效配置' : '❌ 无有效配置'}`);

// 2. 检查 API 密钥格式
if (foundApiKey) {
  console.log('\n🔑 2. 检查 API 密钥格式:');
  const isValidFormat = foundApiKey.startsWith('sk-') && foundApiKey.length >= 20 && foundApiKey.length <= 100;
  console.log(`  格式检查: ${isValidFormat ? '✅ 有效' : '❌ 无效'}`);
  console.log(`  长度: ${foundApiKey.length} 字符`);
  console.log(`  前缀: ${foundApiKey.substring(0, 10)}...`);
  console.log(`  后缀: ...${foundApiKey.substring(foundApiKey.length - 4)}`);
}

// 3. 测试网络连接
console.log('\n🌐 3. 测试网络连接:');
if (foundApiKey) {
  console.log('  正在测试 DeepSeek API 连接...');
  
  fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${foundApiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: 'test' }],
      max_tokens: 10
    })
  })
  .then(response => {
    console.log(`  响应状态: ${response.status} ${response.statusText}`);
    
    if (response.status === 401) {
      console.log('  ❌ 401 未授权 - API密钥无效或过期');
      console.log('  💡 建议: 检查API密钥是否正确，或重新生成新的密钥');
    } else if (response.status === 403) {
      console.log('  ❌ 403 禁止访问 - API密钥权限不足');
      console.log('  💡 建议: 检查账户状态和API使用权限');
    } else if (response.status === 429) {
      console.log('  ⚠️ 429 请求过多 - API密钥有效但请求频率过高');
      console.log('  💡 建议: 稍后重试或检查API使用限制');
    } else if (response.ok) {
      console.log('  ✅ API连接正常');
    } else {
      console.log(`  ❌ 其他错误: ${response.status}`);
    }
    
    return response.text();
  })
  .then(data => {
    try {
      const jsonData = JSON.parse(data);
      console.log('  响应数据:', jsonData);
    } catch (e) {
      console.log('  响应文本:', data);
    }
  })
  .catch(error => {
    console.log('  ❌ 网络错误:', error.message);
    console.log('  💡 建议: 检查网络连接和防火墙设置');
  });
} else {
  console.log('  ❌ 无API密钥，无法测试网络连接');
}

// 4. 检查浏览器环境
console.log('\n🖥️ 4. 检查浏览器环境:');
console.log(`  用户代理: ${navigator.userAgent}`);
console.log(`  在线状态: ${navigator.onLine ? '✅ 在线' : '❌ 离线'}`);
console.log(`  localStorage 支持: ${typeof Storage !== 'undefined' ? '✅ 支持' : '❌ 不支持'}`);

// 5. 提供修复建议
console.log('\n💡 5. 修复建议:');
if (!hasValidConfig) {
  console.log('  - 访问AI配置页面设置API密钥');
  console.log('  - 确保API密钥以 "sk-" 开头');
  console.log('  - 检查API密钥长度在20-100字符之间');
} else if (foundApiKey) {
  console.log('  - 如果API密钥无效，请重新生成新的密钥');
  console.log('  - 检查DeepSeek账户余额和权限');
  console.log('  - 清除浏览器缓存后重新配置');
}

console.log('\n✅ 诊断完成！');
