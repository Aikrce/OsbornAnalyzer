// 测试深度分析API调用功能
console.log('🔍 测试深度分析API调用功能');

// 检查localStorage中的AI配置
function checkAIConfig() {
  console.log('\n📋 检查AI配置:');
  
  // 检查基本配置
  const basicConfig = localStorage.getItem('huitu-ai-config');
  if (basicConfig) {
    const config = JSON.parse(basicConfig);
    console.log('✅ 基本AI配置存在:', {
      hasApiKey: !!config.apiKey,
      apiKeyLength: config.apiKey?.length || 0,
      provider: config.provider || 'unknown'
    });
  } else {
    console.log('❌ 基本AI配置不存在');
  }
  
  // 检查多API配置
  const multiConfig = localStorage.getItem('huitu-multi-api-configs');
  if (multiConfig) {
    const configs = JSON.parse(multiConfig);
    console.log('✅ 多API配置存在:', {
      configCount: Object.keys(configs).length,
      activeConfig: configs.active || 'none'
    });
  } else {
    console.log('❌ 多API配置不存在');
  }
}

// 测试深度分析API调用
async function testDeepAnalysisAPI() {
  console.log('\n🚀 测试深度分析API调用:');
  
  try {
    // 模拟深度分析请求
    const topic = '智能家居系统';
    const analysisType = 'api';
    
    console.log(`📝 分析主题: ${topic}`);
    console.log(`🔧 分析类型: ${analysisType}`);
    
    // 检查AI服务是否可用
    const aiServiceModule = await import('./src/services/ai/aiService.ts');
    const aiService = aiServiceModule.default;
    
    console.log('✅ AI服务模块加载成功');
    console.log('🔑 AI服务配置状态:', aiService.isConfigured());
    
    if (aiService.isConfigured()) {
      console.log('✅ AI服务已配置，可以进行API分析');
      
      // 测试API调用
      const testRequest = {
        topic,
        context: JSON.stringify({
          industry: '科技',
          targetAudience: '家庭用户',
          businessModel: 'SaaS'
        }),
        previousResults: []
      };
      
      console.log('🔄 开始API分析测试...');
      const result = await aiService.performEnhancedAnalysis(testRequest);
      
      console.log('✅ API分析成功:', {
        hasResult: !!result,
        resultType: typeof result,
        analysisCount: result?.analysis?.length || 0
      });
      
      if (result?.analysis?.length > 0) {
        console.log('📊 分析结果预览:', result.analysis[0]);
      }
      
    } else {
      console.log('❌ AI服务未配置，无法进行API分析');
      console.log('💡 请先配置API密钥');
    }
    
  } catch (error) {
    console.error('❌ API分析测试失败:', error);
  }
}

// 测试统一分析服务
async function testUnifiedAnalysisService() {
  console.log('\n🔧 测试统一分析服务:');
  
  try {
    const unifiedServiceModule = await import('./src/services/analysis/unifiedAnalysisService.ts');
    const unifiedService = unifiedServiceModule.unifiedAnalysisService;
    
    console.log('✅ 统一分析服务加载成功');
    
    // 测试API分析请求
    const request = {
      topic: '智能家居系统',
      type: 'API', // 使用API分析
      mode: 'STANDARD',
      context: {
        industry: '科技',
        targetAudience: '家庭用户',
        businessModel: 'SaaS'
      },
      options: {
        enableParallel: true,
        cacheResults: true,
        includeSimilarCases: true
      }
    };
    
    console.log('🔄 开始统一分析服务测试...');
    const result = await unifiedService.analyze(request);
    
    console.log('✅ 统一分析服务测试成功:', {
      hasResult: !!result,
      analysisType: result.type,
      hasLocalResult: !!result.results.local,
      hasAIResult: !!result.results.ai,
      duration: result.duration
    });
    
  } catch (error) {
    console.error('❌ 统一分析服务测试失败:', error);
  }
}

// 主测试函数
async function runTests() {
  console.log('🎯 开始深度分析API调用测试\n');
  
  // 检查AI配置
  checkAIConfig();
  
  // 测试深度分析API
  await testDeepAnalysisAPI();
  
  // 测试统一分析服务
  await testUnifiedAnalysisService();
  
  console.log('\n✅ 测试完成');
}

// 运行测试
runTests().catch(console.error);
