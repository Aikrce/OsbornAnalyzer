import { AnalysisResult } from '@huitu/shared';

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
    const isConfigured = this.config !== null && !!this.config.apiKey;
    console.log('AI服务配置检查:', {
      hasConfig: this.config !== null,
      hasApiKey: !!this.config?.apiKey,
      apiKeyLength: this.config?.apiKey?.length || 0,
      isConfigured
    });
    return isConfigured;
  }

  /**
   * 执行AI增强分析
   */
  async performEnhancedAnalysis(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    console.log('=== AI分析开始 ===');
    console.log('开始AI分析，配置状态:', this.isConfigured());
    console.log('AI配置:', this.config ? { ...this.config, apiKey: this.config.apiKey ? '***' : 'null' } : 'null');
    console.log('请求主题:', request.topic);
    console.log('请求上下文:', request.context);
    
    if (!this.isConfigured()) {
      console.error('AI服务未配置');
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
      console.error('=== AI分析失败 ===');
      console.error('AI analysis error:', error);
      console.error('错误类型:', error?.constructor?.name);
      console.error('错误消息:', (error as Error)?.message);
      console.error('错误堆栈:', (error as Error)?.stack);
      
      // 提供更详细的错误信息
      let errorMessage = 'AI分析失败';
      if (error instanceof Error) {
        if (error.message.includes('AI服务未配置')) {
          errorMessage = 'AI服务未配置，请在设置页面配置API密钥';
        } else if (error.message.includes('网络连接失败') || error.message.includes('Load failed')) {
          errorMessage = '网络连接失败，请检查网络连接或API服务状态';
        } else if (error.message.includes('API调用失败') || error.message.includes('AI API请求失败')) {
          errorMessage = 'API调用失败，请检查API密钥和配置';
        } else if (error.message.includes('JSON Parse error')) {
          errorMessage = 'AI响应格式错误，请重试';
        } else if ((error as Error).message?.includes('undefined is not an object')) {
          errorMessage = 'AI响应数据异常，请重试';
        } else {
          errorMessage = `AI分析失败: ${(error as Error).message || '未知错误'}`;
        }
      }
      
      console.error('最终错误消息:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * 构建分析提示词
   */
  private buildAnalysisPrompt(request: AIAnalysisRequest): string {
    const { topic, context, previousResults } = request;
    
    let prompt = `你是一位资深的创新咨询专家，拥有20年的行业经验。请对"${topic}"进行深度创新分析，提供专业、深入、可执行的洞察和建议。

## 分析要求

### 1. 深度分析框架
请从以下9个维度进行系统性分析，每个维度需要提供：
- **创新思路**：3-5个具体的创新方向
- **市场机会**：潜在的市场价值和商业机会
- **实施路径**：具体的实施步骤和关键节点
- **风险评估**：可能面临的风险和应对策略
- **成功案例**：相关的成功案例或参考模式

### 2. 奥斯本九问维度
1. **能否他用？** - 探索新的应用场景和用途
2. **能否借用？** - 借鉴其他行业或技术的成功经验
3. **能否修改？** - 改进和优化现有方案
4. **能否扩大？** - 扩展规模、功能或市场
5. **能否缩小？** - 精简、聚焦或微型化
6. **能否替代？** - 寻找替代方案或材料
7. **能否调整？** - 重新组织或优化结构
8. **能否颠倒？** - 逆向思维和颠覆性创新
9. **能否组合？** - 整合多种元素创造新价值

### 3. 综合分析要求
除了奥斯本九问，还需要提供：
- **市场分析**：市场规模、增长趋势、竞争格局
- **技术分析**：技术成熟度、发展趋势、创新机会
- **用户分析**：用户需求、痛点、行为模式
- **商业模式**：盈利模式、价值链、合作伙伴
- **实施建议**：短期、中期、长期的发展策略

### 4. 输出格式
重要：请严格按照以下JSON格式返回分析结果，不要包含任何Markdown标记、代码块标记或其他格式符号。

返回格式必须是完整的JSON数组，包含所有9个奥斯本维度，每个元素包含以下字段：
- title: 维度名称（如"能否他用？"）
- description: 详细分析内容（200-300字）
- insights: 关键洞察数组（3-5个洞察）
- recommendations: 实施建议数组（3-5个建议）
- examples: 成功案例数组（3-5个案例）
- confidence: 分析置信度（0-100）

注意：
- 必须返回完整的JSON数组，包含所有9个维度
- 不要使用代码块标记
- 不要使用粗体或斜体标记
- 不要使用反引号标记
- 确保所有字符串都正确闭合（用双引号）
- 确保所有括号和大括号都正确闭合
- JSON格式必须完全正确，可以被直接解析
- 每个维度的description字段必须包含200-300字的详细分析
- 如果内容过长，请确保JSON结构完整
- 不要在任何地方添加解释性文字，只返回纯JSON数据
- 确保JSON字符串中的中文字符正确转义

## 背景信息
${context ? `分析背景：${context}` : ''}

${previousResults && previousResults.length > 0 ? `
## 历史分析参考
${previousResults.map((result, index) => `${index + 1}. ${result.title}: ${result.summary}`).join('\n')}
` : ''}

请开始深度分析，提供专业、深入、可执行的创新洞察。`;

    return prompt;
  }

  /**
   * 调用AI API
   */
  private async callAIAPI(prompt: string): Promise<string> {
    if (!this.config) {
      throw new Error('AI服务未配置');
    }

    console.log('开始调用AI API...');
    console.log('API配置:', {
      model: this.config.model,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      apiKeyLength: this.config.apiKey?.length || 0
    });

    try {
      // 添加请求超时和重试机制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'User-Agent': 'HuiTu-WebApp/1.0',
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
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log('API响应状态:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `AI API请求失败: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('API错误详情:', errorData);
          if (errorData.error?.message) {
            errorMessage += ` - ${errorData.error.message}`;
          }
          if (errorData.error?.type) {
            errorMessage += ` (类型: ${errorData.error.type})`;
          }
        } catch (e) {
          console.error('无法解析API错误响应:', e);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('AI API返回格式异常');
      }
      
      return data.choices[0].message.content || '';
    } catch (error) {
      console.error('AI API调用失败:', error);
      
      // 详细的错误诊断
      if (error instanceof TypeError) {
        if (error.message === 'Load failed') {
          console.error('网络连接诊断:');
          console.error('- 错误类型: TypeError: Load failed');
          console.error('- 可能原因: 网络连接问题、DNS解析失败、防火墙阻止');
          console.error('- 建议: 检查网络连接、尝试使用VPN、检查防火墙设置');
          throw new Error('网络连接失败，请检查网络连接或API服务状态');
        } else if (error.message.includes('fetch')) {
          console.error('Fetch API错误:', error.message);
          throw new Error(`网络请求失败: ${error.message}`);
        }
      } else if ((error as any).name === 'AbortError') {
        console.error('请求超时: 30秒内未收到响应');
        throw new Error('请求超时，请检查网络连接或稍后重试');
      }
      
      throw error;
    }
  }

  /**
   * 解析AI响应
   */
  private parseAnalysisResponse(response: string): AnalysisResult[] {
    try {
      // 清理响应内容，移除可能干扰JSON解析的字符
      let cleanedResponse = this.cleanAIResponse(response);
      
      console.log('原始AI响应:', response.substring(0, 200) + '...');
      console.log('清理后响应:', cleanedResponse.substring(0, 200) + '...');
      
      // 尝试解析JSON响应
      let data;
      try {
        data = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败，原始响应:', response);
        console.error('清理后响应:', cleanedResponse);
        console.error('解析错误:', parseError);
        
        // 尝试更激进的修复
        const moreFixedResponse = this.aggressiveJSONFix(cleanedResponse);
        console.log('尝试激进修复后的响应:', moreFixedResponse);
        
        try {
          data = JSON.parse(moreFixedResponse);
        } catch (secondError) {
          console.error('激进修复后仍然解析失败:', secondError);
          throw new Error(`JSON解析失败: ${(parseError as Error).message || '未知解析错误'}`);
        }
      }
      
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
   * 清理AI响应内容
   */
  private cleanAIResponse(response: string): string {
    console.log('开始清理AI响应，原始长度:', response.length);
    
    // 移除Markdown代码块标记
    let cleaned = response.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // 移除可能的前后空白和换行
    cleaned = cleaned.trim();
    
    // 如果响应以```开始，尝试提取其中的JSON内容
    if (cleaned.startsWith('```')) {
      const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        cleaned = jsonMatch[1].trim();
      }
    }
    
    // 移除可能的Markdown格式标记
    cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1'); // 粗体
    cleaned = cleaned.replace(/\*(.*?)\*/g, '$1'); // 斜体
    cleaned = cleaned.replace(/`(.*?)`/g, '$1'); // 行内代码
    cleaned = cleaned.replace(/#{1,6}\s*/g, ''); // 标题标记
    cleaned = cleaned.replace(/^\s*[-*+]\s*/gm, ''); // 列表标记
    cleaned = cleaned.replace(/^\s*\d+\.\s*/gm, ''); // 数字列表标记
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // 链接
    cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1'); // 图片
    cleaned = cleaned.replace(/~~(.*?)~~/g, '$1'); // 删除线
    cleaned = cleaned.replace(/==(.*?)==/g, '$1'); // 高亮
    cleaned = cleaned.replace(/^\s*>\s*/gm, ''); // 引用标记
    cleaned = cleaned.replace(/^\s*\|.*\|.*$/gm, ''); // 表格行
    cleaned = cleaned.replace(/^---+$/gm, ''); // 分隔线
    
    // 检查是否包含JSON结构
    const hasJsonStructure = cleaned.includes('[') || cleaned.includes('{');
    
    if (!hasJsonStructure) {
      console.log('响应不包含JSON结构，尝试从文本中提取');
      return this.extractJsonFromText(cleaned);
    }
    
    // 修复常见的JSON格式问题
    cleaned = this.fixJSONFormat(cleaned);
    
    console.log('清理完成，最终长度:', cleaned.length);
    return cleaned;
  }

  /**
   * 从文本中提取JSON内容
   */
  private extractJsonFromText(text: string): string {
    // 尝试找到JSON数组的开始和结束
    const arrayStart = text.indexOf('[');
    const arrayEnd = text.lastIndexOf(']');
    
    if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
      const jsonPart = text.substring(arrayStart, arrayEnd + 1);
      console.log('提取到JSON数组部分:', jsonPart.substring(0, 100) + '...');
      return jsonPart;
    }
    
    // 尝试找到JSON对象的开始和结束
    const objectStart = text.indexOf('{');
    const objectEnd = text.lastIndexOf('}');
    
    if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
      const jsonPart = text.substring(objectStart, objectEnd + 1);
      console.log('提取到JSON对象部分:', jsonPart.substring(0, 100) + '...');
      return jsonPart;
    }
    
    // 如果都没有找到，返回空数组
    console.log('未找到JSON结构，返回空数组');
    return '[]';
  }

  /**
   * 修复JSON格式问题
   */
  private fixJSONFormat(jsonString: string): string {
    let fixed = jsonString;
    
    // 如果响应不是以[或{开始，尝试找到JSON开始位置
    if (!fixed.startsWith('[') && !fixed.startsWith('{')) {
      const jsonStart = fixed.search(/[\[\{]/);
      if (jsonStart !== -1) {
        fixed = fixed.substring(jsonStart);
      }
    }
    
    // 修复未闭合的字符串
    fixed = this.fixUnterminatedStrings(fixed);
    
    // 修复未闭合的括号和大括号
    fixed = this.fixUnclosedBrackets(fixed);
    
    // 如果仍然不是有效的JSON格式，尝试包装
    if (!fixed.startsWith('{') && !fixed.startsWith('[')) {
      fixed = `{"analysis": ${JSON.stringify(fixed)}}`;
    }
    
    return fixed;
  }

  /**
   * 激进的JSON修复方法
   */
  private aggressiveJSONFix(jsonString: string): string {
    let fixed = jsonString;
    
    console.log('开始激进JSON修复...');
    
    // 1. 移除所有非JSON字符，只保留JSON结构
    fixed = fixed.replace(/^[^{[]*/, ''); // 移除开头的非JSON字符
    fixed = fixed.replace(/[^}\]]*$/, ''); // 移除结尾的非JSON字符
    
    // 2. 修复常见的语法错误
    fixed = fixed.replace(/([^,{[])\s*([^,}\]]*?)\s*([,}\]])/g, '$1: "$2"$3'); // 添加缺失的冒号
    fixed = fixed.replace(/([^,{[])\s*([^,}\]]*?)\s*([,}\]])/g, '$1: "$2"$3'); // 再次修复
    
    // 3. 修复缺失的引号
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'); // 键名加引号
    fixed = fixed.replace(/:\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*([,}])/g, ': "$1"$2'); // 字符串值加引号
    
    // 4. 修复缺失的逗号
    fixed = fixed.replace(/}\s*{/g, '},{'); // 对象之间加逗号
    fixed = fixed.replace(/]\s*\[/g, '],['); // 数组之间加逗号
    fixed = fixed.replace(/"\s*{/g, '",{'); // 字符串后加逗号
    fixed = fixed.replace(/"\s*\[/g, '",['); // 字符串后加逗号
    
    // 5. 如果仍然不是有效的JSON，尝试包装成数组
    if (!fixed.startsWith('[') && !fixed.startsWith('{')) {
      fixed = `[${fixed}]`;
    }
    
    // 6. 最终验证和修复
    fixed = this.finalJSONValidation(fixed);
    
    console.log('激进修复完成，结果长度:', fixed.length);
    return fixed;
  }

  /**
   * 最终JSON验证和修复
   */
  private finalJSONValidation(jsonString: string): string {
    let fixed = jsonString;
    
    // 尝试解析，如果失败则进行最后修复
    try {
      JSON.parse(fixed);
      return fixed; // 如果解析成功，直接返回
    } catch (error) {
      console.log('最终验证失败，进行最后修复...');
      
      // 修复最常见的JSON错误
      // 1. 修复缺失的冒号
      fixed = fixed.replace(/([^,{[])\s*([^,}\]]*?)\s*([,}\]])/g, (match, before, content, after) => {
        // 如果内容看起来像键名，添加冒号
        if (content.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
          return `${before}"${content}": "${content}"${after}`;
        }
        return match;
      });
      
      // 2. 修复缺失的引号
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
      
      // 3. 修复缺失的逗号
      fixed = fixed.replace(/}\s*{/g, '},{');
      fixed = fixed.replace(/]\s*\[/g, '],[');
      
      // 4. 如果仍然失败，返回一个基本的JSON结构
      try {
        JSON.parse(fixed);
        return fixed;
      } catch (finalError) {
        console.log('所有修复尝试都失败，返回默认JSON结构');
        return JSON.stringify([{
          title: "分析失败",
          description: "AI响应格式异常，无法正确解析。请检查API配置或重试。",
          insights: ["响应格式错误", "需要重新配置", "建议检查API密钥"],
          recommendations: ["检查API配置", "验证网络连接", "重试分析"],
          examples: ["暂无案例"],
          confidence: 0
        }]);
      }
    }
  }

  /**
   * 修复未闭合的字符串
   */
  private fixUnterminatedStrings(jsonString: string): string {
    let fixed = jsonString;
    let inString = false;
    let escapeNext = false;
    let lastQuoteIndex = -1;
    
    for (let i = 0; i < fixed.length; i++) {
      const char = fixed[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        if (inString) {
          inString = false;
          lastQuoteIndex = i;
        } else {
          inString = true;
        }
      }
    }
    
    // 如果字符串未闭合，尝试修复
    if (inString && lastQuoteIndex !== -1) {
      // 在字符串末尾添加闭合引号
      fixed = fixed + '"';
    }
    
    return fixed;
  }

  /**
   * 修复未闭合的括号和大括号
   */
  private fixUnclosedBrackets(jsonString: string): string {
    let fixed = jsonString;
    const stack: string[] = [];
    const bracketPairs: Record<string, string> = {
      '[': ']',
      '{': '}',
      '(': ')'
    };
    
    for (let i = 0; i < fixed.length; i++) {
      const char = fixed.charAt(i);
      
      if (bracketPairs[char]) {
        stack.push(char);
      } else if (char === ']' || char === '}' || char === ')') {
        const lastOpen = stack.pop();
        if (lastOpen && bracketPairs[lastOpen] !== char) {
          // 括号不匹配，跳过
        }
      }
    }
    
    // 添加缺失的闭合括号
    while (stack.length > 0) {
      const openBracket = stack.pop();
      if (openBracket && bracketPairs[openBracket]) {
        fixed += bracketPairs[openBracket];
      }
    }
    
    return fixed;
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
        id: `ai-analysis-${Date.now()}-${Math.random()}`,
        title: question,
        description: match[0].replace(question, '').trim(),
        questions: { 'AI分析': [question] },
        summary: match[0].replace(question, '').trim(),
        totalScore: 85,
        quality: 'high' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: new Date(),
        question,
        analysis: match[0].replace(question, '').trim(),
        suggestions: []
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
      // 安全检查，确保summary存在且为字符串
      if (result.summary && typeof result.summary === 'string' && result.summary.length > 100) {
        suggestions.push(`深入探索"${result.title}"维度的创新可能性`);
      } else if (result.description && typeof result.description === 'string' && result.description.length > 100) {
        suggestions.push(`深入探索"${result.title}"维度的创新可能性`);
      }
    });
    
    return suggestions;
  }

  /**
   * 计算置信度
   */
  private calculateConfidence(analysis: AnalysisResult[]): number {
    if (analysis.length === 0) return 0;
    
    const avgLength = analysis.reduce((sum, result) => {
      const contentLength = result.summary?.length || result.description?.length || 0;
      return sum + contentLength;
    }, 0) / analysis.length;
    
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
