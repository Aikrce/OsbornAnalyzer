import type { AnalysisResult, OsbornDimensionResult } from '../types';

// 行业知识库 - 增强跨行业分析能力
export const INDUSTRY_KNOWLEDGE = {
  '科技': {
    trends: ['人工智能集成', '云计算应用', '物联网连接', '区块链技术', '边缘计算'],
    challenges: ['技术更新快', '人才短缺', '安全风险', '标准不统一'],
    opportunities: ['数字化转型', '智能化升级', '数据驱动决策', '远程协作'],
    innovationPatterns: ['平台化', '订阅制', '个性化', '去中介化']
  },
  '教育': {
    trends: ['在线学习', '个性化教育', '游戏化学习', '混合式教学', '终身学习'],
    challenges: ['数字鸿沟', '教学质量保证', '教师培训', '内容更新'],
    opportunities: ['教育公平', '技能提升', '全球教育', '定制化学习'],
    innovationPatterns: ['个性化学习', '游戏化', '混合式', '终身学习']
  },
  '医疗': {
    trends: ['远程医疗', '精准医疗', '数字健康', 'AI诊断', '可穿戴设备'],
    challenges: ['数据隐私', '法规限制', '技术门槛', '成本控制'],
    opportunities: ['预防医学', '个性化治疗', '医疗可及性', '健康管理'],
    innovationPatterns: ['预防性', '个性化', '远程化', '数据驱动']
  },
  '零售': {
    trends: ['全渠道零售', '社交电商', '直播带货', '个性化推荐', '无人零售'],
    challenges: ['库存管理', '物流效率', '用户体验', '竞争激烈'],
    opportunities: ['新零售模式', '数据驱动运营', '会员经济', '场景化营销'],
    innovationPatterns: ['全渠道', '社交化', '个性化', '无人化']
  },
  '金融': {
    trends: ['金融科技', '数字支付', '智能投顾', '区块链金融', '开放银行'],
    challenges: ['监管合规', '风险控制', '数据安全', '用户信任'],
    opportunities: ['普惠金融', '金融服务创新', '跨境支付', '智能风控'],
    innovationPatterns: ['数字化', '智能化', '开放化', '普惠化']
  },
  '制造业': {
    trends: ['工业4.0', '智能制造', '柔性生产', '供应链数字化', '绿色制造'],
    challenges: ['技术升级', '成本控制', '人才转型', '供应链管理'],
    opportunities: ['智能制造', '定制化生产', '绿色转型', '供应链优化'],
    innovationPatterns: ['智能化', '柔性化', '绿色化', '数字化']
  }
};

// 创新模式库
export const INNOVATION_PATTERNS = {
  '平台化': {
    description: '构建连接多方参与者的平台生态系统',
    examples: ['电商平台', '社交媒体', '共享经济'],
    benefits: ['网络效应', '规模经济', '数据积累'],
    implementation: '建立双边或多边市场，连接供需双方'
  },
  '订阅制': {
    description: '从一次性交易转向持续性的订阅服务',
    examples: ['SaaS服务', '内容订阅', '会员制度'],
    benefits: ['稳定收入', '用户粘性', '持续价值'],
    implementation: '设计分层订阅模式，提供持续价值'
  },
  '个性化': {
    description: '基于用户数据和偏好提供定制化服务',
    examples: ['推荐系统', '定制产品', '个性化体验'],
    benefits: ['用户满意度', '差异化竞争', '数据价值'],
    implementation: '收集用户数据，建立个性化算法'
  },
  '去中介化': {
    description: '去除中间环节，直接连接生产者和消费者',
    examples: ['直销模式', 'P2P交易', '去中心化应用'],
    benefits: ['成本降低', '效率提升', '透明度增加'],
    implementation: '建立直接连接渠道，简化交易流程'
  }
};

// 跨行业分析服务
export class CrossIndustryAnalysisService {
  private static instance: CrossIndustryAnalysisService;
  
  private constructor() {}
  
  public static getInstance(): CrossIndustryAnalysisService {
    if (!CrossIndustryAnalysisService.instance) {
      CrossIndustryAnalysisService.instance = new CrossIndustryAnalysisService();
    }
    return CrossIndustryAnalysisService.instance;
  }

  // 生成跨行业洞察
  public generateCrossIndustryInsights(
    topic: string, 
    currentIndustry?: string, 
    targetIndustries?: string[]
  ): {
    crossIndustryOpportunities: string[];
    innovationPatterns: string[];
    implementationRoadmap: any[];
    riskAssessment: any;
  } {
    const insights = {
      crossIndustryOpportunities: [] as string[],
      innovationPatterns: [] as string[],
      implementationRoadmap: [] as any[],
      riskAssessment: {
        technicalRisks: [] as string[],
        marketRisks: [] as string[],
        regulatoryRisks: [] as string[],
        mitigationStrategies: [] as string[]
      }
    };

    // 生成跨行业机会
    insights.crossIndustryOpportunities = this.generateCrossIndustryOpportunities(
      topic, 
      currentIndustry, 
      targetIndustries
    );

    // 识别创新模式
    insights.innovationPatterns = this.identifyInnovationPatterns(
      topic, 
      currentIndustry
    );

    // 生成实施路线图
    insights.implementationRoadmap = this.generateImplementationRoadmap(
      topic, 
      currentIndustry
    );

    // 风险评估
    insights.riskAssessment = this.generateRiskAssessment(
      topic, 
      currentIndustry
    );

    return insights;
  }

