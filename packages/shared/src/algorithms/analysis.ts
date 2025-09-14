import type { AnalysisResult, AIAnalysisResult, CaseStudy } from '../types';
import { osbornAnalyzer } from './osborn';
import { aiAnalyzer } from './ai';
import caseStudies from '../data/cases';

// 综合分析引擎
export class AnalysisEngine {
  private static instance: AnalysisEngine;
  
  private constructor() {}
  
  static getInstance(): AnalysisEngine {
    if (!AnalysisEngine.instance) {
      AnalysisEngine.instance = new AnalysisEngine();
    }
    return AnalysisEngine.instance;
  }

  /**
   * 执行完整分析流程
   */
  async performFullAnalysis(
    topic: string,
    description: string,
    options: {
      useAI?: boolean;
      enhanceWithAI?: boolean;
      findSimilarCases?: boolean;
    } = {}
  ): Promise<{
    result: AnalysisResult;
    aiAnalysis?: AIAnalysisResult;
    similarCases?: CaseStudy[];
  }> {
    // 1. 执行奥斯本分析
    const result = await osbornAnalyzer.analyze(topic, description);
    
    let aiAnalysis: AIAnalysisResult | undefined;
    let similarCases: CaseStudy[] | undefined;

    // 2. 如果启用AI，执行AI分析
    if (options.useAI) {
      try {
        aiAnalysis = await aiAnalyzer.analyze(result);
      } catch (error) {
        console.error('AI分析失败:', error);
      }
    }

    // 3. 如果启用AI增强，增强问题列表
    if (options.enhanceWithAI && result) {
      try {
        for (const category of Object.keys(result.questions) as any[]) {
          result.questions[category] = await aiAnalyzer.enhanceQuestions(
            result.questions[category]
          );
        }
      } catch (error) {
        console.error('AI增强失败:', error);
      }
    }

    // 4. 查找相似案例
    if (options.findSimilarCases) {
      similarCases = this.findSimilarCases(topic);
    }

    return {
      result,
      aiAnalysis,
      similarCases,
    };
  }

  /**
   * 查找相似案例
   */
  findSimilarCases(topic: string, maxResults: number = 5): CaseStudy[] {
    const topicKeywords = this.extractKeywords(topic);
    const scoredCases = caseStudies.map(caseStudy => {
      const caseKeywords = [
        ...this.extractKeywords(caseStudy.title),
        ...this.extractKeywords(caseStudy.description),
        ...caseStudy.tags,
        caseStudy.industry,
      ];
      
      const similarity = this.calculateSimilarity(topicKeywords, caseKeywords);
      
      return {
        case: caseStudy,
        score: similarity,
      };
    });

    return scoredCases
      .filter(item => item.score > 0.2)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(item => item.case);
  }

  /**
   * 生成分析报告
   */
  async generateReport(
    result: AnalysisResult,
    aiAnalysis?: AIAnalysisResult,
    options?: {
      includeCharts?: boolean;
      includeRecommendations?: boolean;
      format?: 'json' | 'markdown' | 'html';
    }
  ): Promise<string> {
    const format = options?.format || 'markdown';
    
    switch (format) {
      case 'json':
        return JSON.stringify({ result, aiAnalysis }, null, 2);
      
      case 'markdown':
        return this.generateMarkdownReport(result, aiAnalysis, options);
      
      case 'html':
        return this.generateHTMLReport(result, aiAnalysis, options);
      
      default:
        return this.generateMarkdownReport(result, aiAnalysis, options);
    }
  }

  /**
   * 生成Markdown报告
   */
  private generateMarkdownReport(
    result: AnalysisResult,
    aiAnalysis?: AIAnalysisResult,
    options?: {
      includeCharts?: boolean;
      includeRecommendations?: boolean;
    }
  ): string {
    let report = `# ${result.title} - 奥斯本检核表分析报告\n\n`;
    report += `> ${result.description}\n\n`;
    report += `**分析时间**: ${new Date().toLocaleString()}\n\n`;

    // 分析结果
    report += `## 奥斯本九问分析\n\n`;
    Object.entries(result.questions).forEach(([category, questions]) => {
      report += `### ${category}\n`;
      questions.forEach((question, index) => {
        report += `${index + 1}. ${question}\n`;
      });
      report += '\n';
    });

    // AI分析结果
    if (aiAnalysis) {
      report += `## AI深度分析\n\n`;
      
      report += `### 关键洞察\n`;
      aiAnalysis.suggestions.forEach((suggestion, index) => {
        report += `${index + 1}. ${suggestion}\n`;
      });
      report += '\n';
      
      report += `### 创新关键词\n`;
      report += aiAnalysis.keywords.join('、') + '\n\n';
      
      report += `### 替代方案\n`;
      aiAnalysis.alternatives.forEach((alternative, index) => {
        report += `${index + 1}. ${alternative}\n`;
      });
      report += '\n';
      
      report += `### 创新潜力评估\n`;
      report += `**评分**: ${(aiAnalysis.confidence * 10).toFixed(1)}/10\n\n`;
    }

    // 建议
    if (options?.includeRecommendations !== false) {
      report += `## 行动建议\n\n`;
      report += `1. **优先实施**最容易实现的创新点子\n`;
      report += `2. **深入调研**市场可行性最高的方案\n`;
      report += `3. **小步试错**快速验证创新假设\n`;
      report += `4. **持续迭代**根据反馈优化方案\n\n`;
    }

    return report;
  }

