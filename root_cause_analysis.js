// 根本原因分析脚本
// 在浏览器控制台中运行此脚本来找到 401 错误的根本原因

console.log('🔍 开始 401 错误根本原因分析...\n');

// 1. 检查所有可能的配置源
console.log('📋 1. 检查所有配置源:');

const configSources = [
  'huitu-ai-config',
  'huitu-multi-api-configs',
  'huitu-ai-config-backup',
  'huitu-api-key',
  'deepseek-api-key'
];

let foundConfigs = [];
let activeApiKey = null;
let configSource = 'none';

configSources.forEach(key => {
  const value = localStorage.getItem(key);
  if (value) {
    foundConfigs.push({ key, value });
    console.log(`✅ 找到配置: ${key}`);
    
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        // 多API配置
        const active = parsed.find(c => c.isActive);
        if (active && active.apiKey) {
          activeApiKey = active.apiKey;
          configSource = `multi-api (${key})`;
          console.log(`  🎯 活跃配置: ${active.name}, 密钥长度: ${active.apiKey.length}`);
        }
      } else if (parsed.apiKey) {
        // 单API配置
        if (!activeApiKey) { // 优先使用多API配置
          activeApiKey = parsed.apiKey;
          configSource = `single (${key})`;
          console.log(`  🎯 单配置密钥长度: ${parsed.apiKey.length}`);
        }
      }
    } catch (e) {
      console.log(`  ❌ 配置解析失败: ${e.message}`);
    }
  } else {
    console.log(`❌ 未找到: ${key}`);
  }
});

console.log(`\n📊 配置分析结果:`);
console.log(`找到配置数量: ${foundConfigs.length}`);
console.log(`有效API密钥: ${activeApiKey ? '是' : '否'}`);
console.log(`配置来源: ${configSource}`);
console.log(`API密钥长度: ${activeApiKey ? activeApiKey.length : 0}`);

// 2. 检查API密钥格式
if (activeApiKey) {
  console.log('\n🔑 2. API密钥格式检查:');
  console.log(`密钥前缀: ${activeApiKey.substring(0, 10)}...`);
  console.log(`密钥后缀: ...${activeApiKey.substring(activeApiKey.length - 4)}`);
  
  const formatChecks = {
    startsWithSk: activeApiKey.startsWith('sk-'),
    validLength: activeApiKey.length >= 20 && activeApiKey.length <= 100,
    validChars: /^[a-zA-Z0-9_-]+$/.test(activeApiKey)
  };
  
  console.log('格式检查结果:');
  Object.entries(formatChecks).forEach(([check, result]) => {
    console.log(`  ${result ? '✅' : '❌'} ${check}: ${result}`);
  });
  
  if (!formatChecks.startsWithSk || !formatChecks.validLength || !formatChecks.validChars) {
    console.log('🚨 API密钥格式有问题！');
  }
} else {
  console.log('\n❌ 2. 未找到API密钥，这是401错误的根本原因！');
}

// 3. 检查应用初始化时的配置加载
console.log('\n🔧 3. 检查应用配置加载:');

// 模拟应用启动时的配置检查
const appConfigCheck = () => {
  // 检查 useAIConfig hook 的逻辑
  const basicConfig = localStorage.getItem('huitu-ai-config');
  const multiConfig = localStorage.getItem('huitu-multi-api-configs');
  
  let effectiveConfig = null;
  
  if (multiConfig) {
    try {
      const configs = JSON.parse(multiConfig);
      if (Array.isArray(configs)) {
        const active = configs.find(c => c.isActive);
        if (active && active.apiKey && active.apiKey.trim().length > 0) {
          effectiveConfig = {
            source: 'multi-api',
            apiKey: active.apiKey,
            model: active.model
          };
        }
      }
    } catch (e) {
      console.log('多API配置解析失败:', e.message);
    }
  }
  
  if (!effectiveConfig && basicConfig) {
    try {
      const config = JSON.parse(basicConfig);
      if (config.apiKey && config.apiKey.trim().length > 0) {
        effectiveConfig = {
          source: 'basic',
          apiKey: config.apiKey,
          model: config.model
        };
      }
    } catch (e) {
      console.log('基础配置解析失败:', e.message);
    }
  }
  
  return effectiveConfig;
};

