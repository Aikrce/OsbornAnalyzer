# 分析系统API文档

## 概述

本文档描述了奥斯本创新九问分析系统的API接口，包括Hooks、服务和工具函数的使用方法。

## Hooks API

### useNavigation

统一导航管理Hook，解决路由导航不一致问题。

```typescript
import { useNavigation } from '../hooks/useNavigation';

const { goHome, goToAnalysis, goToCaseLibrary } = useNavigation();

// 返回首页
goHome();

// 跳转到分析结果页面
goToAnalysis('创新产品设计', 'local');

// 跳转到案例库
goToCaseLibrary();
```

#### 方法

- `goHome()`: 返回首页
- `goToAnalysis(topic: string, type: 'local' | 'api')`: 跳转到分析结果页面
- `goToCaseLibrary()`: 跳转到案例库
- `goToOsbornAnalysis(topic?: string)`: 跳转到奥斯本分析页面
- `goToDeepAnalysis(topic?: string)`: 跳转到深度分析页面
- `goToSettings()`: 跳转到设置页面
- `goToCollaboration()`: 跳转到协作页面

### useDualAnalysis

双重分析Hook，支持本地分析和API分析。

```typescript
import { useDualAnalysis } from '../hooks/useDualAnalysis';

const { results, isLoading, error, analyze, clearResults, progress } = useDualAnalysis();

// 执行分析
await analyze('创新产品设计', { 
  analysisType: 'local',
  industry: '科技',
  targetAudience: '年轻用户'
});

// 清除结果
clearResults();
```

#### 返回值

```typescript
interface UseDualAnalysisReturn {
  results: DualAnalysisResult[];           // 分析结果列表
  isLoading: boolean;                      // 加载状态
  error: string | null;                    // 错误信息
  analyze: (topic: string, context?: Partial<UnifiedAnalysisContext & { analysisType?: AnalysisTypeString }>) => Promise<void>;
  clearResults: () => void;                // 清除结果
  progress: {                              // 进度信息
    osborn: number;
    deep: number;
    overall: number;
  };
}
```

### useAnalysisState

统一分析状态管理Hook。

```typescript
import { useAnalysisState } from '../hooks/useAnalysisState';

const { 
  results, 
  isLoading, 
  error, 
  addResult, 
  updateResult, 
  removeResult,
  getResultById,
  getResultsByTopic,
  getResultsByType,
  refreshResults 
} = useAnalysisState();

// 根据ID获取结果
const result = getResultById('analysis-123');

// 根据主题搜索结果
const topicResults = getResultsByTopic('创新');

// 根据类型获取结果
const localResults = getResultsByType('local');

// 刷新结果
await refreshResults();
```

#### 方法

- `addResult(result: DualAnalysisResult)`: 添加分析结果
- `updateResult(id: string, updates: Partial<DualAnalysisResult>)`: 更新分析结果
- `removeResult(id: string)`: 删除分析结果
- `getResultById(id: string)`: 根据ID获取结果
- `getResultsByTopic(topic: string)`: 根据主题获取结果
- `getResultsByType(type: 'local' | 'api')`: 根据类型获取结果
- `refreshResults()`: 刷新结果列表

### useLocalCases

本地案例管理Hook。

```typescript
import { useLocalCases } from '../hooks/useLocalCases';

const { 
  cases, 
  statistics, 
  isLoading,
  addCase,
  updateCase,
  deleteCase,
  searchCases,
  getCasesByIndustry,
  getCasesByTag
} = useLocalCases();

// 搜索案例
const searchResults = searchCases('创新');

// 按行业筛选
const techCases = getCasesByIndustry('科技');

// 按标签筛选
const innovationCases = getCasesByTag('创新思维');
```

## 服务API

### unifiedAnalysisService

统一分析服务，支持多种分析类型。

```typescript
import { unifiedAnalysisService, AnalysisType, AnalysisMode } from '../services/analysis/unifiedAnalysisService';

// 执行本地分析
const result = await unifiedAnalysisService.analyze({
  topic: '创新产品设计',
  type: AnalysisType.LOCAL,
  mode: AnalysisMode.STANDARD,
  context: {
    industry: '科技',
    targetAudience: '年轻用户'
  },
  options: {
    enableParallel: true,
    cacheResults: true,
    includeSimilarCases: true
  }
});
```

#### 分析类型

- `AnalysisType.LOCAL`: 本地分析
- `AnalysisType.API`: API分析
- `AnalysisType.DUAL`: 双重分析

#### 分析模式

- `AnalysisMode.QUICK`: 快速分析
- `AnalysisMode.STANDARD`: 标准分析
- `AnalysisMode.DEEP`: 深度分析

