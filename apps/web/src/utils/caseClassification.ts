// 案例分类工具函数

import { 
  EnhancedLocalCase, 
  IndustryCategory, 
  CaseClassificationStats, 
  CaseFilterOptions,
  PRESET_INDUSTRY_CATEGORIES,
  CaseSortOption 
} from '../types/case';

// 根据行业分类案例
export const classifyCasesByIndustry = (cases: EnhancedLocalCase[]): Record<string, EnhancedLocalCase[]> => {
  const classified: Record<string, EnhancedLocalCase[]> = {};
  
  cases.forEach(caseItem => {
    const industry = caseItem.industry || 'other';
    if (!classified[industry]) {
      classified[industry] = [];
    }
    classified[industry].push(caseItem);
  });
  
  return classified;
};

// 根据子分类分类案例
export const classifyCasesBySubcategory = (cases: EnhancedLocalCase[]): Record<string, EnhancedLocalCase[]> => {
  const classified: Record<string, EnhancedLocalCase[]> = {};
  
  cases.forEach(caseItem => {
    const subcategory = caseItem.subcategory || '未分类';
    if (!classified[subcategory]) {
      classified[subcategory] = [];
    }
    classified[subcategory].push(caseItem);
  });
  
  return classified;
};

// 根据标签分类案例
export const classifyCasesByTag = (cases: EnhancedLocalCase[]): Record<string, EnhancedLocalCase[]> => {
  const classified: Record<string, EnhancedLocalCase[]> = {};
  
  cases.forEach(caseItem => {
    // 处理预设标签
    caseItem.tags.forEach(tag => {
      if (!classified[tag]) {
        classified[tag] = [];
      }
      classified[tag].push(caseItem);
    });
    
    // 处理自定义标签
    caseItem.customTags.forEach(tag => {
      if (!classified[tag]) {
        classified[tag] = [];
      }
      classified[tag].push(caseItem);
    });
  });
  
  return classified;
};

// 更新行业分类统计
export const updateIndustryCategoryStats = (categories: IndustryCategory[], cases: EnhancedLocalCase[]): IndustryCategory[] => {
  const caseCounts = classifyCasesByIndustry(cases);
  
  return categories.map(category => ({
    ...category,
    caseCount: caseCounts[category.id]?.length || 0
  }));
};

// 计算案例分类统计
export const calculateCaseClassificationStats = (cases: EnhancedLocalCase[]): CaseClassificationStats => {
  const stats: CaseClassificationStats = {
    totalCases: cases.length,
    byIndustry: {},
    bySubcategory: {},
    byTag: {},
    byCustomTag: {},
    recentCases: 0,
    topTags: [],
    topCustomTags: [],
    favoriteCases: 0
  };

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  cases.forEach(caseItem => {
    // 按行业统计
    const industry = caseItem.industry || 'other';
    stats.byIndustry[industry] = (stats.byIndustry[industry] || 0) + 1;
    
    // 按子分类统计
    const subcategory = caseItem.subcategory || '未分类';
    stats.bySubcategory[subcategory] = (stats.bySubcategory[subcategory] || 0) + 1;
    
    // 按标签统计
    caseItem.tags.forEach(tag => {
      stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
    });
    
    // 按自定义标签统计
    caseItem.customTags.forEach(tag => {
      stats.byCustomTag[tag] = (stats.byCustomTag[tag] || 0) + 1;
    });
    
    // 最近一周的案例
    if (caseItem.createdAt.getTime() > oneWeekAgo) {
      stats.recentCases++;
    }
    
    // 收藏的案例
    if (caseItem.isFavorite) {
      stats.favoriteCases++;
    }
  });

  // 计算热门标签
  const sortedTags = Object.entries(stats.byTag)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([tag]) => tag);
  
  const sortedCustomTags = Object.entries(stats.byCustomTag)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([tag]) => tag);
  
  stats.topTags = sortedTags;
  stats.topCustomTags = sortedCustomTags;

  return stats;
};

