import {
  osbornAnalyzer,
  getRandomCases,
  AnalysisResult,
  CaseStudy,
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
    relatedCases: CaseStudy[];
  }> {
    try {
      // 执行奥斯本分析
      const analysis = await osbornAnalyzer.analyze(topic, {});
      
      // 简单提取关键词（从标题中提取）
      const keywords = this.extractKeywords(topic);

      // 获取相关案例
      const relatedCases = this.getRelatedCasesInternal(topic, keywords);

      return {
        analysis,
        keywords,
        relatedCases
      };
    } catch (error) {
      throw new Error(`分析失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 快速分析（仅返回奥斯本分析结果）
   */
  async quickAnalysis(topic: string): Promise<AnalysisResult> {
    try {
      return await osbornAnalyzer.analyze(topic, {});
    } catch (error) {
      throw new Error(`快速分析失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 获取相关案例
   */
  async getRelatedCases(topic: string, limit: number = 5): Promise<CaseStudy[]> {
    try {
      // 使用关键词搜索相关案例
      const keywords = this.extractKeywords(topic);
      const cases = filterCasesByKeyword(keywords.join(' '));
      
      return cases.slice(0, limit);
    } catch (error) {
      console.warn('获取相关案例失败:', error);
      return [];
    }
  }

  /**
   * 根据主题搜索案例
   */
  async searchCasesByTopic(topic: string): Promise<CaseStudy[]> {
    try {
      return filterCasesByTopic(topic);
    } catch (error) {
      console.warn('搜索案例失败:', error);
      return [];
    }
  }

  /**
   * 获取随机案例
   */
  async getRandomCases(limit: number = 5): Promise<CaseStudy[]> {
    try {
      return getRandomCases(limit);
    } catch (error) {
      console.warn('获取随机案例失败:', error);
      return [];
    }
  }

  /**
   * 提取关键词
   */
  private extractKeywords(text: string): string[] {
    // 简单的关键词提取逻辑
    const words = text
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1);
    
    return [...new Set(words)];
  }

  /**
   * 获取相关案例（内部方法）
   */
  private getRelatedCasesInternal(topic: string, keywords: string[]): CaseStudy[] {
    try {
      // 先尝试按主题搜索
      let cases = filterCasesByTopic(topic);
      
      // 如果结果不够，再按关键词搜索
      if (cases.length < 3) {
        const keywordCases = filterCasesByKeyword(keywords.join(' '));
        cases = [...cases, ...keywordCases];
      }
      
      // 去重并限制数量
      const uniqueCases = cases.filter((caseItem, index, self) => 
        index === self.findIndex(c => c.id === caseItem.id)
      );
      
      return uniqueCases.slice(0, 5);
    } catch (error) {
      console.warn('获取相关案例失败:', error);
      return [];
    }
  }

  /**
   * 分析案例质量
   */
  analyzeCaseQuality(caseItem: CaseStudy): {
    score: number;
    strengths: string[];
    improvements: string[];
  } {
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // 检查案例完整性
    if (caseItem.title && caseItem.description) {
      score += 20;
      strengths.push('标题和描述完整');
    } else {
      improvements.push('完善标题和描述');
    }

    if (caseItem.industry) {
      score += 15;
      strengths.push('行业分类明确');
    } else {
      improvements.push('添加行业分类');
    }

    if (caseItem.analysisResult) {
      score += 30;
      strengths.push('包含分析结果');
    } else {
      improvements.push('添加分析结果');
    }

    if (caseItem.difficulty) {
      score += 10;
      strengths.push('难度等级明确');
    } else {
      improvements.push('设置难度等级');
    }

    // 检查分析结果质量
    if (caseItem.analysisResult?.totalScore && caseItem.analysisResult.totalScore > 80) {
      score += 25;
      strengths.push('分析质量高');
    } else if (caseItem.analysisResult?.totalScore) {
      improvements.push('提升分析质量');
    }

    return {
      score: Math.min(score, 100),
      strengths,
      improvements
    };
  }
}

export default new AnalysisService();