const appEffectiveConfig = appConfigCheck();
console.log('应用有效配置:', appEffectiveConfig ? {
  source: appEffectiveConfig.source,
  hasApiKey: !!appEffectiveConfig.apiKey,
  apiKeyLength: appEffectiveConfig.apiKey?.length || 0,
  model: appEffectiveConfig.model
} : '无');

// 4. 检查AI服务配置状态
console.log('\n🤖 4. 检查AI服务配置状态:');

// 尝试访问AI服务配置
try {
  // 这里我们需要检查AI服务是否被正确配置
  console.log('正在检查AI服务配置...');
  
  // 检查是否有AI服务实例
  if (window.aiService) {
    console.log('✅ 找到AI服务实例');
    console.log('AI服务配置状态:', window.aiService.isConfigured());
  } else {
    console.log('❌ 未找到AI服务实例');
  }
} catch (e) {
  console.log('❌ AI服务检查失败:', e.message);
}

// 5. 检查网络请求历史
console.log('\n🌐 5. 检查网络请求历史:');

// 检查是否有失败的API请求
const checkNetworkHistory = () => {
  // 这里我们无法直接访问网络历史，但可以提供检查方法
  console.log('请检查浏览器开发者工具的Network标签页:');
  console.log('1. 打开开发者工具 (F12)');
  console.log('2. 切换到Network标签页');
  console.log('3. 刷新页面');
  console.log('4. 查找对 api.deepseek.com 的请求');
  console.log('5. 检查请求头中的Authorization字段');
  console.log('6. 查看响应状态码和错误信息');
};

checkNetworkHistory();

// 6. 生成根本原因分析报告
console.log('\n📊 6. 根本原因分析报告:');

const rootCauseAnalysis = () => {
  const issues = [];
  
  if (!activeApiKey) {
    issues.push('🚨 主要问题: 未找到有效的API密钥');
    issues.push('  - 这是401错误的直接原因');
    issues.push('  - 需要配置DeepSeek API密钥');
  } else {
    if (!activeApiKey.startsWith('sk-')) {
      issues.push('🚨 API密钥格式错误: 不以"sk-"开头');
    }
    if (activeApiKey.length < 20 || activeApiKey.length > 100) {
      issues.push('🚨 API密钥长度异常');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(activeApiKey)) {
      issues.push('🚨 API密钥包含无效字符');
    }
  }
  
  if (foundConfigs.length === 0) {
    issues.push('🚨 配置问题: 未找到任何配置');
  } else if (foundConfigs.length > 1) {
    issues.push('⚠️ 配置冲突: 存在多个配置源');
  }
  
  if (!appEffectiveConfig) {
    issues.push('🚨 应用配置问题: 应用无法获取有效配置');
  }
  
  return issues;
};

const issues = rootCauseAnalysis();
if (issues.length > 0) {
  console.log('发现的问题:');
  issues.forEach(issue => console.log(issue));
} else {
  console.log('✅ 配置看起来正常，401错误可能是其他原因');
}

// 7. 提供解决方案
console.log('\n💡 7. 解决方案:');

if (!activeApiKey) {
  console.log('🔧 主要解决方案:');
  console.log('1. 访问AI配置页面');
  console.log('2. 输入有效的DeepSeek API密钥');
  console.log('3. 确保密钥以"sk-"开头');
  console.log('4. 保存配置');
  console.log('5. 刷新页面测试');
} else {
  console.log('🔧 可能的解决方案:');
  console.log('1. 检查API密钥是否过期');
  console.log('2. 检查DeepSeek账户余额');
  console.log('3. 重新生成API密钥');
  console.log('4. 清除浏览器缓存');
  console.log('5. 重新配置API密钥');
}

console.log('\n✅ 根本原因分析完成！');
