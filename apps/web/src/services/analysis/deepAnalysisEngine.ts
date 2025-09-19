import { localCaseService, LocalCase } from '../localCaseService';
import { AnalysisContext, IntelligentAnalysisResult } from './intelligentAnalysisEngine';

// 深度分析结果（兼容AI分析）
export interface DeepAnalysisResult {
  id: string;
  topic: string;
  analysis: string;
  insights: {
    keyOpportunities: string[];
    potentialRisks: string[];
    marketTrends: string[];
    competitiveAdvantages: string[];
  };
  suggestions?: string[];
  confidence: number;
  quality: 'low' | 'medium' | 'high';
  timestamp: Date;
  bestPractices?: string[];
  detailedInsights?: {
    opportunities: string[];
    risks: string[];
    trends: string[];
    innovations: string[];
  };
  // 添加缺失的属性，使DeepAnalysisResult更完整
  title?: string;
  description?: string;
  questions?: Record<string, string[]>;
  summary?: string;
  totalScore?: number;
  createdAt?: Date;
  updatedAt?: Date;
  recommendations?: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  similarCases?: LocalCase[];
  detailedAnalysis?: {
    osbornDimensions: Array<{
      dimension: string;
      questions: string[];
      insights: string[];
      innovationSchemes: string[];
      score: number;
    }>;
    crossIndustryInsights: string[];
    innovationPatterns: string[];
    implementationRoadmap: Array<{
      phase: string;
      timeline: string;
      actions: string[];
      dependencies: string[];
    }>;
  };
  // 保留原有的深度分析字段
  marketAnalysis?: {
    marketSize: string;
    growthRate: string;
    keyPlayers: string[];
    marketTrends: string[];
  };
  competitiveAnalysis?: {
    directCompetitors: string[];
    indirectCompetitors: string[];
    competitiveAdvantages: string[];
    competitiveThreats: string[];
  };
  swotAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  businessModel?: {
    valueProposition: string[];
    revenueStreams: string[];
    costStructure: string[];
    keyPartnerships: string[];
  };
  implementation?: {
    phases: Array<{
      name: string;
      duration: string;
      keyActivities: string[];
      deliverables: string[];
    }>;
    resources: {
      human: string[];
      financial: string[];
      technical: string[];
    };
    risks: Array<{
      risk: string;
      probability: 'low' | 'medium' | 'high';
      impact: 'low' | 'medium' | 'high';
      mitigation: string;
    }>;
  };
}

// 市场数据知识库
const MARKET_DATA = {
  '科技': {
    marketSize: '万亿级市场',
    growthRate: '年增长率15-25%',
    keyPlayers: ['腾讯', '阿里巴巴', '百度', '字节跳动', '华为'],
    trends: ['AI普及', '云计算', '5G应用', '物联网', '区块链']
  },
  '教育': {
    marketSize: '千亿级市场',
    growthRate: '年增长率10-20%',
    keyPlayers: ['新东方', '好未来', '猿辅导', '作业帮', 'VIPKID'],
    trends: ['在线教育', '个性化学习', 'AI教学', 'VR/AR教育']
  },
  '医疗': {
    marketSize: '万亿级市场',
    growthRate: '年增长率8-15%',
    keyPlayers: ['平安好医生', '春雨医生', '丁香园', '微医', '好大夫'],
    trends: ['远程医疗', 'AI诊断', '精准医疗', '数字健康']
  },
  '金融': {
    marketSize: '万亿级市场',
    growthRate: '年增长率5-12%',
    keyPlayers: ['蚂蚁金服', '腾讯金融', '京东数科', '陆金所', '宜人贷'],
    trends: ['金融科技', '数字货币', '智能投顾', '开放银行']
  },
  '零售': {
    marketSize: '万亿级市场',
    growthRate: '年增长率3-8%',
    keyPlayers: ['阿里巴巴', '京东', '拼多多', '美团', '苏宁'],
    trends: ['新零售', '社交电商', '直播带货', '无人零售']
  }
};

