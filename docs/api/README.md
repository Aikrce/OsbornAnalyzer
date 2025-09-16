# HuiTu API 文档

## 概述

HuiTu 是一个基于奥斯本检核表法的创新思维分析工具，提供完整的API接口用于分析、案例管理和AI增强功能。

## 核心API

### 1. 分析引擎 API

#### 奥斯本分析
```typescript
interface OsbornAnalysisAPI {
  analyze(topic: string, options?: AnalysisOptions): Promise<AnalysisResult>;
  generateQuestions(topic: string): Promise<Record<QuestionCategory, string[]>>;
  calculateScore(questions: Record<string, string[]>): number;
}
```

**方法说明：**
- `analyze(topic, options)`: 执行完整的奥斯本九维度分析
- `generateQuestions(topic)`: 为主题生成九维度问题
- `calculateScore(questions)`: 计算分析结果评分

#### AI增强分析
```typescript
interface AIAnalysisAPI {
  enhanceAnalysis(result: AnalysisResult): Promise<AIAnalysisResult>;
  suggestAlternatives(topic: string): Promise<string[]>;
  generateInsights(analysis: AnalysisResult): Promise<string[]>;
}
```

**方法说明：**
- `enhanceAnalysis(result)`: 使用AI增强分析结果
- `suggestAlternatives(topic)`: 生成替代方案建议
- `generateInsights(analysis)`: 生成深度洞察

### 2. 案例管理 API

#### 案例数据库
```typescript
interface CaseManagementAPI {
  getCases(filters?: CaseFilters): Promise<CaseStudy[]>;
  getCaseById(id: string): Promise<CaseStudy | null>;
  findSimilarCases(topic: string, limit?: number): Promise<CaseStudy[]>;
  addCase(caseData: Partial<CaseStudy>): Promise<CaseStudy>;
  updateCase(id: string, updates: Partial<CaseStudy>): Promise<CaseStudy>;
  deleteCase(id: string): Promise<boolean>;
}
```

**方法说明：**
- `getCases(filters)`: 获取案例列表，支持过滤
- `getCaseById(id)`: 根据ID获取单个案例
- `findSimilarCases(topic, limit)`: 查找相似案例
- `addCase(caseData)`: 添加新案例
- `updateCase(id, updates)`: 更新案例
- `deleteCase(id)`: 删除案例

### 3. 数据导出 API

#### 导出功能
```typescript
interface ExportAPI {
  exportToPDF(data: AnalysisResult, options?: ExportOptions): Promise<Blob>;
  exportToWord(data: AnalysisResult, options?: ExportOptions): Promise<Blob>;
  exportToExcel(data: AnalysisResult, options?: ExportOptions): Promise<Blob>;
  exportToMarkdown(data: AnalysisResult, options?: ExportOptions): Promise<string>;
}
```

**方法说明：**
- `exportToPDF(data, options)`: 导出为PDF格式
- `exportToWord(data, options)`: 导出为Word文档
- `exportToExcel(data, options)`: 导出为Excel表格
- `exportToMarkdown(data, options)`: 导出为Markdown格式

## 数据类型定义

### 核心类型

```typescript
// 奥斯本问题类型
type OsbornQuestionType = 
  | 'other-uses'          // 其他用途
  | 'adapt'               // 借用
  | 'modify'              // 改变
  | 'magnify'             // 扩大
  | 'minify'              // 缩小
  | 'substitute'          // 替代
  | 'rearrange'           // 重新安排
  | 'reverse'             // 颠倒
  | 'combine';            // 组合

// 分析结果
interface AnalysisResult {
  id: string;
  title: string;
  description: string;
  questions: Record<string, string[]>;
  summary: string;
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  timestamp: Date;
  question: string;
  analysis: string;
  suggestions?: string[];
}

// 案例研究
interface CaseStudy {
  id: string;
  title: string;
  topic?: string;
  description: string;
  timestamp?: Date;
  analysisMode?: AnalysisMode;
  keywords?: string[];
  tags?: string[];
  industry?: string;
  company?: string;
  domain?: string;
  category?: string;
  difficulty?: string;
  createdAt?: Date;
  updatedAt?: Date;
  analysisResult?: AnalysisResult;
  deepAnalysis?: DeepAnalysisResult;
  osbornAnalysis?: OsbornAnalysisResult;
  isPublic?: boolean;
  sourceCases?: CaseReference[];
}
```

## 使用示例

### 基本分析流程

```typescript
import { AnalysisEngine } from '@huitu/shared';

const engine = AnalysisEngine.getInstance();

// 1. 执行分析
const result = await engine.performFullAnalysis(
  '智能手机创新',
  '分析智能手机产品的创新机会',
  {
    useAI: true,
    enhanceWithAI: true,
    findSimilarCases: true
  }
);

// 2. 获取结果
console.log('分析结果:', result.result);
console.log('AI增强:', result.aiAnalysis);
console.log('相似案例:', result.similarCases);
```

### 案例管理

```typescript
import { CaseManager } from '@huitu/shared';

const caseManager = new CaseManager();

// 获取所有案例
const cases = await caseManager.getCases({
  industry: '科技',
  difficulty: 'beginner'
});

// 查找相似案例
const similarCases = await caseManager.findSimilarCases('人工智能', 5);
```

### 数据导出

```typescript
import { ExportService } from '@huitu/shared';

const exportService = new ExportService();

// 导出为PDF
const pdfBlob = await exportService.exportToPDF(analysisResult, {
  format: 'pdf',
  includeTimestamp: true,
  includeScore: true,
  fileName: 'analysis-report.pdf'
});

// 下载文件
const url = URL.createObjectURL(pdfBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'analysis-report.pdf';
a.click();
```

## 错误处理

所有API方法都会返回Promise，可能抛出以下错误：

```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}
```

**常见错误代码：**
- `INVALID_INPUT`: 输入参数无效
- `ANALYSIS_FAILED`: 分析执行失败
- `CASE_NOT_FOUND`: 案例不存在
- `EXPORT_FAILED`: 导出失败
- `AI_SERVICE_ERROR`: AI服务错误

## 性能优化

### 缓存策略
- 分析结果缓存5分钟
- 案例数据缓存1小时
- AI响应缓存10分钟

### 批量操作
- 支持批量案例导入
- 支持批量分析执行
- 支持批量导出

### 异步处理
- 长时间分析支持进度回调
- 大文件导出支持流式处理
- AI增强支持队列处理

## 版本信息

- **当前版本**: v2.0.0
- **API版本**: v1.0.0
- **最后更新**: 2025-01-27

## 支持

如有API使用问题，请参考：
- [GitHub Issues](https://github.com/your-org/huitu/issues)
- [文档Wiki](https://github.com/your-org/huitu/wiki)
- [社区讨论](https://github.com/your-org/huitu/discussions)