### unifiedDataManager

统一数据管理器，处理数据存储和同步。

```typescript
import { unifiedDataManager } from '../services/data/unifiedDataManager';

// 保存分析结果
await unifiedDataManager.saveAnalysisResult(dualResult);

// 获取双重分析结果
const results = unifiedDataManager.getDualResults();

// 获取本地案例
const cases = unifiedDataManager.getLocalCases();

// 更新结果
unifiedDataManager.updateDualResult('analysis-123', { topic: '新主题' });

// 删除结果
unifiedDataManager.deleteDualResult('analysis-123');

// 获取存储统计
const stats = unifiedDataManager.getStorageStats();

// 清空所有数据
unifiedDataManager.clearAllData();
```

#### 存储统计

```typescript
interface StorageStats {
  dualResultsCount: number;    // 双重分析结果数量
  localCasesCount: number;     // 本地案例数量
  totalSize: number;           // 总存储大小（字节）
}
```

### analysisCache

智能缓存服务，提供缓存管理和性能优化。

```typescript
import { analysisCache } from '../services/cache/analysisCache';

// 生成缓存键
const cacheKey = analysisCache.generateKey('创新产品设计', AnalysisType.LOCAL, context);

// 获取缓存数据
const cachedResult = analysisCache.get<DualAnalysisResult>(cacheKey);

// 设置缓存数据
analysisCache.set(cacheKey, result, 3600000); // 1小时TTL

// 删除缓存
analysisCache.delete(cacheKey);

// 清空缓存
analysisCache.clear();

// 获取缓存统计
const stats = analysisCache.getStats();

// 获取健康状态
const health = analysisCache.getHealthStatus();
```

#### 缓存统计

```typescript
interface CacheStats {
  hitRate: number;        // 命中率
  totalHits: number;      // 总命中次数
  totalMisses: number;    // 总未命中次数
  totalSize: number;      // 总缓存大小
  entryCount: number;     // 缓存条目数量
}
```

#### 健康状态

```typescript
interface HealthStatus {
  isHealthy: boolean;           // 是否健康
  issues: string[];             // 问题列表
  recommendations: string[];    // 建议列表
}
```

### errorHandler

统一错误处理服务。

```typescript
import { ErrorHandler } from '../services/error/errorHandler';

// 处理分析错误
const userMessage = ErrorHandler.handleAnalysisError(error, {
  component: 'useDualAnalysis',
  action: 'analyze',
  additionalData: { topic: '创新产品设计' }
});

// 处理存储错误
const storageMessage = ErrorHandler.handleStorageError(error, {
  component: 'UnifiedDataManager',
  action: 'saveAnalysisResult'
});

// 处理网络错误
const networkMessage = ErrorHandler.handleNetworkError(error, {
  component: 'API Service',
  action: 'fetchData'
});

// 记录错误日志
ErrorHandler.logError(error, {
  component: 'ComponentName',
  action: 'actionName',
  userId: 'user123',
  additionalData: { key: 'value' }
});

// 创建用户友好的错误
const friendlyError = ErrorHandler.createUserFriendlyError(
  originalError,
  '分析失败，请重试',
  { component: 'AnalysisComponent' }
);

// 异步操作错误处理
const result = await ErrorHandler.handleAsyncError(
  async () => await someAsyncOperation(),
  ErrorHandler.handleAnalysisError,
  { component: 'AsyncComponent' }
);

// 重试机制
const result = await ErrorHandler.retry(
  async () => await someOperation(),
  3, // 最大重试次数
  1000, // 延迟时间
  { component: 'RetryComponent' }
);
```

## 类型定义

### 核心类型

```typescript
// 分析类型
export enum AnalysisType {
  LOCAL = 'local',
  API = 'api',
  DUAL = 'dual'
}

// 分析模式
export enum AnalysisMode {
  QUICK = 'quick',
  STANDARD = 'standard',
  DEEP = 'deep'
}

// 分析上下文
export interface AnalysisContext {
  topic: string;
  industry?: string;
  targetAudience?: string;
  businessModel?: string;
  goals?: string[];
  constraints?: string[];
  aiEnhanced?: boolean;
}

// 双重分析结果
export interface DualAnalysisResult {
  osbornAnalysis: any;    // 奥斯本分析结果
  deepAnalysis: any;      // 深度分析结果
  topic: string;
  timestamp: Date;
  analysisId: string;
}

// 本地案例
export interface LocalCase {
  id: string;
  title: string;
  topic: string;
  description: string;
  industry: string;
  company: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  analysisData?: Record<string, unknown>;
}
```

### 错误上下文