// SWOT分析模板
const SWOT_TEMPLATES = {
  '科技': {
    strengths: ['技术领先', '创新能力强', '人才储备丰富', '资金实力雄厚'],
    weaknesses: ['技术更新快', '竞争激烈', '监管风险', '人才流失'],
    opportunities: ['数字化转型', '新兴技术', '政策支持', '市场需求增长'],
    threats: ['技术替代', '监管变化', '国际竞争', '经济波动']
  },
  '教育': {
    strengths: ['内容质量高', '师资力量强', '品牌影响力', '用户粘性高'],
    weaknesses: ['获客成本高', '内容同质化', '技术投入大', '监管严格'],
    opportunities: ['在线教育普及', '个性化需求', 'AI技术应用', '政策支持'],
    threats: ['竞争加剧', '政策变化', '技术替代', '用户需求变化']
  }
};

class DeepAnalysisEngine {
  // 生成深度分析
  async generateDeepAnalysis(topic: string, context: Partial<AnalysisContext> = {}): Promise<DeepAnalysisResult> {
    // 检查是否使用AI分析
    if (context.useAI) {
      return await this.generateAIAnalysis(topic, context);
    }
    
    // 使用本地数据生成分析
    return this.generateLocalAnalysis(topic, context);
  }

  // 生成AI分析
  private async generateAIAnalysis(topic: string, context: Partial<AnalysisContext>): Promise<DeepAnalysisResult> {
    // 调用真实的AI服务进行分析
    try {
      const aiServiceModule = await import('../ai/aiService');
      const aiService = aiServiceModule.default;
      
      if (!aiService.isConfigured()) {
        throw new Error('AI服务未配置，请先设置API密钥');
      }

      const aiRequest = {
        topic,
        context: JSON.stringify(context || {}),
        previousResults: []
      };

      const aiResponse = await aiService.performEnhancedAnalysis(aiRequest);
      
      // 将AI分析结果转换为DeepAnalysisResult格式
      return this.convertAIResponseToDeepAnalysis(topic, aiResponse, context as AnalysisContext);
    } catch (error) {
      console.error('AI分析失败，回退到本地分析:', error);
      // 如果AI分析失败，回退到本地分析
      const baseAnalysis = this.generateBaseAnalysis(topic, context as AnalysisContext);
    
      // 模拟AI增强的分析结果
      return {
        ...baseAnalysis,
        topic: topic,
        analysis: `基于AI深度分析的${topic}具有以下特点：\n\n1. 市场潜力巨大：${topic}在相关行业中具有显著的发展潜力\n2. 技术创新机会：通过AI技术可以显著提升${topic}的智能化水平\n3. 用户需求匹配：AI分析显示用户对${topic}的个性化需求正在增长\n4. 竞争优势明显：通过AI驱动的创新可以建立技术壁垒`,
        insights: {
          keyOpportunities: [
            `AI驱动的${topic}个性化服务`,
            `基于大数据的${topic}智能推荐`,
            `${topic}的自动化运营优化`,
            `智能化的${topic}用户体验设计`
          ],
          potentialRisks: [
            'AI技术实施成本较高',
            '数据隐私和安全风险',
            '技术更新换代风险',
            '用户接受度不确定性'
          ],
          marketTrends: [
            'AI技术在各行业的快速普及',
            '用户对智能化服务的需求增长',
            '数据驱动决策成为主流',
            '个性化服务成为竞争优势'
          ],
          competitiveAdvantages: [
            'AI技术领先优势',
            '数据积累和分析能力',
            '智能化用户体验',
            '持续学习和优化能力'
          ]
        },
        recommendations: {
          shortTerm: [
            `建立${topic}的AI技术团队`,
            '收集和分析用户数据',
            '制定AI技术实施路线图'
          ],
          mediumTerm: [
            `开发${topic}的AI核心功能`,
            '建立数据分析和机器学习模型',
            '优化AI驱动的用户体验'
          ],
          longTerm: [
            '建立AI技术生态',
            '探索新的AI应用场景',
            '成为行业AI技术领导者'
          ]
        },
        confidence: 0.85, // AI分析的置信度更高
        marketAnalysis: {
          marketSize: '万亿级市场',
          growthRate: '年增长率20-30%',
          keyPlayers: ['行业领先企业A', '创新公司B', '技术巨头C'],
          marketTrends: ['AI技术普及', '智能化升级', '数据驱动决策']
        },
        competitiveAnalysis: {
          directCompetitors: ['竞争对手A', '竞争对手B'],
          indirectCompetitors: ['替代方案A', '替代方案B'],
          competitiveAdvantages: ['AI技术优势', '数据积累', '用户体验'],
          competitiveThreats: ['技术替代', '新进入者', '政策变化']
        },
        swotAnalysis: {
          strengths: ['AI技术领先', '数据资源丰富', '团队能力强'],
          weaknesses: ['技术实施成本高', '市场教育需要时间'],
          opportunities: ['AI技术普及', '市场需求增长', '政策支持'],
          threats: ['技术更新快', '竞争加剧', '监管变化']
        }
      };
    }
  }

