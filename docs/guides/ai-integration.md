# AI功能深度集成指南

## 📋 概述

本文档介绍OsbornAnalyzer项目中AI功能的深度集成方案，包括云端AI、本地AI和混合模式的使用方法。

## 🚀 快速开始

### 基本使用

```typescript
import { hybridAIAnalyzer, aiConfigManager } from '@shared/algorithms';

// 设置API密钥（可选）
aiConfigManager.setApiKey('your-api-key-here');

// 执行AI分析
const result = await hybridAIAnalyzer.analyze(analysisResult);

// 增强问题
const enhancedQuestions = await hybridAIAnalyzer.enhanceQuestions(questions);

// 建议替代方案
const alternatives = await hybridAIAnalyzer.suggestAlternatives(text);
```

### 配置管理

```typescript
// 获取当前配置
const config = aiConfigManager.getConfig();

// 更新配置
aiConfigManager.updateConfig({
  provider: 'hybrid', // 'cloud' | 'local' | 'hybrid'
  offlineMode: false,
  cacheEnabled: true,
  fallbackEnabled: true
});

// 获取服务状态
const status = aiConfigManager.getStatus();
```

## 🔧 高级功能

### 本地AI模型

```typescript
import { localAIAnalyzer } from '@shared/algorithms/local-ai';

// 加载本地模型
const loaded = await localAIAnalyzer.loadModel();

// 下载模型（如果需要）
const downloaded = await localAIAnalyzer.downloadModel();

// 获取模型状态
const status = localAIAnalyzer.getModelStatus();
```

### 缓存优化

```typescript
import { cachedHybridAIAnalyzer, aiCacheService } from '@shared/utils/ai-cache';

// 使用带缓存的分析器
const result = await cachedHybridAIAnalyzer.analyze(analysisResult);

// 缓存管理
aiCacheService.clearExpired(); // 清除过期缓存
aiCacheService.clearAll();     // 清除所有缓存

// 获取缓存统计
const stats = aiCacheService.getStats();

// 更新缓存配置
aiCacheService.updateConfig({
  ttl: 24 * 60 * 60 * 1000, // 24小时
  maxSize: 1000,
  strategy: 'lru'
});
```

## 🎯 使用场景

### 1. 在线模式（默认）

```typescript
// 使用混合模式，自动选择最优方案
aiConfigManager.updateConfig({
  provider: 'hybrid',
  offlineMode: false
});
```

### 2. 离线模式

```typescript
// 强制使用本地模型
aioConfigManager.enableOfflineMode();

// 或者直接配置
aiConfigManager.updateConfig({
  provider: 'local',
  offlineMode: true
});
```

### 3. 纯云端模式

```typescript
// 仅使用云端AI服务
aiConfigManager.updateConfig({
  provider: 'cloud',
  offlineMode: false
});
```

## ⚙️ 配置选项

### AIServiceConfig

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| provider | 'cloud'\|'local'\|'hybrid' | 'hybrid' | AI服务提供商 |
| apiKey | string | undefined | API密钥 |
| localModelConfig | LocalAIModelConfig | {...} | 本地模型配置 |
| fallbackEnabled | boolean | true | 启用回退机制 |
| cacheEnabled | boolean | true | 启用缓存 |
| offlineMode | boolean | false | 离线模式 |

### LocalAIModelConfig

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| modelPath | string | './models/llama-2-7b-q4.bin' | 模型文件路径 |
| maxTokens | number | 1024 | 最大token数 |
| temperature | number | 0.7 | 生成温度 |
| contextWindow | number | 4096 | 上下文窗口大小 |

## 🚨 错误处理

```typescript
try {
  const result = await hybridAIAnalyzer.analyze(analysisResult);
} catch (error) {
  if (error.message.includes('API密钥')) {
    // API密钥错误
    console.error('请设置有效的API密钥');
  } else if (error.message.includes('暂时不可用')) {
    // 服务不可用
    console.error('AI服务暂时不可用，请稍后重试');
  } else {
    // 其他错误
    console.error('分析失败:', error);
  }
}
```

## 📊 性能监控

```typescript
// 监控AI服务使用情况
const status = aiConfigManager.getStatus();
console.log('AI服务使用统计:', {
  总使用次数: status.usageCount,
  最后使用时间: status.lastUsed,
  云端可用: status.cloudAvailable,
  本地可用: status.localAvailable
});

// 监控缓存性能
const cacheStats = aiCacheService.getStats();
console.log('缓存统计:', {
  总条目数: cacheStats.total,
  过期条目: cacheStats.expired,
  内存使用: cacheStats.memoryUsage,
  命中率: cacheStats.hitRate
});
```

## 🔒 安全考虑

1. **API密钥管理**：不要将API密钥硬编码在代码中，使用环境变量或配置管理
2. **本地模型安全**：确保下载的模型文件来自可信源
3. **数据隐私**：敏感数据不应发送到第三方AI服务
4. **缓存清理**：定期清理缓存，避免存储敏感信息

## 🐛 故障排除

### 常见问题

1. **API调用失败**
   - 检查API密钥是否正确
   - 检查网络连接
   - 查看服务商状态页面

2. **本地模型加载失败**
   - 检查模型文件是否存在
   - 确保有足够的存储空间
   - 检查浏览器兼容性

3. **缓存不生效**
   - 检查缓存是否启用
   - 检查缓存配置是否正确

### 调试模式

```typescript
// 启用详细日志
localStorage.setItem('debug_ai', 'true');

// 在控制台查看详细日志
console.log('AI配置:', aiConfigManager.getConfig());
console.log('AI状态:', aiConfigManager.getStatus());
console.log('缓存统计:', aiCacheService.getStats());
```

## 📈 最佳实践

1. **渐进式增强**：先尝试本地模型，失败时回退到云端
2. **智能缓存**：根据使用频率设置合适的缓存策略
3. **用户体验**：提供加载状态和错误反馈
4. **性能优化**：使用防抖和节流控制API调用频率
5. **监控告警**：监控服务可用性和性能指标

## 🔮 未来扩展

- [ ] 支持更多本地模型格式（GGUF、GGML等）
- [ ] 模型量化优化，减少资源占用
- [ ] 分布式推理，支持多设备协同
- [ ] 自定义模型训练和微调
- [ ] 实时模型更新和热重载

---

**最后更新**: 2025-09-14  
**版本**: v1.0