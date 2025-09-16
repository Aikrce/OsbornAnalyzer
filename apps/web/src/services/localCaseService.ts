import { AnalysisResult } from '@huitu/shared/types';

export interface LocalCase {
  id: string;
  title: string;
  description: string;
  topic: string;
  analysisResult: AnalysisResult;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  industry?: string;
  company?: string;
  rating?: number;
}

class LocalCaseService {
  private readonly STORAGE_KEY = 'huitu_local_cases';
  private cases: LocalCase[] = [];

  constructor() {
    this.loadCases();
  }

  // 加载案例
  private loadCases(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cases = parsed.map((caseItem: any) => ({
          ...caseItem,
          createdAt: new Date(caseItem.createdAt),
          updatedAt: new Date(caseItem.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load cases:', error);
      this.cases = [];
    }
  }

  // 保存案例
  private saveCases(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cases));
    } catch (error) {
      console.error('Failed to save cases:', error);
    }
  }

  // 获取所有案例
  getAllCases(): LocalCase[] {
    return [...this.cases];
  }

  // 根据ID获取案例
  getCaseById(id: string): LocalCase | null {
    return this.cases.find(c => c.id === id) || null;
  }

  // 添加案例
  addCase(caseData: Omit<LocalCase, 'id' | 'createdAt' | 'updatedAt'>): LocalCase {
    const newCase: LocalCase = {
      ...caseData,
      id: `case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.cases.unshift(newCase);
    this.saveCases();
    return newCase;
  }

  // 从分析结果创建案例
  createCaseFromAnalysis(
    topic: string,
    analysisResult: AnalysisResult,
    additionalData?: {
      description?: string;
      tags?: string[];
      industry?: string;
      company?: string;
    }
  ): LocalCase {
    const title = topic.length > 50 ? `${topic.substring(0, 50)}...` : topic;
    const description = additionalData?.description || 
      `基于奥斯本九问的${topic}创新分析，包含${Object.keys(analysisResult.questions).length}个维度的深度分析`;

    return this.addCase({
      title,
      description,
      topic,
      analysisResult,
      tags: additionalData?.tags || this.generateTagsFromAnalysis(analysisResult),
      industry: additionalData?.industry,
      company: additionalData?.company,
      rating: 0,
    });
  }

  // 从分析结果生成标签
  private generateTagsFromAnalysis(analysisResult: AnalysisResult): string[] {
    const tags = new Set<string>();
    
    // 从问题中提取标签
    Object.keys(analysisResult.questions).forEach(category => {
      tags.add(category);
    });
    
    // 从建议中提取标签
    if (analysisResult.suggestions) {
      analysisResult.suggestions.forEach(suggestion => {
        const words = suggestion.split(/\s+/);
        words.forEach(word => {
          if (word.length > 2 && word.length < 10) {
            tags.add(word);
          }
        });
      });
    }
    
    return Array.from(tags).slice(0, 10);
  }

  // 更新案例
  updateCase(id: string, updates: Partial<LocalCase>): LocalCase | null {
    const index = this.cases.findIndex(c => c.id === id);
    if (index === -1) return null;

    const existingCase = this.cases[index];
    if (!existingCase) return null;

    this.cases[index] = {
      ...existingCase,
      ...updates,
      updatedAt: new Date(),
    };
    this.saveCases();
    return this.cases[index] || null;
  }

  // 删除案例
  deleteCase(id: string): boolean {
    const index = this.cases.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.cases.splice(index, 1);
    this.saveCases();
    return true;
  }

  // 搜索案例
  searchCases(query: string): LocalCase[] {
    const lowerQuery = query.toLowerCase();
    return this.cases.filter(caseItem => 
      caseItem.title.toLowerCase().includes(lowerQuery) ||
      caseItem.description.toLowerCase().includes(lowerQuery) ||
      caseItem.topic.toLowerCase().includes(lowerQuery) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // 按行业筛选案例
  filterCasesByIndustry(industry: string): LocalCase[] {
    return this.cases.filter(caseItem => caseItem.industry === industry);
  }

  // 按标签筛选案例
  filterCasesByTag(tag: string): LocalCase[] {
    return this.cases.filter(caseItem => caseItem.tags.includes(tag));
  }

  // 获取案例统计
  getCaseStats() {
    const total = this.cases.length;
    const byIndustry = this.cases.reduce((acc, caseItem) => {
      const industry = caseItem.industry || '未分类';
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byQuality = this.cases.reduce((acc, caseItem) => {
      const quality = caseItem.analysisResult.quality;
      acc[quality] = (acc[quality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      byIndustry,
      byQuality,
      averageScore: this.cases.reduce((sum, caseItem) => sum + caseItem.analysisResult.totalScore, 0) / total || 0
    };
  }

  // 清空所有案例
  clearAllCases(): void {
    this.cases = [];
    this.saveCases();
  }

  // 导出案例
  exportCases(): string {
    return JSON.stringify(this.cases, null, 2);
  }

  // 导入案例
  importCases(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        this.cases = imported.map((caseItem: any) => ({
          ...caseItem,
          createdAt: new Date(caseItem.createdAt),
          updatedAt: new Date(caseItem.updatedAt),
        }));
        this.saveCases();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import cases:', error);
      return false;
    }
  }
}

export const localCaseService = new LocalCaseService();
export default localCaseService;
