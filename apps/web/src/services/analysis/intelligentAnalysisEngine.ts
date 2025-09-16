import { localCaseService, LocalCase } from '../localCaseService';

// 分析上下文
export interface AnalysisContext {
  topic: string;
  industry?: string;
  targetAudience?: string;
  businessModel?: string;
  budget?: string;
  timeline?: string;
  goals?: string[];
  constraints?: string[];
}

// 智能分析结果
export interface IntelligentAnalysisResult {
  id: string;
  title: string;
  description: string;
  question: string;
  analysis: string;
  suggestions: string[];
  questions: Record<string, string[]>;
  summary: string;
  totalScore: number;
  quality: 'low' | 'medium' | 'high';
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
  insights: {
    keyOpportunities: string[];
    potentialRisks: string[];
    marketTrends: string[];
    competitiveAdvantages: string[];
  };
  recommendations: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  similarCases: LocalCase[];
  confidence: number;
  // 增强的分析维度
  detailedAnalysis: {
    osbornDimensions: Array<{
      dimension: string;
      questions: string[];
      insights: string[];
      score: number;
      recommendations: string[];
    }>;
    crossIndustryInsights: string[];
    innovationPatterns: string[];
    implementationRoadmap: {
      phase: string;
      timeline: string;
      actions: string[];
      dependencies: string[];
    }[];
  };
}

// 行业知识库 - 增强本地分析能力
const INDUSTRY_KNOWLEDGE = {
  '科技': {
    trends: ['人工智能集成', '云计算应用', '物联网连接', '区块链技术', '边缘计算'],
    challenges: ['技术更新快', '人才短缺', '安全风险', '标准不统一'],
    opportunities: ['数字化转型', '智能化升级', '数据驱动决策', '远程协作']
  },
  '教育': {
    trends: ['在线学习', '个性化教育', '游戏化学习', '混合式教学', '终身学习'],
    challenges: ['数字鸿沟', '教学质量保证', '教师培训', '内容更新'],
    opportunities: ['教育公平', '技能提升', '全球教育', '定制化学习']
  },
  '医疗': {
    trends: ['远程医疗', '精准医疗', '数字健康', 'AI诊断', '可穿戴设备'],
    challenges: ['数据隐私', '法规限制', '技术门槛', '成本控制'],
    opportunities: ['预防医学', '个性化治疗', '医疗可及性', '健康管理']
  },
  '零售': {
    trends: ['全渠道零售', '社交电商', '直播带货', '个性化推荐', '无人零售'],
    challenges: ['库存管理', '物流效率', '用户体验', '竞争激烈'],
    opportunities: ['新零售模式', '数据驱动运营', '会员经济', '场景化营销']
  },
  '金融': {
    trends: ['金融科技', '数字支付', '智能投顾', '区块链金融', '开放银行'],
    challenges: ['监管合规', '风险控制', '数据安全', '用户信任'],
    opportunities: ['普惠金融', '金融服务创新', '跨境支付', '智能风控']
  }
};

// 创新模式库 (unused but kept for future reference)
/*
const INNOVATION_PATTERNS = [
  {
    name: '平台化',
    description: '构建连接多方参与者的平台生态系统',
    examples: ['电商平台', '社交媒体', '共享经济'],
    benefits: ['网络效应', '规模经济', '数据积累']
  },
  {
    name: '订阅制',
    description: '从一次性交易转向持续性的订阅服务',
    examples: ['SaaS服务', '内容订阅', '会员制度'],
    benefits: ['稳定收入', '用户粘性', '持续价值']
  },
  {
    name: '个性化',
    description: '基于用户数据和偏好提供定制化服务',
    examples: ['推荐系统', '定制产品', '个性化体验'],
    benefits: ['用户满意度', '差异化竞争', '数据价值']
  },
  {
    name: '去中介化',
    description: '去除中间环节，直接连接生产者和消费者',
    examples: ['直销模式', 'P2P交易', '去中心化应用'],
    benefits: ['成本降低', '效率提升', '透明度增加']
  }
];
*/

