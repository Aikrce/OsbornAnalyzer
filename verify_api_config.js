// API配置验证脚本
// 在浏览器控制台中运行此脚本来验证API配置

console.log('🔍 验证API配置...\n');

// 1. 检查配置是否存在
console.log('📋 1. 检查配置状态:');

const basicConfig = localStorage.getItem('huitu-ai-config');
const multiConfig = localStorage.getItem('huitu-multi-api-configs');

let foundConfig = false;
let apiKey = null;
let configSource = '';

if (multiConfig) {
  try {
    const configs = JSON.parse(multiConfig);
    if (Array.isArray(configs)) {
      const active = configs.find(c => c.isActive);
      if (active && active.apiKey) {
        foundConfig = true;
        apiKey = active.apiKey;
        configSource = `多API配置 (${active.name})`;
        console.log('✅ 找到多API配置中的活跃密钥');
        console.log(`   配置名称: ${active.name}`);
        console.log(`   模型: ${active.model}`);
        console.log(`   密钥长度: ${active.apiKey.length}字符`);
      }
    }
  } catch (e) {
    console.log('❌ 多API配置解析失败');
  }
}

if (!foundConfig && basicConfig) {
  try {
    const config = JSON.parse(basicConfig);
    if (config.apiKey) {
      foundConfig = true;
      apiKey = config.apiKey;
      configSource = '基础配置';
      console.log('✅ 找到基础配置中的密钥');
      console.log(`   模型: ${config.model || 'deepseek-chat'}`);
      console.log(`   密钥长度: ${config.apiKey.length}字符`);
    }
  } catch (e) {
    console.log('❌ 基础配置解析失败');
  }
}

if (!foundConfig) {
  console.log('❌ 未找到API密钥配置');
  console.log('请按照以下步骤配置API密钥：');
  console.log('1. 访问AI配置页面');
  console.log('2. 输入有效的DeepSeek API密钥');
  console.log('3. 保存配置');
  console.log('4. 重新运行此验证脚本');
  return;
}

console.log(`\n📊 配置信息:`);
console.log(`配置来源: ${configSource}`);
console.log(`API密钥: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`);
console.log(`密钥长度: ${apiKey.length}字符`);

// 2. 验证API密钥格式
console.log('\n🔑 2. 验证API密钥格式:');

const formatChecks = {
  startsWithSk: apiKey.startsWith('sk-'),
  validLength: apiKey.length >= 20 && apiKey.length <= 100,
  validChars: /^[a-zA-Z0-9_-]+$/.test(apiKey)
};

let formatValid = true;
Object.entries(formatChecks).forEach(([check, result]) => {
  const status = result ? '✅' : '❌';
  console.log(`   ${status} ${check}: ${result}`);
  if (!result) formatValid = false;
});

if (!formatValid) {
  console.log('\n❌ API密钥格式有问题！');
  console.log('请检查：');
  console.log('- 密钥是否以"sk-"开头');
  console.log('- 密钥长度是否在20-100字符之间');
  console.log('- 密钥是否只包含字母、数字、下划线和连字符');
  return;
}

console.log('\n✅ API密钥格式正确');

// 3. 测试API连接
console.log('\n🌐 3. 测试API连接:');

console.log('正在测试DeepSeek API连接...');

fetch('https://api.deepseek.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'User-Agent': 'HuiTu-Config-Verifier/1.0'
  },
  body: JSON.stringify({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'Hello, this is a test message.' }],
    max_tokens: 10
  })
})
.then(response => {
  console.log(`📊 API测试结果:`);
  console.log(`   状态码: ${response.status}`);
  console.log(`   状态文本: ${response.statusText}`);
  
  if (response.ok) {
    console.log('✅ API连接成功！');
    console.log('🎉 配置验证完成，API密钥有效');
    return response.json();
  } else if (response.status === 401) {
    console.log('❌ 401 未授权 - API密钥无效或已过期');
    console.log('💡 建议:');
    console.log('1. 检查API密钥是否正确');
    console.log('2. 确认API密钥未过期');
    console.log('3. 重新生成新的API密钥');
  } else if (response.status === 403) {
    console.log('❌ 403 禁止访问 - API权限不足');
    console.log('💡 建议:');
    console.log('1. 检查账户状态');
    console.log('2. 确认API使用权限');
    console.log('3. 检查账户余额');
  } else if (response.status === 429) {
    console.log('⚠️ 429 请求过多 - API密钥有效但请求频率过高');
    console.log('💡 建议: 稍后重试');
  } else {
    console.log(`❌ 其他错误: ${response.status}`);
  }
  
  return response.text();
})
.then(data => {
  if (data && typeof data === 'object') {
    console.log('📋 API响应数据:', data);
  } else if (data) {
    console.log('📋 API响应文本:', data);
  }
})
.catch(error => {
  console.error('❌ API测试失败:', error.message);
  console.log('💡 可能的原因:');
  console.log('1. 网络连接问题');
  console.log('2. 防火墙阻止');
  console.log('3. API服务暂时不可用');
});

console.log('\n⏳ 请等待API测试结果...');
