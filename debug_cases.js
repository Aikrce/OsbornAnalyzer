// 调试脚本：检查localStorage中的案例数据
console.log('=== 检查localStorage中的案例数据 ===');

// 检查不同的存储键
const keys = [
  'huitu_local_cases',
  'huitu-dual-analysis-results',
  'huitu-ai-config',
  'huitu-multi-api-configs'
];

keys.forEach(key => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      console.log(`\n--- ${key} ---`);
      console.log('数据类型:', Array.isArray(parsed) ? 'Array' : typeof parsed);
      console.log('数据长度:', Array.isArray(parsed) ? parsed.length : 'N/A');
      
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log('第一个案例结构:');
        const firstCase = parsed[0];
        console.log('案例ID:', firstCase.id);
        console.log('案例标题:', firstCase.title);
        console.log('数据结构:', {
          hasAnalysisData: !!firstCase.analysisData,
          hasAnalysisResult: !!firstCase.analysisResult,
          hasOsbornAnalysis: !!firstCase.osbornAnalysis,
          hasDeepAnalysis: !!firstCase.deepAnalysis,
          hasDetailedAnalysis: !!firstCase.detailedAnalysis,
          analysisDataKeys: firstCase.analysisData ? Object.keys(firstCase.analysisData) : [],
          analysisResultLength: firstCase.analysisResult ? firstCase.analysisResult.length : 0
        });
        
        if (firstCase.analysisData) {
          console.log('analysisData内容:', firstCase.analysisData);
        }
        if (firstCase.analysisResult) {
          console.log('analysisResult前2项:', firstCase.analysisResult.slice(0, 2));
        }
      }
    } catch (e) {
      console.log(`解析${key}失败:`, e.message);
    }
  } else {
    console.log(`\n--- ${key} --- 不存在`);
  }
});

console.log('\n=== 调试完成 ===');
