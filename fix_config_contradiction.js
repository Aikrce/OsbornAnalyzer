// 配置矛盾修复脚本
// 在浏览器控制台中运行此脚本来修复配置状态矛盾

console.log('🔧 开始修复配置矛盾...\n');

// 1. 检查当前配置状态
console.log('📋 1. 检查当前配置状态:');

const basicConfigStr = localStorage.getItem('huitu-ai-config');
const multiConfigStr = localStorage.getItem('huitu-multi-api-configs');

let basicConfig = null;
let multiConfigs = null;
let activeConfig = null;

if (basicConfigStr) {
  try {
    basicConfig = JSON.parse(basicConfigStr);
    console.log('✅ 基础配置存在:', {
      apiKeyLength: basicConfig.apiKey?.length || 0,
      model: basicConfig.model
    });
  } catch (e) {
    console.log('❌ 基础配置解析失败:', e.message);
  }
} else {
  console.log('❌ 基础配置不存在');
}

if (multiConfigStr) {
  try {
    multiConfigs = JSON.parse(multiConfigStr);
    if (Array.isArray(multiConfigs)) {
      activeConfig = multiConfigs.find(c => c.isActive);
      console.log('✅ 多API配置存在:', {
        totalConfigs: multiConfigs.length,
        activeConfig: activeConfig ? {
          name: activeConfig.name,
          apiKeyLength: activeConfig.apiKey?.length || 0
        } : '无活跃配置'
      });
    }
  } catch (e) {
    console.log('❌ 多API配置解析失败:', e.message);
  }
} else {
  console.log('❌ 多API配置不存在');
}

// 2. 分析矛盾
console.log('\n🔍 2. 分析配置矛盾:');

const hasBasicKey = basicConfig && basicConfig.apiKey && basicConfig.apiKey.trim().length > 0;
const hasActiveMultiKey = activeConfig && activeConfig.apiKey && activeConfig.apiKey.trim().length > 0;

console.log(`基础配置有密钥: ${hasBasicKey ? '✅ 是' : '❌ 否'}`);
console.log(`多API配置有活跃密钥: ${hasActiveMultiKey ? '✅ 是' : '❌ 否'}`);

if (hasBasicKey && hasActiveMultiKey) {
  console.log('🚨 矛盾: 同时存在基础配置和多API配置的密钥');
} else if (hasBasicKey && !hasActiveMultiKey) {
  console.log('⚠️ 只有基础配置有密钥');
} else if (!hasBasicKey && hasActiveMultiKey) {
  console.log('✅ 只有多API配置有密钥（正常）');
} else {
  console.log('❌ 没有任何有效密钥');
}

// 3. 修复配置
console.log('\n🔧 3. 修复配置矛盾:');

if (hasBasicKey && hasActiveMultiKey) {
  console.log('🔧 同时存在基础配置和多API配置，清除基础配置...');
  localStorage.removeItem('huitu-ai-config');
  console.log('✅ 基础配置已清除');
} else if (hasBasicKey && !hasActiveMultiKey) {
  console.log('🔧 只有基础配置，转换为多API配置...');
  try {
    const newMultiConfig = [{
      id: `api-config-${Date.now()}`,
      name: '默认配置',
      provider: 'deepseek',
      model: basicConfig.model || 'deepseek-chat',
      apiKey: basicConfig.apiKey,
      temperature: basicConfig.temperature || 0.7,
      maxTokens: basicConfig.maxTokens || 2000,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];
    localStorage.setItem('huitu-multi-api-configs', JSON.stringify(newMultiConfig));
    localStorage.removeItem('huitu-ai-config');
    console.log('✅ 配置转换完成');
  } catch (e) {
    console.error('❌ 配置转换失败:', e.message);
  }
} else if (!hasBasicKey && !hasActiveMultiKey) {
  console.log('❌ 无有效配置，需要重新设置API密钥');
} else {
  console.log('✅ 配置状态正常，无需修复');
}

// 4. 验证修复结果
console.log('\n✅ 4. 验证修复结果:');

const newBasicConfigStr = localStorage.getItem('huitu-ai-config');
const newMultiConfigStr = localStorage.getItem('huitu-multi-api-configs');

let newActiveConfig = null;
if (newMultiConfigStr) {
  try {
    const newMultiConfigs = JSON.parse(newMultiConfigStr);
    if (Array.isArray(newMultiConfigs)) {
      newActiveConfig = newMultiConfigs.find(c => c.isActive);
    }
  } catch (e) {
    console.error('验证时解析失败:', e.message);
  }
}

console.log(`基础配置: ${newBasicConfigStr ? '存在' : '不存在'}`);
console.log(`多API配置: ${newMultiConfigStr ? '存在' : '不存在'}`);
console.log(`活跃配置: ${newActiveConfig ? `存在 (${newActiveConfig.name}, ${newActiveConfig.apiKey?.length || 0}字符)` : '不存在'}`);

// 5. 提供后续建议
console.log('\n💡 5. 后续建议:');

if (newActiveConfig && newActiveConfig.apiKey) {
  console.log('✅ 配置修复完成！');
  console.log('建议:');
  console.log('1. 刷新页面查看修复结果');
  console.log('2. 运行AI诊断测试API连接');
  console.log('3. 如果仍有401错误，检查API密钥是否有效');
} else {
  console.log('❌ 仍无有效配置');
  console.log('建议:');
  console.log('1. 访问AI配置页面设置API密钥');
  console.log('2. 确保API密钥以"sk-"开头');
  console.log('3. 检查API密钥长度在20-100字符之间');
}

console.log('\n🔧 配置修复完成！');