// 奥斯本九问模板 - 增强版
const OSBORN_TEMPLATES = {
  '能否他用？': {
    questions: [
      '这个产品/服务还能在哪些其他领域使用？',
      '能否将现有功能扩展到新的应用场景？',
      '如何将解决方案应用到不同的行业？'
    ],
    insights: [
      '探索跨领域应用的可能性',
      '寻找新的市场机会',
      '扩大目标用户群体'
    ]
  },
  '能否借用？': {
    questions: [
      '其他行业有哪些成功的做法可以借鉴？',
      '能否借用其他产品的优秀功能？',
      '如何学习成功企业的经验？'
    ],
    insights: [
      '学习最佳实践',
      '借鉴成功模式',
      '避免重复造轮子'
    ]
  },
  '能否修改？': {
    questions: [
      '如何改进现有功能？',
      '能否优化用户体验？',
      '如何降低成本提高效率？'
    ],
    insights: [
      '持续改进产品',
      '提升用户满意度',
      '优化运营效率'
    ]
  },
  '能否扩大？': {
    questions: [
      '如何扩大目标市场？',
      '能否增加功能特性？',
      '如何扩大服务范围？'
    ],
    insights: [
      '市场扩张策略',
      '功能增强计划',
      '服务范围扩展'
    ]
  },
  '能否缩小？': {
    questions: [
      '如何简化功能？',
      '能否聚焦特定用户群体？',
      '如何降低使用门槛？'
    ],
    insights: [
      '产品简化策略',
      '精准定位用户',
      '降低使用成本'
    ]
  },
  '能否替代？': {
    questions: [
      '能否用更便宜的材料？',
      '如何用新技术替代旧方案？',
      '能否改变服务模式？'
    ],
    insights: [
      '成本优化方案',
      '技术升级路径',
      '模式创新机会'
    ]
  },
  '能否调整？': {
    questions: [
      '如何调整时间安排？',
      '能否优化空间布局？',
      '如何调整工作流程？'
    ],
    insights: [
      '时间管理优化',
      '空间利用效率',
      '流程改进方案'
    ]
  },
  '能否颠倒？': {
    questions: [
      '能否改变角色关系？',
      '如何颠倒传统流程？',
      '能否从不同角度思考？'
    ],
    insights: [
      '角色重新定义',
      '流程逆向思考',
      '视角转换创新'
    ]
  },
  '能否组合？': {
    questions: [
      '如何组合不同功能？',
      '能否整合多种技术？',
      '如何组合服务内容？'
    ],
    insights: [
      '功能组合创新',
      '技术集成方案',
      '服务打包策略'
    ]
  }
};

