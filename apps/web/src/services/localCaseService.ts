import { AnalysisResult } from '@huitu/shared';
import { OSBORN_BASE_CASES, OsbornCase } from '../data/baseCases';

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
  similarity?: number; // 添加相似度属性
}

class LocalCaseService {
  private readonly STORAGE_KEY = 'huitu_local_cases';
  private cases: LocalCase[] = [];

  constructor() {
    console.log('LocalCaseService constructor called');
    this.loadCases();
    console.log('Cases loaded, count:', this.cases.length);
    this.initializeBaseCases();
    console.log('Base cases initialization completed, total cases:', this.cases.length);
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

  // 初始化基础案例
  private initializeBaseCases(): void {
    console.log('Checking base cases initialization...');
    console.log('OSBORN_BASE_CASES length:', OSBORN_BASE_CASES?.length || 0);
    console.log('Current cases count:', this.cases.length);
    
    // 检查是否已经初始化过基础案例
    const hasBaseCases = this.cases.some(caseItem => caseItem.id.startsWith('osborn-'));
    console.log('Has base cases:', hasBaseCases);
    
    if (!hasBaseCases && OSBORN_BASE_CASES && OSBORN_BASE_CASES.length > 0) {
      console.log('Initializing base cases...', OSBORN_BASE_CASES.length);
      
      // 将基础案例转换为 LocalCase 格式
      const baseCases: LocalCase[] = OSBORN_BASE_CASES.map(osbornCase => ({
        id: osbornCase.id,
        title: osbornCase.title,
        description: osbornCase.description,
        topic: osbornCase.topic,
        analysisResult: {
          id: osbornCase.id,
          title: osbornCase.title,
          description: osbornCase.description,
          question: osbornCase.topic,
          analysis: `基于奥斯本${osbornCase.analysisData.dimension}维度的${osbornCase.topic}分析`,
          suggestions: osbornCase.analysisData.innovationSchemes,
          questions: {
            [osbornCase.analysisData.dimension]: osbornCase.analysisData.questions
          },
          summary: `${osbornCase.topic}的${osbornCase.analysisData.dimension}分析，提供了${osbornCase.analysisData.insights.length}个关键洞察和${osbornCase.analysisData.innovationSchemes.length}个创新方案`,
          totalScore: 85,
          quality: 'high' as const,
          timestamp: osbornCase.createdAt,
          createdAt: osbornCase.createdAt,
          updatedAt: osbornCase.updatedAt,
          insights: {
            keyOpportunities: osbornCase.analysisData.insights,
            potentialRisks: ['市场竞争', '技术风险', '用户接受度'],
            marketTrends: ['数字化转型', '创新驱动', '用户需求变化'],
            competitiveAdvantages: ['技术领先', '创新思维', '市场洞察']
          },
          recommendations: {
            shortTerm: osbornCase.analysisData.innovationSchemes.slice(0, 2),
            mediumTerm: osbornCase.analysisData.innovationSchemes.slice(2, 4),
            longTerm: osbornCase.analysisData.innovationSchemes.slice(4)
          },
          similarCases: [],
          confidence: 0.9,
          detailedAnalysis: {
            osbornDimensions: [{
              dimension: osbornCase.analysisData.dimension,
              questions: osbornCase.analysisData.questions,
              insights: osbornCase.analysisData.insights,
              innovationSchemes: osbornCase.analysisData.innovationSchemes,
              score: 85,
              recommendations: osbornCase.analysisData.innovationSchemes
            }],
            crossIndustryInsights: [],
            innovationPatterns: [],
            implementationRoadmap: []
          }
        },
        createdAt: osbornCase.createdAt,
        updatedAt: osbornCase.updatedAt,
        tags: osbornCase.tags,
        industry: osbornCase.industry,
        company: osbornCase.company,
        rating: 4.5
      }));

      // 将基础案例添加到现有案例中
      this.cases = [...baseCases, ...this.cases];
      this.saveCases();
      
      console.log(`Initialized ${baseCases.length} base cases`);
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
      industry: additionalData?.industry || '',
      company: additionalData?.company || '',
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
