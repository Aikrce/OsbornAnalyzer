/**
 * 统一数据管理器
 * 解决 dual-analysis-results 和 huitu-local-cases 存储不一致问题
 */

import { DualAnalysisResult } from '../../hooks/useDualAnalysis';
import { LocalCase } from '../../hooks/useLocalCases';
import { ErrorHandler } from '../error/errorHandler';
import { OSBORN_BASE_CASES, OsbornCase } from '../../data/baseCases';

class UnifiedDataManager {
  private static instance: UnifiedDataManager;
  private readonly DUAL_RESULTS_KEY = 'dual-analysis-results';
  private readonly LOCAL_CASES_KEY = 'huitu-local-cases';
  
  static getInstance(): UnifiedDataManager {
    if (!UnifiedDataManager.instance) {
      UnifiedDataManager.instance = new UnifiedDataManager();
    }
    return UnifiedDataManager.instance;
  }
  
  /**
   * 保存分析结果到统一存储
   */
  async saveAnalysisResult(result: DualAnalysisResult): Promise<void> {
    try {
      // 1. 保存到双重分析结果
      await this.saveDualResult(result);
      
      // 2. 自动创建案例库条目
      await this.createCaseFromResult(result);
      
      console.log('分析结果已保存到统一存储');
    } catch (error) {
      const userMessage = ErrorHandler.handleStorageError(error, {
        component: 'UnifiedDataManager',
        action: 'saveAnalysisResult',
        additionalData: { analysisId: result.analysisId, topic: result.topic }
      });
      
      ErrorHandler.logError(error, {
        component: 'UnifiedDataManager',
        action: 'saveAnalysisResult',
        additionalData: { analysisId: result.analysisId, topic: result.topic }
      });
      
      throw new Error(userMessage);
    }
  }
  
  /**
   * 保存双重分析结果
   */
  private async saveDualResult(result: DualAnalysisResult): Promise<void> {
    const existing = this.getDualResults();
    const updated = [result, ...existing.filter(r => r.analysisId !== result.analysisId)];
    localStorage.setItem(this.DUAL_RESULTS_KEY, JSON.stringify(updated));
  }
  
  /**
   * 从分析结果创建案例库条目
   */
  private async createCaseFromResult(result: DualAnalysisResult): Promise<void> {
    const caseData: LocalCase = {
      id: result.analysisId,
      title: result.topic,
      topic: result.topic,
      description: `基于${result.analysisId.startsWith('local') ? '本地' : 'API'}分析的${result.topic}创新分析`,
      industry: '创新分析',
      company: result.analysisId.startsWith('local') ? '本地分析' : 'AI分析',
      tags: [
        result.analysisId.startsWith('local') ? '本地分析' : 'AI分析', 
        '奥斯本九问', 
        result.topic
      ],
      createdAt: result.timestamp,
      updatedAt: result.timestamp,
      analysisData: result as unknown as Record<string, unknown>
    };
    
    const existing = this.getLocalCases();
    const updated = [caseData, ...existing.filter(c => c.id !== caseData.id)];
    localStorage.setItem(this.LOCAL_CASES_KEY, JSON.stringify(updated));
  }
  