  // 生成跨行业机会
  private generateCrossIndustryOpportunities(
    topic: string, 
    currentIndustry?: string, 
    targetIndustries?: string[]
  ): string[] {
    const opportunities: string[] = [];
    
    // 如果没有指定目标行业，从所有行业中选择
    const industries = targetIndustries || Object.keys(INDUSTRY_KNOWLEDGE);
    
    industries.forEach(industry => {
      if (industry !== currentIndustry && INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE]) {
        const industryData = INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE];
        
        // 基于行业趋势生成机会
        industryData.trends.slice(0, 2).forEach(trend => {
          opportunities.push(
            `${topic}在${industry}行业的应用：借鉴${trend}趋势，开发相关解决方案`
          );
        });
        
        // 基于行业机会生成跨行业应用
        industryData.opportunities.slice(0, 1).forEach(opportunity => {
          opportunities.push(
            `将${topic}与${industry}行业的${opportunity}结合，创造新的价值`
          );
        });
      }
    });

    return opportunities.slice(0, 6); // 返回前6个机会
  }

  // 识别创新模式
  private identifyInnovationPatterns(topic: string, industry?: string): string[] {
    const patterns: string[] = [];
    
    // 基于行业特征推荐模式
    if (industry && INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE]) {
      const industryData = INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE];
      
      industryData.innovationPatterns.forEach(pattern => {
        if (INNOVATION_PATTERNS[pattern as keyof typeof INNOVATION_PATTERNS]) {
          patterns.push(pattern);
        }
      });
    }
    
    // 基于主题特征推荐通用模式
    if (topic.includes('平台') || topic.includes('连接')) {
      patterns.push('平台化');
    }
    if (topic.includes('服务') || topic.includes('订阅')) {
      patterns.push('订阅制');
    }
    if (topic.includes('定制') || topic.includes('个人')) {
      patterns.push('个性化');
    }
    if (topic.includes('直接') || topic.includes('去中介')) {
      patterns.push('去中介化');
    }
    
    return [...new Set(patterns)].slice(0, 3); // 返回前3个模式
  }

  // 生成实施路线图
  private generateImplementationRoadmap(topic: string, industry?: string): any[] {
    const roadmap = [
      {
        phase: '调研规划',
        timeline: '1-2个月',
        objectives: [
          `深入调研${topic}市场需求`,
          '分析竞争对手情况',
          '制定详细的产品规划',
          '组建核心团队'
        ],
        deliverables: [
          '市场调研报告',
          '竞品分析报告',
          '产品规划文档',
          '团队组织架构'
        ],
        dependencies: ['市场数据', '行业报告', '团队资源'],
        risks: ['市场数据不准确', '团队组建困难'],
        mitigation: ['多渠道数据验证', '提前启动招聘']
      },
      {
        phase: '产品开发',
        timeline: '3-6个月',
        objectives: [
          `开发${topic}的MVP版本`,
          '进行用户测试和反馈收集',
          '迭代优化产品功能',
          '建立技术基础设施'
        ],
        deliverables: [
          'MVP产品',
          '用户测试报告',
          '产品迭代计划',
          '技术架构文档'
        ],
        dependencies: ['技术资源', '用户反馈', '开发进度'],
        risks: ['技术实现困难', '用户反馈不佳'],
        mitigation: ['技术预研', '快速迭代']
      },
      {
        phase: '市场推广',
        timeline: '2-4个月',
        objectives: [
          '制定市场推广策略',
          '建立品牌形象',
          '开展用户获取活动',
          '建立合作伙伴关系'
        ],
        deliverables: [
          '营销策略文档',
          '品牌形象设计',
          '用户获取计划',
          '合作伙伴协议'
        ],
        dependencies: ['营销预算', '渠道资源', '品牌建设'],
        risks: ['推广效果不佳', '竞争激烈'],
        mitigation: ['多渠道推广', '差异化定位']
      },
      {
        phase: '规模化运营',
        timeline: '持续进行',
        objectives: [
          '优化运营效率',
          '扩大用户规模',
          '探索新的收入模式',
          '建立持续创新机制'
        ],
        deliverables: [
          '运营优化方案',
          '用户增长计划',
          '收入模式创新',
          '创新管理机制'
        ],
        dependencies: ['运营团队', '资金支持', '市场机会'],
        risks: ['运营成本上升', '增长放缓'],
        mitigation: ['效率优化', '多元化发展']
      }
    ];

    // 根据行业特点调整路线图
    if (industry && INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE]) {
      const industryData = INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE];
      
      // 添加行业特定的风险和缓解措施
      roadmap.forEach(phase => {
        industryData.challenges.forEach(challenge => {
          phase.risks.push(`${industry}行业挑战：${challenge}`);
        });
      });
    }

    return roadmap;
  }

  // 生成风险评估
  private generateRiskAssessment(topic: string, industry?: string): any {
    const assessment = {
      technicalRisks: [
        '技术实现复杂度超出预期',
        '技术选型不当导致后期重构',
        '技术团队能力不足',
        '第三方技术依赖风险'
      ],
      marketRisks: [
        '市场需求变化',
        '竞争对手快速跟进',
        '用户接受度不高',
        '市场时机不当'
      ],
      regulatoryRisks: [
        '相关法规政策变化',
        '合规要求提高',
        '数据隐私保护要求',
        '行业准入限制'
      ],
      mitigationStrategies: [
        '建立技术风险评估机制',
        '制定市场变化应对策略',
        '建立合规管理体系',
        '建立风险监控预警系统'
      ]
    };

    // 根据行业特点添加特定风险
    if (industry && INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE]) {
      const industryData = INDUSTRY_KNOWLEDGE[industry as keyof typeof INDUSTRY_KNOWLEDGE];
      
      industryData.challenges.forEach(challenge => {
        assessment.technicalRisks.push(`${industry}行业技术风险：${challenge}`);
      });
    }

    return assessment;
  }

  // 增强奥斯本分析结果
  public enhanceOsbornAnalysis(
    osbornResult: AnalysisResult,
    topic: string,
    industry?: string
  ): AnalysisResult {
    // 生成跨行业洞察
    const crossIndustryInsights = this.generateCrossIndustryInsights(
      topic, 
      industry
    );

    // 增强分析内容
    const enhancedAnalysis = this.enhanceAnalysisContent(
      osbornResult.analysis,
      crossIndustryInsights
    );

    // 增强建议
    const enhancedSuggestions = [
      ...(osbornResult.suggestions || []),
      ...crossIndustryInsights.crossIndustryOpportunities.slice(0, 3),
      ...crossIndustryInsights.innovationPatterns.map(pattern => 
        `考虑采用${pattern}创新模式：${INNOVATION_PATTERNS[pattern as keyof typeof INNOVATION_PATTERNS]?.description}`
      )
    ];

    return {
      ...osbornResult,
      analysis: enhancedAnalysis,
      suggestions: enhancedSuggestions,
      // 添加新的元数据
      // metadata: {
      //   crossIndustryInsights,
      //   industry,
      //   enhancedAt: new Date()
      // }
    };
  }

  // 增强分析内容
  private enhanceAnalysisContent(
    originalAnalysis: string,
    crossIndustryInsights: any
  ): string {
    let enhancedAnalysis = originalAnalysis;
    
    enhancedAnalysis += `\n\n## 跨行业洞察\n`;
    enhancedAnalysis += `### 跨行业机会\n`;
    crossIndustryInsights.crossIndustryOpportunities.forEach((opportunity: string, index: number) => {
      enhancedAnalysis += `${index + 1}. ${opportunity}\n`;
    });
    
    enhancedAnalysis += `\n### 创新模式\n`;
    crossIndustryInsights.innovationPatterns.forEach((pattern: string, index: number) => {
      const patternData = INNOVATION_PATTERNS[pattern as keyof typeof INNOVATION_PATTERNS];
      enhancedAnalysis += `${index + 1}. **${pattern}**：${patternData?.description}\n`;
    });
    
    enhancedAnalysis += `\n### 实施路线图\n`;
    crossIndustryInsights.implementationRoadmap.forEach((phase: any, index: number) => {
      enhancedAnalysis += `#### ${index + 1}. ${phase.phase} (${phase.timeline})\n`;
      enhancedAnalysis += `**目标：**\n`;
      phase.objectives.forEach((objective: string) => {
        enhancedAnalysis += `- ${objective}\n`;
      });
      enhancedAnalysis += `\n`;
    });
    
    enhancedAnalysis += `\n### 风险评估\n`;
    enhancedAnalysis += `**技术风险：**\n`;
    crossIndustryInsights.riskAssessment.technicalRisks.slice(0, 3).forEach((risk: string) => {
      enhancedAnalysis += `- ${risk}\n`;
    });
    enhancedAnalysis += `\n**缓解策略：**\n`;
    crossIndustryInsights.riskAssessment.mitigationStrategies.slice(0, 3).forEach((strategy: string) => {
      enhancedAnalysis += `- ${strategy}\n`;
    });
    
    return enhancedAnalysis;
  }
}

// 导出单例实例
export const crossIndustryAnalysisService = CrossIndustryAnalysisService.getInstance();
export default crossIndustryAnalysisService;