```typescript
export interface ErrorContext {
  component?: string;           // 组件名称
  action?: string;             // 操作名称
  userId?: string;             // 用户ID
  timestamp?: Date;            // 时间戳
  additionalData?: Record<string, any>; // 额外数据
}
```

## 使用示例

### 完整的分析流程

```typescript
import React, { useState } from 'react';
import { useDualAnalysis } from '../hooks/useDualAnalysis';
import { useNavigation } from '../hooks/useNavigation';
import { useAnalysisState } from '../hooks/useAnalysisState';

const AnalysisComponent: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [analysisType, setAnalysisType] = useState<'local' | 'api'>('local');
  
  const { goToAnalysis } = useNavigation();
  const { results } = useAnalysisState();
  const { analyze, isLoading, error, progress } = useDualAnalysis();

  const handleAnalyze = async () => {
    if (!topic.trim()) return;

    try {
      // 执行分析
      await analyze(topic, { 
        analysisType,
        industry: '科技',
        targetAudience: '年轻用户'
      });

      // 跳转到结果页面
      goToAnalysis(topic, analysisType);
    } catch (err) {
      console.error('分析失败:', err);
    }
  };

  return (
    <div>
      <input 
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="输入分析主题"
      />
      
      <select 
        value={analysisType}
        onChange={(e) => setAnalysisType(e.target.value as 'local' | 'api')}
      >
        <option value="local">本地分析</option>
        <option value="api">API分析</option>
      </select>

      <button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? '分析中...' : '开始分析'}
      </button>

      {error && <div className="error">{error}</div>}
      
      {isLoading && (
        <div>
          <div>奥斯本分析进度: {progress.osborn}%</div>
          <div>深度分析进度: {progress.deep}%</div>
        </div>
      )}
    </div>
  );
};
```

### 错误处理示例

```typescript
import { ErrorHandler } from '../services/error/errorHandler';

const handleAnalysisWithErrorHandling = async (topic: string) => {
  try {
    const result = await analyze(topic);
    return result;
  } catch (error) {
    // 记录错误日志
    ErrorHandler.logError(error, {
      component: 'AnalysisComponent',
      action: 'handleAnalysis',
      additionalData: { topic }
    });

    // 显示用户友好的错误消息
    const userMessage = ErrorHandler.handleAnalysisError(error, {
      component: 'AnalysisComponent',
      action: 'handleAnalysis'
    });

    setError(userMessage);
  }
};
```

### 缓存使用示例

```typescript
import { analysisCache } from '../services/cache/analysisCache';
import { AnalysisType } from '../types/analysis';

const getCachedAnalysis = async (topic: string, context: any) => {
  // 生成缓存键
  const cacheKey = analysisCache.generateKey(topic, AnalysisType.LOCAL, context);
  
  // 尝试从缓存获取
  const cachedResult = analysisCache.get(cacheKey);
  if (cachedResult) {
    console.log('从缓存获取结果');
    return cachedResult;
  }

  // 执行分析
  const result = await performAnalysis(topic, context);
  
  // 缓存结果
  analysisCache.set(cacheKey, result, 3600000); // 1小时TTL
  
  return result;
};
```

## 最佳实践

### 1. 错误处理

- 始终使用ErrorHandler处理错误
- 提供用户友好的错误消息
- 记录详细的错误日志
- 实现适当的重试机制

### 2. 性能优化

- 使用缓存避免重复分析
- 合理设置缓存TTL
- 监控缓存命中率
- 定期清理过期缓存

### 3. 状态管理

- 使用统一的状态管理Hook
- 避免直接操作localStorage
- 保持状态同步
- 实现适当的错误恢复

### 4. 导航管理

- 使用useNavigation统一导航
- 避免硬编码路由路径
- 提供一致的导航体验
- 处理导航错误

## 故障排除

### 常见问题

1. **分析结果不显示**
   - 检查useAnalysisState是否正确加载结果
   - 确认unifiedDataManager数据同步正常
   - 查看浏览器控制台错误信息

2. **缓存不生效**
   - 检查analysisCache配置
   - 确认缓存键生成正确
   - 查看缓存统计信息

3. **导航错误**
   - 使用useNavigation统一导航
   - 检查路由配置
   - 确认路径正确

4. **存储错误**
   - 检查浏览器存储权限
   - 确认存储空间充足
   - 查看存储统计信息

### 调试工具

```typescript
// 获取缓存统计
console.log('缓存统计:', analysisCache.getStats());

// 获取存储统计
console.log('存储统计:', unifiedDataManager.getStorageStats());

// 获取缓存健康状态
console.log('缓存健康状态:', analysisCache.getHealthStatus());
```
