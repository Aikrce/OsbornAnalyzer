/**
 * 文本清理工具
 * 用于清理AI响应中的Markdown格式和代码符号
 */

/**
 * 清理文本中的Markdown格式和代码符号
 * @param text 需要清理的文本
 * @returns 清理后的纯文本
 */
export function cleanText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let cleaned = text;

  // 移除代码块标记
  cleaned = cleaned.replace(/```[\s\S]*?```/g, ''); // 代码块
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1'); // 行内代码

  // 移除Markdown格式标记
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1'); // 粗体
  cleaned = cleaned.replace(/\*(.*?)\*/g, '$1'); // 斜体
  cleaned = cleaned.replace(/~~(.*?)~~/g, '$1'); // 删除线
  cleaned = cleaned.replace(/==(.*?)==/g, '$1'); // 高亮

  // 移除标题标记
  cleaned = cleaned.replace(/^#{1,6}\s*/gm, ''); // 标题标记

  // 移除列表标记
  cleaned = cleaned.replace(/^\s*[-*+]\s*/gm, ''); // 无序列表
  cleaned = cleaned.replace(/^\s*\d+\.\s*/gm, ''); // 有序列表

  // 移除链接和图片
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // 链接
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1'); // 图片

  // 移除引用标记
  cleaned = cleaned.replace(/^\s*>\s*/gm, ''); // 引用

  // 移除表格
  cleaned = cleaned.replace(/^\s*\|.*\|.*$/gm, ''); // 表格行
  cleaned = cleaned.replace(/^---+$/gm, ''); // 表格分隔线

  // 移除多余的空行
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n'); // 多个空行合并为两个

  // 清理首尾空白
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * 清理HTML标签
 * @param text 包含HTML标签的文本
 * @returns 清理后的纯文本
 */
export function cleanHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/<[^>]*>/g, '') // 移除HTML标签
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * 清理文本中的特殊字符和符号
 * @param text 需要清理的文本
 * @returns 清理后的文本
 */
export function cleanSpecialChars(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let cleaned = text;

  // 移除常见的代码符号
  cleaned = cleaned.replace(/[`~^]/g, ''); // 反引号、波浪号、插入符号
  cleaned = cleaned.replace(/[{}]/g, ''); // 大括号
  cleaned = cleaned.replace(/[\[\]]/g, ''); // 方括号
  cleaned = cleaned.replace(/[()]/g, ''); // 圆括号（保留，因为可能是有意义的）

  // 移除多余的标点符号
  cleaned = cleaned.replace(/[;]{2,}/g, ';'); // 多个分号
  cleaned = cleaned.replace(/[,]{2,}/g, ','); // 多个逗号
  cleaned = cleaned.replace(/[.]{3,}/g, '...'); // 多个句号

  return cleaned.trim();
}

/**
 * 综合清理文本
 * @param text 需要清理的文本
 * @param options 清理选项
 * @returns 清理后的文本
 */
export function cleanTextComprehensive(
  text: string, 
  options: {
    removeMarkdown?: boolean;
    removeHtml?: boolean;
    removeSpecialChars?: boolean;
    preserveLineBreaks?: boolean;
  } = {}
): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const {
    removeMarkdown = true,
    removeHtml = true,
    removeSpecialChars = false,
    preserveLineBreaks = true
  } = options;

  let cleaned = text;

  if (removeMarkdown) {
    cleaned = cleanText(cleaned);
  }

  if (removeHtml) {
    cleaned = cleanHtml(cleaned);
  }

  if (removeSpecialChars) {
    cleaned = cleanSpecialChars(cleaned);
  }

  if (!preserveLineBreaks) {
    cleaned = cleaned.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  }

  return cleaned.trim();
}

/**
 * 清理奥斯本分析结果
 * @param analysisResult 奥斯本分析结果
 * @returns 清理后的分析结果
 */
export function cleanOsbornAnalysis(analysisResult: any): any {
  if (!analysisResult) {
    return analysisResult;
  }

  const cleaned = { ...analysisResult };

  // 清理问题内容
  if (cleaned.questions) {
    if (typeof cleaned.questions === 'object') {
      const cleanedQuestions: any = {};
      Object.entries(cleaned.questions).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          cleanedQuestions[key] = value.map((item: string) => cleanTextComprehensive(item));
        } else if (typeof value === 'string') {
          cleanedQuestions[key] = cleanTextComprehensive(value);
        } else {
          cleanedQuestions[key] = value;
        }
      });
      cleaned.questions = cleanedQuestions;
    }
  }

  // 清理建议内容
  if (cleaned.suggestions && Array.isArray(cleaned.suggestions)) {
    cleaned.suggestions = cleaned.suggestions.map((suggestion: string) => 
      cleanTextComprehensive(suggestion)
    );
  }

  // 清理洞察内容
  if (cleaned.insights && Array.isArray(cleaned.insights)) {
    cleaned.insights = cleaned.insights.map((insight: string) => 
      cleanTextComprehensive(insight)
    );
  }

  return cleaned;
}

/**
 * 清理深度分析结果
 * @param analysisResult 深度分析结果
 * @returns 清理后的分析结果
 */
export function cleanDeepAnalysis(analysisResult: any): any {
  if (!analysisResult) {
    return analysisResult;
  }

  const cleaned = { ...analysisResult };

  // 清理分析内容
  if (cleaned.analysis && typeof cleaned.analysis === 'string') {
    cleaned.analysis = cleanTextComprehensive(cleaned.analysis);
  }

  // 清理摘要内容
  if (cleaned.summary && typeof cleaned.summary === 'string') {
    cleaned.summary = cleanTextComprehensive(cleaned.summary);
  }

  // 清理建议内容
  if (cleaned.recommendations && Array.isArray(cleaned.recommendations)) {
    cleaned.recommendations = cleaned.recommendations.map((rec: string) => 
      cleanTextComprehensive(rec)
    );
  }

  return cleaned;
}