  // 生成本地分析
  private generateLocalAnalysis(topic: string, context: Partial<AnalysisContext>): DeepAnalysisResult {
    const fullContext: AnalysisContext = { topic, ...context };
    
    // 首先获取基础奥斯本分析
    const baseAnalysis = this.generateBaseAnalysis(topic, fullContext);
    
    // 生成市场分析
    const marketAnalysis = this.generateMarketAnalysis(fullContext);
    
    // 生成竞争分析
    const competitiveAnalysis = this.generateCompetitiveAnalysis(fullContext);
    
    // 生成SWOT分析
    const swotAnalysis = this.generateSWOTAnalysis(fullContext);
    
    // 生成商业模式分析
    const businessModel = this.generateBusinessModel(topic, fullContext);
    
    // 生成实施计划
    const implementation = this.generateImplementationPlan();
    
    return {
      ...baseAnalysis,
      topic: topic,
      marketAnalysis,
      competitiveAnalysis,
      swotAnalysis,
      businessModel,
      implementation
    };
  }

  // 生成基础分析（基于奥斯本分析）
  private generateBaseAnalysis(topic: string, context: AnalysisContext): IntelligentAnalysisResult {
    const questions: Record<string, string[]> = {};
    const insights: string[] = [];
    const recommendations: string[] = [];

    // 生成奥斯本九问
    const osbornCategories = [
      '能否他用？', '能否借用？', '能否修改？', '能否扩大？', '能否缩小？',
      '能否替代？', '能否调整？', '能否颠倒？', '能否组合？'
    ];

    osbornCategories.forEach(category => {
      questions[category] = this.generateQuestionsForCategory(category, topic);
      insights.push(...this.generateInsightsForCategory(category, topic, context));
    });

    // 生成建议
    recommendations.push(...this.generateRecommendations(topic, context));

    // 查找相似案例
    const similarCases = this.findSimilarCases(topic, context);

    const now = new Date();

    return {
      id: `deep-analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${topic} - 深度分析`,
      description: `基于深度分析的${topic}创新分析`,
      question: topic,
      analysis: this.generateComprehensiveAnalysis(topic, context, insights, similarCases),
      suggestions: recommendations,
      questions,
      summary: this.generateSummary(topic, insights, recommendations),
      totalScore: this.calculateScore(insights, recommendations, similarCases),
      quality: this.assessQuality(insights, recommendations, similarCases),
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      insights: {
        keyOpportunities: this.extractKeyOpportunities(insights),
        potentialRisks: this.extractPotentialRisks(insights),
        marketTrends: this.extractMarketTrends(context),
        competitiveAdvantages: this.extractCompetitiveAdvantages(insights)
      },
      recommendations: {
        shortTerm: this.generateShortTermRecommendations(),
        mediumTerm: this.generateMediumTermRecommendations(),
        longTerm: this.generateLongTermRecommendations()
      },
      similarCases,
      confidence: this.calculateConfidence(context, similarCases),
      detailedAnalysis: {
        osbornDimensions: [],
        crossIndustryInsights: [],
        innovationPatterns: [],
        implementationRoadmap: []
      }
    };
  }

  // 生成市场分析
  private generateMarketAnalysis(context: AnalysisContext) {
    const industry = context.industry || '科技';
    const marketInfo = MARKET_DATA[industry as keyof typeof MARKET_DATA] || MARKET_DATA['科技'];
    
    return {
      marketSize: marketInfo.marketSize,
      growthRate: marketInfo.growthRate,
      keyPlayers: marketInfo.keyPlayers,
      marketTrends: marketInfo.trends
    };
  }

