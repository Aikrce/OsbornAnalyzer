import {
  osbornAnalyzer,
  getRandomCases,
  AnalysisResult,
  CaseItem,
  filterCasesByKeyword,
  filterCasesByTopic
} from '@huitu/shared';

class AnalysisService {
  /**
   * 执行完整的奥斯本分析
   */
  async performFullAnalysis(topic: string, description: string = ''): Promise<{
    analysis: AnalysisResult;
    keywords: string[];
    relatedCases: CaseItem[];
  }> {
    try {
      // 执行奥斯本分析
      const analysis = await osbornAnalyzer.analyze(topic, description);
      
      // 简单提取关键词（从标题中提取）
      const keywords = this.extractKeywords(topic);

      // 获取相关案例
      const relatedCases = this.getRelatedCases(topic, keywords);

      return {
        analysis,
        keywords,
        relatedCases,
      };
    } catch (error) {
      console.error('Analysis service error:', error);
      throw new Error('分析服务出现错误');
    }
  }

  /**
   * 获取相关案例
   */
  private getRelatedCases(topic: string, keywords: string[]): CaseItem[] {
    // 根据关键词匹配相关案例
    let relatedCases: CaseItem[] = [];
    
    // 尝试使用每个关键词查找相关案例
    for (const keyword of keywords) {
      const cases = filterCasesByKeyword(keyword);
      relatedCases = [...relatedCases, ...cases];
    }

    // 去重
    const uniqueCases = relatedCases.filter((caseItem, index, array) => 
      index === array.findIndex(c => c.id === caseItem.id)
    );

    // 如果没有找到相关案例，返回随机案例
    return uniqueCases.length > 0 ? uniqueCases.slice(0, 5) : getRandomCases(5);
  }

  /**
   * 提取关键词
   */
  private extractKeywords(text: string): string[] {
    // 简单的关键词提取逻辑
    return text.toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1 && word.length < 10);
  }

  /**
   * 保存分析结果到本地存储
   */
  async saveAnalysisResult(topic: string, results: AnalysisResult[]): Promise<void> {
    try {
      const analysisData = {
        topic,
        results,
        timestamp: new Date().toISOString(),
      };

      // 这里可以集成AsyncStorage或其他本地存储方案
      console.log('Saving analysis result:', analysisData);
    } catch (error) {
      console.error('Save analysis error:', error);
      throw new Error('保存分析结果失败');
    }
  }

  /**
   * 获取历史分析记录
   */
  async getAnalysisHistory(): Promise<any[]> {
    try {
      // 这里可以从本地存储获取历史记录
      return [];
    } catch (error) {
      console.error('Get history error:', error);
      return [];
    }
  }
}

export default new AnalysisService();