  /**
   * 获取双重分析结果
   */
  getDualResults(): DualAnalysisResult[] {
    try {
      const saved = localStorage.getItem(this.DUAL_RESULTS_KEY);
      if (saved) {
        return JSON.parse(saved).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
      return [];
    } catch (error) {
      ErrorHandler.logError(error, {
        component: 'UnifiedDataManager',
        action: 'getDualResults'
      });
      return [];
    }
  }
  
  /**
   * 获取本地案例
   */
  getLocalCases(): LocalCase[] {
    try {
      const saved = localStorage.getItem(this.LOCAL_CASES_KEY);
      let cases: LocalCase[] = [];
      
      if (saved) {
        cases = JSON.parse(saved).map((caseItem: any) => ({
          ...caseItem,
          createdAt: new Date(caseItem.createdAt),
          updatedAt: new Date(caseItem.updatedAt)
        }));
      }
      
      // 检查是否需要初始化基础案例
      const hasBaseCases = cases.some(caseItem => caseItem.id.startsWith('osborn-'));
      
      if (!hasBaseCases && OSBORN_BASE_CASES && OSBORN_BASE_CASES.length > 0) {
        console.log('UnifiedDataManager: Initializing base cases...', OSBORN_BASE_CASES.length);
        
        // 将基础案例转换为 LocalCase 格式
        const baseCases: LocalCase[] = OSBORN_BASE_CASES.map(osbornCase => ({
          id: osbornCase.id,
          title: osbornCase.title,
          topic: osbornCase.topic,
          description: osbornCase.description,
          industry: osbornCase.industry,
          company: osbornCase.company,
          tags: osbornCase.tags,
          createdAt: osbornCase.createdAt,
          updatedAt: osbornCase.updatedAt,
          analysisData: {
            dimension: osbornCase.analysisData.dimension,
            questions: osbornCase.analysisData.questions,
            insights: osbornCase.analysisData.insights,
            innovationSchemes: osbornCase.analysisData.innovationSchemes
          }
        }));
        
        // 将基础案例添加到现有案例中
        cases = [...baseCases, ...cases];
        
        // 保存到localStorage
        localStorage.setItem(this.LOCAL_CASES_KEY, JSON.stringify(cases));
        
        console.log(`UnifiedDataManager: Initialized ${baseCases.length} base cases`);
      }
      
      return cases;
    } catch (error) {
      ErrorHandler.logError(error, {
        component: 'UnifiedDataManager',
        action: 'getLocalCases'
      });
      return [];
    }
  }
  
  /**
   * 更新双重分析结果
   */
  updateDualResult(analysisId: string, updates: Partial<DualAnalysisResult>): void {
    const results = this.getDualResults();
    const updated = results.map(result => 
      result.analysisId === analysisId 
        ? { ...result, ...updates, timestamp: new Date() }
        : result
    );
    localStorage.setItem(this.DUAL_RESULTS_KEY, JSON.stringify(updated));
  }
  
  /**
   * 删除双重分析结果
   */
  deleteDualResult(analysisId: string): void {
    const results = this.getDualResults();
    const updated = results.filter(result => result.analysisId !== analysisId);
    localStorage.setItem(this.DUAL_RESULTS_KEY, JSON.stringify(updated));
    
    // 同时删除对应的案例库条目
    this.deleteLocalCase(analysisId);
  }
  
  /**
   * 保存本地案例
   */
  saveLocalCases(cases: LocalCase[]): void {
    try {
      localStorage.setItem(this.LOCAL_CASES_KEY, JSON.stringify(cases));
    } catch (error) {
      ErrorHandler.logError(error, {
        component: 'UnifiedDataManager',
        action: 'saveLocalCases'
      });
    }
  }

  /**
   * 删除本地案例
   */
  deleteLocalCase(caseId: string): void {
    const cases = this.getLocalCases();
    const updated = cases.filter(caseItem => caseItem.id !== caseId);
    localStorage.setItem(this.LOCAL_CASES_KEY, JSON.stringify(updated));
  }
  
  /**
   * 清空所有数据
   */
  clearAllData(): void {
    localStorage.removeItem(this.DUAL_RESULTS_KEY);
    localStorage.removeItem(this.LOCAL_CASES_KEY);
  }
  
  /**
   * 获取存储统计信息
   */
  getStorageStats(): {
    dualResultsCount: number;
    localCasesCount: number;
    totalSize: number;
  } {
    const dualResults = this.getDualResults();
    const localCases = this.getLocalCases();
    
    const dualResultsSize = JSON.stringify(dualResults).length;
    const localCasesSize = JSON.stringify(localCases).length;
    
    return {
      dualResultsCount: dualResults.length,
      localCasesCount: localCases.length,
      totalSize: dualResultsSize + localCasesSize
    };
  }
}

export const unifiedDataManager = UnifiedDataManager.getInstance();