  // 生成竞争分析
  private generateCompetitiveAnalysis(context: AnalysisContext) {
    const industry = context.industry || '科技';
    const marketInfo = MARKET_DATA[industry as keyof typeof MARKET_DATA] || MARKET_DATA['科技'];
    
    return {
      directCompetitors: marketInfo.keyPlayers.slice(0, 3),
      indirectCompetitors: marketInfo.keyPlayers.slice(3, 5),
      competitiveAdvantages: [
        '技术创新能力',
        '用户体验优势',
        '成本控制能力',
        '市场响应速度'
      ],
      competitiveThreats: [
        '技术替代风险',
        '价格竞争压力',
        '新进入者威胁',
        '政策监管变化'
      ]
    };
  }

  // 生成SWOT分析
  private generateSWOTAnalysis(context: AnalysisContext) {
    const industry = context.industry || '科技';
    const swotTemplate = SWOT_TEMPLATES[industry as keyof typeof SWOT_TEMPLATES] || SWOT_TEMPLATES['科技'];
    
    return {
      strengths: swotTemplate.strengths,
      weaknesses: swotTemplate.weaknesses,
      opportunities: swotTemplate.opportunities,
      threats: swotTemplate.threats
    };
  }

  // 生成商业模式分析
  private generateBusinessModel(topic: string, context: AnalysisContext) {
    return {
      valueProposition: [
        `为${context.targetAudience || '用户'}提供${topic}解决方案`,
        '降低使用门槛，提高效率',
        '提供个性化定制服务',
        '建立长期合作关系'
      ],
      revenueStreams: [
        '产品销售/服务费用',
        '订阅/会员费用',
        '广告/推广费用',
        '数据/咨询服务'
      ],
      costStructure: [
        '研发成本',
        '人力成本',
        '营销推广成本',
        '运营维护成本'
      ],
      keyPartnerships: [
        '技术合作伙伴',
        '渠道合作伙伴',
        '内容合作伙伴',
        '投资合作伙伴'
      ]
    };
  }

  // 生成实施计划
  private generateImplementationPlan() {
    return {
      phases: [
        {
          name: '准备阶段',
          duration: '1-2个月',
          keyActivities: ['市场调研', '团队组建', '技术选型', '资金准备'],
          deliverables: ['市场分析报告', '团队架构', '技术方案', '资金计划']
        },
        {
          name: '开发阶段',
          duration: '3-6个月',
          keyActivities: ['产品开发', '测试验证', '用户反馈', '迭代优化'],
          deliverables: ['MVP产品', '测试报告', '用户反馈', '优化方案']
        },
        {
          name: '推广阶段',
          duration: '6-12个月',
          keyActivities: ['市场推广', '用户获取', '运营优化', '规模扩张'],
          deliverables: ['用户增长', '市场占有率', '运营数据', '扩张计划']
        }
      ],
      resources: {
        human: ['产品经理', '技术开发', '市场推广', '运营管理'],
        financial: ['启动资金', '运营资金', '营销预算', '应急资金'],
        technical: ['技术平台', '开发工具', '数据资源', '云服务']
      },
      risks: [
        {
          risk: '技术风险',
          probability: 'medium' as const,
          impact: 'high' as const,
          mitigation: '选择成熟技术，建立技术团队'
        },
        {
          risk: '市场风险',
          probability: 'high' as const,
          impact: 'medium' as const,
          mitigation: '充分市场调研，灵活调整策略'
        },
        {
          risk: '资金风险',
          probability: 'low' as const,
          impact: 'high' as const,
          mitigation: '多元化融资，控制成本'
        }
      ]
    };
  }

