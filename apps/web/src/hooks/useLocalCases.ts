import { useState, useEffect, useCallback } from 'react';
import { unifiedDataManager } from '../services/data/unifiedDataManager';

// 本地案例接口
export interface LocalCase {
  id: string;
  title: string; // 添加title属性
  topic: string;
  description: string;
  industry: string;
  company: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  analysisData?: Record<string, unknown>;
}

// 案例统计接口
export interface CaseStatistics {
  totalCases: number;
  byIndustry: Record<string, number>;
  byTag: Record<string, number>;
  recentCases: number;
  topTags: string[]; // 添加topTags属性
}

// const STORAGE_KEY = 'huitu-local-cases'; // 暂时注释掉，因为使用的是服务中的存储

export const useLocalCases = () => {
  const [cases, setCases] = useState<LocalCase[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 添加isLoading状态
  const [statistics, setStatistics] = useState<CaseStatistics>({
    totalCases: 0,
    byIndustry: {},
    byTag: {},
    recentCases: 0,
    topTags: []
  });

  // 从统一数据管理器加载案例
  const loadCases = useCallback(() => {
    setIsLoading(true);
    try {
      const cases = unifiedDataManager.getLocalCases();
      setCases(cases);
      updateStatistics(cases);
    } catch (error) {
      console.error('Failed to load cases:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存案例到统一数据管理器
  const saveCases = useCallback((newCases: LocalCase[]) => {
    try {
      console.log('saveCases 被调用，案例数量:', newCases.length);
      // 保存到统一数据管理器
      unifiedDataManager.saveLocalCases(newCases);
      setCases(newCases);
      updateStatistics(newCases);
      console.log('案例保存完成');
    } catch (error) {
      console.error('Failed to save cases:', error);
    }
  }, []);

  // 更新统计信息
  const updateStatistics = useCallback((caseList: LocalCase[]) => {
    const stats: CaseStatistics = {
      totalCases: caseList.length,
      byIndustry: {},
      byTag: {},
      recentCases: 0,
      topTags: []
    };

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    caseList.forEach(caseItem => {
      // 按行业统计
      stats.byIndustry[caseItem.industry] = (stats.byIndustry[caseItem.industry] || 0) + 1;
      
      // 按标签统计
      caseItem.tags.forEach(tag => {
        stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
      });
      
      // 最近一周的案例
      if (caseItem.createdAt.getTime() > oneWeekAgo) {
        stats.recentCases++;
      }
    });

    // 计算热门标签
    const sortedTags = Object.entries(stats.byTag)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([tag]) => tag);
    
    stats.topTags = sortedTags;

    setStatistics(stats);
  }, []);

  // 刷新案例
  const refreshCases = useCallback(() => {
    loadCases();
  }, [loadCases]);

  // 添加新案例
  const addCase = useCallback((newCase: Omit<LocalCase, 'id' | 'createdAt' | 'updatedAt'>) => {
    const caseWithId: LocalCase = {
      ...newCase,
      id: `case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedCases = [...cases, caseWithId];
    saveCases(updatedCases);
    return caseWithId;
  }, [cases, saveCases]);

  // 从分析结果创建案例
  const createCaseFromAnalysis = useCallback(async (
    topic: string, 
    analysisResult: any, 
    metadata: {
      description: string;
      industry: string;
      company: string;
      tags: string[];
    }
  ) => {
    const newCase = addCase({
      title: topic, // 使用topic作为title
      topic,
      description: metadata.description,
      industry: metadata.industry,
      company: metadata.company,
      tags: metadata.tags,
      analysisData: analysisResult
    });
    
    return newCase;
  }, [addCase]);

  // 更新案例
  const updateCase = useCallback((id: string, updates: Partial<LocalCase>) => {
    const updatedCases = cases.map(caseItem => 
      caseItem.id === id 
        ? { ...caseItem, ...updates, updatedAt: new Date() }
        : caseItem
    );
    saveCases(updatedCases);
  }, [cases, saveCases]);

  // 删除案例
  const deleteCase = useCallback((id: string) => {
    console.log('deleteCase 被调用，ID:', id);
    console.log('删除前的案例数量:', cases.length);
    const updatedCases = cases.filter(caseItem => caseItem.id !== id);
    console.log('删除后的案例数量:', updatedCases.length);
    saveCases(updatedCases);
    console.log('案例删除完成');
  }, [cases, saveCases]);

  // 获取所有案例
  const getAllCases = useCallback(() => {
    return cases;
  }, [cases]);

  // 根据ID获取案例
  const getCaseById = useCallback((id: string) => {
    return cases.find(caseItem => caseItem.id === id);
  }, [cases]);

  // 搜索案例
  const searchCases = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return cases.filter(caseItem => 
      caseItem.title.toLowerCase().includes(lowercaseQuery) ||
      caseItem.topic.toLowerCase().includes(lowercaseQuery) ||
      caseItem.description.toLowerCase().includes(lowercaseQuery) ||
      caseItem.industry.toLowerCase().includes(lowercaseQuery) ||
      caseItem.company.toLowerCase().includes(lowercaseQuery) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [cases]);

  // 按行业筛选案例
  const getCasesByIndustry = useCallback((industry: string) => {
    return cases.filter(caseItem => caseItem.industry === industry);
  }, [cases]);

  // 按标签筛选案例
  const getCasesByTag = useCallback((tag: string) => {
    return cases.filter(caseItem => caseItem.tags.includes(tag));
  }, [cases]);

  // 初始化加载
  useEffect(() => {
    loadCases();
  }, [loadCases]);

  return {
    cases,
    isLoading,
    statistics,
    refreshCases,
    addCase,
    createCaseFromAnalysis,
    updateCase,
    deleteCase,
    getAllCases,
    getCaseById,
    searchCases,
    getCasesByIndustry,
    getCasesByTag
  };
};
