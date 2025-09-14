import type { AnalysisResult, AnalysisOptions } from '../types';
import { QuestionCategory } from '../types';
import { generateId } from '../utils/date';
import osbornQuestions from '../data/questions';
import categories from '../data/categories';

// 奥斯本检核表分析器
export default class OsbornAnalyzer {
  private static instance: OsbornAnalyzer;
  
  private constructor() {}

  /**
   * 生成分析摘要
   */
  private generateSummary(topic: string, questions: Record<QuestionCategory, string[]>): string {
    const totalQuestions = Object.values(questions).flat().length;
    const categories = Object.keys(questions).length;
    return `对"${topic}"进行了${categories}个维度的分析，生成了${totalQuestions}个问题，涵盖了奥斯本检核表法的九大创新维度。`;
  }

  /**
   * 计算总分
   */
  private calculateTotalScore(questions: Record<QuestionCategory, string[]>): number {
    const totalQuestions = Object.values(questions).flat().length;
    return Math.min(totalQuestions * 10, 100); // 每个问题10分，最高100分
  }

  /**
   * 计算质量等级
   */
  private calculateQuality(questions: Record<QuestionCategory, string[]>): 'low' | 'medium' | 'high' {
    const totalQuestions = Object.values(questions).flat().length;
    if (totalQuestions >= 30) return 'high';
    if (totalQuestions >= 20) return 'medium';
    return 'low';
  }
  
  static getInstance(): OsbornAnalyzer {
    if (!OsbornAnalyzer.instance) {
      OsbornAnalyzer.instance = new OsbornAnalyzer();
    }
    return OsbornAnalyzer.instance;
  }

