import { CaseStudy } from '../types';

/**
 * 奥斯本检核表分析案例数据库
 * 包含各行业领域的创新案例分析
 */
export const CASE_DATABASE: CaseStudy[] = [
  {
    id: 'case_001',
    title: '智能手机产品设计创新',
    topic: '产品设计',
    description: '智能手机产品设计创新案例分析',
    keywords: ['智能手机'],
    timestamp: new Date(1704067200000),
    tags: ['科技', '消费电子', '创新'],
    industry: '科技',
    domain: '消费电子',
    category: '产品创新',
  }
];

/**
 * 获取案例数量统计
 */
export function getCaseStats() {
  const total = CASE_DATABASE.length;
  const highQuality = CASE_DATABASE.filter(c => c.analysisResult?.quality === 'high').length;
  const mediumQuality = CASE_DATABASE.filter(c => c.analysisResult?.quality === 'medium').length;
  const lowQuality = CASE_DATABASE.filter(c => c.analysisResult?.quality === 'low').length;

  return {
    total,
    highQuality,
    mediumQuality,
    lowQuality,
    lastUpdated: new Date()
  };
}

/**
 * 根据关键词搜索案例
 */
export function searchCases(keywords: string): CaseStudy[] {
  const searchTerm = keywords.toLowerCase();
  return CASE_DATABASE.filter(caseItem => 
    caseItem.topic?.toLowerCase().includes(searchTerm) ||
    caseItem.keywords?.some((keywords: string) => keywords.toLowerCase().includes(searchTerm)) ||
    caseItem.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * 根据质量等级获取案例
 */
export function getCasesByQuality(quality: 'low' | 'medium' | 'high'): CaseStudy[] {
  return CASE_DATABASE.filter(caseItem => caseItem.analysisResult?.quality === quality);
}

/**
 * 获取最新的案例
 */
export function getLatestCases(limit: number = 10): CaseStudy[] {
  return CASE_DATABASE
    .sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0))
    .slice(0, limit);
}

/**
 * 获取随机案例
 */
export function getRandomCases(limit: number = 5): CaseStudy[] {
  const shuffled = [...CASE_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

/**
 * 根据关键词过滤案例
 */
export function filterCasesByKeyword(keywords: string): CaseStudy[] {
  return searchCases(keywords);
}

/**
 * 根据主题过滤案例
 */
export function filterCasesByTopic(topic: string): CaseStudy[] {
  const searchTerm = topic.toLowerCase();
  return CASE_DATABASE.filter(caseItem => 
    caseItem.topic?.toLowerCase().includes(searchTerm)
  );
}
