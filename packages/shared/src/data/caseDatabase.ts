import { CaseItem } from '../types';

/**
 * 奥斯本检核表分析案例数据库
 * 包含各行业领域的创新案例分析
 */
export const CASE_DATABASE: CaseItem[] = [
  {
    id: 'case_001',
    topic: '产品设计',
    keyword: '智能手机',
    timestamp: 1704067200000,
    quality: 'high',
    tags: ['科技', '消费电子', '创新'],
    result: {
      id: 'analysis_001',
      title: '智能手机创新设计分析',
      description: '分析智能手机如何通过组合创新改变移动通信领域',
      topic: '产品设计',
      keyword: '智能手机',
      timestamp: 1704067200000,
      totalScore: 92,
      quality: 'high',
      summary: '智能手机通过组合多种功能、缩小体积、优化用户体验等创新方式，彻底改变了移动通信和计算领域。',
      createdAt: new Date(1704067200000),
      updatedAt: new Date(1704067200000),
      results: [
        {
          questionType: 'combine',
          question: '智能手机能否与其他功能组合？',
          answer: '智能手机成功组合了电话、相机、音乐播放器、GPS导航、网络浏览器、游戏机等多种功能于一体。',
          insights: ['功能集成大幅提升了设备的使用价值', '组合创新降低了用户携带多个设备的成本'],
          score: 95,
          confidence: 0.9
        }
      ]
    }
  }
];

/**
 * 获取案例数量统计
 */
export function getCaseStats() {
  const total = CASE_DATABASE.length;
  const highQuality = CASE_DATABASE.filter(c => c.quality === 'high').length;
  const mediumQuality = CASE_DATABASE.filter(c => c.quality === 'medium').length;
  const lowQuality = CASE_DATABASE.filter(c => c.quality === 'low').length;

  return {
    total,
    highQuality,
    mediumQuality,
    lowQuality,
    lastUpdated: Date.now()
  };
}

/**
 * 根据关键词搜索案例
 */
export function searchCases(keyword: string): CaseItem[] {
  const searchTerm = keyword.toLowerCase();
  return CASE_DATABASE.filter(caseItem => 
    caseItem.topic.toLowerCase().includes(searchTerm) ||
    (caseItem.keyword || "").toLowerCase().includes(searchTerm) ||
    caseItem.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * 根据质量等级获取案例
 */
export function getCasesByQuality(quality: 'low' | 'medium' | 'high'): CaseItem[] {
  return CASE_DATABASE.filter(caseItem => caseItem.quality === quality);
}

/**
 * 获取最新的案例
 */
export function getLatestCases(limit: number = 10): CaseItem[] {
  return CASE_DATABASE
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

/**
 * 获取随机案例
 */
export function getRandomCases(limit: number = 5): CaseItem[] {
  const shuffled = [...CASE_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

/**
 * 根据关键词过滤案例
 */
export function filterCasesByKeyword(keyword: string): CaseItem[] {
  return searchCases(keyword);
}

/**
 * 根据主题过滤案例
 */
export function filterCasesByTopic(topic: string): CaseItem[] {
  const searchTerm = topic.toLowerCase();
  return CASE_DATABASE.filter(caseItem => 
    caseItem.topic.toLowerCase().includes(searchTerm)
  );
}