  /**
   * 执行奥斯本九问分析
   */
  async analyze(
    topic: string,
    description: string,
    options: AnalysisOptions = {
      useAI: false,
      includeAI: false,
      language: 'zh-CN',
      creativityLevel: 'balanced',
    }
  ): Promise<AnalysisResult> {
    const questions = this.generateQuestions(topic, description, options);
    
    const result: AnalysisResult = {
      id: generateId(),
      title: topic,
      description: description,
      questions: questions,
      summary: this.generateSummary(topic, questions),
      totalScore: this.calculateTotalScore(questions),
      quality: this.calculateQuality(questions),
      timestamp: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return result;
  }

  /**
   * 为每个类别生成问题
   */
  private generateQuestions(
    topic: string,
    description: string,
    options: AnalysisOptions
  ): Record<QuestionCategory, string[]> {
    const questions: Record<QuestionCategory, string[]> = {
      [QuestionCategory.ALTERNATIVE]: [],
      [QuestionCategory.ADAPTATION]: [],
      [QuestionCategory.MODIFICATION]: [],
      [QuestionCategory.MAGNIFICATION]: [],
      [QuestionCategory.MINIFICATION]: [],
      [QuestionCategory.SUBSTITUTION]: [],
      [QuestionCategory.REARRANGEMENT]: [],
      [QuestionCategory.REVERSAL]: [],
      [QuestionCategory.COMBINATION]: [],
    };

    // 获取相关的问题模板
    const categoryQuestions = this.getCategoryQuestions(topic, description);
    
    // 为每个类别生成3-5个问题
    Object.keys(questions).forEach((category) => {
      const cat = category as QuestionCategory;
      const baseQuestions = categoryQuestions[cat] || [];
      const generatedQuestions = this.generateCategoryQuestions(
        topic,
        description,
        cat,
        baseQuestions,
        options
      );
      questions[cat] = generatedQuestions;
    });

    return questions;
  }

  /**
   * 获取类别相关的基础问题
   */
  private getCategoryQuestions(
    topic: string,
    description: string
  ): Record<QuestionCategory, string[]> {
    const relevantQuestions: Record<QuestionCategory, string[]> = {
      [QuestionCategory.ALTERNATIVE]: [],
      [QuestionCategory.ADAPTATION]: [],
      [QuestionCategory.MODIFICATION]: [],
      [QuestionCategory.MAGNIFICATION]: [],
      [QuestionCategory.MINIFICATION]: [],
      [QuestionCategory.SUBSTITUTION]: [],
      [QuestionCategory.REARRANGEMENT]: [],
      [QuestionCategory.REVERSAL]: [],
      [QuestionCategory.COMBINATION]: [],
    };

    // 根据主题筛选相关问题
    const allQuestions = osbornQuestions;
    const topicKeywords = this.extractKeywords(topic + ' ' + description);

    allQuestions.forEach((question) => {
      const questionKeywords = this.extractKeywords(question.text + ' ' + (question.examples?.join(' ') || ''));
      const relevance = this.calculateRelevance(topicKeywords, questionKeywords);
      
      if (relevance > 0.3) {
        relevantQuestions[question.category].push(question.text);
      }
    });

    return relevantQuestions;
  }

  /**
   * 为特定类别生成问题
   */
  private generateCategoryQuestions(
    topic: string,
    description: string,
    category: QuestionCategory,
    baseQuestions: string[],
    options: AnalysisOptions
  ): string[] {
    const generatedQuestions: string[] = [];
    const categoryInfo = categories.find(c => c.id === category);
    
    // 添加基础问题
    baseQuestions.forEach((question, index) => {
      if (index < 2) { // 最多使用2个基础问题
        generatedQuestions.push(this.customizeQuestion(question, topic, description));
      }
    });

    // 根据创造力等级生成额外问题
    const questionCount = options.creativityLevel === 'conservative' ? 3 : 
                        options.creativityLevel === 'balanced' ? 4 : 5;

    while (generatedQuestions.length < questionCount) {
      const newQuestion = this.createQuestion(topic, description, category, categoryInfo, options);
      if (newQuestion && !generatedQuestions.includes(newQuestion)) {
        generatedQuestions.push(newQuestion);
      }
    }

    return generatedQuestions.slice(0, questionCount);
  }

  /**
   * 创建新问题
   */
  private createQuestion(
    topic: string,
    description: string,
    category: QuestionCategory,
    categoryInfo: any,
    options: AnalysisOptions
  ): string {
    const templates = this.getQuestionTemplates(category, options.creativityLevel);
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return this.fillTemplate(template, topic, description, categoryInfo);
  }

  /**
   * 获取问题模板
   */
  private getQuestionTemplates(category: QuestionCategory, creativityLevel: string): string[] {
    const baseTemplates = {
      [QuestionCategory.ALTERNATIVE]: [
        '{topic}有什么其他用途？',
        '除了{topic}，还有什么可以{description}？',
        '{topic}能否被其他东西替代？',
        '有什么类似{topic}的解决方案？',
      ],
      [QuestionCategory.ADAPTATION]: [
        '有什么类似的经验可以应用到{topic}？',
        '其他领域的什么方法可以借鉴到{topic}？',
        '{topic}可以借鉴什么成功案例？',
        '自然界中有什么可以给{topic}启发？',
      ],
      [QuestionCategory.MODIFICATION]: [
        '改变{topic}的什么属性会更好？',
        '{topic}的形状/颜色/声音可以改变吗？',
        '重新设计{topic}会有什么效果？',
        '给{topic}增加什么特性会更有价值？',
      ],
      [QuestionCategory.MAGNIFICATION]: [
        '扩大{topic}的什么方面会更有用？',
        '增加{topic}的什么功能会更好？',
        '提高{topic}的什么属性？',
        '给{topic}添加什么额外价值？',
      ],
      [QuestionCategory.MINIFICATION]: [
        '缩小{topic}的什么方面？',
        '简化{topic}的什么部分？',
        '减少{topic}的什么成本？',
        '压缩{topic}的什么空间？',
      ],
      [QuestionCategory.SUBSTITUTION]: [
        '{topic}的什么可以被替代？',
        '用什么新材料可以改进{topic}？',
        '{topic}的什么规则可以改变？',
        '有什么新资源可以用于{topic}？',
      ],
      [QuestionCategory.REARRANGEMENT]: [
        '重新安排{topic}的什么顺序？',
        '调整{topic}的什么结构？',
        '改变{topic}的什么流程？',
        '交换{topic}的什么组件？',
      ],
      [QuestionCategory.REVERSAL]: [
        '{topic}反过来会怎样？',
        '颠倒{topic}的什么关系？',
        '反转{topic}的什么过程？',
        '{topic}的反面是什么？',
      ],
      [QuestionCategory.COMBINATION]: [
        '{topic}可以和什么结合？',
        '将{topic}与什么合并会怎样？',
        '{topic}能与什么集成？',
        '混合{topic}与什么会产生新价值？',
      ],
    };

    if (creativityLevel === 'innovative') {
      // 添加更创新的模板
      const innovativeTemplates = {
        [QuestionCategory.ALTERNATIVE]: [
          '如果{topic}不存在，我们会用什么？',
          '{topic}的终极替代方案是什么？',
          '如何彻底重新定义{topic}？',
        ],
        [QuestionCategory.ADAPTATION]: [
          '外星文明会如何解决{topic}的问题？',
          '100年前的解决方案如何启发{topic}？',
          '未来100年的技术如何改变{topic}？',
        ],
        [QuestionCategory.MODIFICATION]: [
          '如果{topic}有生命，它会如何进化？',
          '{topic}的量子态版本是什么？',
          '如何用艺术的方式重新诠释{topic}？',
        ],
        [QuestionCategory.MAGNIFICATION]: [
          '如果{topic}无限扩大会怎样？',
          '{topic}的宇宙级版本是什么？',
          '如何将{topic}应用到整个星球？',
        ],
        [QuestionCategory.MINIFICATION]: [
          '如果{topic}缩小到原子级别会怎样？',
          '{topic}的量子版本是什么？',
          '如何用最少的资源实现{topic}？',
        ],
        [QuestionCategory.SUBSTITUTION]: [
          '用思想能替代{topic}吗？',
          '{topic}的纯能量版本是什么？',
          '如何完全消除{topic}？',
        ],
        [QuestionCategory.REARRANGEMENT]: [
          '如果{topic}的时间倒流会怎样？',
          '{topic}的随机排列会产生什么？',
          '如何用混沌理论重新组织{topic}？',
        ],
        [QuestionCategory.REVERSAL]: [
          '{topic}的反面是否就是答案？',
          '如果{topic}是错误的，真理是什么？',
          '如何完全否定{topic}？',
        ],
        [QuestionCategory.COMBINATION]: [
          '{topic}能与宇宙万物连接吗？',
          '如果{topic}是所有事物的中心会怎样？',
          '如何创造{topic}的万物理论？',
        ],
      };
      
      Object.keys(innovativeTemplates).forEach((cat) => {
        baseTemplates[cat as QuestionCategory].push(...innovativeTemplates[cat as QuestionCategory]);
      });
    }

    return baseTemplates[category] || [];
  }

  /**
   * 填充模板
   */
  private fillTemplate(
    template: string,
    topic: string,
    description: string,
    categoryInfo: any
  ): string {
    return template
      .replace(/{topic}/g, topic)
      .replace(/{description}/g, description || '解决这个问题')
      .replace(/{category}/g, categoryInfo?.title || '');
  }

  /**
   * 自定义问题
   */
  private customizeQuestion(question: string, topic: string, description: string): string {
    return question.replace(/{topic}/g, topic).replace(/{description}/g, description);
  }

  /**
   * 提取关键词
   */
  private extractKeywords(text: string): string[] {
    // 简单的关键词提取逻辑
    const words = text.toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1);
    
    // 移除停用词
    const stopWords = ['的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    return words.filter(word => !stopWords.includes(word));
  }

  /**
   * 计算相关性
   */
  private calculateRelevance(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;
    
    const intersection = keywords1.filter(k1 => 
      keywords2.some(k2 => k1.includes(k2) || k2.includes(k1))
    );
    
    return intersection.length / Math.max(keywords1.length, keywords2.length);
  }

  /**
   * 验证分析结果
   */
  validateResult(result: AnalysisResult): boolean {
    // 检查是否有足够的分析内容
    const totalQuestions = Object.values(result.questions)
      .reduce((sum, questions) => sum + questions.length, 0);
    
    return totalQuestions >= 27; // 每个类别至少3个问题
  }

  /**
   * 增强分析结果
   */
  enhanceResult(result: AnalysisResult): AnalysisResult {
    // 为每个问题添加更多细节
    Object.keys(result.questions).forEach((category) => {
      const cat = category as QuestionCategory;
      result.questions[cat] = result.questions[cat].map(question => {
        // 添加引导性内容
        if (!question.includes('例如') && !question.includes('？')) {
          return question + '（例如：请具体说明）';
        }
        return question;
      });
    });
    
    return result;
  }
}

// 导出单例实例
export const osbornAnalyzer = OsbornAnalyzer.getInstance();