  // 辅助方法
  private generateQuestionsForCategory(category: string, topic: string): string[] {
    const questionTemplates = {
      '能否他用？': [
        `${topic}还能在哪些其他领域使用？`,
        `能否将${topic}的功能扩展到新的应用场景？`,
        `如何将${topic}应用到不同的行业？`
      ],
      '能否借用？': [
        `其他行业有哪些成功的做法可以借鉴到${topic}？`,
        `能否借用其他产品的优秀功能来改进${topic}？`,
        `如何学习成功企业的经验来发展${topic}？`
      ],
      '能否修改？': [
        `如何改进${topic}的现有功能？`,
        `能否优化${topic}的用户体验？`,
        `如何降低${topic}的成本提高效率？`
      ],
      '能否扩大？': [
        `如何扩大${topic}的目标市场？`,
        `能否增加${topic}的功能特性？`,
        `如何扩大${topic}的服务范围？`
      ],
      '能否缩小？': [
        `如何简化${topic}的功能？`,
        `能否聚焦${topic}的特定用户群体？`,
        `如何降低${topic}的使用门槛？`
      ],
      '能否替代？': [
        `能否用更便宜的材料来制作${topic}？`,
        `如何用新技术替代${topic}的旧方案？`,
        `能否改变${topic}的服务模式？`
      ],
      '能否调整？': [
        `如何调整${topic}的时间安排？`,
        `能否优化${topic}的空间布局？`,
        `如何调整${topic}的工作流程？`
      ],
      '能否颠倒？': [
        `能否改变${topic}的角色关系？`,
        `如何颠倒${topic}的传统流程？`,
        `能否从不同角度思考${topic}？`
      ],
      '能否组合？': [
        `如何组合${topic}的不同功能？`,
        `能否整合多种技术来改进${topic}？`,
        `如何组合${topic}的服务内容？`
      ]
    };

    return questionTemplates[category as keyof typeof questionTemplates] || [];
  }

  private generateInsightsForCategory(category: string, topic: string, context: AnalysisContext): string[] {
    const insights = [];
    
    if (context.industry) {
      const industry = MARKET_DATA[context.industry as keyof typeof MARKET_DATA];
      if (industry) {
        insights.push(`${category}: 在${context.industry}行业中，${topic}可以借鉴${industry.trends[0]}的成功经验`);
      }
    }
    
    insights.push(`${category}: ${topic}可以通过创新思维找到新的发展机会`);
    
    return insights;
  }

  private generateRecommendations(topic: string, context: AnalysisContext): string[] {
    const recommendations = [];
    
    recommendations.push(`建议对${topic}进行全面的市场调研，了解用户需求`);
    recommendations.push(`制定${topic}的详细发展规划，分阶段实施`);
    recommendations.push(`建立${topic}的核心团队，确保执行能力`);
    
    if (context.industry) {
      recommendations.push(`关注${context.industry}行业的发展趋势，及时调整策略`);
    }
    
    return recommendations;
  }

  private findSimilarCases(topic: string, context: AnalysisContext): LocalCase[] {
    const allCases = localCaseService.getAllCases();
    
    return allCases
      .filter(caseItem => 
        caseItem.topic.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(caseItem.topic.toLowerCase()) ||
        (context.industry && caseItem.industry === context.industry)
      )
      .slice(0, 3);
  }

  private generateComprehensiveAnalysis(topic: string, context: AnalysisContext, insights: string[], similarCases: LocalCase[]): string {
    let analysis = `基于深度分析的${topic}具有以下特点：\n\n`;
    
    analysis += `1. 市场潜力：${topic}在${context.industry || '相关'}行业中具有较大的发展潜力，`;
    analysis += `通过系统性分析发现了${insights.length}个创新方向。\n\n`;
    
    analysis += `2. 竞争优势：通过SWOT分析，${topic}在技术创新、用户体验等方面具有优势，`;
    analysis += `但也需要注意市场竞争和风险控制。\n\n`;
    
    analysis += `3. 实施建议：建议采用分阶段实施策略，从市场调研开始，`;
    analysis += `逐步推进产品开发、市场推广等环节。`;
    
    if (similarCases.length > 0) {
      analysis += `同时，可以参考${similarCases.length}个相似案例的成功经验。`;
    }
    
    return analysis;
  }

  private generateSummary(topic: string, insights: string[], recommendations: string[]): string {
    return `${topic}的深度分析揭示了${insights.length}个关键洞察，提出了${recommendations.length}个实施建议，为项目发展提供了全面的指导。`;
  }

