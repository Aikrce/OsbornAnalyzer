// 浏览器控制台诊断脚本
// 复制此脚本到浏览器控制台中运行

(async function() {
  console.log('🔍 HuiTu AI 服务详细诊断开始...\n');
  
  const diagnosticResult = {
    timestamp: new Date().toISOString(),
    localStorage: { hasBasicConfig: false, hasMultiConfig: false },
    apiKey: { found: false, length: 0, prefix: '', suffix: '', formatValid: false, source: 'none' },
    network: { canReachAPI: false },
    recommendations: []
  };

  // 1. 检查 localStorage
  console.log('📋 1. 检查 localStorage 配置:');
  
  const basicConfig = localStorage.getItem('huitu-ai-config');
  if (basicConfig) {
    diagnosticResult.localStorage.hasBasicConfig = true;
    try {
      const config = JSON.parse(basicConfig);
      diagnosticResult.localStorage.basicConfigContent = config;
      console.log('✅ 基础配置存在:', config);
    } catch (e) {
      console.log('❌ 基础配置解析失败:', e.message);
    }
  } else {
    console.log('❌ 未找到基础配置 (huitu-ai-config)');
  }

  const multiConfig = localStorage.getItem('huitu-multi-api-configs');
  if (multiConfig) {
    diagnosticResult.localStorage.hasMultiConfig = true;
    try {
      const configs = JSON.parse(multiConfig);
      diagnosticResult.localStorage.multiConfigContent = configs;
      console.log('✅ 多API配置存在:', configs);
      
      if (Array.isArray(configs)) {
        const activeConfig = configs.find(c => c.isActive);
        if (activeConfig) {
          diagnosticResult.localStorage.activeConfig = activeConfig;
          console.log('✅ 找到活跃配置:', activeConfig);
        } else {
          console.log('⚠️ 多API配置存在但无活跃配置');
        }
      }
    } catch (e) {
      console.log('❌ 多API配置解析失败:', e.message);
    }
  } else {
    console.log('❌ 未找到多API配置 (huitu-multi-api-configs)');
  }

  // 2. 检查 API 密钥
  console.log('\n🔑 2. 检查 API 密钥:');
  
  let apiKey = '';
  
  // 优先检查活跃配置
  if (diagnosticResult.localStorage.activeConfig && diagnosticResult.localStorage.activeConfig.apiKey) {
    apiKey = diagnosticResult.localStorage.activeConfig.apiKey;
    diagnosticResult.apiKey.source = 'multi';
    console.log('✅ 从多API配置中找到密钥');
  }
  // 然后检查基础配置
  else if (diagnosticResult.localStorage.basicConfigContent && diagnosticResult.localStorage.basicConfigContent.apiKey) {
    apiKey = diagnosticResult.localStorage.basicConfigContent.apiKey;
    diagnosticResult.apiKey.source = 'basic';
    console.log('✅ 从基础配置中找到密钥');
  }

  if (apiKey) {
    diagnosticResult.apiKey.found = true;
    diagnosticResult.apiKey.length = apiKey.length;
    diagnosticResult.apiKey.prefix = apiKey.substring(0, 10);
    diagnosticResult.apiKey.suffix = apiKey.substring(apiKey.length - 4);
    
    // 检查格式
    const formatValid = apiKey.startsWith('sk-') && 
                       apiKey.length >= 20 && 
                       apiKey.length <= 100 &&
                       /^[a-zA-Z0-9_-]+$/.test(apiKey);
    diagnosticResult.apiKey.formatValid = formatValid;
    
    console.log('🔑 API密钥信息:');
    console.log(`  长度: ${diagnosticResult.apiKey.length} 字符`);
    console.log(`  前缀: ${diagnosticResult.apiKey.prefix}...`);
    console.log(`  后缀: ...${diagnosticResult.apiKey.suffix}`);
    console.log(`  格式有效: ${formatValid ? '✅ 是' : '❌ 否'}`);
    console.log(`  来源: ${diagnosticResult.apiKey.source}`);
    
    if (!formatValid) {
      console.log('❌ API密钥格式问题:');
      if (!apiKey.startsWith('sk-')) {
        console.log('  - 应该以 "sk-" 开头');
      }
      if (apiKey.length < 20 || apiKey.length > 100) {
        console.log('  - 长度应该在 20-100 字符之间');
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(apiKey)) {
        console.log('  - 包含无效字符');
      }
    }
  } else {
    console.log('❌ 未找到 API 密钥');
    diagnosticResult.recommendations.push('请配置API密钥');
  }

  // 3. 测试网络连接
  console.log('\n🌐 3. 测试网络连接:');
  
  if (!diagnosticResult.apiKey.found) {
    console.log('❌ 无API密钥，跳过网络测试');
    diagnosticResult.network.errorMessage = '无API密钥';
  } else if (!diagnosticResult.apiKey.formatValid) {
    console.log('❌ API密钥格式无效，跳过网络测试');
    diagnosticResult.network.errorMessage = 'API密钥格式无效';
  } else {
    console.log('正在测试 DeepSeek API 连接...');
    
    try {
      const startTime = Date.now();
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'HuiTu-Diagnostic/1.0'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 10
        })
      });

      diagnosticResult.network.responseTime = Date.now() - startTime;
      diagnosticResult.network.responseStatus = response.status;

      console.log(`📊 网络测试结果:`);
      console.log(`  状态码: ${response.status}`);
      console.log(`  响应时间: ${diagnosticResult.network.responseTime}ms`);

      if (response.ok) {
        diagnosticResult.network.canReachAPI = true;
        console.log('✅ API连接正常');
      } else {
        diagnosticResult.network.canReachAPI = false;
        
        // 尝试读取错误详情
        try {
          const errorData = await response.text();
          diagnosticResult.network.detailedError = errorData;
          console.log('❌ API错误详情:', errorData);
        } catch (e) {
          console.log('❌ 无法读取错误详情');
        }

        // 根据状态码提供具体错误信息
        switch (response.status) {
          case 401:
            diagnosticResult.network.errorMessage = 'API密钥无效或已过期 (401)';
            console.log('❌ 401 未授权 - 这是您遇到的主要问题！');
            console.log('💡 可能的原因:');
            console.log('  - API密钥已过期');
            console.log('  - API密钥格式错误');
            console.log('  - API密钥权限不足');
            diagnosticResult.recommendations.push('检查API密钥是否正确');
            diagnosticResult.recommendations.push('确认API密钥未过期');
            diagnosticResult.recommendations.push('尝试重新生成API密钥');
            break;
          case 403:
            diagnosticResult.network.errorMessage = 'API权限不足 (403)';
            console.log('❌ 403 禁止访问');
            diagnosticResult.recommendations.push('检查账户状态');
            diagnosticResult.recommendations.push('确认API使用权限');
            diagnosticResult.recommendations.push('检查账户余额');
            break;
          case 429:
            diagnosticResult.network.errorMessage = '请求频率过高 (429)';
            console.log('⚠️ 429 请求过多');
            diagnosticResult.recommendations.push('稍后重试');
            break;
          default:
            diagnosticResult.network.errorMessage = `API调用失败 (${response.status})`;
            console.log(`❌ 其他错误: ${response.status}`);
        }
      }

    } catch (error) {
      diagnosticResult.network.canReachAPI = false;
      diagnosticResult.network.errorMessage = `网络错误: ${error.message}`;
      console.error('❌ 网络测试失败:', error);
      
      if (error.message.includes('fetch')) {
        diagnosticResult.recommendations.push('检查网络连接');
        diagnosticResult.recommendations.push('检查防火墙设置');
      }
    }
  }

  // 4. 生成修复建议
  console.log('\n💡 4. 修复建议:');
  
  if (diagnosticResult.network.responseStatus === 401) {
    console.log('🚨 主要问题: 401 未授权错误');
    console.log('这是您遇到的主要问题，需要立即解决：');
    console.log('1. 检查API密钥是否正确');
    console.log('2. 确认API密钥未过期');
    console.log('3. 重新生成新的API密钥');
    console.log('4. 在设置页面重新配置API密钥');
  }

  if (diagnosticResult.recommendations.length > 0) {
    diagnosticResult.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  } else {
    console.log('✅ 配置看起来正常，如果仍有问题，请检查网络连接');
  }

  // 5. 输出完整诊断结果
  console.log('\n📊 完整诊断结果:');
  console.log(JSON.stringify(diagnosticResult, null, 2));

  // 6. 提供快速修复命令
  console.log('\n🔧 快速修复命令:');
  console.log('如果API密钥无效，可以运行以下命令清除配置:');
  console.log('localStorage.removeItem("huitu-ai-config");');
  console.log('localStorage.removeItem("huitu-multi-api-configs");');
  console.log('然后重新访问AI配置页面设置新的API密钥');

  console.log('\n✅ 诊断完成！');
  
  return diagnosticResult;
})();