  /**
   * 生成HTML报告
   */
  private generateHTMLReport(
    result: AnalysisResult,
    aiAnalysis?: AIAnalysisResult,
    options?: {
      includeCharts?: boolean;
      includeRecommendations?: boolean;
    }
  ): string {
    // 简化的HTML报告生成
    const markdown = this.generateMarkdownReport(result, aiAnalysis, options);
    
    // 基础Markdown到HTML转换
    let html = markdown
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^<p>/gm, '')
      .replace(/<\/p>$/g, '');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${result.title} - 分析报告</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1, h2, h3 { color: #333; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
  }

  /**
   * 提取关键词
   */
  private extractKeywords(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  /**
   * 计算相似度
   */
  private calculateSimilarity(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;
    
    const intersection = keywords1.filter(k1 => 
      keywords2.some(k2 => k1 === k2)
    );
    
    return intersection.length / Math.max(keywords1.length, keywords2.length);
  }

  /**
   * 评估创新质量
   */
  assessInnovationQuality(result: AnalysisResult): {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  } {
    let score = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];

    // 评估问题数量
    const totalQuestions = Object.values(result.questions)
      .reduce((sum, questions) => sum + questions.length, 0);
    
    if (totalQuestions >= 36) {
      score += 20;
      strengths.push('分析全面，涵盖了所有创新维度');
    } else {
      weaknesses.push('部分维度分析不够深入');
      suggestions.push('建议为每个维度增加更多具体问题');
    }

    // 评估问题质量
    let qualityScore = 0;
    Object.values(result.questions).forEach(questions => {
      questions.forEach(question => {
        if (question.length > 15) qualityScore += 1;
        if (question.includes('例如') || question.includes('比如')) qualityScore += 1;
        if (question.includes('？')) qualityScore += 1;
      });
    });
    
    const avgQuality = qualityScore / totalQuestions;
    score += avgQuality * 30;
    
    if (avgQuality > 2) {
      strengths.push('问题质量较高，具有引导性');
    } else {
      weaknesses.push('部分问题过于简单');
      suggestions.push('建议增加问题的具体性和引导性');
    }

    // 评估描述质量
    if (result.description.length > 20) {
      score += 10;
      strengths.push('主题描述清晰具体');
    } else {
      weaknesses.push('主题描述过于简单');
      suggestions.push('建议提供更详细的主题描述');
    }

    // 评估创新性
    let innovationScore = 0;
    Object.values(result.questions).forEach(questions => {
      questions.forEach(question => {
        if (this.isInnovativeQuestion(question)) {
          innovationScore += 1;
        }
      });
    });
    
    const innovationRatio = innovationScore / totalQuestions;
    score += innovationRatio * 40;
    
    if (innovationRatio > 0.3) {
      strengths.push('体现了较强的创新思维');
    } else {
      weaknesses.push('创新性思维体现不足');
      suggestions.push('建议从更多角度思考创新可能性');
    }

    return {
      score: Math.min(Math.round(score), 100),
      strengths,
      weaknesses,
      suggestions,
    };
  }

  /**
   * 判断问题是否具有创新性
   */
  private isInnovativeQuestion(question: string): boolean {
    const innovativeKeywords = [
      '新', '创', '突破', '颠覆', '革命', '变革', '重新定义',
      '完全', '彻底', '全新', '独特', '前所未有', '另类'
    ];
    
    return innovativeKeywords.some(keyword => question.includes(keyword));
  }
}

// 导出单例实例
export const analysisEngine = AnalysisEngine.getInstance();