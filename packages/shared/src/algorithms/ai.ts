import type { AIAnalysisResult, AnalysisResult } from '../types';

// AI分析器接口（从local-ai.ts导入）
export type { IAIAnalyzer } from './local-ai';

// 模拟AI分析器（实际使用时需要接入真实的AI服务）
export default class AIAnalyzer {
  private apiKey: string | null;
  private baseUrl: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
    this.baseUrl = 'https://api.deepseek.com/v1'; // 示例API地址
  }

  /**
   * 设置API密钥
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * 执行AI分析
   */
  async analyze(result: AnalysisResult): Promise<AIAnalysisResult> {
    if (!this.apiKey) {
      throw new Error('API密钥未设置');
    }

    try {
      // 构建分析内容
      const analysisContent = this.buildAnalysisContent(result);
      
      // 调用AI API进行分析
      const response = await this.callAIAPI(analysisContent);
      
      return this.parseAIResponse(response);
    } catch (error) {
      console.error('AI分析失败:', error);
      throw new Error('AI分析服务暂时不可用，请稍后重试');
    }
  }

  /**
   * 增强问题列表
   */
  async enhanceQuestions(questions: string[]): Promise<string[]> {
    if (!this.apiKey) {
      return questions; // 如果没有API密钥，返回原问题
    }

    try {
      const enhancedQuestions = await Promise.all(
        questions.map(async (question) => {
          const enhanced = await this.enhanceQuestion(question);
          return enhanced || question;
        })
      );
      
      return enhancedQuestions.filter(Boolean);
    } catch (error) {
      console.error('问题增强失败:', error);
      return questions;
    }
  }

  /**
   * 建议替代方案
   */
  async suggestAlternatives(text: string): Promise<string[]> {
    if (!this.apiKey) {
      return []; // 如果没有API密钥，返回空数组
    }

    try {
      const prompt = `基于以下描述，提供5个创新的替代方案：\n\n${text}\n\n要求：\n1. 每个方案要具体可行\n2. 体现创新思维\n3. 用简洁的语言描述\n\n请按以下格式返回：\n1. 方案一：...\n2. 方案二：...\n3. 方案三：...\n4. 方案四：...\n5. 方案五：...`;

      const response = await this.callAIAPI(prompt);
      return this.parseAlternatives(response);
    } catch (error) {
      console.error('替代方案生成失败:', error);
      return [];
    }
  }

  /**
   * 构建分析内容
   */
  private buildAnalysisContent(result: AnalysisResult): string {
    let content = `请对以下奥斯本检核表分析结果进行深度分析：\n\n`;
    content += `主题：${result.title}\n`;
    content += `描述：${result.description}\n\n`;
    content += `分析结果：\n`;
    
    Object.entries(result.questions).forEach(([category, questions]) => {
      content += `\n${category}类问题：\n`;
      questions.forEach((question, index) => {
        content += `${index + 1}. ${question}\n`;
      });
    });
    
    content += `\n请提供：\n`;
    content += `1. 对每个类别分析结果的深度洞察（2-3点）\n`;
    content += `2. 识别出的关键创新机会（3-5个）\n`;
    content += `3. 建议的关键词（5-7个）\n`;
    content += `4. 替代方案建议（3-4个）\n`;
    content += `5. 整体创新潜力评估（1-10分）\n`;
    
    return content;
  }

  /**
   * 调用AI API
   */
  private async callAIAPI(prompt: string): Promise<string> {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // 如果没有API密钥，返回模拟数据
    if (!this.apiKey) {
      return this.generateMockResponse(prompt);
    }

    // 实际API调用（示例）
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的创新思维分析师，擅长运用奥斯本检核表法进行深入分析。请提供具体、实用、创新的分析结果。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API调用失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * 解析AI响应
   */
  private parseAIResponse(response: string): AIAnalysisResult {
    // 简单的解析逻辑，实际使用时需要更完善的解析
    const lines = response.split('\n').filter(line => line.trim());
    
    const suggestions: string[] = [];
    const keywords: string[] = [];
    const alternatives: string[] = [];
    let confidence = 0.8;

    // 提取建议
    const suggestionStart = lines.findIndex(line => line.includes('建议') || line.includes('洞察'));
    if (suggestionStart !== -1) {
      for (let i = suggestionStart; i < Math.min(suggestionStart + 10, lines.length); i++) {
        if (lines[i].match(/^\d+\./)) {
          suggestions.push(lines[i].replace(/^\d+\.\s*/, ''));
        }
      }
    }

    // 提取关键词
    const keywordStart = lines.findIndex(line => line.includes('关键词'));
    if (keywordStart !== -1) {
      const keywordLine = lines[keywordStart];
      const extractedKeywords = keywordLine.match(/：(.+)$/);
      if (extractedKeywords) {
        keywords.push(...extractedKeywords[1].split(/[,，]\s*/).map(k => k.trim()));
      }
    }

    // 提取替代方案
    const alternativeStart = lines.findIndex(line => line.includes('替代方案'));
    if (alternativeStart !== -1) {
      for (let i = alternativeStart; i < Math.min(alternativeStart + 8, lines.length); i++) {
        if (lines[i].match(/^\d+\./)) {
          alternatives.push(lines[i].replace(/^\d+\.\s*/, ''));
        }
      }
    }

    // 提取置信度
    const confidenceMatch = response.match(/(\d+(?:\.\d+)?)\s*分/);
    if (confidenceMatch) {
      confidence = Math.min(parseFloat(confidenceMatch[1]) / 10, 1);
    }

    return {
      suggestions: suggestions.length > 0 ? suggestions : ['继续深入分析当前方案', '考虑更多替代可能性', '关注用户需求变化'],
      keywords: keywords.length > 0 ? keywords : ['创新', '优化', '替代', '改进'],
      confidence,
      alternatives: alternatives.length > 0 ? alternatives : ['探索全新的解决方案', '整合现有技术资源', '重新定义问题本身'],
      reasoning: response.substring(0, 500), // 截取前500字符作为推理过程
    };
  }

  /**
   * 增强单个问题
   */
  private async enhanceQuestion(question: string): Promise<string> {
    const prompt = `请增强以下奥斯本检核表问题的表达，使其更具引导性和创新性：\n\n原始问题：${question}\n\n要求：\n1. 保持原问题的核心意图\n2. 增加具体的引导或示例\n3. 激发更深层次的思考\n4. 语言简洁明了\n\n请直接返回增强后的问题，不要添加其他解释。`;

    try {
      const response = await this.callAIAPI(prompt);
      return response.trim();
    } catch (error) {
      console.error('问题增强失败:', error);
      return question;
    }
  }

  /**
   * 解析替代方案
   */
  private parseAlternatives(response: string): string[] {
    const lines = response.split('\n').filter(line => line.trim());
    const alternatives: string[] = [];
    
    lines.forEach(line => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match) {
        alternatives.push(match[1].trim());
      }
    });
    
    return alternatives.length > 0 ? alternatives : 
      ['探索全新的解决方案', '重新定义问题本质', '整合现有技术资源'];
  }

  /**
   * 生成模拟响应
   */
  private generateMockResponse(prompt: string): string {
    // 根据提示内容生成合理的模拟响应
    if (prompt.includes('奥斯本检核表分析结果')) {
      return `深度洞察：
1. 当前分析展现了良好的系统性思维，涵盖了九个维度的创新可能性
2. 建议在"替代"和"组合"维度深入挖掘，这两个维度往往能产生突破性创新
3. 注意平衡技术创新与商业可行性

关键创新机会：
1. 跨界融合创新：结合不同行业最佳实践
2. 用户体验重构：重新定义用户交互方式
3. 商业模式创新：探索订阅制或平台化模式
4. 技术集成创新：整合现有技术创造新价值

关键词：
创新、跨界、用户体验、技术集成、商业模式、可持续发展

替代方案建议：
1. 采用敏捷开发方法，快速迭代验证
2. 构建生态系统，整合上下游资源
3. 运用设计思维，以用户为中心创新
4. 探索平台化战略，创造网络效应

整体创新潜力评估：8.5分`;
    }
    
    if (prompt.includes('增强以下奥斯本检核表问题')) {
      return prompt.split('原始问题：')[1]?.split('\n')[0]?.trim() + '（请具体举例说明，至少提供3个不同的思路）';
    }
    
    // 默认返回
    return `1. 探索全新的技术路径
2. 重新定义核心价值主张
3. 整合现有技术资源
4. 采用跨界思维方式
5. 运用逆向思维方法`;
  }

  /**
   * 检查API可用性
   */
  async checkAPIAvailability(): Promise<boolean> {
    if (!this.apiKey) return false;
    
    try {
      // 简单的API健康检查
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('API健康检查失败:', error);
      return false;
    }
  }
}

// 创建默认实例
export const aiAnalyzer = new AIAnalyzer();

// 智能分析快捷方法（使用本地AI分析器）
export const analyzeWithAI = aiAnalyzer.analyze.bind(aiAnalyzer);
export const preloadAIModel = async () => {
  console.log('AI模型预加载功能已禁用，使用云端分析');
  return true;
};