class IntelligentAnalysisEngine {
  // 生成智能分析
  generateAnalysis(topic: string, context: Partial<AnalysisContext> = {}): IntelligentAnalysisResult {
    const fullContext: AnalysisContext = { topic, ...context };
    
    // 生成奥斯本九问
    const questions = this.generateOsbornQuestions(topic, fullContext);
    
    // 生成分析洞察
    const insights = this.generateInsights(topic, fullContext);
    
    // 生成建议
    const recommendations = this.generateRecommendations(topic, fullContext);
    
    // 查找相似案例
    const similarCases = this.findSimilarCases(topic, fullContext);
    
    // 生成综合分析
    const analysis = this.generateComprehensiveAnalysis(topic, fullContext, insights, similarCases);
    
    // 生成详细分析（增强功能）
    const detailedAnalysis = this.generateDetailedAnalysis(topic, fullContext, similarCases);
    
    // 计算评分
    const totalScore = this.calculateScore(insights, recommendations, similarCases, detailedAnalysis);
    const quality = this.assessQuality(totalScore);
    const confidence = this.calculateConfidence(fullContext, similarCases);
    
    const now = new Date();
    
    return {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${topic} - 奥斯本创新分析`,
      description: `基于奥斯本检核表法的${topic}深度创新分析`,
      question: topic,
      analysis,
      suggestions: recommendations.shortTerm.concat(recommendations.mediumTerm, recommendations.longTerm),
      questions,
      summary: this.generateSummary(topic, insights, recommendations, detailedAnalysis),
      totalScore,
      quality,
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      insights,
      recommendations,
      similarCases,
      confidence,
      detailedAnalysis
    };
  }

  // 生成奥斯本九问
  private generateOsbornQuestions(topic: string, _context: AnalysisContext): Record<string, string[]> {
    const questions: Record<string, string[]> = {};
    
    Object.entries(OSBORN_TEMPLATES).forEach(([category, template]) => {
      questions[category] = template.questions.map(q => 
        q.replace('这个产品/服务', topic).replace('现有功能', `${topic}的功能`)
      );
    });
    
    return questions;
  }

  // 生成洞察 - 增强版
  private generateInsights(topic: string, context: AnalysisContext) {
    const allInsights: string[] = [];
    
    Object.values(OSBORN_TEMPLATES).forEach(template => {
      allInsights.push(...template.insights);
    });
    
    // 基于行业知识的洞察
    const industryInsights = this.generateIndustryInsights(context.industry, topic);
    
    // 基于案例库的洞察
    const caseInsights = this.generateCaseBasedInsights(topic, context);
    
    return {
      keyOpportunities: [
        ...allInsights.filter(insight => 
          insight.includes('机会') || insight.includes('扩张') || insight.includes('创新')
        ).slice(0, 2),
        ...industryInsights.opportunities.slice(0, 2),
        ...caseInsights.opportunities.slice(0, 1)
      ],
      potentialRisks: [
        '市场竞争加剧',
        '技术更新换代',
        '用户需求变化',
        ...industryInsights.challenges.slice(0, 2),
        ...caseInsights.risks.slice(0, 1)
      ],
      marketTrends: [
        '数字化转型加速',
        '用户体验要求提升',
        '个性化需求增长',
        ...industryInsights.trends.slice(0, 2)
      ],
      competitiveAdvantages: [
        ...allInsights.filter(insight => 
          insight.includes('优势') || insight.includes('创新') || insight.includes('优化')
        ).slice(0, 2),
        ...industryInsights.opportunities.slice(2, 4),
        ...caseInsights.advantages.slice(0, 1)
      ]
    };
  }

  // 生成行业特定洞察
  private generateIndustryInsights(industry: string | undefined, topic: string) {
    if (!industry || !(INDUSTRY_KNOWLEDGE as Record<string, any>)[industry]) {
      return {
        trends: ['行业趋势不明确，建议进行市场调研'],
        challenges: ['行业挑战需要进一步分析'],
        opportunities: [`${topic}在相关行业可能有创新机会`]
      };
    }
    
    const knowledge = (INDUSTRY_KNOWLEDGE as Record<string, any>)[industry];
    return {
      trends: knowledge.trends.map((trend: string) => `${industry}行业趋势：${trend}`),
      challenges: knowledge.challenges.map((challenge: string) => `${industry}行业挑战：${challenge}`),
      opportunities: knowledge.opportunities.map((opportunity: string) => 
        `${topic}在${industry}行业的机会：${opportunity}`
      )
    };
  }

  // 基于案例库生成洞察
  private generateCaseBasedInsights(topic: string, context: AnalysisContext) {
    const similarCases = this.findSimilarCases(topic, context);
    const insights = {
      opportunities: [] as string[],
      risks: [] as string[],
      advantages: [] as string[]
    };

    similarCases.forEach(caseItem => {
      // 从相似案例标题和描述中提取洞察
      insights.opportunities.push(
        `借鉴案例"${caseItem.title}"：${caseItem.description}`
      );
      
      // 添加基于案例主题的通用风险提示
      insights.risks.push(
        `案例"${caseItem.title}"的通用风险：市场竞争、技术更新、用户需求变化`
      );
    });

    return insights;
  }

  // 生成建议
  private generateRecommendations(topic: string, _context: AnalysisContext) {
    return {
      shortTerm: [
        `对${topic}进行详细的市场调研`,
        '制定初步的产品/服务规划',
        '建立核心团队'
      ],
      mediumTerm: [
        `开发${topic}的MVP版本`,
        '建立合作伙伴关系',
        '优化产品功能'
      ],
      longTerm: [
        '扩大市场份额',
        '建立品牌影响力',
        '考虑多元化发展'
      ]
    };
  }

  // 查找相似案例 - 增强版
  private findSimilarCases(topic: string, context: AnalysisContext): LocalCase[] {
    const allCases = localCaseService.getAllCases();
    
    if (allCases.length === 0) {
      return [];
    }

    // 多维度相似度匹配
    const scoredCases = allCases.map(caseItem => {
      let score = 0;
      
      // 主题相似度
      const topicSimilarity = this.calculateTopicSimilarity(topic, caseItem.topic);
      score += topicSimilarity * 0.4;
      
      // 行业匹配
      if (context.industry && caseItem.industry === context.industry) {
        score += 0.3;
      }
      
      // 标签匹配
      if (context.industry && caseItem.tags.includes(context.industry)) {
        score += 0.2;
      }
      
      // 案例质量加分
      if (caseItem.rating && caseItem.rating > 4) {
        score += 0.1;
      }
      
      return { case: caseItem, score };
    });

    return scoredCases
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0.2) // 最低相似度阈值
      .slice(0, 5)
      .map(item => item.case);
  }

  // 计算主题相似度
  private calculateTopicSimilarity(topic1: string, topic2: string): number {
    const words1 = new Set(topic1.toLowerCase().split(/[\s\-_]+/));
    const words2 = new Set(topic2.toLowerCase().split(/[\s\-_]+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return union.size === 0 ? 0 : intersection.size / union.size;
  }

  // 生成综合分析 - 增强版
  private generateComprehensiveAnalysis(
    topic: string, 
    context: AnalysisContext, 
    insights: any, 
    similarCases: LocalCase[]
  ): string {
    let analysis = `# ${topic} - 深度创新分析报告\n\n`;
    
    analysis += `## 1. 创新机会评估\n`;
    analysis += `基于奥斯本九问的系统性分析，发现了${insights.keyOpportunities.length}个核心创新机会：\n`;
    insights.keyOpportunities.forEach((opp: string, index: number) => {
      analysis += `${index + 1}. ${opp}\n`;
    });
    analysis += `\n`;
    
    analysis += `## 2. 行业趋势分析\n`;
    analysis += `在${context.industry || '相关'}行业背景下，${topic}面临以下趋势：\n`;
    insights.marketTrends.forEach((trend: string, index: number) => {
      analysis += `${index + 1}. ${trend}\n`;
    });
    analysis += `\n`;
    
    analysis += `## 3. 风险评估\n`;
    analysis += `需要重点关注${insights.potentialRisks.length}个潜在风险：\n`;
    insights.potentialRisks.forEach((risk: string, index: number) => {
      analysis += `${index + 1}. ${risk}\n`;
    });
    analysis += `\n`;
    
    analysis += `## 4. 案例参考\n`;
    if (similarCases.length > 0) {
      analysis += `分析了${similarCases.length}个相似案例，提供以下参考：\n`;
      similarCases.forEach((caseItem, index) => {
        analysis += `${index + 1}. ${caseItem.title} - ${caseItem.description}\n`;
      });
    } else {
      analysis += `暂无相似案例，建议建立相关案例库以提升分析质量。\n`;
    }
    analysis += `\n`;
    
    analysis += `## 5. 竞争优势\n`;
    analysis += `通过创新可以建立以下竞争优势：\n`;
    insights.competitiveAdvantages.forEach((advantage: string, index: number) => {
      analysis += `${index + 1}. ${advantage}\n`;
    });
    
    return analysis;
  }

  // 生成总结 - 增强版
  private generateSummary(topic: string, insights: any, recommendations: any, detailedAnalysis: any): string {
    const totalRecommendations = recommendations.shortTerm.length + recommendations.mediumTerm.length + recommendations.longTerm.length;
    const innovationPatterns = detailedAnalysis?.innovationPatterns?.length || 0;
    
    return `${topic}的深度创新分析揭示了${insights.keyOpportunities.length}个关键机会，识别了${insights.potentialRisks.length}个风险点，提出了${totalRecommendations}个实施建议，并发现了${innovationPatterns}个创新模式，为项目提供了全面的战略指导。`;
  }

  // 计算评分 - 增强版
  private calculateScore(insights: any, recommendations: any, similarCases: LocalCase[], detailedAnalysis: any): number {
    let score = 0;
    
    // 机会质量评分
    score += insights.keyOpportunities.length * 6;
    
    // 建议质量评分
    score += recommendations.shortTerm.length * 4;
    score += recommendations.mediumTerm.length * 5;
    score += recommendations.longTerm.length * 6;
    
    // 案例参考评分
    score += similarCases.length * 10;
    
    // 详细分析质量加分
    if (detailedAnalysis) {
      score += detailedAnalysis.osbornDimensions?.length * 3 || 0;
      score += detailedAnalysis.crossIndustryInsights?.length * 2 || 0;
      score += detailedAnalysis.innovationPatterns?.length * 5 || 0;
    }
    
    // 行业上下文加分
    if (insights.marketTrends.length > 3) {
      score += 5;
    }
    
    return Math.min(Math.max(score, 0), 100);
  }

  // 评估质量
  private assessQuality(score: number): 'low' | 'medium' | 'high' {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  }

  // 计算置信度
  private calculateConfidence(context: AnalysisContext, similarCases: LocalCase[]): number {
    let confidence = 0.5; // 基础置信度
    
    if (context.industry) confidence += 0.15;
    if (context.targetAudience) confidence += 0.1;
    if (context.businessModel) confidence += 0.1;
    if (context.budget) confidence += 0.05;
    if (context.timeline) confidence += 0.05;
    if (similarCases.length > 0) confidence += Math.min(similarCases.length * 0.1, 0.3);
    
    return Math.min(confidence, 1.0);
  }

  // 生成详细分析 - 新增功能
  private generateDetailedAnalysis(topic: string, context: AnalysisContext, similarCases: LocalCase[]) {
    return {
      osbornDimensions: this.generateOsbornDimensionAnalysis(topic, context),
      crossIndustryInsights: this.generateCrossIndustryInsights(topic, context),
      innovationPatterns: this.identifyInnovationPatterns(topic, context, similarCases),
      implementationRoadmap: this.generateImplementationRoadmap(topic, context)
    };
  }

  // 生成奥斯本维度详细分析
  private generateOsbornDimensionAnalysis(topic: string, context: AnalysisContext) {
    return Object.entries(OSBORN_TEMPLATES).map(([dimension, template]) => ({
      dimension,
      questions: template.questions.map(q => 
        q.replace('这个产品/服务', topic).replace('现有功能', `${topic}的功能`)
      ),
      insights: template.insights.map(insight => 
        `${topic}的${dimension}：${insight}`
      ),
      score: Math.floor(Math.random() * 20) + 70, // 70-90分
      recommendations: this.generateDimensionRecommendations(dimension, topic, context)
    }));
  }

  // 生成跨行业洞察
  private generateCrossIndustryInsights(topic: string, context: AnalysisContext) {
    const insights: string[] = [];
    const currentIndustry = context.industry;
    
    // 从其他行业借鉴经验
    Object.entries(INDUSTRY_KNOWLEDGE).forEach(([industry, knowledge]) => {
      if (industry !== currentIndustry) {
        knowledge.trends.slice(0, 2).forEach(trend => {
          insights.push(`借鉴${industry}行业：${trend}可能适用于${topic}`);
        });
      }
    });
    
    return insights.slice(0, 5);
  }

  // 识别创新模式
  private identifyInnovationPatterns(_topic: string, context: AnalysisContext, similarCases: LocalCase[]) {
    const patterns: string[] = [];
    
    // 基于行业特征推荐模式
    if (context.industry && (INDUSTRY_KNOWLEDGE as Record<string, any>)[context.industry]) {
      const industryKnowledge = (INDUSTRY_KNOWLEDGE as Record<string, any>)[context.industry];
      
      if (industryKnowledge.trends.some((t: string) => t.includes('数字化') || t.includes('智能'))) {
        patterns.push('数字化转型模式');
      }
      if (industryKnowledge.trends.some((t: string) => t.includes('平台') || t.includes('生态'))) {
        patterns.push('平台化商业模式');
      }
    }
    
    // 从相似案例中提取模式
    similarCases.forEach(caseItem => {
      if (caseItem.tags.some(tag => tag.includes('创新') || tag.includes('模式'))) {
        patterns.push(`借鉴案例模式：${caseItem.title}`);
      }
    });
    
    return [...new Set(patterns)].slice(0, 3);
  }

  // 生成实施路线图
  private generateImplementationRoadmap(topic: string, _context: AnalysisContext) {
    return [
      {
        phase: '调研规划',
        timeline: '1-2个月',
        actions: [
          `深入调研${topic}市场需求`,
          '分析竞争对手情况',
          '制定详细的产品规划',
          '组建核心团队'
        ],
        dependencies: ['市场数据', '行业报告', '团队资源']
      },
      {
        phase: '产品开发',
        timeline: '3-6个月',
        actions: [
          `开发${topic}的MVP版本`,
          '进行用户测试和反馈收集',
          '迭代优化产品功能',
          '建立技术基础设施'
        ],
        dependencies: ['技术资源', '用户反馈', '开发进度']
      },
      {
        phase: '市场推广',
        timeline: '2-4个月',
        actions: [
          '制定市场推广策略',
          '建立品牌形象',
          '开展用户获取活动',
          '建立合作伙伴关系'
        ],
        dependencies: ['营销预算', '渠道资源', '品牌建设']
      },
      {
        phase: '规模化运营',
        timeline: '持续进行',
        actions: [
          '优化运营效率',
          '扩大用户规模',
          '探索新的收入模式',
          '建立持续创新机制'
        ],
        dependencies: ['运营团队', '资金支持', '市场机会']
      }
    ];
  }

  // 生成维度特定建议
  private generateDimensionRecommendations(dimension: string, topic: string, context: AnalysisContext) {
    const recommendations: string[] = [];
    
    switch (dimension) {
      case '能否他用？':
        recommendations.push(`探索${topic}在${context.industry || '其他'}行业的应用场景`);
        recommendations.push(`考虑将${topic}功能扩展到新的用户群体`);
        break;
      case '能否借用？':
        recommendations.push(`研究${context.industry || '相关'}行业的最佳实践`);
        recommendations.push('借鉴成功企业的经验和方法');
        break;
      case '能否修改？':
        recommendations.push(`优化${topic}的用户体验设计`);
        recommendations.push('改进产品性能和稳定性');
        break;
      // 其他维度的建议...
      default:
        recommendations.push(`针对${dimension}进行深入分析`);
        recommendations.push('制定具体的改进计划');
    }
    
    return recommendations;
  }
}

export const intelligentAnalysisEngine = new IntelligentAnalysisEngine();
export default intelligentAnalysisEngine;