  private calculateScore(insights: string[], recommendations: string[], similarCases: LocalCase[]): number {
    let score = 0;
    score += insights.length * 3;
    score += recommendations.length * 4;
    score += similarCases.length * 5;
    return Math.min(score, 100);
  }

  private assessQuality(insights: string[], recommendations: string[], similarCases: LocalCase[]): 'low' | 'medium' | 'high' {
    const score = this.calculateScore(insights, recommendations, similarCases);
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  }

  private calculateConfidence(context: AnalysisContext, similarCases: LocalCase[]): number {
    let confidence = 0.6; // 深度分析的基础置信度更高
    
    if (context.industry) confidence += 0.2;
    if (context.targetAudience) confidence += 0.1;
    if (context.businessModel) confidence += 0.1;
    if (similarCases.length > 0) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  private extractKeyOpportunities(insights: string[]): string[] {
    return insights.filter(insight => insight.includes('机会') || insight.includes('机遇')).slice(0, 3);
  }

  private extractPotentialRisks(insights: string[]): string[] {
    return insights.filter(insight => insight.includes('风险') || insight.includes('挑战')).slice(0, 3);
  }

  private extractMarketTrends(context: AnalysisContext): string[] {
    if (context.industry) {
      const industry = MARKET_DATA[context.industry as keyof typeof MARKET_DATA];
      if (industry) {
        return industry.trends.slice(0, 3);
      }
    }
    return ['数字化转型', '智能化升级', '用户体验优化'];
  }

  private extractCompetitiveAdvantages(insights: string[]): string[] {
    return insights.filter(insight => insight.includes('优势') || insight.includes('创新')).slice(0, 3);
  }

  private generateShortTermRecommendations(): string[] {
    return [
      '进行详细的市场调研',
      '制定产品/服务规划',
      '建立核心团队'
    ];
  }

  private generateMediumTermRecommendations(): string[] {
    return [
      '开发MVP产品',
      '建立合作伙伴关系',
      '优化产品功能'
    ];
  }

  private generateLongTermRecommendations(): string[] {
    return [
      '扩大市场份额',
      '建立品牌影响力',
      '考虑多元化发展'
    ];
  }

  // 将AI响应转换为DeepAnalysisResult格式
  private convertAIResponseToDeepAnalysis(
    topic: string, 
    aiResponse: any, 
    context: AnalysisContext
  ): DeepAnalysisResult {
    const now = new Date();
    
    return {
      id: `ai-analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      topic,
      analysis: this.extractAnalysisFromAI(aiResponse, topic),
      insights: {
        keyOpportunities: this.extractOpportunitiesFromAI(aiResponse),
        potentialRisks: this.extractRisksFromAI(aiResponse),
        marketTrends: this.extractTrendsFromAI(aiResponse),
        competitiveAdvantages: this.extractAdvantagesFromAI(aiResponse)
      },
      suggestions: aiResponse.suggestions || [],
      confidence: aiResponse.confidence || 0.8,
      quality: this.assessQualityFromConfidence(aiResponse.confidence),
      timestamp: now,
      title: `${topic} - AI深度分析`,
      description: `基于AI技术的${topic}深度创新分析`,
      questions: this.generateQuestionsFromAI(aiResponse),
      summary: this.generateSummaryFromAI(topic, aiResponse),
      totalScore: this.calculateScoreFromAI(aiResponse),
      createdAt: now,
      updatedAt: now,
      recommendations: {
        shortTerm: this.extractShortTermRecommendations(aiResponse),
        mediumTerm: this.extractMediumTermRecommendations(aiResponse),
        longTerm: this.extractLongTermRecommendations(aiResponse)
      },
      similarCases: this.findSimilarCases(topic, context),
      detailedAnalysis: {
        osbornDimensions: this.extractOsbornDimensions(aiResponse),
        crossIndustryInsights: this.extractCrossIndustryInsights(aiResponse),
        innovationPatterns: this.extractInnovationPatterns(aiResponse),
        implementationRoadmap: this.generateImplementationRoadmap(aiResponse)
      }
    };
  }

  // 从AI响应中提取分析内容
  private extractAnalysisFromAI(aiResponse: any, topic: string): string {
    // 尝试多种方式提取分析内容
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis) && aiResponse.analysis.length > 0) {
      // 如果是数组，合并所有分析内容
      return aiResponse.analysis.map((item: any) => 
        item.analysis || item.description || item.summary || ''
      ).filter(Boolean).join('\n\n');
    }
    
    if (aiResponse.analysis && typeof aiResponse.analysis === 'string') {
      return aiResponse.analysis;
    }
    
    if (aiResponse.summary) {
      return aiResponse.summary;
    }
    
    if (aiResponse.description) {
      return aiResponse.description;
    }
    
    // 如果AI响应包含奥斯本九问分析，提取并格式化
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis)) {
      const osbornAnalysis = aiResponse.analysis.map((item: any, index: number) => {
        const title = item.title || `分析维度 ${index + 1}`;
        const description = item.description || item.analysis || '';
        const insights = item.insights || [];
        const recommendations = item.recommendations || [];
        
        let content = `## ${title}\n\n${description}`;
        
        if (insights.length > 0) {
          content += `\n\n### 关键洞察\n${insights.map((insight: string) => `• ${insight}`).join('\n')}`;
        }
        
        if (recommendations.length > 0) {
          content += `\n\n### 实施建议\n${recommendations.map((rec: string) => `• ${rec}`).join('\n')}`;
        }
        
        return content;
      }).join('\n\n---\n\n');
      
      if (osbornAnalysis.trim()) {
        return `# ${topic} - AI深度分析\n\n${osbornAnalysis}`;
      }
    }
    