// 筛选案例
export const filterCases = (cases: EnhancedLocalCase[], options: CaseFilterOptions): EnhancedLocalCase[] => {
  let filtered = [...cases];

  // 按行业筛选
  if (options.industry) {
    filtered = filtered.filter(caseItem => caseItem.industry === options.industry);
  }

  // 按子分类筛选
  if (options.subcategory) {
    filtered = filtered.filter(caseItem => caseItem.subcategory === options.subcategory);
  }

  // 按标签筛选
  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter(caseItem => 
      options.tags!.some(tag => caseItem.tags.includes(tag))
    );
  }

  // 按自定义标签筛选
  if (options.customTags && options.customTags.length > 0) {
    filtered = filtered.filter(caseItem => 
      options.customTags!.some(tag => caseItem.customTags.includes(tag))
    );
  }

  // 按收藏状态筛选
  if (options.isFavorite !== undefined) {
    filtered = filtered.filter(caseItem => caseItem.isFavorite === options.isFavorite);
  }

  // 按日期范围筛选
  if (options.dateRange) {
    filtered = filtered.filter(caseItem => {
      const caseDate = caseItem.createdAt.getTime();
      return caseDate >= options.dateRange!.start.getTime() && 
             caseDate <= options.dateRange!.end.getTime();
    });
  }

  // 按搜索查询筛选
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(caseItem => 
      caseItem.title.toLowerCase().includes(query) ||
      caseItem.topic.toLowerCase().includes(query) ||
      caseItem.description.toLowerCase().includes(query) ||
      caseItem.industry.toLowerCase().includes(query) ||
      caseItem.company.toLowerCase().includes(query) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(query)) ||
      caseItem.customTags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
};

// 排序案例
export const sortCases = (cases: EnhancedLocalCase[], sortBy: CaseSortOption): EnhancedLocalCase[] => {
  const sorted = [...cases];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'industry':
      return sorted.sort((a, b) => a.industry.localeCompare(b.industry));
    case 'favorite':
      return sorted.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    default:
      return sorted;
  }
};

// 获取行业分类的子分类
export const getSubcategoriesByIndustry = (industryId: string): string[] => {
  const category = PRESET_INDUSTRY_CATEGORIES.find(cat => cat.id === industryId);
  return category?.subcategories || [];
};

// 获取行业分类信息
export const getIndustryCategory = (industryId: string): IndustryCategory | undefined => {
  return PRESET_INDUSTRY_CATEGORIES.find(cat => cat.id === industryId);
};

// 获取所有行业分类
export const getAllIndustryCategories = (): IndustryCategory[] => {
  return PRESET_INDUSTRY_CATEGORIES;
};

// 验证案例数据
export const validateCaseData = (caseData: Partial<EnhancedLocalCase>): string[] => {
  const errors: string[] = [];
  
  if (!caseData.title?.trim()) {
    errors.push('案例标题不能为空');
  }
  
  if (!caseData.topic?.trim()) {
    errors.push('案例主题不能为空');
  }
  
  if (!caseData.industry?.trim()) {
    errors.push('行业分类不能为空');
  }
  
  if (!caseData.description?.trim()) {
    errors.push('案例描述不能为空');
  }
  
  return errors;
};

// 生成案例ID
export const generateCaseId = (): string => {
  return `case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 格式化案例数据
export const formatCaseData = (caseData: Partial<EnhancedLocalCase>): EnhancedLocalCase => {
  const now = new Date();
  
  return {
    id: caseData.id || generateCaseId(),
    title: caseData.title || '',
    topic: caseData.topic || '',
    description: caseData.description || '',
    industry: caseData.industry || 'other',
    subcategory: caseData.subcategory || '',
    company: caseData.company || '',
    tags: caseData.tags || [],
    customTags: caseData.customTags || [],
    createdAt: caseData.createdAt || now,
    updatedAt: now,
    analysisData: caseData.analysisData || {},
    isFavorite: caseData.isFavorite || false
  };
};
