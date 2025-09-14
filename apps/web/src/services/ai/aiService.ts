import { AnalysisResult } from '@huitu/shared/types';

export interface AIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface AIAnalysisRequest {
  topic: string;
  context?: string;
  previousResults?: AnalysisResult[];
}

export interface AIAnalysisResponse {
  analysis: AnalysisResult[];
  suggestions: string[];
  confidence: number;
  processingTime: number;
}

class AIService {
  private config: AIConfig | null = null;

  /**
   * 配置AI服务
   */
  configure(config: AIConfig): void {
    this.config = config;
  }

  /**
   * 检查AI服务是否已配置
   */
  isConfigured(): boolean {
    return this.config !== null && !!this.config.apiKey;
  }

  /**
   * 执行AI增强分析
   */
  async performEnhancedAnalysis(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    if (!this.isConfigured()) {
      throw new Error('AI服务未配置，请先设置API密钥');
    }

    const startTime = Date.now();

    try {
      // 构建提示词
      const prompt = this.buildAnalysisPrompt(request);
      
      // 调用AI API
      const response = await this.callAIAPI(prompt);
      
      // 解析响应
      const analysis = this.parseAnalysisResponse(response);
      
      const processingTime = Date.now() - startTime;

      return {
        analysis,
        suggestions: this.generateSuggestions(analysis),
        confidence: this.calculateConfidence(analysis),
        processingTime,
      };
    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error('AI分析失败，请检查网络连接和API配置');
    }
  }

  /**
   * 构建分析提示词
   */
  private buildAnalysisPrompt(request: AIAnalysisRequest): string {
    const { topic, context, previousResults } = request;
    
    let prompt = `请基于奥斯本检核表法对"${topic}"进行创新分析。\n\n`;
    
    if (context) {
      prompt += `背景信息：${context}\n\n`;
    }
    
    if (previousResults && previousResults.length > 0) {
      prompt += `之前的分析结果：\n`;
      previousResults.forEach((result, index) => {
        prompt += `${index + 1}. ${result.question}: ${result.analysis}\n`;
      });
      prompt += '\n';
    }
    
    prompt += `请从以下9个维度进行分析：
1. 能否他用？(Put to other uses)
2. 能否借用？(Adapt)
3. 能否修改？(Modify)
4. 能否扩大？(Magnify)
5. 能否缩小？(Minify)
6. 能否替代？(Substitute)
7. 能否调整？(Rearrange)
8. 能否颠倒？(Reverse)
9. 能否组合？(Combine)

请为每个维度提供：
- 具体的创新思路
- 实际应用案例
- 实施建议

请以JSON格式返回结果。`;

    return prompt;
  }

  /**
   * 调用AI API
   */
  private async callAIAPI(prompt: string): Promise<string> {
    if (!this.config) {
      throw new Error('AI服务未配置');
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  /**
   * 解析AI响应
   */
  private parseAnalysisResponse(response: string): AnalysisResult[] {
    try {
      // 尝试解析JSON响应
      const data = JSON.parse(response);
      
      if (Array.isArray(data)) {
        return data;
      }
      
      // 如果不是数组，尝试从对象中提取分析结果
      if (data.analysis && Array.isArray(data.analysis)) {
        return data.analysis;
      }
      
      throw new Error('无法解析AI响应格式');
    } catch (error) {
      console.error('Parse AI response error:', error);
      
      // 如果JSON解析失败，尝试从文本中提取信息
      return this.extractAnalysisFromText(response);
    }
  }

  /**
   * 从文本中提取分析结果
   */
  private extractAnalysisFromText(text: string): AnalysisResult[] {
    const questions = [
      '能否他用？',
      '能否借用？',
      '能否修改？',
      '能否扩大？',
      '能否缩小？',
      '能否替代？',
      '能否调整？',
      '能否颠倒？',
      '能否组合？',
    ];

    const results: AnalysisResult[] = [];

    questions.forEach((question, index) => {
      const regex = new RegExp(`${question}[\\s\\S]*?(?=${index < questions.length - 1 ? questions[index + 1] : '$'})`, 'i');
      const match = text.match(regex);
      
      if (match) {
        results.push({
          question,
          analysis: match[0].replace(question, '').trim(),
          suggestions: [],
        });
      }
    });

    return results;
  }

  /**
   * 生成建议
   */
  private generateSuggestions(analysis: AnalysisResult[]): string[] {
    const suggestions: string[] = [];
    
    analysis.forEach((result) => {
      if (result.analysis.length > 100) {
        suggestions.push(`深入探索"${result.question}"维度的创新可能性`);
      }
    });
    
    return suggestions;
  }

  /**
   * 计算置信度
   */
  private calculateConfidence(analysis: AnalysisResult[]): number {
    if (analysis.length === 0) return 0;
    
    const avgLength = analysis.reduce((sum, result) => sum + result.analysis.length, 0) / analysis.length;
    const confidence = Math.min(avgLength / 200, 1); // 基于分析长度计算置信度
    
    return Math.round(confidence * 100);
  }

  /**
   * 获取AI配置
   */
  getConfig(): AIConfig | null {
    return this.config;
  }

  /**
   * 清除配置
   */
  clearConfig(): void {
    this.config = null;
  }
}

export default new AIService();