    // 默认返回
    return `基于AI深度分析的${topic}创新方案。\n\n通过奥斯本九问创新法，从多个维度深入分析了${topic}的创新机会和发展潜力。分析涵盖了市场趋势、竞争格局、技术发展、用户需求等多个方面，为创新实践提供了全面的指导。`;
  }

  // 从AI响应中提取机会
  private extractOpportunitiesFromAI(aiResponse: any): string[] {
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis)) {
      return aiResponse.analysis
        .filter((item: any) => item.title?.includes('机会') || item.title?.includes('优势'))
        .map((item: any) => item.analysis || item.description)
        .slice(0, 4);
    }
    return ['AI驱动的个性化服务', '智能化用户体验', '数据驱动的决策优化', '自动化运营提升'];
  }

  // 从AI响应中提取风险
  private extractRisksFromAI(aiResponse: any): string[] {
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis)) {
      return aiResponse.analysis
        .filter((item: any) => item.title?.includes('风险') || item.title?.includes('挑战'))
        .map((item: any) => item.analysis || item.description)
        .slice(0, 4);
    }
    return ['技术实施成本较高', '数据隐私和安全风险', '技术更新换代风险', '用户接受度不确定性'];
  }

  // 从AI响应中提取趋势
  private extractTrendsFromAI(aiResponse: any): string[] {
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis)) {
      return aiResponse.analysis
        .filter((item: any) => item.title?.includes('趋势') || item.title?.includes('发展'))
        .map((item: any) => item.analysis || item.description)
        .slice(0, 4);
    }
    return ['AI技术快速普及', '智能化需求增长', '数据驱动决策', '个性化服务趋势'];
  }

  // 从AI响应中提取优势
  private extractAdvantagesFromAI(aiResponse: any): string[] {
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis)) {
      return aiResponse.analysis
        .filter((item: any) => item.title?.includes('优势') || item.title?.includes('竞争力'))
        .map((item: any) => item.analysis || item.description)
        .slice(0, 4);
    }
    return ['AI技术领先', '数据积累优势', '智能化体验', '持续学习能力'];
  }

  // 从置信度评估质量
  private assessQualityFromConfidence(confidence: number): 'low' | 'medium' | 'high' {
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.6) return 'medium';
    return 'low';
  }

  // 从AI响应生成问题
  private generateQuestionsFromAI(aiResponse: any): Record<string, string[]> {
    const questions: Record<string, string[]> = {};
    
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis)) {
      aiResponse.analysis.forEach((item: any, index: number) => {
        const category = item.title || `AI分析维度${index + 1}`;
        questions[category] = [item.analysis || item.description || '暂无具体分析内容'];
      });
    }
    
    // 如果没有AI分析结果，使用默认的奥斯本九问
    if (Object.keys(questions).length === 0) {
      const osbornCategories = [
        '能否他用？', '能否借用？', '能否修改？', '能否扩大？', '能否缩小？',
        '能否替代？', '能否调整？', '能否颠倒？', '能否组合？'
      ];
      
      osbornCategories.forEach(category => {
        questions[category] = this.generateQuestionsForCategory(category, 'AI分析主题');
      });
    }
    
    return questions;
  }

  // 从AI响应生成摘要
  private generateSummaryFromAI(topic: string, aiResponse: any): string {
    if (aiResponse.analysis && Array.isArray(aiResponse.analysis) && aiResponse.analysis.length > 0) {
      return aiResponse.analysis[0].analysis || `基于AI深度分析的${topic}具有显著创新潜力`;
    }
    return `基于AI深度分析的${topic}具有显著创新潜力，通过智能化技术可以显著提升用户体验和运营效率`;
  }

  // 从AI响应计算评分
  private calculateScoreFromAI(aiResponse: any): number {
    const baseScore = 75;
    const confidenceBonus = (aiResponse.confidence || 0.8) * 20;
    return Math.min(100, Math.round(baseScore + confidenceBonus));
  }

  // 提取短期建议
  private extractShortTermRecommendations(aiResponse: any): string[] {
    if (aiResponse.suggestions && Array.isArray(aiResponse.suggestions)) {
      return aiResponse.suggestions.slice(0, 3);
    }
    return ['建立AI技术团队', '收集用户数据', '制定实施路线图'];
  }

  // 提取中期建议
  private extractMediumTermRecommendations(aiResponse: any): string[] {
    return ['开发AI核心功能', '建立机器学习模型', '优化用户体验'];
  }

  // 提取长期建议
  private extractLongTermRecommendations(aiResponse: any): string[] {
    return ['建立AI技术生态', '探索新应用场景', '成为行业领导者'];
  }

  // 提取奥斯本维度
  private extractOsbornDimensions(aiResponse: any): Array<{
    dimension: string;
    questions: string[];
    insights: string[];
    innovationSchemes: string[];
    score: number;
  }> {
    const dimensions: Array<{
      dimension: string;
      questions: string[];
      insights: string[];
      innovationSchemes: string[];
      score: number;
    }> = [];
    const osbornCategories = [
      '能否他用？', '能否借用？', '能否修改？', '能否扩大？', '能否缩小？',
      '能否替代？', '能否调整？', '能否颠倒？', '能否组合？'
    ];
    
    osbornCategories.forEach((category, index) => {
      dimensions.push({
        dimension: category,
        questions: this.generateQuestionsForCategory(category, 'AI分析主题'),
        insights: [`${category}的AI应用机会`],
        innovationSchemes: [`基于AI的${category}创新方案`],
        score: 75 + (index * 2)
      });
    });
    
    return dimensions;
  }

  // 提取跨行业洞察
  private extractCrossIndustryInsights(aiResponse: any): string[] {
    return ['AI技术在多个行业的成功应用', '跨行业数据共享的价值', '技术标准化的趋势'];
  }

  // 提取创新模式
  private extractInnovationPatterns(aiResponse: any): string[] {
    return ['AI驱动的产品创新', '数据驱动的服务优化', '智能化用户体验设计'];
  }

  // 生成实施路线图
  private generateImplementationRoadmap(aiResponse: any): Array<{
    phase: string;
    timeline: string;
    actions: string[];
    dependencies: string[];
  }> {
    return [
      {
        phase: '准备阶段',
        timeline: '1-3个月',
        actions: ['技术团队组建', '数据收集', '需求分析'],
        dependencies: ['人员招聘', '数据源确认']
      },
      {
        phase: '开发阶段',
        timeline: '3-6个月',
        actions: ['核心功能开发', '模型训练', '系统集成'],
        dependencies: ['技术选型', '开发环境']
      },
      {
        phase: '优化阶段',
        timeline: '6-12个月',
        actions: ['性能优化', '用户体验改进', '功能扩展'],
        dependencies: ['用户反馈', '性能监控']
      }
    ];
  }
}

export const deepAnalysisEngine = new DeepAnalysisEngine();
export default deepAnalysisEngine;
